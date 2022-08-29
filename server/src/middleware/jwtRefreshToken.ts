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

export default async function refreshToken(req: Request, res: Response, next: NextFunction) {
    const refresh_token = req.cookies?.jwt
    console.log('RT:-----', refresh_token)
    if (!refresh_token) return res.sendStatus(401)
    // match token in DB
    const foundUser = await _user.findOne({ refresh_token }).exec()
    console.log('User from DB -----', foundUser)
    res.clearCookie('jwt', {
        httpOnly: true,
        // sameSite: 'none',
        // secure: true,
    })
    if (!foundUser) return res.sendStatus(403)

    // // forbidden
    // else return res.sendStatus(403)
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlbW9AZG8uY29tIiwiaWF0IjoxNjYxNTQ4MDA4LCJleHAiOjE2NjE1NDgzMDh9.fhiK2gouUGm119yxYTr7J2kbZSpbRfwbCvhFPXTYD00


// jwt.verify(clientRefreshToken, process.env.JWT_SECRET_KEY2, (err: any, decoded: any) => {
//     if (err || refreshToken?.id !== decoded.id) return res.sendStatus(403)
//     const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET_KEY1, {
//         expiresIn: process.env.JWT_EXPIRE_TIME
//     })