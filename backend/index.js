import dotenv from "dotenv";
import express from "express";
import dbConnection from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://college-lms-2.onrender.com/",
    credentials: true,
  })
);

app.use("/", authRouter);

app.listen(process.env.PORT || 6000, () => {
  dbConnection();
});
