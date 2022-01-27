import { env } from "../utils/utils";

/* mongo db setting*/
export const MONGO_URL = env("MONGO_URL", "MONGO_URL");
export const MONGO_DEBUG = env("MONGO_DEBUG", "MONGO_DEBUG");
export const JWT_SECRET = env("JWT_SECRET", "JWT_SECRET");
export const PORT = env("PORT", "PORT");