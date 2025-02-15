import express from "express";
const fileRouter = express.Router();
import fileController from "../controllers/fileController.js";
import authenticate from "../middleware/authenticate.js";
import upload from "../middleware/fileUploadMiddleware.js";

fileRouter.post("/createFile", authenticate, upload.single("file"),fileController.createFile);
fileRouter.get(
  "/getFileByCategory/:category",
  authenticate,
  fileController.getFileByCategory
);
fileRouter.patch("/updateFile/:id", authenticate, fileController.updateFile);
fileRouter.delete("/deleteFile/:id", authenticate, fileController.deleteFile);
fileRouter.get("/getUserFiles", authenticate, fileController.getAllFileOfUsers);
fileRouter.get("/getTotalStorage", authenticate, fileController.getTotalStorage);

export default fileRouter;
