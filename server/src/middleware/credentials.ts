import allowedOrigin from "../../config/allowedOrigin";
import { Request, Response, NextFunction } from "express";


const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin: any = req.headers.origin;

    // if (allowedOrigin.indexOf(origin) !== -1 || !origin) {

    if (allowedOrigin.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    next()
}

export default credentials;

