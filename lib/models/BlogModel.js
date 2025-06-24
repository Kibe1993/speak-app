import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

const BlogModel =
  mongoose.models.SpeakApp || mongoose.model("SpeakApp", Schema, "SpeakApp");

export default BlogModel;
