import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuth } from "./api/auth"; // ✅ You already have this
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
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  </div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const check = async () => {
      const res = await checkAuth();
      setIsAuthenticated(res.isAuthenticated);
    };
    check();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  // If user is not authenticated and not on login/signup → redirect to login
  if (!isAuthenticated && !["/login", "/signup"].includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Main protected routes */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/students/allstudents"
        element={
          <MainLayout>
            <AllStudents />
          </MainLayout>
        }
      />
      <Route
        path="/students/addstudent"
        element={
          <MainLayout>
            <Addstudent />
          </MainLayout>
        }
      />
      <Route
        path="/enquiry/enquiryform"
        element={
          <MainLayout>
            <EnquiryForm />
          </MainLayout>
        }
      />
      <Route
        path="/enquiry/allenquiry"
        element={
          <MainLayout>
            <EnquiriesList />
          </MainLayout>
        }
      />
      <Route
        path="/enquiries/:enquiryNo"
        element={
          <MainLayout>
            <EnquiryDetail />
          </MainLayout>
        }
      />
      <Route
        path="/courses/allcourses"
        element={
          <MainLayout>
            <Courses />
          </MainLayout>
        }
      />
      <Route
        path="/faculty"
        element={
          <MainLayout>
            <Faculty />
          </MainLayout>
        }
      />
      <Route
        path="/courses"
        element={
          <MainLayout>
            <Courses />
          </MainLayout>
        }
      />
      <Route
        path="/attendance"
        element={
          <MainLayout>
            <Attendance />
          </MainLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <MainLayout>
            <Settings />
          </MainLayout>
        }
      />
      <Route
        path="/admin/manage-location"
        element={
          <MainLayout>
            <ManageLocation />
          </MainLayout>
        }
      />
      <Route
        path="/admin/manage-admin"
        element={
          <MainLayout>
            <ManageAdmin />
          </MainLayout>
        }
      />
      <Route
        path="/admin/manage-teacher"
        element={
          <MainLayout>
            <ManageTeacher />
          </MainLayout>
        }
      />
      <Route
        path="/report/enquiry"
        element={
          <MainLayout>
            <Enquiry />
          </MainLayout>
        }
      />
      <Route
        path="/report/admission"
        element={
          <MainLayout>
            <Admission />
          </MainLayout>
        }
      />
      <Route
        path="/report/collection"
        element={
          <MainLayout>
            <Collection />
          </MainLayout>
        }
      />
      <Route
        path="/report/payment"
        element={
          <MainLayout>
            <Payment />
          </MainLayout>
        }
      />
      <Route
        path="/report/balance"
        element={
          <MainLayout>
            <BalanceFees />
          </MainLayout>
        }
      />
      <Route
        path="/report/profit&loss"
        element={
          <MainLayout>
            <Profit />
          </MainLayout>
        }
      />
    </Routes>
    // hey there! 👋
  );
}
