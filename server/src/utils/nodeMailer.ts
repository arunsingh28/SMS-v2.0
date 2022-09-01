import nodemailer from 'nodemailer'
import { mailType } from '../../config/mailTypes'
import createAccount from '../templates/createAccount'
import forgotPassword from '../templates/forgotPassword'
import resetPassword from '../templates/resetPassword'
import successResetPassword from '../templates/resetPasswordConfirmation'
import forgotPasswordSuccess from '../templates/forgotPasswordSuccess'


async function sendMail(to: string, otp?: number, name?: string, type?: number) {
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    host: "smtp-mail.outlook.com",
    auth: {
      user: "sms.798361@hotmail.com",
      pass: "#Apple1397000"
    },
    tls: {
      ciphers: 'SSLv3'
    }
  })

  if (type === mailType.MAIL_CREATE) { // success accout create 
    transporter.sendMail({
      from: "sms.798361@hotmail.com",
      to: to,
      subject: "Welcome to SMS",
      html: createAccount(name!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  } else if (type == mailType.MAIL_RESETPASSWORD) { // sent otp for reset password
    transporter.sendMail({
      from: "sms.798361@hotmail.com",
      to: to,
      subject: "Reset Password",
      html: resetPassword(name!, otp!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  } else if (type == mailType.MAIL_SUCCESS) { // success reset password
    transporter.sendMail({
      from: "sms.798361@hotmail.com",
      to: to,
      subject: "Reset Password Successfuly",
      html: successResetPassword(name!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  } else if (type == mailType.MAIL_FORGOTPASSWORD_SUCCESS) { // success forgot password
    transporter.sendMail({
      from: "sms.798361@hotmail.com",
      to: to,
      subject: "Channge Password Successfuly",
      html: forgotPasswordSuccess(name!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  } else {
    transporter.sendMail({ //forgot password
      from: "sms.798361@hotmail.com",
      to: to,
      subject: "Forgot Password",
      html: forgotPassword(name!, otp!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  }

}


export default sendMail