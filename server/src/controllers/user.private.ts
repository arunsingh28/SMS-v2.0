import { Request, Response } from 'express'
import _user from '../models/user.model'




const imageUpload = async (req: Request, res: Response) => {
    const id = req.session.user
    const file = req.file
    const key = (<any>file).key
    const location = (<any>file).location

    // find by id and update the profile
    const isUpload = await _user.findOneAndUpdate({ _id: id }, {
        // set recent image 
        $set: {
            profile: {
                key,
                location
            }
        }
    }).catch(() => false)
    // if any error happen 
    if (isUpload === false) {
        return res.status(500).json({ message: 'server error try again', code: res.statusCode })
    }
    return res.status(200).json({ message: 'nice to meet you', code: res.statusCode })
}



const module = {
    imageUpload
}

export default module