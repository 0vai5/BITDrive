import express from "express";
const fileRouter = express.Router();
import fileController from "../controllers/fileController.js";
import authenticate from "../middleware/authenticate.js";

fileRouter.post("/create-file", authenticate, fileController.createFile);
fileRouter.post("/create-multiple-files", authenticate, fileController.createMultipleFiles);
fileRouter.get("/get-files-by-category", authenticate, fileController.getFileByCategory);
fileRouter.delete("/delete-file", authenticate, fileController.deleteFile);
fileRouter.put("/update-file-name", authenticate, fileController.updateFileName);
fileRouter.post("/share-file", authenticate, fileController.shareFile);

export default fileRouter;