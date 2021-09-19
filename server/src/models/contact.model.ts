import mongoose from "mongoose";

const userQuerySchema = new mongoose.Schema({
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

const newQuery = mongoose.model("query", userQuerySchema);

export default newQuery;
