import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ViewAllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [editTeacher, setEditTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [locations, setLocations] = useState([]);

  // Fetch data for teachers, courses, and locations
  useEffect(() => {
    fetchData();
    axios.get("http://localhost:5000/admin/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error("Error fetching courses:", err));
    axios.get("http://localhost:5000/admin/managelocaiton")
      .then(res => setLocations(res.data))
      .catch(err => console.error("Error fetching locations:", err));
  }, []);

  // Fetch all teachers
  const fetchData = () => {
    axios.get("http://localhost:5000/admin/teacher")
      .then(res => setTeachers(res.data))
      .catch(err => console.error("Error fetching teachers:", err));
  };

  // Delete a teacher
  const deleteTeacher = async (id) => {
    if (window.confirm("Are you sure to delete this teacher?")) {
      await axios.delete(`http://localhost:5000/admin/teacher/${id}`);
      fetchData();
    }
  };

  // Handle change in the edit modal
  const handleEditChange = (e) => {
    setEditTeacher({ ...editTeacher, [e.target.name]: e.target.value });
  };

  // Update the teacher after editing
  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/admin/teacher/${editTeacher._id}`, editTeacher);
    setEditTeacher(null);
    fetchData();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Teachers</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Salary</th>
            <th className="p-2 border">Course</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(teacher => (
            <tr key={teacher._id}>
              <td className="p-2 border">{teacher.TeacherName}</td>
              <td className="p-2 border">{teacher.TeacherSalary}</td>
              <td className="p-2 border">{teacher.TeacherCourse}</td>
              <td className="p-2 border">{teacher.location}</td>
              <td className="border pl-8 flex gap-2">
                <button 
                  onClick={() => setEditTeacher(teacher)} 
                  className="text-blue-600 mr-2 text-2xl"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button 
                  onClick={() => deleteTeacher(teacher._id)} 
                  className="text-red-600 text-2xl"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Teacher</h3>
            <input 
              name="TeacherName" 
              value={editTeacher.TeacherName} 
              onChange={handleEditChange} 
              className="w-full mb-2 p-2 border" 
            />
            <input 
              name="TeacherSalary" 
              value={editTeacher.TeacherSalary} 
              onChange={handleEditChange} 
              className="w-full mb-2 p-2 border" 
              type="number" 
            />
            <select 
              name="TeacherCourse" 
              value={editTeacher.TeacherCourse} 
              onChange={handleEditChange} 
              className="w-full mb-2 p-2 border"
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course._id} value={course.courseName}>{course.courseName}</option>
              ))}
            </select>
            <select 
              name="location" 
              value={editTeacher.location} 
              onChange={handleEditChange} 
              className="w-full mb-4 p-2 border"
            >
              <option value="">Select Location</option>
              {locations.map(loc => (
                <option key={loc._id} value={loc.loc}>{loc.loc}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditTeacher(null)} className="px-4 py-2 border">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllTeachers;
