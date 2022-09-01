import jwt from 'jsonwebtoken'
import { mailType } from '../../config/mailTypes'

export declare var process: {
    env: {
        JWT_SECRET_KEY1: string,
        JWT_SECRET_KEY2: string,
        JWT_SECRET_KEY3: string,
        JWT_EXPIRE_TIME: number,
        JWT_REFRESH_EXPIRE_TIME: number,
        JWT_FORGOT_PASSWORD_EXPIRE_TIME: number
    }
}

// expire in 30s
const getToken = (id: String) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY1, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
}

// expire in 5m
const refreshToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY2 ?? 'ad', {
        expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME
    })
}

// expire in 3m
const ForgotToken = (id: string) => {
    // using env value from mailType file
    return jwt.sign({ id }, mailType.JWT_SECRET_KEY3, {
        expiresIn: mailType.JWT_FORGOTPASSWORD_EXPIRE_TIME
    })
}

const getForgotTokenDetail = () => {

}

export default { getToken, refreshToken, ForgotToken, getForgotTokenDetail }