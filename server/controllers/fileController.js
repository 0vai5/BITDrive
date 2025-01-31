import File from "../models/fileModel.js";
import { fileUploadToCloudinary } from "../utils/fileUploadToCloudinary.js";
import { formatBytes } from "../utils/fileSize.js";
import User from "../models/userModel.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { CustomError } from "../utils/customError.js";

const fileController = {
  async createFile(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);

      if (!user) throw new CustomError("User not found", 404);

      const file = req.file;

      if (!file) throw new CustomError("Please upload a file", 400);

      const fileLocalPath = file.path;
      const fileLocalName = file.originalname;

      if (!fileLocalPath || !fileLocalName)
        throw new CustomError("File not uploaded", 400);

      const createdFile = await fileUploadToCloudinary(fileLocalPath);
      if (!createdFile) throw new CustomError("Error uploading file", 500);

      const newFile = await File.create({
        name: fileLocalName,
        accessibleLink: createdFile.url,
        size: formatBytes(createdFile.bytes),
        creator: userId,
      });

      user.files.push(newFile);
      user.storage = createdFile.bytes;
      await user.save();

      return res
        .status(201)
        .json(new ApiResponse("File created successfully", 201, newFile));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },

  async getFileByCategory(req, res) {
    try {
      const category = req.params.category;

      const files = await File.find({ category });

      if (!files) throw new CustomError("Files not found", 404);

      return res
        .status(200)
        .json(new ApiResponse(200, "Files retrieved successfully", files));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },
  async updateFile(req, res) {
    try {
      const { name } = req.body;
      const fileId = req.params.id;

      const file = await File.findById(fileId);

      if (!file) throw new CustomError("File not Found", 404);

      file.name = name;

      await file.save();

      return res
        .status(200)
        .json(new ApiResponse(200, "File updated Successfully", file));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },
  async deleteFile(req, res) {
    try {
      const fileId = req.params.id;

      const file = await File.findById(fileId);

      if (!file) throw new CustomError("File not found", 404);

      await file.remove();

      return res
        .status(200)
        .json(new ApiResponse(200, "File deleted successfully"));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },
  async shareFile(req, res) {
    try {
      const { email } = req.body;
      const fileId = req.params.id;

      const file = await File.findById(fileId);

      const user = await User.findOne({ email });

      if (!user) throw new CustomError("User not found", 404);

      user.accessibleFiles.push(file);

      await user.save();

      file.accessors.push(user);

      await file.save();

      return res
        .status(200)
        .json(new ApiResponse(200, "File shared Successfully"));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },
};

export default fileController;
