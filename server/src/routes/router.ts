import register_contollers from '../controllers/L&R.controller'
import user_contollers from '../controllers/user.private'
import { Express } from 'express'
import authorization from '../middleware/shield.middleware'


import multer from 'multer'
import multerS3 from 'multer-s3'
import AWS from 'aws-sdk'

declare var process: {
    env: {
        AWS_ACESS_KEY: string,
        AWS_SECRET_KEY: string,
        AWS_BUCKET_NAME: string
    }
}


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})


const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fielName: file.fieldname })
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname)
        }
    })
})





// base routes
export default function (router: Express) {
    router.post('/api/login', register_contollers.login)
    router.post('/api/register', register_contollers.register)
    router.get('/api/logout', register_contollers.logout)


    // private routes
    router.post('/api/user/:userID', authorization, upload.single('file'), user_contollers.imageUpload)
}