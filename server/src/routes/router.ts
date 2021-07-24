import login_contollers from '../controllers/L&R'
import { Express } from 'express'

// base routes
export default function (loginAPI: Express) {
    loginAPI.post('/api/login', login_contollers.login)
    loginAPI.post('/api/register', login_contollers.register)
}