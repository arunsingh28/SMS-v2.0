import _user from '../models/user.model'
import { Response } from 'express'

export default async function otpGenrator(id: string, res: Response) {
    // genrate 6 digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    try {
        await _user.findOneAndUpdate({ email: id },
            {
                $inc: {
                    "otp": otp
                }
            }
        );
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'server error',
            code: res.statusCode
        })
    }
}