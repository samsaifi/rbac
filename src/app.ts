import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { _conf } from "./config/config";
import { RateLimiterSetUp } from "./utils/limiter";
import connectDB from "./config/db";

const app = express();

//middleware
//?middleware is used to parse incoming JSON
app.use(express.json());
//?middleware enables Cross-Origin Resource Sharing
app.use(cors());
//?It's useful for securing your Express app against well-known web vulnerabilities such as cross-site scripting (XSS), clickjacking, and MIME sniffing.
app.use(helmet());
//?Rate lime 100 for 15 minutes
app.use(RateLimiterSetUp);
//db connect to mongoDB
connectDB();

//define Routes
app.use("/api/auth", authRoutes);
