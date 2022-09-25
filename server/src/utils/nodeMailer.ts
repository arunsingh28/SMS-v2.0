import nodemailer from 'nodemailer'
import env from '../../config/envConfig'
import createAccount from '../templates/createAccount'
import forgotPassword from '../templates/forgotPassword'
import resetPassword from '../templates/resetPassword'
import successResetPassword from '../templates/resetPasswordConfirmation'
import forgotPasswordSuccess from '../templates/forgotPasswordSuccess'
import verifyAccount from '../templates/verifyAccount'
import message from '../templates/message'


async function sendMail(to: string, otp?: number, name?: string, type?: number, profile?: string, verifyLink?: string) {
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    host: "smtp-mail.outlook.com",
    auth: {
      user: env.MAIL_DOMAIN,
      pass: env.MAIL_DOMAIN_PASS
    },
    tls: {
      ciphers: 'SSLv3'
    }
  })

  if (type === env.MAIL_CREATE) { // success accout create 
    transporter.sendMail({
      from: "sms.798361@hotmail.com",
      sender: 'No-reply.skillvoid',
      to: to,
      subject: "Welcome to SMS",
      html: createAccount(name!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  } else if (type == env.MAIL_RESETPASSWORD) { // sent otp for reset password
    transporter.sendMail({
      from: env.MAIL_DOMAIN,
      sender: 'No-reply.skillvoid',
      to: to,
      subject: "Reset Password",
      html: resetPassword(name!, otp!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  } else if (type == env.MAIL_SUCCESS) { // success reset password
    transporter.sendMail({
      from: env.MAIL_DOMAIN,
      sender: 'No-reply.skillvoid',
      to: to,
      subject: "Reset Password Successfuly",
      html: successResetPassword(name!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  } else if (type == env.MAIL_FORGOTPASSWORD_SUCCESS) { // success forgot password
    transporter.sendMail({
      from: env.MAIL_DOMAIN,
      sender: 'No-reply.skillvoid',
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
      sender: 'No-reply.skillvoid',
      to: to,
      subject: "New Message",
      html: message(name!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  } else if (type == env.MAIL_ACCOUNTVERIFICATION) {
    transporter.sendMail({
      from: env.MAIL_DOMAIN,
      sender: 'No-reply.skillvoid',
      to: to,
      subject: "Account Verification",
      html: verifyAccount(otp!, name!, verifyLink!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  }
  else {
    transporter.sendMail({ //forgot password
      from: env.MAIL_DOMAIN,
      to: to,
      subject: "Forgot Password",
      html: forgotPassword(name!, otp!, profile!)
    }, (err, info) => {
      if (err) console.log(err)
      else console.log("email send:", info.response)
    })
  }

}


export default sendMail