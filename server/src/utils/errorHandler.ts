interface ErrorResponse {
    message?: string;
}
import { Express, Request, Response } from 'express'
import Logger from '../middleware/logEvents.middleware'
import env from '../../config/envConfig'
import Mail from './nodeMailer'

const errorHandler = (server: any, app: Express) => {
    process.on("unhandledRejection", (err: ErrorResponse) => {
        Logger.logEvents(err.message, 'UnhandleReject.txt')
        console.log(`unhanle Rejection fail: ${err}`);
        Mail('arunsingh28aug.as@gmail.com', 1001, err.message, env.MAIL_4_LOG_ADMIN, '', '',)
        app.use('*', (req: Request, res: Response) => {
            res.status(500).json({ message: "Maintenance work going on" })
        })
        process.on('uncaughtException', (err: ErrorResponse) => {
            Logger.logEvents(err.message, 'uncaughtException.txt')
            console.log(`Exception Error: ${err}`);
            Mail('arunsingh28aug.as@gmail.com', 1001, err.message, env.MAIL_4_LOG_ADMIN, '', '',)
            app.use('*', (req: Request, res: Response) => {
                res.status(500).json({ message: "Maintenance work going on" })
            })
            server.close(() => {
                process.exit(1);
            });
        })
    });

}

export default errorHandler;