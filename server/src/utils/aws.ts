import AWS from 'aws-sdk'
import env from '../../config/envConfig'
import multer from "multer";
import multerS3 from "multer-s3";

AWS.config.update({
    accessKeyId: env.AWS_ACCESS_ID,
    secretAccessKey: env.AWS_SECRET_KEY,
    region: 'ap-south-1',
    signatureVersion: 'v4',
})

const s3 = new AWS.S3()

const upload = multer({
    storage: multerS3({
        s3,
        bucket: env.AWS_BUCKET_NAME,
        acl: "public-read",
        metadata: function (req, file, next) {
            next(null, { fielName: file.fieldname });
        },
        key: function (req, file, next) {
            // file name in aws
            next(null, Date.now().toString() + "-" + file.originalname);
        },
    }),
});

const deleteObject = (key: string) => {

    s3.deleteObject({
        Bucket: env.AWS_BUCKET_NAME,
        Key: key,
    }, (err, data) => {
        if (err) {
            console.log(err)
            // reject(err)
        } else {
            console.log(data)
            // resolve(data)
        }
    })

}


export default { deleteObject, upload }