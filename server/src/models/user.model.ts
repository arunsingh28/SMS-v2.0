import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export interface UserDocument extends mongoose.Document {
    comparePassword(candidatePassword: string): Promise<boolean>,
    destroyToken(): string
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    status: boolean,
    profile: {
        key: string,
        location: string
    }
}



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        minlength: 6
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    profile: [{
        key: String,
        location: String
    }]
}, { timestamps: true })



// hasing & salting  ==========================
userSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    const user = this as UserDocument
    if (!user.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hashSync(user.password, salt)
    user.password = hash
    return next()
})


// check password true || false? =================
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as UserDocument;
    console.log(user)
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)

}


userSchema.methods.destroyToken = async function () {
    const token = crypto.randomBytes(20).toString('hex')
    const destroyToken = crypto.createHash('sha256').update(token).digest('hex')
    return destroyToken
}




const user = mongoose.model<UserDocument>('user', userSchema)

export default user