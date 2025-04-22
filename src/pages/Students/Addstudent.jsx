import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

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

  const resetForm = () => {
    setFormData({
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = {
      enrollmentNo: "Enrollment Number",
      enrollmentDate: "Enrollment Date",
      studentName: "Student Name",
      fatherName: "Father's Name",
      motherName: "Mother's Name",
      dob: "Date of Birth",
      occupation: "Occupation",
      gender: "Gender",
      presentAddress: "Present Address",
      permanentAddress: "Permanent Address",
      contactNo: "Contact Number",
      category: "Category",
      religion: "Religion",
      course: "Course",
    };

    for (const [key, label] of Object.entries(requiredFields)) {
      if (!formData[key]) {
        toast.error(`${label} is required`);
        return; // 🛑 stop on first missing field
      }
    }

    try {
      await axios.post("http://localhost:5000//admin/students", formData);
      toast.success("Student added successfully!");
      setSubmitted(true);
      resetForm();
    } catch (err) {
      toast.error("Submission failed");
    }
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the backend
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

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
              className={inputClass}
            />

            <label>Enrollment Date</label>
            <input
              type="date"
              name="enrollmentDate"
              value={formData.enrollmentDate}
              onChange={handleChange}
              className={inputClass}
            />

            <label>Student Name</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className={inputClass}
            />

            <label>Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className={inputClass}
            />

            <label>Mother's Name</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className={inputClass}
            />

            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={inputClass}
            />

            <label>Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className={inputClass}
            />

            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClass}
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
              className={inputClass}
            ></textarea>

            <label>Permanent Address</label>
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              className={inputClass}
            ></textarea>

            <label>Contact No</label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className={inputClass}
            />

            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
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
              className={inputClass}
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
              className={inputClass}
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
              className={inputClass}
            />

            <label>Remark</label>
            <textarea
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className={inputClass}
            ></textarea>

            <label className="block mt-4">Items</label>
            {items.length === 0 ? (
              <p className="text-red-500 mt-2">Item not available</p>
            ) : (
              items.map((itemObj) => (
                <div key={itemObj.item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="items"
                    value={itemObj.item}
                    checked={formData.items.includes(itemObj.item)}
                    onChange={handleChange}
                  />
                  <span>{itemObj.item}</span>
                </div>
              ))
            )}
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
};

export default Addstudent;
