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
    // save the location to database
    const user = await _user.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: "No user found", code: res.statusCode });
    } else {
        const oldKey: any = user.profile?.key
        awsInstance.deleteObject(oldKey)
        user.profile = {
            location: file.location,
            key: file.key
        }
        user.save().then(() => {
            return res.status(200).json({
                message: "image uploaded",
                data: file.location,
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
                    return res.status(200).json({
                        message: "image deleted",
                        data: "https://sms-api-1.s3.ap-south-1.amazonaws.com/Screenshot+2022-09-19+011305.jpg",
                    });
                })
            }).catch(err => {
                return res.status(400).json({ message: err.message });
            })
        } else {
            return res.status(400).json({ message: "No image found" });
        }
    }
}


export default { addProfileImage, deleteProfileImage }