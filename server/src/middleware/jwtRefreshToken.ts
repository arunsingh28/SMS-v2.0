import jwt from 'jsonwebtoken'
import _user from '../models/user.model'
import { Response, Request, NextFunction } from 'express'


export default async function refreshToken(req: Request, res: Response, next: NextFunction) {
    const id: any = req.session.user
    const decodeId = id?._id
    const refreshToken = await _user.findById(decodeId).populate('refreshToken')
    console.log('Refresh token________',refreshToken)
}