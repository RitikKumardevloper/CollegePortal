import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    duration: "",
    courseFee: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/courses/add",
        formData
      );
      toast.success("Course added successfully!");
      console.log(res.data);
      setFormData({ courseName: "", duration: "", courseFee: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add course");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white text-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Course courseName</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Web Development"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Course duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select duration (Months)</option>
            {[...Array(24)].map((arr, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Month{i + 1 > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Course Fees (₹)</label>
          <input
            type="number"
            name="courseFee"
            value={formData.courseFee}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 12000"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
