import mongoose, { Schema } from "mongoose";

const shareFilesSchema = new Schema(
  {
    senderID: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    recipientID: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    file: {
      ref: "Files",
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const shareFiles = mongoose.model("shareFiles", shareFilesSchema);
export default shareFiles;
