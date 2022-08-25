import jwt from 'jsonwebtoken'


declare var process: {
    env: {
        JWT_SECRET_KEY1: string,
        JWT_SECRET_KEY2: string,
        JWT_EXPIRE_TIME: number,
        JWT_REFRESH_EXPIRE_TIME: number
    }
}

const getToken = async (id: String) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY1, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
}

const refreshToken = async (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY2, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME
    })
}

export default { getToken, refreshToken }