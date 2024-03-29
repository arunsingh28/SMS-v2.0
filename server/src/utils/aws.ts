import AWS from 'aws-sdk'
import env from '../../config/envConfig'
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuidV4 } from 'uuid'


AWS.config.update({
    accessKeyId: env.AWS_ACCESS_ID,
    secretAccessKey: env.AWS_SECRET_KEY,
    region: 'ap-south-1',
    signatureVersion: 'v4',
    apiVersion: '2022-09-14'
})

const s3 = new AWS.S3()

const uploadObject = multer({
    storage: multerS3({
        s3,
        bucket: env.AWS_BUCKET_NAME,
        acl: "public-read",
        metadata: function (req, file, next) {
            next(null, { fielName: file.fieldname });
        },
        key: function (req, file, next) {
            // name of object
            next(null, uuidV4() + file.originalname);
        },
    }),
});

const deleteObject = (key: string) => {
    return new Promise((resolve, reject) => {
        s3.deleteObject({
            Bucket: env.AWS_BUCKET_NAME,
            Key: key,
        }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// creating object

export default { uploadObject, deleteObject }
