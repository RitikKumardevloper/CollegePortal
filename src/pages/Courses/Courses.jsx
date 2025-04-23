import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "../../components/DataTable";
import AddCourse from "./AddCourses";
import { NavLink } from "react-router-dom";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseName: "",
    duration: "",
    courseFee: ""
  });
  const [openCourse, setOpenCourse] = useState(false);

  // Fetch courses on initial load
  useEffect(() => {
    getAllCourse();
  }, []);

  // Fetch all courses from the API
  const getAllCourse = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/courses/");
      setCourses(response.data); // Update courses state
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/admin/courses/addcourse", {
        ...formData,
        duration: Number(formData.duration),
        courseFee: Number(formData.courseFee)
      });
      alert("Course added!");
      setFormData({ courseName: "", duration: "", courseFee: "" });
      setOpenCourse(false);
      getAllCourse(); // Refresh the table with the new data
    } catch (error) {
      console.error("Error adding course:", error);
      alert(error?.response?.data?.message || "Failed to add course.");
    }
  };

  const columns = [
    { key: "courseName", title: "Course Name" },
    { key: "duration", title: "Duration (Months)" },
    { key: "courseFee", title: "Fee (₹)" }
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Course Management</h1>
       <NavLink to="/courses/addcourses"><button
        
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        
        >
          Add Course
        </button>
        </NavLink> 
      </div>

      {openCourse && <AddCourse handleSubmit={handleSubmit} />}

      <DataTable columns={columns} data={courses} />
    </div>
  );
}
