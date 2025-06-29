import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SpeakApp",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const CommentModel =
  mongoose.models.Comment || mongoose.model("Comment", Schema);

export default CommentModel;
