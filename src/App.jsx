import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import Dashboard from "./pages/Dashboard";
import Faculty from "./pages/Faculty";
import Courses from "./pages/Courses/Courses";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import Login from "../src/components/LoginSignup/Login";
import Signup from "../src/components/LoginSignup/SingUp"; // Fixed typo in import
import AllStudents from "../src/pages/Students/AllStudents"
import EnquiryForm from "./pages/Enquiry/EnquiryForm";
import EnquiriesList from "./pages/Enquiry/EnquiriesList";
import EnquiryDetail from "./pages/Enquiry/EnquiryDetail";
import Addstudent from "./pages/Students/Addstudent";
import Location from "./pages/Location/Location";
import Students from "./pages/Students/Students";
import ManageAdmin from "./pages/Admin/ManageAdmin"
import ManageLocation from "./pages/Admin/ManageLocation"
import ManageTeacher from "./pages/Admin/ManageTeacher"

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
      <Route path="/students/addstudent" element={<Addstudent/>} />

      {/* Enquiey routes */}
      <Route path="/enquiry/enquiryform" element={<EnquiryForm />} />
      <Route path="/enquiry/allenquiry" element={<EnquiriesList />} />
      <Route path="/enquiries/:enquiryNo" element={<EnquiryDetail />} />



      <Route path="/courses/allcourses" element={<Courses />} />
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
         <ManageLocation/>
        }
      />
          <Route
        path="/admin/manage-admin"
        element={
         <ManageAdmin/>
        }
      />
          <Route
        path="/admin/manage-teacher"
        element={
         <ManageTeacher/>
        }
      />
    </Routes>
  );
}
