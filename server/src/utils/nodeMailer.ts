import nodemailer from 'nodemailer'
import env from '../../config/envConfig'
import createAccount from '../templates/createAccount'
import forgotPassword from '../templates/forgotPassword'
import resetPassword from '../templates/resetPassword'
import successResetPassword from '../templates/resetPasswordConfirmation'
import forgotPasswordSuccess from '../templates/forgotPasswordSuccess'
import message from '../templates/message'


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

  if (type === env.MAIL_CREATE) { // success accout create 
    transporter.sendMail({
      from: "sms.798361@hotmail.com",
      to: to,
      subject: "Welcome to SMS",
      html: createAccount(name!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  } else if (type == env.MAIL_RESETPASSWORD) { // sent otp for reset password
    transporter.sendMail({
      from: "sms.798361@hotmail.com",
      to: to,
      subject: "Reset Password",
      html: resetPassword(name!, otp!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  } else if (type == env.MAIL_SUCCESS) { // success reset password
    transporter.sendMail({
      from: "sms.798361@hotmail.com",
      to: to,
      subject: "Reset Password Successfuly",
      html: successResetPassword(name!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  } else if (type == env.MAIL_FORGOTPASSWORD_SUCCESS) { // success forgot password
    transporter.sendMail({
      from: "sms.798361@hotmail.com",
      to: to,
      subject: "Channge Password Successfuly",
      html: forgotPasswordSuccess(name!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  } else if (type == env.MAIL_MESSAGE) {
    transporter.sendMail({
      from: "sms.798361@hotmail.com",
      to: to,
      subject: "Message",
      html: message(name!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  }
  else {
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