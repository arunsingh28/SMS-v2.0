import allowedOrigin from "../../config/allowedOrigin";
import { Request, Response, NextFunction } from "express";


const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin: any = req.headers.origin;
    if (allowedOrigin.includes(origin)) {
        res.header('Access-Control-Allow-Origin',origin)
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    next()
}

export default credentials;

