import express from "express";
import router from "./routs/useroute.js";
import routercar from "./routs/carsrout.js";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://magdy_eldsoky:123456789Magdy@cluster0.gzdtpgy.mongodb.net/?appName=Cluster0",
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/cars", routercar);
app.use("/user", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
