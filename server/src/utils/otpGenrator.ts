import _user from '../models/user.model'
import { Response } from 'express'

export default async function otpGenrator(email: string, res: Response) {
    // genrate 6 digit new otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    // fetch old otp
    const user = await _user.findOne({ email })
    try {
        // update otp in DB
        await _user.findOneAndUpdate({ email },
            {
                $set: {
                    oldOtp: user?.otp,
                    otp
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