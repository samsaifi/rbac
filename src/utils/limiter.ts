import rateLimit from "express-rate-limit";
import { _conf } from "../config/config";

export const RateLimiterSetUp = rateLimit(_conf.limit);
