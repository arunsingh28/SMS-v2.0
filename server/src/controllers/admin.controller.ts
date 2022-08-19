import { Request, Response } from "express";
import TOKEN from "../utils/token";
import _admin from "../models/user.model";

const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = await TOKEN.getToken(username);
  const isUser = await _admin.findOne({ email: username });
  if (isUser) {
    const isMatch = await isUser.comparePassword(password);
    if (isMatch == true) {
      return res.status(200).json({
        message: "Logged in",
        type: "success",
        token,
      });
    } else {
      return res.status(201).json({
        message: "Invalid Credentials",
        type: "error",
      });
    }
  } else {
    return res.status(201).json({
      message: "Email not exist",
      type: "error",
    });
  }
};

const Register = async (req: Request, res: Response) => {
  const { email, password, name, role, } = req.body;
  const newAdmin = new _admin({
    password,
    name,
    email,
    role
  });
  try {
    if (!email || !password || !name || !role) {
      return res.status(203).json({
        message: "Please fill all fields",
        type: "error",
      });
    }
    const token = await TOKEN.getToken(email);
    const user = await newAdmin.save();
    return res.status(200).json({
      message: "Account Created.",
      user,
      token,
      type: "success",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(203).json({
        message: "Email already exist" || error.message,
        type: "error",
      });
    }
    return res.status(501).json({
      message: "server error " + error.message,
      code: res.statusCode,
      type: "error",
    });
  }
};

const AccountTerminate = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (code === "sms7894") {
    const isUser = await _admin.findOneAndDelete(email);
    if (isUser === null) {
      return res.json({ message: "Account not exist.", type: "error" });
    } else {
      return res.json({ message: "Account deleted.", type: "success" });
    }
  } else {
    return res.status(203).json({
      message: "Invalid Code.",
      type: "error",
    });
  }
};

export default { Login, Register, AccountTerminate };
