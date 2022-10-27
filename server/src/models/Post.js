import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  category: String,
  content: String,
  image: String,
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

export default mongoose.model("Post", postSchema);
