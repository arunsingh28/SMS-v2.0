import { Request, Response } from 'express'





const imageUpload = async (req: Request, res: Response) => {
    console.log(req.params.userID)
    console.log(req.file)
    

    
    return res.status(200).json({ message: 'nice to meet you', code: res.statusCode })
}



const module = {
    imageUpload
}

export default module