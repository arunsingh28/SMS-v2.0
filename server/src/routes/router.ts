import register_contollers from '../controllers/L&R'
import { Express, Response, Request } from 'express'
import authorization from '../middleware/shield'
// import multer from 'multer'
// const upload = multer()
import upload from '../utils/uploader'


// base routes
export default function (router: Express) {
    router.post('/api/login',(<any>authorization),register_contollers.login)
    router.post('/api/register', register_contollers.register)
    router.get('/api/logout',register_contollers.logout)
}