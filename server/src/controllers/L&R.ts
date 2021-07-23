import jwt from "jsonwebtoken";
import _user from '../models/user'


declare var process: {
    env: {
        JWT_SECRET_KEY: string,
        JWT_EXPIRE_TIME: number
    }
}

// creating jsonwebtoken
const getToken = async (id: String) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
}


const login = async (req: any, res: any, next: any) => {
    const { id } = req.body
    console.log(req.headers)
    if (!id) {
        return res.json({ message: 'please add id' }).status(200)
    } else {
        const token = await getToken(id)
        console.log(token)
        return res.json({ message: 'hello', token })
    }
}


const register = async (req: any, res: any, next: any) => {
    const { email, password, confirmPassword } = req.body
    if (!email || !password || !confirmPassword) {
        return res.status(200).json({ message: 'please fill all detail' })
    }
    if (password != confirmPassword) {
        return res.status(201).json({ message: 'password not matching' })
    }
    else {
        
        const newUser = new _user({
            email, password,
        })
    }

    return res.status(200).json({ email, password, confirmPassword })
}













const LOGIN_API = {
    login, register
}

export default LOGIN_API