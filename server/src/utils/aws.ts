import AWS from 'aws-sdk'
import env from '../../config/envConfig'
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new AWS.S3({
    accessKeyId: env.AWS_ACESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY
})

const upload = multer({
    storage: multerS3({
        s3,
        bucket: env.AWS_BUCKET_NAME,
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fielName: file.fieldname });
        },
        key: function (req, file, cb) {
            // file name in aws
            cb(null, Date.now().toString() + "-" + file.originalname);
        },
    }),
});

const deleteObject = async (key: string) => {
    await s3.deleteObject({
        Bucket: env.AWS_BUCKET_NAME,
        Key: key
    }, (err) => {
        if (err) throw err;
    })
}


export default { deleteObject, upload }