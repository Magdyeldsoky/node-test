import mongoose from "mongoose";
const { Schema, model } = mongoose;

const carSchema = new Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
});

export default model("Car", carSchema);
