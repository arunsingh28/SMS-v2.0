import { Response, Request } from 'express'
import _user from '../models/user.model'
import awsInstance from '../utils/aws'

interface iFile {
    location: string,
    size: number,
    mimetype: string,
    fieldname: string,
    originalname: string,
    acl: string,
    key: string,
}

const addProfileImage = async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File & iFile;
    const id = req.session.user?._id;
    console.log(id)
    // save the location to database
    const user = await _user.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: "No user found", code: res.statusCode });
    } else {
        user.profile = {
            location: file.location,
            key: file.key
        }
        user.save().then(() => {
            return res.status(200).json({
                message: "image uploaded",
                images: file.location,
                code: res.statusCode
            });
        }).catch(err => {
            return res.status(400).json({ message: err.message, code: res.statusCode });
        })
    }
}

const deleteProfileImage = async (req: Request, res: Response) => {
    const id = req.session.user?._id
    const user = await _user.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: "No user found", code: res.statusCode });
    } else {
        const key = user.profile?.key
        if (key) {
            awsInstance.deleteObject(key).then((message) => {
                console.log('MESSAGE:', message)
                user.profile.location = null
                user.profile.key = null
                user.save().then(() => {
                    return res.status(200).json({ message: "image deleted", code: res.statusCode });
                })
            }).catch(err => {
                return res.status(400).json({ message: err.message, code: res.statusCode });
            })
        } else {
            return res.status(400).json({ message: "No image found", code: res.statusCode });
        }
    }
}

const updateProfileImage = async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File & iFile;
    const id = req.session.user?._id
    const user = await _user.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: "No user found" });
    } else {
        const key = user.profile?.key
        if (key) {
            awsInstance.deleteObject(key)
            user.profile.location = file.location
            user.profile.key = file.key
            user.save().then(() => {
                return res.status(200).json({
                    message: "image updated",
                    data: {
                        image: file.location
                    },
                    code: res.statusCode
                });
            }).catch(err => {
                return res.status(400).json({ message: err.message, code: res.statusCode });
            })
        } else {
            return res.status(400).json({ message: "No image found" });
        }
    }
}

export default { addProfileImage, deleteProfileImage, updateProfileImage }