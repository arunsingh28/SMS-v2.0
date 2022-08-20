import allowedOrigin from "./allowedOrigin";

const corsOption = {
    origin: (origin: any, callback: any) => {
        console.log(origin, '\n')
        if (allowedOrigin.indexOf(origin)) {
            callback(new Error('Not allowed by CORS'));
        } else {
            callback(null, true);
        }
    },
    optionSuccessStatus: 200,
}

export default corsOption;