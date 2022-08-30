import { Request, Response, NextFunction } from "express";
import TOKEN from "../utils/token";
import _user, { UserDocument } from "../models/user.model";
import otpGenrator from "../utils/otpGenrator";
import Mail from '../utils/nodeMailer'

// register api for emp
const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "please fill all detail", code: res.statusCode });
  } else if (password.length < 6) {
    return res.json({ message: "Enter more then 6 char long password" })
  }
  else {
    const refreshToken = await TOKEN.refreshToken(email);
    // hasing password
    const newUser = new _user({
      email,
      password,
      name,
      refresh_token: refreshToken
    })
    try {
      const accesstoken = await TOKEN.getToken(email);
      // genrate refresh token
      await newUser.save();
      // send the accessToken with cookie
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        // sameSite: 'none',
        // secure: true
      })
      // start session
      req.session.user = newUser

      // user created
      return res.status(201).json({
        message: "account created!",
        accesstoken,
        user: {
          name: newUser.name,
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

// logni api for emp
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      message: "please fill all detail",
      code: res.statusCode,
    });
  }
  const user = await _user.findOne({ email })
  // if user not found
  if (!user) {
    return res
      .status(203)
      .json({ message: "User not found", code: res.statusCode });
  } else {
    // checking user password
    const isMatch = await user.comparePassword(password);
    if (isMatch === false) {
      return res
        .status(401)
        .json({ message: "Invalid credinitals", code: res.statusCode });
    } else {
      // genrate access token
      const token = await TOKEN.getToken(email);
      // genrate refresh token
      const refreshToken = await TOKEN.refreshToken(email);
      // update the refresh token in DB
      await _user.findOneAndUpdate({ email }, {
        $set: { refresh_token: refreshToken }
      })
      // send the accessToken with cookie
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        // sameSite: 'none',
        // secure: true
      })
      // start session 
      req.session.user = user
      // send data to client
      return res.status(200).json({
        message: "logged in",
        data: {
          name: user.name,
          email: user.email,
          role: user.role
        },
        accessToken: token,
        code: res.statusCode,
      });
    }
  }
};

// logout api 
const logout = async (req: Request, res: Response) => {
  // on client delte the access token
  const cookie = req.cookies?.jwt
  if (!cookie) return res.sendStatus(204) //no content
  // match refresh token in DB
  const foundUser = await _user.findOne({ refresh_token: cookie }).exec()
  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    return res.sendStatus(204)
  }
  // delet refresh token in db
  foundUser.refresh_token = ''
  foundUser.save()
  // clear the refresh token  
  res.clearCookie('jwt', {
    httpOnly: true,
    smaeSite: 'none',
    secure: true
  })
  return res.sendStatus(204)
};

// change password for local emp
const updatePassword = async (req: Request, res: Response) => {
  const id = req.session.user;
  const { pwd: password, oldpwd: oldPassword } = req.body;
  // find user with this id
  const user = await _user.findById(id);
  if (!password || !oldPassword) {
    return res
      .status(400)
      .json({ message: "fill all detail", code: res.statusCode });
  }
  try {
    // compare old-password with client-password
    const isMatch = await (<any>user).comparePassword(oldPassword);
    if (isMatch === false) {
      return res
        .status(401)
        .json({ message: "Invalid credinitals", code: res.statusCode });
    } else {
      const hash = await user?.encryptPassword(password);
      // save to db
      await user?.updateOne({
        $set: {
          password: hash,
        },
      })
        .then(() => {
          // send confimation mail 
          /*
            ....
          */
          return res.status(200).json({
            message: "password change successfully",
            code: res.statusCode,
          });
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: "server error"
    })
  }
};

// forgot password for local emp
const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(401)
      .json({ message: "please enter your email", code: res.statusCode });
  } else {
    const user = await _user.findOne({ email });
    // if user not found in db
    if (!user) {
      return res.status(401).json({
        message: "no account found with this email",
        code: res.statusCode,
      });
    } else {
      try {
        // change the otp into db
        otpGenrator(email, res)
        // send otp to email
        Mail(user.email, user.otp, user.name)
        return res.status(200).json({
          // send the otp to client by email serivce by Gunmail
          otp: user.otp,
          name: user.name,
          email: user.email
        })
      } catch (error) {
        // catch server error
        return res.status(500).json({
          message: 'server error',
          code: res.statusCode
        })
      }
    }
  }
};

const module = {
  register,
  login,
  logout,
  updatePassword,
  forgotPassword
};

export default module;
