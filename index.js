import express from "express";
import connectDB from "./database/mongodb.js";
import {PORT}  from "./config/dotenv.config.js";
import authRoutes from "./routes/auth.routes.js";
import ProductRouter from "./routes/product.routes.js";
import cors from "cors";
const app = express();

// Allow Netlify domain
app.use(cors({
  origin: "https://onlin1eshop.netlify.app",
  methods: "GET,POST,PUT,DELETE",
  credentials: true // if you use cookies
}));

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/files", express.static(__dirname + "/upload"));


app.use("/auth", authRoutes);
app.use("/products",ProductRouter)
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
