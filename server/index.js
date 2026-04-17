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

const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://mihir-elearning-platform.vercel.app",
  ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL] : []),
]);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const isVercelPreview = origin.endsWith(".vercel.app");
      if (allowedOrigins.has(origin) || isVercelPreview) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", CourseProgress);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
