import jwt from 'jsonwebtoken'
import _user from '../models/user.model'
import { Response, Request, NextFunction } from 'express'
import env from '../../config/envConfig'


interface JwtPayload {
    id: string,
    iat: number,
    exp: number
}
export default async function refreshToken(req: Request, res: Response, next: NextFunction) {
    const refresh_token = req.cookies?.jwt
    if (!refresh_token) return res.sendStatus(401)
    // find token in DB
    const foundUser = await _user.findOne({ refresh_token }).exec()
    // delete previous cookie //
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    })
    if (!foundUser) return res.sendStatus(403)  //Forbidden
    // verify token
    try {
        jwt.verify(refresh_token, env.JWT_SECRET_KEY2, (err: any, decoded: JwtPayload | any) => {
            // match token in DB
            if (err || foundUser.email !== decoded.id) return res.sendStatus(403) // Forbiden
            // create new access token
            const accessToken = jwt.sign({ id: decoded.id }, env.JWT_SECRET_KEY1, {
                expiresIn: env.JWT_EXPIRE_TIME
            })
            // create new refersh token
            const newRefreshToken = jwt.sign({ id: foundUser.email },
                env.JWT_SECRET_KEY2,
                { expiresIn: env.JWT_REFRESH_EXPIRE_TIME })
            // save new refersh token to DB 
            foundUser.refresh_token = newRefreshToken
            foundUser.save()
            // create cookie with refresh token
            res.cookie('jwt', newRefreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                // sameSite: 'none',
                // secure: true
            })
            // send new access token to client
            res.status(200).json({ accessToken })
        })
    } catch (error) {
        console.log('error', error)
        return res.sendStatus(403) //// forbidden
    }
}
