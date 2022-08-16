import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  comparePassword(userPassword: string): Promise<boolean>;
  encryptPassword(newPassword: string): Promise<string>;
  name: string;
  email: string;
  password: string;
  role: string;
}

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'email already exist'],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "admin"
  }
});

// hasing & salting  ==========================
adminSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  const user = this as UserDocument;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

adminSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const newAdmin = mongoose.model<UserDocument>("admin", adminSchema);

export default newAdmin;
