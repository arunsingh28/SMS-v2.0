import jwt from 'jsonwebtoken'
import _user, { UserDocument } from '../models/user.model'
import { Response, Request, NextFunction } from 'express'

declare var process: {
    env: {
        JWT_SECRET_KEY1: string,
        JWT_SECRET_KEY2: string,
        JWT_EXPIRE_TIME: number,
        JWT_REFRESH_EXPIRE_TIME: number
    }
}
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
    // res.clearCookie('jwt', {
    //     httpOnly: true,
    //     // sameSite: 'none',
    //     // secure: true,
    // })

    if (!foundUser) return res.sendStatus(403)  //Forbidden

    // verify token
    try {
        jwt.verify(refresh_token, process.env.JWT_SECRET_KEY2, (err: any, decoded: any) => {
            // match token in DB
            if (err || foundUser.refresh_token !== decoded.id) return res.sendStatus(403) // Forbiden
            // create new access token
            const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET_KEY1, {
                expiresIn: process.env.JWT_EXPIRE_TIME
            })
            res.cookie('jwt', {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                // sameSite: 'none',
                // secure: true
            })
        })


        // send new access token to client

    } catch (error) {
        console.log('error', error)
        // forbidden
        return res.sendStatus(403)
    }
}



