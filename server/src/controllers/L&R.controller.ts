import { Request, Response } from "express";
import TOKEN from "../utils/token";
import _user from "../models/user.model";
import otpGenrator from "../utils/otpGenrator";
import Mail from '../utils/nodeMailer'
import jwt from "jsonwebtoken";
import env from '../../config/envConfig'

// register api for emp
const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, address, city, collage, gender, phone, term, zip, dob, countryCode } = req.body;
  console.log(req.body)
  if (!email || !password || !firstName || !lastName || !address || !city || !collage || !gender || !phone || !term || !zip || !dob || !countryCode) {
    return res
      .status(400)
      .json({ message: "Please fill all detail", code: res.statusCode });
  } else if (password.length < 6) {
    return res.json({ message: "Enter more then 6 char long password" })
  }
  else {
    const refreshToken = TOKEN.refreshToken(email);
    // hasing password and storing
    const newUser = new _user({
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      city,
      collage,
      gender,
      dob,
      countryCode,
      refresh_token: refreshToken
    })

    try {
      const accesstoken = TOKEN.getToken(email);
      // genrate refresh token
      await newUser.save();
      // send the accessToken with cookie
      res.cookie('__session_rsh', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true
      })
      // start session
      req.session.user = newUser
      // send mail to user
      const typeOfMail = env.MAIL_CREATE
      Mail(newUser.email, newUser.otp, newUser.firstName, typeOfMail)
      // user created
      return res.status(201).json({
        message: "account created!",
        accesstoken,
        user: {
          name: newUser.firstName,
          email: newUser.email,
          role: newUser.role
        },
        code: res.statusCode,
      });
    } catch (error: any) {
      if (error.code == 11000) {
        // user conflict
        return res.status(409).json({
          message: "User alredy registered",
          code: res.statusCode,
        });
      }
      return res.status(500).json({
        message: "account not created " + error.message,
        code: res.statusCode,
      });
    }
  }
};


// change password for local emp
const resetPassword = async (req: Request, res: Response) => {
  const id = req.session.user;
  const { pwd: password, oldpwd: oldPassword, otp } = req.body;
  // find user with this id
  let user = await _user.findById(id).exec()
  let email = user?.email
  if (!password || !oldPassword) {
    return res
      .status(400)
      .json({ message: "fill all detail", code: res.statusCode });
  } else if (!otp) {
    return res
      .status(400)
      .json({ message: "Please provide the otp", code: res.statusCode });
  }
  // compare old-password with client-password
  const isMatch = await (<any>user).comparePassword(oldPassword);
  if (isMatch === false) {
    return res
      .status(401)
      .json({ message: "Invalid credinitals", code: res.statusCode });
  } else {
    const hash = await user?.encryptPassword(password);
    // user must have the otp
    try {
      // save the new password in DB after the verify the otp
      if (otp == user?.oldOtp) {
        await _user.findOneAndUpdate({ email },
          {
            $set: {
              password: hash
            }
          }
        );
        // save new password
        user?.save()
        // change the otp
        otpGenrator(email!, res)
        // send success mail
        Mail(email!, otp, user?.firstName, env.MAIL_SUCCESS)
        return res.status(200).json({ message: 'Password change succssfully' })
      }
      // otp not match
      else return res.status(406).json({ message: 'OTP has Expired' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'server error' })
    }
  }
}


// forgot password otp verify controller
const verifyForgotOTP = async (req: Request, res: Response) => {
  const email: any = req.query.email
  const { otp } = req.body;
  console.log('Email:', req.params)
  if (!email || !otp) return res.status(401).json({ message: 'please provide the information' })
  const user = await _user.findOne({ email }).exec()
  // if hacker do something with url
  if (!user) return res.status(401).json({ message: 'something went wrong' })
  if (otp != user.oldOtp) return res.status(406).json({ message: 'incorrect OTP' })
  // create token
  const forgotToken = TOKEN.ForgotToken(user._id);
  // create the cookie to save id of current user 
  res.cookie('_ftoken', forgotToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none',
    secure: true
  })
  return res.status(200).json({ code: res.statusCode })
}


// forgot password for local emp
const forgotPassword = async (req: Request, res: Response) => {
  const uft = req.cookies?._ftoken
  const { password } = req.body;
  // check token 
  if (!uft) {
    // delte the old cookie
    res.clearCookie('_ftoken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    })
    return res.status(401).json({ message: "token required" })
  } else { // validate the password
    if (!password) return res.status(401).json({ message: "Please provide the detail" })
    // decode the token
    try {
      jwt.verify(uft, env.JWT_SECRET_KEY3, async (err: any, value: any) => {
        if (err) {
          // clear the old tempared cookie
          res.clearCookie('_ftoken', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
          })
          if (err.message === 'jwt expired') {
            return res.status(403).json({ message: 'Forgot password session has expired' })
          }
          return res.sendStatus(403) //forbiden
        }
        const user = await _user.findById(value.id)
        const email = user?.email
        // create the hash password
        const hash = await user?.encryptPassword(password);
        // save the new hash password to DB
        await _user.findOneAndUpdate({ email },
          {
            $set: {
              password: hash
            }
          }
        );
        Mail(user?.email!, user?.otp, user?.firstName, env.MAIL_FORGOTPASSWORD_SUCCESS)
        // clear the previus cookie
        res.clearCookie('_ftoken', {
          httpOnly: true,
          sameSite: 'none',
          secure: true
        })
        return res.status(200).json({ message: "Succssfuly change the password." })
      })
    } catch (err) {
      return res.status(500).json({ message: "server error" }) //forbiden
    }
  }
};

const verifyAccount = async (req: Request, res: Response) => {
  const { otp, email } = req.body
  if (!otp) return res.status(401).json({ message: 'please provide the otp' })
  if (!email) return res.status(401).json({ message: 'please provide the email' })
  const user = await _user.findOne({ email }).exec()
  if (!user) return res.status(401).json({ message: 'something went wrong' })
  if (otp != user.oldOtp) return res.status(406).json({ message: 'incorrect OTP' })
  // update the user
  await _user.findOneAndUpdate({ email },
    {
      $set: {
        isVerified: true
      }
    }
  );
  return res.status(200).json({ message: 'Account verified', code: res.statusCode })
}


// delet account parament
const delteAccount = async (req: Request, res: Response) => {

}

const module = {
  register,
  resetPassword,
  forgotPassword,
  verifyAccount,
  verifyForgotOTP
};
export default module;
