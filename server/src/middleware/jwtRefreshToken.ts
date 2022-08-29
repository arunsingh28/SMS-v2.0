import jwt, { JwtPayload } from 'jsonwebtoken'
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
    console.log('RT:-----', refresh_token)
    if (!refresh_token) return res.sendStatus(401)
    // match token in DB
    const foundUser = await _user.findOne({ refresh_token }).exec()
    console.log('User from DB -----', foundUser)
    // res.clearCookie('jwt', {
    //     httpOnly: true,
    //     // sameSite: 'none',
    //     // secure: true,
    // })
    if (!foundUser) return res.sendStatus(403)  //Forbidden
    // verify token
    try {
        const decoded: JwtPayload = jwt.verify(refresh_token, process.env.JWT_SECRET_KEY2)
        console.log('decoded', decoded)
        // match token in DB
        if (foundUser.email !== decoded.id) return res.sendStatus(403) //Forbidden
        // create new access token

        // send new access token to client

    } catch (error) {
        console.log('error', error)
        return res.sendStatus(403)
    }

    // // forbidden
    // else return res.sendStatus(403)
}



// jwt.verify(clientRefreshToken, process.env.JWT_SECRET_KEY2, (err: any, decoded: any) => {
//     if (err || refreshToken?.id !== decoded.id) return res.sendStatus(403)
//     const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET_KEY1, {
//         expiresIn: process.env.JWT_EXPIRE_TIME
//     })