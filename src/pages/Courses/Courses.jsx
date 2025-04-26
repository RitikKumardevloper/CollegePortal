import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "../../components/DataTable";
import AddCourse from "./AddCourses";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Courses(darkMode) {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseName: "",
    duration: "",
    courseFee: ""
  });
  const [openCourse, setOpenCourse] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAllCourse();
  }, []);

  const getAllCourse = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/courses/");
      setCourses(response.data);
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
      toast.success("Course added!");
      setFormData({ courseName: "", duration: "", courseFee: "" });
      setOpenCourse(false);
      getAllCourse();
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error(error?.response?.data?.message || "Failed to add course.");
    }
  };

  const handleEdit = (rowData) => {
    navigate(`/courses/edit-course/${rowData._id}`);
  };

  const confirmDeleteCourse = (rowData) => {
    setCourseToDelete(rowData);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!courseToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/admin/courses/delete/${courseToDelete._id}`);
      toast.success("Course deleted successfully!");
      setShowDeletePopup(false);
      setCourseToDelete(null);
      getAllCourse();
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course.");
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setCourseToDelete(null);
  };

  const columns = [
    { key: "courseName", title: "Course Name" },
    { key: "duration", title: "Duration (Months)" },
    { key: "courseFee", title: "Fee (₹)" },
    { 
      key: "actions", 
      title: "Actions", 
      render: (row) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleEdit(row)} 
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
          >
            Edit
          </button>
          <button 
            onClick={() => confirmDeleteCourse(row)} 
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      ) 
    }
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <NavLink to="/courses/addcourses">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Add Course
          </button>
        </NavLink> 
      </div>

      {openCourse && <AddCourse handleSubmit={handleSubmit} />}

      <DataTable columns={columns} data={courses} />

      {/* 🚀 Delete Confirmation Modal */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 w-80">
            <h2 className="text-xl font-bold text-red-500 text-center">Confirm Deletion</h2>
            <p className="text-center text-blue-500">Are you sure you want to delete <b>{courseToDelete?.courseName}</b>?</p>
            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={handleDeleteConfirmed}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button 
                onClick={handleCancelDelete}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
