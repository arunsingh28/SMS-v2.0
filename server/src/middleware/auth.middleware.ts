import jwt from "jsonwebtoken";
import _user from "../models/user.model";
import { Response, Request, NextFunction } from "express";
import env from '../../config/envConfig'
declare var process: {
  env: {
    JWT_SECRET_KEY1: string;
  };
};

interface JwtError {
  name: string;
  message: string;
}

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(404).json({
      message: "not authorize to access content",
      code: res.statusCode,
      type: "error",
    });
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET_KEY1);
    const user: any = await _user.findOne({ email: (<any>decoded).id });
    if (!user) {
      return res.status(203).json({
        message: "No user found",
        code: res.statusCode,
        type: "error",
      });
    } else {
      // save this user to session
      req.session.user = user
      next();
    }
  } catch (error) {
    return res.status(401).json({
      message: "Not authorize to access this route ",
      error: (error as JwtError).message,
      code: res.statusCode,
    });
  }
};

export default authorization;
