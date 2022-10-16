import mongoose from 'mongoose'
import { UserDocument } from './user.model'

export interface Inotification {
    time: Date
    type: string | null
    sendTo: UserDocument
    notificationMessage: string
}

const notificationSchema = new mongoose.Schema({
    time: {
        type: Number,
        default: Date.now()
    },
    notificationMessage: {
        type: String
    },
    type: {
        type: String,
    },
    sendTo: {
        type: String,
    }
})

const notification = mongoose.model<Inotification>('notification', notificationSchema)

export default notification