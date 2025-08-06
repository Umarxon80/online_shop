import dotenv from "dotenv";

dotenv.config({quiet:true});

export default {
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET
};
