interface ErrorResponse {
    message?: string;
}


const errorHandler = (server: any) => {
    process.on("unhandledRejection", (err: ErrorResponse, promise) => {
        console.log(`unhanle Rejection fail: ${err.message}`);
        process.on('uncaughtException', (err: ErrorResponse) => {
            console.log(`Exception Error: ${err.message}`);
            server.close(() => {
                process.exit(1);
            });
        })
    });

}

export default errorHandler;