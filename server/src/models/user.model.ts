import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


export interface UserDocument extends mongoose.Document {
    comparePassword(candidatePassword: string): Promise<boolean>,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    status: boolean,
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
    }
    // profile: {
    //     type: String,
    //     required: true
    // }
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





const user = mongoose.model<UserDocument>('user', userSchema)

export default user