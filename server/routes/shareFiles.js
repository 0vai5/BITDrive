import express, {Router} from "express";
import shareFilesController from "../controllers/shareFilesController.js";
import authenticate from "../middleware/authenticate.js";

const shareFileRouter = Router();

shareFileRouter.get("/getSharedFiles/:id", authenticate,shareFilesController.getFiles)
shareFileRouter.post("/share", authenticate,shareFilesController.shareFile)

export default shareFileRouter