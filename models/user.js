import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "you have to enter the name!"],
    minlength: [5, "{VALUE} must be at least 5 char!"],
  },
  email: {
    type: String,
    required: [true, "you have to enter the email!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "you have to enter the password!"],
    minlength: [8, "{VALUE} must be at least 8 char!"],
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = model("user", userSchema);

export default User;
