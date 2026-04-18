import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { connectDB } from "./database/connectDB.js";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchageCourseRoute from "./routes/purchageCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

const app = express();

const limiteRequrest = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 100,
  message: "Too Many Requrest in Our Website",
});
app.use(limiteRequrest);
const port = process.env.PORT;





app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.json(req.cookies);
});

//api endpoints

app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/purchase", purchageCourseRoute);
app.use("/api/v1/progress",courseProgressRoute)


app.listen(port, () => {
  connectDB();
  console.log(`Server has been Running on ${port}/`);
});
