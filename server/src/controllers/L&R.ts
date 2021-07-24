import { Request, Response, NextFunction } from 'express'

import jwt from "jsonwebtoken";
import _user from '../models/user.model'
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

const logout = async(req: Request,res: Response)=>{
    const user = (<any>req).user
    console.log(user)
}

const register = async (req: Request, res: Response) => {
    const { email, password, confirmPassword, name } = req.body
    if (!email || !password || !confirmPassword || !name) {
        return res.status(200).json({ message: 'please fill all detail' })
    }
    if (password != confirmPassword) {
        return res.status(201).json({ message: 'password not matching' })
    }
    else {
        // something went wrong check it tommorow
        const newUser = new _user({
            email, password, name
        })
        try {
            const token = await getToken(email)
            await newUser.save()
            return res.status(200).json({ message: 'account created!', data: newUser, token })
        } catch (error) {
            return res.status(201).json({ message: 'account not created', data: error.message })
        }
    }
}


const login = async (req: Request, res: Response) => {
    const user = (<any>req).user
    return res.json({message:'logged in',data:user})
}










const LOGIN_API = {
    register,login,logout
}

export default LOGIN_API