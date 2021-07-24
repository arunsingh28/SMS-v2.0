import jwt, { JwtPayload } from 'jsonwebtoken'
import _user from '../models/user.model'
import { Response, Request, NextFunction } from 'express'

interface ig extends Request{
    user: any
}

declare var process: {
    env: {
        JWT_SECRET_KEY: string
    }
}

const authorization = async (req: ig, res: Response, next: NextFunction) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'not authorize to access content', code: req.statusCode })
    } 
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await _user.findOne( { email: (<any>decoded).id })

        if (!user) {
            return res.status(404).json({ message: 'No user found ', code: req.statusCode })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Not authorize to access this route ', error, code: req.statusCode })
    }
}

export default authorization;