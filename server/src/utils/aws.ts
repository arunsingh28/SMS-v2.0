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

const deleteObject = async (key: string) => {
    await s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    }, (err) => {
        if (err) throw err;
    })
}


export default deleteObject