import session from 'express-session'
import { Express } from 'express'
import { UserDocument } from '../models/user.model'

declare module 'express-session' {
    interface SessionData {
        user: UserDocument
    }
}

export default function (app: Express) {
    app.use(session({
        secret: 'sce',
        proxy: true,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 }
    }))

    app.set('trust proxy', 1)

}


