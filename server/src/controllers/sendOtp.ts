import { Request, Response } from "express";
import Mail from '../utils/nodeMailer'
import otpGenrator from "../utils/otpGenrator";
import _user from "../models/user.model";
import { mailType } from "../../config/mailTypes";


const sendOtpforResetPassword = async (req: Request, res: Response) => {
    // retrving value from session
    const id = req.session.user?._id
    if (!id) return res.sendStatus(401) //forbiden
    const user = await _user.findById(id).exec()
    if (!user) return res.sendStatus(401) //forbiden
    const type = mailType.MAIL_RESETPASSWORD // code for reset password
    Mail(user?.email, user?.otp, user?.name, type)
    // change the otp in DB
    otpGenrator(user.email, res)
    // send the confirm message
    return res.status(200).json({ message: 'Otp send to ' + user?.email })
}

const sendOtpForForgotPassword = (req: Request, res: Response) => {

}


export default { sendOtpForForgotPassword, sendOtpforResetPassword }