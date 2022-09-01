import AWS from 'aws-sdk'
import env from '../../config/envConfig'

const s3 = new AWS.S3({
    accessKeyId: env.AWS_ACESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY
})

const deleteObject = async (key: string) => {
    await s3.deleteObject({
        Bucket: env.AWS_BUCKET_NAME,
        Key: key
    }, (err) => {
        if (err) throw err;
    })
}


export default deleteObject