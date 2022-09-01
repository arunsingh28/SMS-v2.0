import jwt from 'jsonwebtoken'
import env from '../../config/envConfig'

// expire in 30s
const getToken = (id: String) => {
    return jwt.sign({ id }, env.JWT_SECRET_KEY1, {
        expiresIn: env.JWT_EXPIRE_TIME
    })
}

// expire in 5m
const refreshToken = (id: string) => {
    return jwt.sign({ id }, env.JWT_SECRET_KEY2, {
        expiresIn: env.JWT_REFRESH_EXPIRE_TIME
    })
}

// expire in 3m
const ForgotToken = (id: string) => {
    // using env value from mailType file
    return jwt.sign({ id }, env.JWT_SECRET_KEY3, {
        expiresIn: env.JWT_FORGOT_PASSWORD_EXPIRE_TIME
    })
}

const getForgotTokenDetail = () => {

}

export default { getToken, refreshToken, ForgotToken, getForgotTokenDetail }