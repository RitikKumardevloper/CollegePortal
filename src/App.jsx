import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuth } from "./api/auth";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import Dashboard from "./pages/Dashboard";
import Faculty from "./pages/Attendence/FacultyAttendance";
import Courses from "./pages/Courses/Courses";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import Login from "../src/components/LoginSignup/Login";
import Signup from "../src/components/LoginSignup/SingUp";
import AllStudents from "../src/pages/Students/AllStudents";
import EnquiryForm from "./pages/Enquiry/EnquiryForm";
import EnquiriesList from "./pages/Enquiry/EnquiriesList";
import EnquiryDetail from "./pages/Enquiry/EnquiryDetail";
import Addstudent from "./pages/Students/Addstudent";
import Enquiry from "./pages/Report/Enquiry";
import Collection from "./pages/Report/Collection";
import BalanceFees from "./pages/Report/BalanceFees";
import Admission from "./pages/Report/Admission";
import Profit from "./pages/Report/Profit";
import Payment from "./pages/Report/Payment";
import ManageAdmin from "./pages/Admin/ManageAdmin";
import ManageLocation from "./pages/Admin/ManageLocation";
import ManageTeacher from "./pages/Admin/ManageTeacher";

const MainLayout = ({ children }) => (
  <div className="flex bg-gray-50">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopNav />
      <main className="flex-1 overflow-y-auto p-6 space-y-6 text-gray-800 dark:text-gray-100 dark:bg-gray-900">{children}</main>
    </div>
  </div>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // Load dark mode setting from localStorage when the app starts
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  // Apply dark mode globally to the html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Save dark mode preference to localStorage
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode); 
    localStorage.setItem("darkMode", newDarkMode);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Main protected routes */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/students/allstudents"
        element={
          <MainLayout>
            <AllStudents
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/students/addstudent"
        element={
          <MainLayout>
            <Addstudent
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/enquiry/enquiryform"
        element={
          <MainLayout>
            <EnquiryForm
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/enquiry/allenquiry"
        element={
          <MainLayout>
            <EnquiriesList
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/enquiries/:enquiryNo"
        element={
          <MainLayout>
            <EnquiryDetail
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/courses/allcourses"
        element={
          <MainLayout>
            <Courses
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/faculty"
        element={
          <MainLayout>
            <Faculty
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/attendance"
        element={
          <MainLayout>
            <Attendance
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <MainLayout>
            <Settings
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      {/* Admin Routes */}
      <Route
        path="/admin/manage-location"
        element={
          <MainLayout>
            <ManageLocation
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/admin/manage-admin"
        element={
          <MainLayout>
            <ManageAdmin
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/admin/manage-teacher"
        element={
          <MainLayout>
            <ManageTeacher
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      {/* Report Routes */}
      <Route
        path="/report/enquiry"
        element={
          <MainLayout>
            <Enquiry
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/report/admission"
        element={
          <MainLayout>
            <Admission
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/report/collection"
        element={
          <MainLayout>
            <Collection
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/report/payment"
        element={
          <MainLayout>
            <Payment
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/report/balance"
        element={
          <MainLayout>
            <BalanceFees
              darkMode={darkMode}
              toggleDarkMode={handleDarkModeToggle}
            />
          </MainLayout>
        }
      />
      <Route
        path="/report/profit&loss"
        element={
          <MainLayout>
            <Profit darkMode={darkMode} toggleDarkMode={handleDarkModeToggle} />
          </MainLayout>
        }
      />
    </Routes>
  );
}
