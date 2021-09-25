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
    });
  } catch (error) {
    return res.status(501).json({
      message: "account not created",
      code: res.statusCode,
    });
  }
};

const AccountTerminate = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (code === "sms7894") {
    return res.json({ message: "ok" });
  }
};

export default { Login, Register, AccountTerminate };
