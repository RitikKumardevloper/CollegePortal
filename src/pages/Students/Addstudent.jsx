
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Addstudent = () => {
  const [formData, setFormData] = useState({
    enrollmentNo: "",
    enrollmentDate: "",
    studentName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    occupation: "",
    gender: "",
    presentAddress: "",
    permanentAddress: "",
    contactNo: "",
    category: "",
    religion: "",
    course: "",
    discount: "",
    remark: "",
    items: [],
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const itemsList = ["book", "pencil", "kacha", "ghadu"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        items: checked
          ? [...prev.items, value]
          : prev.items.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/student", formData);
      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Student Admission Form</h2>

      {submitted ? (
        <div className="space-x-4 mt-4">
          <button
            onClick={() => navigate("/students")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            View Student
          </button>
          <button
            onClick={() => navigate("/students/edit")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Edit
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Left Column */}
          <div>
            <label>Enrollment No</label>
            <input
              type="text"
              name="enrollmentNo"
              value={formData.enrollmentNo}
              onChange={handleChange}
              className="input"
            />

            <label>Enrollment Date</label>
            <input
              type="date"
              name="enrollmentDate"
              value={formData.enrollmentDate}
              onChange={handleChange}
              className="input"
            />

            <label>Student Name</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="input"
            />

            <label>Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="input"
            />

            <label>Mother's Name</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className="input"
            />

            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="input"
            />

            <label>Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="input"
            />

            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Middle Column */}
          <div>
            <label>Present Address</label>
            <textarea
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              className="input"
            ></textarea>

            <label>Permanent Address</label>
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              className="input"
            ></textarea>

            <label>Contact No</label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="input"
            />

            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Category</option>
              <option value="GEN">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
            </select>

            <label>Religion</label>
            <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Religion</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
            </select>

            <label>Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Class</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
            </select>
          </div>

          {/* Right Column */}
          <div>
            <label>Discount</label>
            <input
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="input"
            />

            <label>Remark</label>
            <textarea
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className="input"
            ></textarea>

            <label className="block mt-4">Items</label>
            {itemsList.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="items"
                  value={item}
                  checked={formData.items.includes(item)}
                  onChange={handleChange}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="md:col-span-3 text-right mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Addstudent
