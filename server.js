import express from "express";
import router from "./routs/useroute.js";
import routercar from "./routs/carsrout.js";

const app = express();
const port = 3000;

app.use("/cars", routercar);
app.use("/user", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
