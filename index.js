import express from "express";
import connectDB from "./database/mongodb.js";
import config  from "./config/dotenv.config.js";
import authRoutes from "./routes/auth.routes.js";
import ProductRouter from "./routes/product.routes.js";
const PORT = config.PORT;
const app = express();
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/products",ProductRouter)
app.use("/files", express.static(__dirname + "/upload"));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
