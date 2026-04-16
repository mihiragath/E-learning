import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./database/dbConnect.js";

import userRouter from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import CourseProgress from "./routes/courseProgress.route.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = [
  "http://localhost:5173",
  "https://mihir-elearning-platform.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS Not Allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", CourseProgress);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
