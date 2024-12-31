import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const fileUploadToCloudinary = async (fileLocalPath) => {
  if (!fileLocalPath) return null;

  try {
    const uploadedFile = await cloudinary.uploader.upload(fileLocalPath);
    console.log(uploadedFile.url, "File Uploaded Url");
    fs.unlinkSync(fileLocalPath);
  } catch (error) {
    console.log(error, "error uploading file");
    fs.unlinkSync(fileLocalPath);
    return null;
  }
};
