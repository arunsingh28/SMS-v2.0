import mongoose from 'mongoose'

declare var process: {
    env: {
        MONGODB_URI: string
    }
}

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    }).then(() => {
        console.log(`****** Connection established to Database ********`)
    }).catch(err => {
        console.log(`\n****** Connection not established to Database ********\n\n`, err)
    })
}