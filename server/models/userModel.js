import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  storage: {
    type: Number
  },
  files: [
    {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
  ],
  accessibleFiles: [
    {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
  ],
});

const User = mongoose.model("driveUser", userSchema);

export default User;
