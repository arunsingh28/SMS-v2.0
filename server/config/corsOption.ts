import allowedOrigin from "./allowedOrigin";

const corsOption = {
    origin: (origin: any, callback: any) => {
        // remove !origin it just for dev otherwise it allow all the other origin to access the route
        if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            const err = new Error('Not allowed by CORS')
            callback(err.message);
        }
    },
    optionSuccessStatus: 200,
}

export default corsOption;