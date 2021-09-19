import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const newUser = mongoose.model("query", userSchema);

export default newUser;
