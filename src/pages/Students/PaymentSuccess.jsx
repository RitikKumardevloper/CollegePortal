import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // added useNavigate
import axios from "axios";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate(); // hook for navigation

  const queryParams = new URLSearchParams(location.search);
  const enrollmentNo = queryParams.get("studentId");

  const [studentData, setStudentData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enrollmentNo) {
      setError("Enrollment number not found in URL.");
      setLoading(false);
      return;
    }

    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/admin/students/${enrollmentNo}`
        );
        const data = response.data;
        setStudentData(data);
        setCourseData(data.course);
      } catch (err) {
        console.error("Error fetching student:", err);
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [enrollmentNo]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Payment Successful 🎉
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Thank you for your payment! Below are the student details:
        </p>
        <div className="text-sm text-gray-800 space-y-2">
          <p><strong>Name:</strong> {studentData?.studentName || "N/A"}</p>
          <p><strong>Enrollment No:</strong> {studentData?.enrollmentNo || "N/A"}</p>
          <p><strong>Phone:</strong> {studentData?.contactNo || "N/A"}</p>
          <p><strong>Address:</strong> {studentData?.presentAddress || "N/A"}</p>
        </div>

        <div className="mt-6 border-t pt-4 text-sm text-gray-800 space-y-2">
          <p><strong>Course Name:</strong> {courseData?.courseName || "N/A"}</p>
          <p><strong>Duration:</strong> {courseData?.duration || "N/A"} months</p>
          <p><strong>Fee:</strong> ₹{courseData?.courseFee || "N/A"}</p>
        </div>

        {/* Go to Dashboard Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/students/addstudent")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
