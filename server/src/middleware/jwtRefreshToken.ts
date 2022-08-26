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
    const string_token = `'${refresh_token}'`
    if (!refresh_token) return res.status(401)
    console.log('---refresh token------', `${refresh_token}`)
    // match token in DB
    const foundUser = await _user.findOne({ refresh_token: `'${string_token}'` })
    console.log(foundUser)

    // // forbidden
    // else return res.sendStatus(403)
}



// jwt.verify(clientRefreshToken, process.env.JWT_SECRET_KEY2, (err: any, decoded: any) => {
//     if (err || refreshToken?.id !== decoded.id) return res.sendStatus(403)
//     const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET_KEY1, {
//         expiresIn: process.env.JWT_EXPIRE_TIME
//     })