import express from "express";
const fileRouter = express.Router();
import fileController from "../controllers/fileController.js";
import authenticate from "../middleware/authenticate.js";
import upload from "../middleware/fileUploadMiddleware.js";

fileRouter.post("/create-file", authenticate, upload.single("file"),fileController.createFile);
fileRouter.get(
  "/get-file-by-category/:category",
  authenticate,
  fileController.getFileByCategory
);
fileRouter.patch("/update-file/:id", authenticate, fileController.updateFile);
fileRouter.delete("/delete-file/:id", authenticate, fileController.deleteFile);
fileRouter.post("/share-file/:id", authenticate, fileController.shareFile);

export default fileRouter;
