import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import fileRouter from "./routes/fileRoutes.js";
import morgan from "morgan";
import serverless from "serverless-http";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;  // Default to port 3000 if not set in environment

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
app.use(morgan('dev'));

connectDB();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/file", fileRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default serverless(app);

if (process.env.NODE_ENV !== "production") {
  app.listen(port);
}
