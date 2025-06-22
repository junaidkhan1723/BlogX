import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// deployed frontend and localhost
const allowedOrigins = [
  'http://localhost:5173',
  'https://blog-x-six.vercel.app'
];

// 🔐 Add CORS headers manually — this fixes Render/Vercel issues
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// 🎯 CORS options setup
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

connectDB();

app.use(cors(corsOptions));               // Enable CORS
app.use(express.json());
app.use(cookieParser());
app.options('*', cors(corsOptions));      // Preflight OPTIONS support

app.get('/', (req, res) => {
  res.send("API Working");
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`server started on port:${port}`));
