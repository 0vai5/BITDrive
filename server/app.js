import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import fileRouter from "./routes/fileRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173"]; // Replace with your frontend's origin
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies
  })
);

connectDB();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/file", fileRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 8080");
});
