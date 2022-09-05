const configEnv = {
    JWT_SECRET_KEY1: 'asfasfd',
    JWT_SECRET_KEY2: 'asfasfd',
    JWT_SECRET_KEY3: 'asfasfd',


    JWT_EXPIRE_TIME: "40s",
    JWT_REFRESH_EXPIRE_TIME: "5m",
    JWT_FORGOT_PASSWORD_EXPIRE_TIME: "2m",


    AWS_SECRET_KEY: "",
    AWS_BUCKET_NAME: "",
    AWS_ACESS_KEY: "",

    MONGODB_URI: "mongodb+srv://arun:1234@cluster0.t3qon.mongodb.net/IPS-V2-0?retryWrites=true&w=majority",


    MAIL_DOMAIN: "sms.798361@hotmail.com",
    MAIL_DOMAIN_PASS: "#Apple1397000",
    MAIL_CREATE: 200,
    MAIL_RESETPASSWORD: 401,
    MAIL_FORGOTPASSWORD: 404,
    MAIL_SUCCESS: 500,
    MAIL_FORGOTPASSWORD_SUCCESS: 405,
    MAIL_MESSAGE: 201,


    MAILGUN_API_KEY: "",
    MAILGUN_DOMAIN: "",
}

export default configEnv