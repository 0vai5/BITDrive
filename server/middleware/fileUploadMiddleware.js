import multer from "multer";
import path from "path";

var storage = multer.memoryStorage();

var upload = multer({ storage });

export default upload;
