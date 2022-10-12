import mongoose from 'mongoose'
import { UserDocument } from './user.model'

export interface Inotification {
    time: Date
    type: string | null
    sendTo: UserDocument
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
    sendTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
})

const notification = mongoose.model('notification', notificationSchema)

export default notification