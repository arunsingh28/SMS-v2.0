import { Request, Response } from 'express'
import _user, { UserDocument } from '../models/user.model'
import deleteObject from '../utils/aws'





const addProfile = async (req: Request, res: Response) => {
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
    const data = {
        location, key
    }
    // if any error happen 
    if (isUpload === false) {
        return res.status(500).json({ message: 'server error try again', code: res.statusCode })
    }
    return res.status(200).json({ message: 'image uploaded', data, code: res.statusCode })
}









const removeProfile = async (req: Request, res: Response) => {
    const id = req.session.user
    const user = await _user.findById(id)
    const key = (<any>user).profile[0]?.key
    // if there is not image to delete
    if (!key) {
        return res.status(400).json({ message: 'Please upload profile image', code: res.statusCode })
    }
    const isDelete = await deleteObject(key)
        .then(async () => {
            await _user.updateOne({ _id: id }, {
                $pull: {
                    profile: {
                        key: key
                    }
                }
            }).catch(() => false)
        })
        .catch(() => false)
    if (isDelete === false) {
        return res.status(203).json({ message: 'server error try again', code: res.statusCode })
    } else {
        return res.status(200).json({ message: 'Profile Image delete.', code: res.statusCode })
    }
}





const updateProfile = async (req: Request, res: Response) => {
    const id = req.session.user
    const user = await _user.findById(id)
    const key = (<any>user).profile[0]?.key
}


const module = {
    addProfile, removeProfile, updateProfile
}

export default module