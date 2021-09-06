import { Request, Response } from "express";

const Detail = async (req: Request, res: Response) => {
  console.log(req.body);
};

export default { Detail };
