import { model, Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "you have to enter the title!"],
    minlength: [5, "{VALUE} must be at least 5 char!"],
  },
  description: {
    type: String,
    required: [true, "you have to enter the content!"],
    minlength: [5, "{VALUE} must be at least 5 char!"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "you have to enter the user!"],
  },
  image: {
    type: String,
    required: [true, "you have to enter the image!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Blog = model("blog", blogSchema);

export default Blog;
