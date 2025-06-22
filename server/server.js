import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

//  Added both localhost and Vercel frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://blog-x-six.vercel.app'
];

//  Updated CORS setup
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); // Use the updated options

//  preflight support (helps with some POST requests)
app.options('*', cors(corsOptions));

app.get('/', (req, res) => {
  res.send("API Working");
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`server started on port:${port}`));
