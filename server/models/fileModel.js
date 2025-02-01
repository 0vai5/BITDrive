import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    accessibleLink: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    accessors: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
})

const File = mongoose.model("driveFiles", fileSchema);
export default File;