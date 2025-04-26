import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditCourse = () => {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    courseName: "",
    duration: "",
    courseFee: "",
  });

  useEffect(() => {
    // Fetch old course data
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/admin/courses/getCourse/${id}`);
        setFormData({
          courseName: res.data.courseName,
          duration: res.data.duration,
          courseFee: res.data.courseFee,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course data");
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/admin/courses/update/${id}`,
        formData
      );
      toast.success("Course updated successfully!");
      console.log(res.data);
      navigate("/courses/allcourses"); // redirect after update
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white text-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Course</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Course Name</label>
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
          <label className="block mb-1 font-medium">Course Duration</label>
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
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
