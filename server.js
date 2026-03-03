import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// server.js
import authRoutes from "./routes/auth.js";
import carRoutes from "./routes/cars.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://magdy_eldsoky:123456789Magdy@cluster0.gzdtpgy.mongodb.net/?appName=Cluster0",
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/", authRoutes); // /login and /signup
app.use("/cars", carRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
