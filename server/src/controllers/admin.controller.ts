import { Request, Response } from "express";
import getToken from "../utils/token";
import _admin from "../models/admin.model";

const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = await getToken(username);

  res.json({ token });
};

const Register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const newAdmin = new _admin({
    password,
    name,
    email,
  });
  try {
    const token = await getToken(email);
    const user = await newAdmin.save();
    return res.status(200).json({
      message: "Account Created.",
      user,
      token,
      type: "success",
    });
  } catch (error) {
    return res.status(501).json({
      message: "Account not created",
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
