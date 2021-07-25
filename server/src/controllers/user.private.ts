import { Request, Response } from 'express'
import aws from '../utils/aws'
import multer from 'multer'



const imageUpload = async (req: Request, res: Response) => {
    console.log(req.params.userID)
    console.log(req.file)

    // start from here
    console.log('aws',)

    const file = await multer({
        storage: void aws()
    })

    console.log(file)


    return res.status(200).json({ message: 'nice to meet you', code: res.statusCode })
}



const module = {
    imageUpload
}

export default module