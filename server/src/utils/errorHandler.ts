interface ErrorResponse {
    message?: string;
}

import Logger from '../middleware/logEvents.middleware'

const errorHandler = (server: any) => {

    process.on("unhandledRejection", (err: ErrorResponse) => {
        Logger.logEvents(err.message, 'UnhandleReject.txt')
        console.log(`unhanle Rejection fail: ${err}`);
        process.on('uncaughtException', (err: ErrorResponse) => {
            Logger.logEvents(err.message, 'uncaughtException.txt')
            console.log(`Exception Error: ${err}`);
            server.close(() => {
                process.exit(1);
            });
        })
    });

}

export default errorHandler;