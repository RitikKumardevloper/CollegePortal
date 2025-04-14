import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import Dashboard from "./pages/Dashboard";
import Faculty from "./pages/Faculty";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import Login from "../src/components/LoginSignup/Login";
import Signup from "../src/components/LoginSignup/SingUp"; // Fixed typo in import
import AllStudents from "./pages/Students/AllStudents";
import EnquiryForm from "./pages/Enquiry/EnquiryForm";
import EnquiriesList from "./pages/Enquiry/EnquiriesList";
import EnquiryDetail from "./pages/Enquiry/EnquiryDetail";

// Main layout component for authenticated routes
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
  return (
    <Routes>
      {/* Auth routes without sidebar/topnav */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Main app routes with layout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route path="/students/allstudents" element={<AllStudents />} />

      {/* Enquiey routes */}
      <Route path="/enquiry/enquiryform" element={<EnquiryForm />} />
      <Route path="/enquiry/allenquiry" element={<EnquiriesList />} />
      <Route path="/enquiries/:enquiryNo" element={<EnquiryDetail />} />

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
    </Routes>
  );
}
