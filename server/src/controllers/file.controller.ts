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
    const id = req.params.id
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
                data: {
                    image: file.location
                },
                code: res.statusCode
            });
        }).catch(err => {
            return res.status(400).json({ message: err.message, code: res.statusCode });
        })
    }
}

const deleteProfileImage = async (req: Request, res: Response) => {
    const id = req.params.id
    const response = awsInstance.deleteObject(req.params.id)

}

export default { addProfileImage, deleteProfileImage }