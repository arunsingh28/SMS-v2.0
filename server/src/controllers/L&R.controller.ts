import { Request, Response } from "express";
import TOKEN from "../utils/token";
import _user from "../models/user.model";
import crypto from "crypto";

// register api for emp
const register = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, name } = req.body;
  if (!email || !password || !confirmPassword || !name) {
    return res
      .status(400)
      .json({ message: "please fill all detail", code: res.statusCode });
  }
  if (password != confirmPassword) {
    return res
      .status(401)
      .json({ message: "password not matching", code: res.statusCode });
  } else {
    // hasing password
    const newUser = new _user({
      email,
      password,
      name,
    }).populate("data", 'password')
    try {
      const token = await TOKEN.getToken(email);
      // genrate refresh token
      const refreshToken = await TOKEN.refreshToken(email);

      await newUser.save();
      return res.status(200).json({
        message: "account created!",
        data: newUser,
        token,
        refreshToken,
        code: res.statusCode,
      });
    } catch (error: any) {
      if (error.code == 11000) {
        return res.status(203).json({
          message: "User alredy registered",
          code: res.statusCode,
        });
      }
      return res.status(501).json({
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
  if (!email || !password) {
    return res.status(401).json({
      message: "please fill all detail",
      code: res.statusCode,
    });
  }
  const user = await _user.findOne({ email }).populate("password")
  // if user not found
  if (!user) {
    return res
      .status(203)
      .json({ message: "User not found", code: res.statusCode });
  } else {
    // if (user?.status === true) {
    //   return res.status(203).json({
    //     message: "user alredy logged in diffrent device",
    //     code: res.statusCode,
    //   });
    // }
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
      return res.json({
        message: "logged in",
        data: user,
        token,
        refreshToken,
        code: res.statusCode,
      });
    }
  }
};

// logout api for emp
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
  const id = req.session.user;
  const { password, confirmPassword, oldPassword } = req.body;
  // find user with this id
  const user = await _user.findById(id);
  if (!password || !confirmPassword || !oldPassword) {
    return res
      .status(400)
      .json({ message: "fill all detail", code: res.statusCode });
  }
  try {
    if (password != confirmPassword) {
      return res
        .status(401)
        .json({ message: "password not matching", code: res.statusCode });
    } else {
      // compare old-password with client-password
      const isMatch = await (<any>user).comparePassword(oldPassword);
      if (isMatch === false) {
        return res
          .status(401)
          .json({ message: "Invalid credinitals", code: res.statusCode });
      } else {
        const hash = await user?.encryptPassword(password);
        // save to db
        await user
          ?.updateOne({
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
    }
  } catch (error) { }
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
      // if user found in db

      /** 
             * send otp to registered mail
             * reapir this code for mail cause nodemail not working with it 
            await mailGun('arun.singh28aug@gmail.com','forgot password','hi this testing')
            */

      /**
       *@override send otp to register mobile number
       *
       */
      return res
        .status(500)
        .json({ message: "server error v1.0 dont try again." });
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
