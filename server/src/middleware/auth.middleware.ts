import jwt from "jsonwebtoken";
import _user, { UserDocument } from "../models/user.model";
import { Response, Request, NextFunction } from "express";
import env from '../../config/envConfig'

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
  //toke not found 
  if (!token) {
    return res.status(401).json({
      message: "Token not found",
      code: res.statusCode,
      type: "error",
    });
  }
  try {
    console.table(token);
    const decoded = jwt.verify(token, env.JWT_SECRET_KEY1);
    const user: UserDocument | null = await _user.findOne({ email: (<any>decoded).id }).exec()
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
    // expire token
    return res.status(401).json({
      message: "Unauthorized",
      error: (error as JwtError).message,
      code: res.statusCode,
    });
  }
};

export default authorization;
