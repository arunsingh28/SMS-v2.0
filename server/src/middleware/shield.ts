import jwt from 'jsonwebtoken'
import _user from '../models/user'


declare var process: {
    env: {
        JWT_SECRET_KEY: string
    }
}


const authorization = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return res.status(401).json({ message: 'not authorize to access content', code: req.statusCode })
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await _user.findById(decoded.id)

        if (!user) {
            return res.status(404).json({ message: 'No user found ', code: req.statusCode })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Not authorize to access this route ', code: req.statusCode })
    }
}