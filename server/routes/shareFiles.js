import express, {Router} from "express";
import shareFilesController from "../controllers/shareFilesController.js";

const shareFileRouter = Router();

shareFileRouter.get("/getSharedFiles/:id", shareFilesController.getFiles)
shareFileRouter.post("/share", shareFilesController.shareFile)

export default shareFileRouter