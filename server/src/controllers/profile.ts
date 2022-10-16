import { Request, Response } from "express";
import _user from '../models/user.model'

const Detail = async (req: Request, res: Response) => {
    const id = req.session.user?._id
    const usr = await _user.findById(id).exec()
    return res.json(usr)
}

export default { Detail }