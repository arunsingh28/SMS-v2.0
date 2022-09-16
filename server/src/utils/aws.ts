import AWS from 'aws-sdk'
import env from '../../config/envConfig'
import multer from "multer";
import multerS3 from "multer-s3";
import { v1 as uuidV1 } from 'uuid'
import sharp from 'sharp'

AWS.config.update({
    accessKeyId: env.AWS_ACCESS_ID,
    secretAccessKey: env.AWS_SECRET_KEY,
    region: 'ap-south-1',
    signatureVersion: 'v4',
    apiVersion: '2022-09-14'
})

// create random key for file
const v1options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date('2011-11-01').getTime(),
    nsecs: 5678,
};



const s3 = new AWS.S3()

const sharpify = async (originalFile: Buffer) => {
    const image = sharp(originalFile)
    const metadata = await image.metadata()
    const { width, height, format } = metadata
    const resizedImage = image.resize(200, 200, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
    })
    const resizedMetadata = await resizedImage.metadata()
    const { width: resizedWidth, height: resizedHeight } = resizedMetadata
    const data = await resizedImage.toBuffer()
    return {
        data,
        info: {
            original: {
                width,
                height,
                format,
            },
            resized: {
                width: resizedWidth,
                height: resizedHeight,
                format,
            },
        },
    }
}


const uploadImage = multer({
    storage: multerS3({
        s3,
        bucket: env.AWS_BUCKET_NAME,
        acl: "public-read",
        metadata: function (req, file, next) {
<<<<<<< HEAD
            console.log(req.files)
=======
            console.log('FILE:::metadata', file)
>>>>>>> 6f52e9240c035bcd4b03c97dc20fc5c8e5816a9b
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
    return new Promise((resolve, reject) => {
        s3.deleteObject({
            Bucket: env.AWS_BUCKET_NAME,
            Key: key,
        }, (err, data) => {
            if (err) {
                reject(err)
                console.log(err)
            } else {
                resolve(data)
                console.log(data)
            }
        })
    })
}

// creating object

export default { uploadImage, deleteObject }
