import { Request, Response, NextFunction } from 'express'
import _notification, { Inotification } from '../models/notification.model'
import _user from '../models/user.model'


const sendAllNotification = async (req: Request, res: Response, next: NextFunction) => {
    // send the notification db data
    const sendTo: Inotification | any = req.session.user?.email
    console.log(sendTo)
    const notication = await _notification.find({ sendTo }).exec()
    const time = notication.map(i => i.time)
    return res.status(200).json({ notication })
}

export default { sendAllNotification }


export const registerNewNotification = (message: string, type: string, send: string) => {
    // reigster new notificaiton
    const newNotification = new _notification({
        notificationMessage: message,
        type: type,
        sendTo: send
    })
    newNotification.save().catch(err => console.log(err))
}