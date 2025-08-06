import express from "express";
import connectDB from "./database/mongodb.js";
import config  from "./config/dotenv.config.js";
import authRoutes from "./routes/auth.routes.js";
const PORT = config.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
