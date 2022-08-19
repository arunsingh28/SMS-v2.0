import session from 'express-session'
import { Express } from 'express'

declare module 'express-session' {
    interface SessionData {
        user: string
    }
}

export default function (app: Express) {
    app.use(session({
        secret: 'sce',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, maxAge: 60000 }
    }))

    app.set('trust proxy', 1)

}


