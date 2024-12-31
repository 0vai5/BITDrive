import File from "../models/fileModel.js";
import { fileUploadToCloudinary } from "../utils/fileUploadToCloudinary.js";
import { formatBytes } from "../utils/fileSize.js";
import User from "../models/userModel.js";

const fileController = {
  async createFile(req, res) {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId);

      if (!user)
        return res.status(404).json({ message: "User not found", status: 404 });

      const file = req.file;

      if (!file)
        return res
          .status(400)
          .json({ message: "Please upload a file", status: 400 });

      const fileLocalPath = file?.file[0]?.path;

      const fileLocalName = file?.file[0]?.filename;

      const createdFile = await fileUploadToCloudinary(fileLocalPath);

      if (!createdFile)
        return res
          .status(500)
          .json({ message: "Error uploading file", status: 500 });

      const newFile = new File({
        name: fileLocalName,
        url: createdFile.url,
        size: formatBytes(createdFile.bytes),
        creator: userId,
      });

      await newFile.save();

      await user.files.push(newFile);

      await user.save();

      return res.status(201).json({
        message: "File created successfully",
        status: 201,
        data: newFile,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: 500,
      });
    }
  },

  async createMultipleFiles(req, res) {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId);

      if (!user)
        return res.status(404).json({ message: "User not found", status: 404 });

      const files = req.files;

      if (!files)
        return res
          .status(400)
          .json({ message: "Please upload a file", status: 400 });

      const fileLocalPaths = files?.file.map((file) => file.path);

      const fileLocalNames = files?.file.map((file) => file.filename);

      const createdFiles = await Promise.all(
        fileLocalPaths.map((fileLocalPath) =>
          fileUploadToCloudinary(fileLocalPath)
        )
      );

      if (!createdFiles)
        return res
          .status(500)
          .json({ message: "Error uploading file", status: 500 });

      const newFiles = createdFiles.map((createdFile, index) => {
        return new File({
          name: fileLocalNames[index],
          url: createdFile.url,
          size: formatBytes(createdFile.bytes),
          creator: userId,
        });
      });

      console.log("New Files", newFiles);

      await File.insertMany(newFiles);

      await user.files.push(...newFiles);

      await user.save();

      return res.status(201).json({
        message: "Files created successfully",
        status: 201,
        data: newFiles,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: 500,
      });
    }
  },

  async getFileByCategory(req, res) {
    try {
      const category = req.params.category;

      const files = await File.find({ category });

      if (!files)
        return res
          .status(404)
          .json({ message: "Files not found", status: 404 });

      return res.status(200).json({
        message: "Files fetched successfully",
        status: 200,
        data: files,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: 500,
      });
    }
  },
  async updateFile(req, res) {
    try {
      const { name } = req.body;
      const fileId = req.params.id;

      const file = await File.findById(fileId);

      if (!file)
        return res.status(404).json({ message: "File not found", status: 404 });

      file.name = name;

      await file.save();

      return res.status(200).json({
        message: "File updated successfully",
        status: 200,
        data: file,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: 500,
      });
    }
  },
  async deleteFile(req, res) {
    const fileId = req.params.id;

    const file = await File.findById(fileId);

    if (!file)
      return res.status(404).json({ message: "File not found", status: 404 });

    await file.remove();

    return res.status(200).json({
      message: "File deleted successfully",
      status: 200,
    });
  },
  async shareFile(req, res) {
    try {
      const { email } = req.body;
      const fileId = req.params.id;

      console.log("File ID", fileId);

      const file = await File.findById(fileId);

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
          status: 404,
        });
      }

      user.accessibleFiles.push(file);

      await user.save();

      file.accessors.push(user);

      await file.save();

      return res.status(200).json({
        message: "File shared successfully",
        status: 200,
        data: file,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: 500,
      });
    }
  },
};

export default fileController;
