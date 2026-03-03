import React, { useEffect, useState } from "react";

const App = () => {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({ name: "", model: "", year: "" });

  // جلب كل السيارات عند تحميل الصفحة
  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error(err));
  }, []);

  // تحديث البيانات عند الكتابة في الفورم
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // إرسال بيانات السيارة الجديدة
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newCar) => {
        setCars([...cars, newCar]); // إضافة السيارة الجديدة للقائمة
        setFormData({ name: "", model: "", year: "" }); // إعادة ضبط الفورم
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Car List</h1>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            {car.name} - {car.model} ({car.year})
          </li>
        ))}
      </ul>

      <h2>Add a New Car</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="model"
          placeholder="Car Model"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Car Year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default App;
