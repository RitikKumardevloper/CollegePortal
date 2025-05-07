import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RJWDYSGzMNdL60zAGTf0JEiGDwmvHgInqaFmUDCOU9TVaCANHPYx80Ivf0GzOt2SvHxpQF5b23rIcpRGApgWhqE00IQ2ns4wU"
); // Use your Stripe public key

const AddStudent = () => {
  const [formData, setFormData] = useState({
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
    remark: "",
    items: [],
  });

  const [submitted, setSubmitted] = useState(false);
  const [items, setItems] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

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
      remark: "",
      items: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = {
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
        return;
      }
    }

    try {
      // Call backend API to add student
      await axios.post("http://localhost:5000/admin/students", formData);
      toast.success("Student added successfully!");
      setSubmitted(true);
      resetForm();
    } catch (err) {
      toast.error("Submission failed");
      console.error(err);
    }
  };

  const handleStripePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/students",
        formData
      );
      const enrollmentNo = response.data.student.enrollmentNo;
      console.log(enrollmentNo);
      const sessionRes = await axios.post(
        "http://localhost:5000/admin/payment/create-checkout-session",
        { enrollmentNo }
      );

      if (!sessionRes.data.id) {
        toast.error("Session ID not received from backend");
        return;
      }

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: sessionRes.data.id,
      });

      if (result.error) {
        toast.error("Stripe redirect failed: " + result.error.message);
      }
    } catch (err) {
      console.error("Error during payment setup:", err);
      toast.error("Payment setup failed. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/items");
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/courses");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchItems();
    fetchCourses();
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-md shadow-md">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Student Admission Form</h2>

      {submitted ? (
        <div className="space-x-4 mt-4">
          <button
            onClick={() => navigate("/students")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            View Students
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Student Name */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Student Name
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Father's Name */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Father's Name
            </label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Mother's Name */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Mother's Name
            </label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Date of Birth */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Occupation */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Gender */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
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

          {/* Present Address */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Present Address
            </label>
            <input
              type="text"
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Permanent Address */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Permanent Address
            </label>
            <input
              type="text"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Contact Number */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Category */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Religion */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Religion
            </label>
            <input
              type="text"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Course */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Course
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* Remark */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Remark
            </label>
            <textarea
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Payment Button */}
          <div className="md:col-span-3 text-right mt-4">
            <button
              type="button"
              onClick={handleStripePayment}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit and Pay
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddStudent;
