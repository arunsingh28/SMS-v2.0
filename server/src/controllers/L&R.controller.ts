import { Request, Response } from "express";
import TOKEN from "../utils/token";
import _user, { UserDocument } from "../models/user.model";
import otpGenrator from "../utils/otpGenrator";
import crypto from "crypto";

// register api for emp
const register = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, name } = req.body;
  if (!email || !password || !confirmPassword || !name) {
    return res
      .status(400)
      .json({ message: "please fill all detail", code: res.statusCode });
  }
  else {
    // hasing password
    const newUser = new _user({
      email,
      password,
      name,
    })
    try {
      const token = await TOKEN.getToken(email);
      // genrate refresh token
      const refreshToken = await TOKEN.refreshToken(email);
      await newUser.save();
      // user created
      return res.status(201).json({
        message: "account created!",
        token,
        user: {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        },
        refreshToken,
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
  console.log(email, password);
  console.log('\t\n', req.body)
  if (!email || !password) {
    return res.status(401).json({
      message: "please fill all detail",
      code: res.statusCode,
    });
  }
  const user: any = await _user.findOne({ email })
  req.session.user = user

  console.log('testing:::', req.session.user)
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
      // genrate token
      const token = await TOKEN.getToken(email);
      // genrate refresh token
      const refreshToken = await TOKEN.refreshToken(email);
      // send data to client
      return res.status(200).json({
        message: "logged in",
        data: {
          name: user.name,
          email: user.email,
          role: user.role
        },
        accessToken: token,
        refreshToken,
        code: res.statusCode,
      });
    }
  }
};

// logout api for emp

// work on the logout api emprove it
const logout = async (req: Request, res: Response) => {
  try {
    const token = crypto.randomBytes(20).toString("hex");
    const destroyToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    res.set("newtoken", destroyToken);
    console.log(req.headers);
    return res
      .status(200)
      .json({ message: "you are logged out", token: destroyToken });
  } catch (error) {
    return res.status(200).json({ message: "server error please try again" });
  }
};

// change password for local emp
const updatePassword = async (req: Request, res: Response) => {
  const id: any = req.session.user;
  console.log('ID------', id?._id)
  const { password, oldPassword } = req.body;
  // find user with this id
  const user = await _user.findById(id);
  console.log('CURRENT USER: ', user)
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
  forgotPassword,
};

export default module;
