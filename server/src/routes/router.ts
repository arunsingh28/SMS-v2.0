import register_contollers from '../controllers/L&R.controller'
import { Express } from 'express'
import authorization from '../middleware/shield.middleware'

// import multer from 'multer'
// const upload = multer()

import upload from '../utils/uploader'


// base routes
export default function (router: Express) {
    router.post('/api/login', <any>register_contollers.login)
    router.post('/api/register', register_contollers.register)
    router.get('/api/logout', register_contollers.logout)
    router.get('/all',register_contollers.all)
}