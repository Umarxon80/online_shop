// config/dotenv.config.js
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const PORT = Number(process.env.PORT) || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
