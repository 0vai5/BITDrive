import { ApiResponse } from "../utils/apiResponse.js";
import { CustomError } from "../utils/customError.js";
import shareFiles from "../models/shareFilesModel.js";
import User from "../models/userModel.js";
import File from "../models/fileModel.js";

const shareFilesController = {
  async getFiles(req, res) {
    try {
      const { id } = req.params.id;

      const user = await User.findById(id);
      if (!user) {
        throw new CustomError("User Not Exist", 400);
      }

      const sharedFiles = await shareFiles.aggregate([
        {
          $lookup: {
            from: "Users",
            localField: "senderID",
            foreignField: "_id",
            as: "senderDetails",
          },
        },
        {
          $unwind: "$senderDetails",
        },
        {
          $lookup: {
            from: "Users",
            localField: "recipientID",
            foreignField: "_id",
            as: "recipientDetails",
          },
        },
        {
          $unwind: "$recipientDetails",
        },
        {
          $match: {
            recipientID: id,
          },
        },
        {
          $lookup: {
            from: "Files",
            localField: "file",
            foreignField: "_id",
            as: "fileDetails",
          },
        },
        {
          $unwind: "$fileDetails",
        },
        {
          $project: {
            _id: 1,
            senderID: 1,
            recipientID: 1,
            file: 1,
            createdAt: 1,
            updatedAt: 1,
            senderDetails: {
              _id: "$senderDetails._id",
              name: "$senderDetails.name",
              email: "$senderDetails.email",
            },
            recipientDetails: {
              _id: "$recipientDetails._id",
              name: "$recipientDetails.name",
              email: "$recipientDetails.email",
            },
            fileDetails: {
              _id: "$fileDetails._id",
              name: "$fileDetails.name",
              size: "$fileDetails.size",
              type: "$fileDetails.type",
              accessibleLink: "$fileDetails.accessibleLink",
            },
          },
        },
      ]);

      if (!sharedFiles || sharedFiles.length === 0) {
        throw new CustomError("No Shared Files Found", 404);
      }

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Shared Files Retrieved Successfully",
            sharedFiles
          )
        );
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },
  async shareFile(req, res) {
    try {
      const { fileID, email } = req.body;

      const recipient = await User.findOne({ email });

      if (!recipient) {
        throw new CustomError("Recipient Not Found", 404);
      }

      const fileExists = await File.findById(fileID);

      if (!fileExists) {
        throw new CustomError("File Not Found", 404);
      }

      const fileShareExists = await shareFiles.findOne({
        senderID: req.user.id,
        recipientID: recipient._id,
        file: fileID,
      });

      if (fileShareExists) {
        throw new CustomError("File already shared with this user", 400);
      }

      const file = await shareFiles.create({
        senderID: req.user.id,
        recipientID: recipient._id,
        file: fileID,
      });

      return res
        .status(201)
        .json(new ApiResponse(201, "File Shared Successfully", file));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },
};

export default shareFilesController;
