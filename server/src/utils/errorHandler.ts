interface ErrorResponse {
    message?: string;
}
import { Express, Request, Response } from 'express'
import Logger from '../middleware/logEvents.middleware'

const errorHandler = (server: any, app: Express) => {
    app.use('*', (req: Request, res: Response) => {

    })
    process.on("unhandledRejection", (err: ErrorResponse) => {
        Logger.logEvents(err.message, 'UnhandleReject.txt')
        console.log(`unhanle Rejection fail: ${err}`);
        app.use('*', (req: Request, res: Response) => {
            res.status(500).json({ message: "Maintenance work going on" })
        })
        process.on('uncaughtException', (err: ErrorResponse) => {
            Logger.logEvents(err.message, 'uncaughtException.txt')
            console.log(`Exception Error: ${err}`);
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