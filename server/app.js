import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import fileRouter from "./routes/fileRoutes.js";
import morgan from "morgan";
import shareFileRouter from "./routes/shareFiles.js";
import fs from "fs";
import path from "path";

dotenv.config();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "https://bitdrive.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(morgan("dev"));

connectDB();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/file", fileRouter);
app.use("/api/v1/shareFile", shareFileRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
