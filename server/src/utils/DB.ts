import mongoose from "mongoose";
import env from '../../config/envConfig'


export const connectDB = async () => {
  await mongoose
    .connect(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(`****** Connection established to Database ********`);
    })
    .catch((err) => {
      console.log(
        `\n****** Connection not established to Database ********\n\n`,
        err
      );
    });
};
