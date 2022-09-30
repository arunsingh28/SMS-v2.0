import { Request, Response } from "express";
import Mail from '../utils/nodeMailer'
import otpGenrator from "../utils/otpGenrator";
import _user from "../models/user.model";
import env from '../../config/envConfig'

// send the reset password otp to user's email
const sendOtpforResetPassword = async (req: Request, res: Response) => {
    // retrving value from session
    const id = req.session.user?._id
    if (!id) return res.sendStatus(401) //forbiden
    const user = await _user.findById(id).exec()
    if (!user) return res.sendStatus(401) //forbiden
    const type = env.MAIL_RESETPASSWORD // code for reset password
    Mail(user?.email, user?.otp, user?.firstName, type)
    // change the otp in DB
    otpGenrator(user.email, res)
    // send the confirm message
    return res.status(200).json({ message: 'Otp send to ' + user?.email })
}

// send the forgot password otp to user's email
const sendOtpForForgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        return res
            .status(401)
            .json({ message: "please enter your email", code: res.statusCode });
    } else {
        const lowerCaseEmail = email.toLowerCase();
        const user = await _user.findOne({ email: lowerCaseEmail }).exec()
        // if user not found in DB
        if (!user) {
            return res.status(401).json({
                message: `We couldn't find an account associated with ${email} Please try with an alternate email or phone number.`,
                code: res.statusCode,
            });
        } else {
            try {
                // send otp to email
                const typeOfMail = env.MAIL_FORGOTPASSWORD
                const img: any = user?.profile?.location
                Mail(user.email, user.otp, user.firstName, typeOfMail, img)
                // change the otp into db
                otpGenrator(email, res)
                return res.status(200).json({ message: "Thanks! If there's an account associated with this email, we'll send the password reset instructions immediately" + email, code: res.statusCode })
            } catch (error) {
                // catch server error
                return res.status(500).json({
                    message: 'server error',
                    code: res.statusCode
                })
            }
        }
    }
}

const sendOtpForAccountVerification = async (req: Request, res: Response) => {
    const id = req.session.user?._id
    if (!id) return res.sendStatus(401) //forbiden
    const user = await _user.findById(id).exec()
    if (!user) return res.sendStatus(401) //forbiden
    const type = env.MAIL_ACCOUNTVERIFICATION // code for reset password
    const verifyLink = `http://localhost:3000/api/v1/verifty${user.refresh_token}`
    Mail(user?.email, user?.otp, user?.firstName + '' + user?.lastName, type, verifyLink)
    // change the otp in DB
    otpGenrator(user.email, res)
    // send the confirm message
    return res.status(200).json({ message: 'Otp send to ' + user?.email })
}

const sendMessage = async (req: Request, res: Response) => {
    const { to, message } = req.body;
    try {
        Mail(to, 12, message, env.MAIL_MESSAGE)
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}


export default { sendOtpForForgotPassword, sendOtpforResetPassword, sendMessage, sendOtpForAccountVerification }
