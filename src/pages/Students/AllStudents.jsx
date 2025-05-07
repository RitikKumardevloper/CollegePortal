import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiRefreshCw, FiPlus } from "react-icons/fi";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import OverlayModal from "../../components/OverlayModal";
import AddStudent from "./Addstudent"; // You can replace this with your form
import breadcrumbs from "../../components/Breadcrumbs";
import Breadcrumbs from "../../components/Breadcrumbs";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowEditModal(true);
  };

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/admin/students/${studentId}`);
        setStudents(prev => prev.filter(student => student._id !== studentId));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Students</h2>
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border px-4 py-2">Enrollment No</th>
                <th className="border px-4 py-2">Student Name</th>
                <th className="border px-4 py-2">Father's Name</th>
                <th className="border px-4 py-2">Gender</th>
                <th className="border px-4 py-2">DOB</th>
                <th className="border px-4 py-2">Contact</th>
                <th className="border px-4 py-2">Course</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="border px-4 py-2">{student.enrollmentNo}</td>
                  <td className="border px-4 py-2">{student.studentName}</td>
                  <td className="border px-4 py-2">{student.fatherName}</td>
                  <td className="border px-4 py-2">{student.gender}</td>
                  <td className="border px-4 py-2">
                    {new Date(student.dob).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{student.contactNo}</td>
                  <td className="border px-4 py-2">
                    {student.course ? student.course.courseName : 'N/A'}
                  </td>
                  <td className="border px-4 py-2 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
    <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
      <div className="flex justify-between items-center border-b px-6 py-4">
        <h2 className="text-xl font-semibold">Edit Student</h2>
        <button
          className="text-gray-600 hover:text-red-500 text-xl"
          onClick={() => setShowEditModal(false)}
        >
          &times;
        </button>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await axios.put(
              `http://localhost:5000/admin/students/${editingStudent._id}`,
              editingStudent
            );
            alert("Student updated successfully");
            setShowEditModal(false);
            fetchStudents();
          } catch (err) {
            console.error("Error updating student:", err);
          }
        }}
        className="p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Student Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingStudent.studentName}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, studentName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block font-medium">Father's Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingStudent.fatherName}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, fatherName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block font-medium">Mother's Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingStudent.motherName || ''}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, motherName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block font-medium">Occupation</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingStudent.occupation || ''}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, occupation: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block font-medium">Date of Birth</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded"
              value={editingStudent.dob?.substring(0, 10)}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, dob: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block font-medium">Gender</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={editingStudent.gender || ''}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Contact No</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingStudent.contactNo || ''}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, contactNo: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block font-medium">Present Address</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingStudent.presentAddress || ''}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, presentAddress: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block font-medium">Permanent Address</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingStudent.permanentAddress || ''}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, permanentAddress: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingStudent.category || ''}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, category: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block font-medium">Religion</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingStudent.religion || ''}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, religion: e.target.value })
              }
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium">Remark</label>
            <textarea
              className="w-full border px-3 py-2 rounded"
              rows="3"
              value={editingStudent.remark || ''}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, remark: e.target.value })
              }
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default AllStudents;
