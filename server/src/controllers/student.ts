import { Request, Response } from "express";
import _user from '../models/user.model'

const Detail = async (req: Request, res: Response) => {
  const usr = await _user.find().exec()
  return res.json(usr)
};

const CountUser = async (req: Request, res: Response) => {
  const count = await _user.count().exec()
  return res.json({ count })
}



export default { Detail, CountUser };
