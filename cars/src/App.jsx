import React, { useState, useEffect } from "react";
import { Plus, Trash, Edit } from "lucide-react";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ name: "", model: "", year: "" });
  const [editing, setEditing] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCarChange = (e) =>
    setNewCar({ ...newCar, [e.target.name]: e.target.value });

  // Login / Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:3000/login"
      : "http://localhost:3000/signup";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.message === "Login successful") setLoggedIn(true);
    } catch {
      setMessage("Server error");
    }
  };

  // Fetch cars
  useEffect(() => {
    if (loggedIn) {
      fetch("http://localhost:3000/cars")
        .then((res) => res.json())
        .then((data) => setCars(data));
    }
  }, [loggedIn]);

  // Add or Edit car
  const handleAddEditCar = async (e) => {
    e.preventDefault();
    try {
      let res, data;
      if (editing) {
        res = await fetch(`http://localhost:3000/cars/${editing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCar),
        });
        data = await res.json();
        setCars(cars.map((c) => (c._id === editing ? data : c)));
        setEditing(null);
      } else {
        res = await fetch("http://localhost:3000/cars", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCar),
        });
        data = await res.json();
        setCars([...cars, data]);
      }
      setNewCar({ name: "", model: "", year: "" });
    } catch {
      console.error("Error adding/updating car");
    }
  };

  // Delete car
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/cars/${id}`, { method: "DELETE" });
    setCars(cars.filter((c) => c._id !== id));
  };

  // Edit car
  const handleEdit = (car) => {
    setNewCar({ name: car.name, model: car.model, year: car.year });
    setEditing(car._id);
  };

  if (!loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
          {message && (
            <p className="text-center mt-2 text-red-500">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Car List</h2>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <ul className="space-y-2 mb-6">
          {cars.map((car) => (
            <li
              key={car._id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {car.name} - {car.model} ({car.year})
              </span>
              <div className="flex gap-2">
                <Edit
                  className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700"
                  onClick={() => handleEdit(car)}
                />
                <Trash
                  className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(car._id)}
                />
              </div>
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddEditCar} className="flex gap-2 flex-wrap">
          <input
            type="text"
            name="name"
            placeholder="Car Name"
            value={newCar.name}
            onChange={handleCarChange}
            className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Car Model"
            value={newCar.model}
            onChange={handleCarChange}
            className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={newCar.year}
            onChange={handleCarChange}
            className="border p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className={`bg-green-500 text-white px-4 rounded hover:bg-green-600 flex items-center gap-1 transition`}
          >
            <Plus className="w-4 h-4" /> {editing ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
