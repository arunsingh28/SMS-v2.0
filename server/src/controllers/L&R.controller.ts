import { Request, Response, NextFunction } from 'express'
import getToken from '../utils/token'
import _user from '../models/user.model'
import bcrypt from 'bcrypt'





// import sessionID from '../middleware/error'

const logout = async (req: Request, res: Response) => {
    console.log(req.session.user)
}

const register = async (req: Request, res: Response) => {
    const { email, password, confirmPassword, name } = req.body
    if (!email || !password || !confirmPassword || !name) {
        return res.status(400).json({ message: 'please fill all detail', code: res.statusCode })
    }
    if (password != confirmPassword) {
        return res.status(401).json({ message: 'password not matching', code: res.statusCode })
    }
    else {
        // hasing password
        const newUser = new _user({
            email, password, name
        })
        try {
            const token = await getToken(email)
            await newUser.save()
            return res.status(200).json({ message: 'account created!', data: newUser, token, code: res.statusCode })
        } catch (error) {
            return res.status(501).json({ message: 'account not created', data: error.message, code: res.statusCode })
        }
    }
}


const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    console.log(email, password)
    if (!email || !password) {
        return res.status(400).json({ message: 'please fill all detail', code: res.statusCode })
    }
    const user = await _user.findOne({ email })
    // if user not found
    if (!user) {
        return res.status(203).json({ message: 'User not found', code: res.statusCode })
    } else {
        if (user?.status === true) {
            return res.status(203).json({ message: "user alredy logged in diffrent device", code: res.statusCode })
        }
        const isMatch = await user.comparePassword(password)
        console.log(isMatch)
        if (isMatch === false) {
            return res.status(401).json({ message: 'Invalid credinitals', code: res.statusCode })
        } else {
            // genrate token
            const token = await getToken(email)
            return res.json({ message: 'logged in', data: user, token, code: res.statusCode })
        }
    }
}



const all = async (req: Request, res: Response) => {
    const users = await _user.find()
    return res.json({data:users})
}






const LOGIN_API = {
    register, login, logout,all
}

export default LOGIN_API