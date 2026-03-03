import express from "express";
import Car from "../models/cars.js";

const router = express.Router();

// Get all cars
router.get("/", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// Add car
router.post("/", async (req, res) => {
  const car = new Car(req.body);
  const saved = await car.save();
  res.status(201).json(saved);
});

// Update car
router.put("/:id", async (req, res) => {
  const updated = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete car
router.delete("/:id", async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted" });
});

export default router;
