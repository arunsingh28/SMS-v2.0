import jwt from 'jsonwebtoken'


declare var process: {
    env:{
        JWT_SECRET_KEY: string,
        JWT_EXPIRE_TIME: number
    }
}

const getToken = async (id: String) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
}


export default getToken