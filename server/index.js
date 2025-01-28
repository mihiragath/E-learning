import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./database/dbConnect.js";
import userRouter from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";

dotenv.config();

// Call database connection here
connectDB();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
