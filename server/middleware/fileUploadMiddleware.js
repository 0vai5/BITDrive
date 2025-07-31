import multer from "multer";
import path from "path";

var storage = multer.diskStorage({
  destination: "/upload",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "Hello" + path.extname(file.originalname)); //Appending extension
  },
});

var upload = multer({ storage });

export default upload;
