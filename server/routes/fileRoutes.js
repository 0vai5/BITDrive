import express from "express";
const fileRouter = express.Router();
import fileController from "../controllers/fileController.js";
import { upload } from "../middleware/fileUpload.js";

fileRouter.post(
  "/create-file",
  upload.single("file"),
  fileController.createFile
);
fileRouter.post(
  "/create-multiple-files",
  upload.array("file"),
  fileController.createMultipleFiles
);
fileRouter.get("/get-fileByCategory", fileController.getFileByCategory);
fileRouter.patch(fileController.updateFileName);
fileRouter.delete("/deleteFile/:id", fileController.deleteFile);
fileRouter.post("/shareFile", fileController.shareFile);

export default fileRouter;
