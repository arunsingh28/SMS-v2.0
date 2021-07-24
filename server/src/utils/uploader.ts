import multerS3 from 'multer-s3'
import multer from 'multer'
import AWS, { CodeBuild } from 'aws-sdk'

declare var process: {
    env: {
        AWS_ACESS_KEY: string,
        AWS_SECRET_KEY: string,
        AWS_BUCKET_NAME: string
    }
}

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_SECRET_KEY,
    secretAccessKey: process.env.AWS_ACESS_KEY
})

export default function () {
    multer({
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
}