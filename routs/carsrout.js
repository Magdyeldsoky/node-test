import express from "express";
import { getcars, getcar } from "../controler.js";

const routercar = express.Router();
routercar.get("/", getcars);
routercar.get("/:id", getcar);

export default routercar;
