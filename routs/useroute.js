import express from "express";
import { uselogin, useregister } from "../controler.js";

const router = express.Router();

router.get("/login", uselogin);
router.get("/register", useregister);

export default router;
