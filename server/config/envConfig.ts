const configEnv = {
    JWT_SECRET_KEY1: 'asfasfd',
    JWT_SECRET_KEY2: 'asfasfd',
    JWT_SECRET_KEY3: 'asfasfd',


    JWT_EXPIRE_TIME: "20m",
    JWT_REFRESH_EXPIRE_TIME: "30m",
    JWT_FORGOT_PASSWORD_EXPIRE_TIME: "5m",


    AWS_ACCESS_ID: "AKIAQFWDAU63MBUG3Z6G",
    AWS_SECRET_KEY: "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",
    AWS_BUCKET_NAME: "sms-api-1",

    MONGODB_URI: "mongodb+srv://arun:1234@cluster0.t3qon.mongodb.net/IPS-V2-0?retryWrites=true&w=majority",


    MAIL_DOMAIN: "sms.798361@hotmail.com",
    MAIL_DOMAIN_PASS: "#Apple1397000",
    MAIL_CREATE: 200,
    MAIL_RESETPASSWORD: 401,
    MAIL_FORGOTPASSWORD: 404,
    MAIL_SUCCESS: 500,
    MAIL_FORGOTPASSWORD_SUCCESS: 405,
    MAIL_MESSAGE: 201,
    MAIL_ACCOUNTVERIFICATION: 202,


    MAILGUN_API_KEY: "",
    MAILGUN_DOMAIN: "",



    // twilio api
    T_ACCOUNTSID: "ACf0cabe3715c461b59ac9dd8e8697c341",
    T_AUTH_TOKEN: "68dfd759fc44ea509d13d1c4444a7352"

}

export default configEnv