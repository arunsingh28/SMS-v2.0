import { Request, Response, NextFunction } from 'express'
import getToken from '../utils/token'
import _user from '../models/user.model'

// import sessionID from '../middleware/error'

const logout = async (req: Request, res: Response) => {
    console.log(req.session.user)
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
    const user = req.session.user
    // console.log(req.session)
    return res.json({ message: 'logged in', data: user })
}










const LOGIN_API = {
    register, login, logout
}

export default LOGIN_API