import AWS from 'aws-sdk'
import env from '../../config/envConfig'
import multer from "multer";
import multerS3 from "multer-s3";
import { v1 as uuidV1 } from 'uuid'

AWS.config.update({
    accessKeyId: env.AWS_ACCESS_ID,
    secretAccessKey: env.AWS_SECRET_KEY,
    region: 'ap-south-1',
    signatureVersion: 'v4',
})

// create random key for file
const v1options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date('2011-11-01').getTime(),
    nsecs: 5678,
};



const s3 = new AWS.S3()

const uploadImage = multer({
    storage: multerS3({
        s3,
        bucket: env.AWS_BUCKET_NAME,
        acl: "public-read",
        metadata: function (req, file, next) {
            next(null, { fielName: file.fieldname });
        },
        key: function (req, file, next) {
            const ext = file.originalname.split('.').pop()
            // name of object
            next(null, uuidV1(v1options).toString() + file.fieldname + uuidV1(v1options).toString() + '.' + ext);
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


export default { uploadImage, deleteObject }