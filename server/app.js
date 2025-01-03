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
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
    credentials: true,
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
