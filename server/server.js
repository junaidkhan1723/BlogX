import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();
const port = process.env.PORT || 4000;


connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or curl)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "https://blog-x-six.vercel.app"  // production frontend
    ];

    const localhostRegex = /^http:\/\/localhost:\d+$/;

    if (allowedOrigins.includes(origin) || localhostRegex.test(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

//API Endpoints

app.get("/", (req, res) => {
  res.send("API Working");
});

// user Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// admin and blog routes
app.use("/api/blog", blogRouter);
app.use("/api/admin", adminRouter);

app.listen(port, () => console.log(`server started on port:${port}`));
