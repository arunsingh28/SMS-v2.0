import multerS3 from 'multer-s3'
import multer from 'multer'
import AWS from 'aws-sdk'

declare var process: {
    env: {
        AWS_ACESS_KEY: string,
        AWS_SECRET_KEY: string
    }
}


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_SECRET_KEY,
    secretAccessKey: process.env.AWS_ACESS_KEY
})

export default function () {
    const upload = multer({

    })
}