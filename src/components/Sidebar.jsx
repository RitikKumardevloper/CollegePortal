import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBook,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiBriefcase,
  FiSettings,
  FiLogOut,
  FiCheckSquare,
} from "react-icons/fi";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa"; // "Report Document" look
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoLibraryOutline } from "react-icons/io5";
import { GiTeacher } from "react-icons/gi";
import { FaUserShield, FaChartLine } from "react-icons/fa"; // Font Awesome
import { MdDashboard } from "react-icons/md"; // Material Design

export default function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { to: "/", icon: <FiHome />, label: "Dashboard" },

    // {
    //   icon: <HiOutlineBuildingOffice size={24} />,
    //   label: "Frountoffice",
    //   children: [
    //     { to: "/frontoffice/admission-inquiry", label: "Admission Inquiry" },
    //     { to: "/frontoffice/visitor-book", label: "Visitor Book" },
    //     { to: "/frontoffice/complaints", label: "Complaints" },
    //   ],
    // },

    {
      icon: <FiUsers size={24} />,
      label: "Students",
      children: [
        { to: "/students/allstudents", label: "All Students" },
        { to: "/students/addstudent", label: "Add Students" },
        // { to: "/students/editstudent", label: "Edit Students" },
        // { to: "/students/aboutstudents", label: "About Student" },
        { to: "/students/studentattendance", label: "Student Attendance" },
      ],
    },
    {
      icon: <FiUser size={24} />,
      label: "Teacher",
      children: [
        { to: "/teacher/allteacher", label: "All Teacher" },
        // { to: "/teacher/editteacher", label: "Edit Teacher" },
        { to: "/teacher/addteacher", label: "Add Teacher" },
        // { to: "/teacher/aboutteacher", label: "About Teacher" },
        { to: "/teacher/teachertimetable", label: "Teacher TimeTable" },
      ],
    },
    {
      icon: <FiBook size={24} />,
      label: "Courses",
      children: [
        { to: "/courses/allcourses", label: "All course" },
        { to: "/courses/addcourses", label: "Add Courses" },
        // { to: "/courses/addcourses", label: "Add Courses" },
        // { to: "/courses/editcourses", label: "Add fees" },
        // { to: "/courses/aboutcourses", label: "About Courses" },
      ],
    },
    // {
    //   icon: <IoLibraryOutline size={24} />,
    //   label: "Library",
    //   children: [
    //     { to: "/library/alllibraryassests", label: "AllLibararyAssets" },
    //     { to: "/library/addlibraryassests", label: "AddLibararyAssets" },
    //     { to: "/library/editlibraryassests", label: "editLibararyAssets" },
    //     { to: "/library/bookstatus", label: "Bookstatus" },
    //   ],
    // },

    {
      icon: <FiUsers size={24} />,
      label: "Staff",
      children: [
        { to: "/staff/allstaff", label: "All Staff" },
        { to: "/staff/addstaff", label: "Add Staff" },
        // { to: "/staff/editstaff", label: "Edit Staff" },
        { to: "/staff/aboutstaff", label: "About Staff" },
        { to: "/staff/staffattendance", label: "Staff Attendance" },
      ],
    },
    {
      icon: <FiDollarSign size={24} />,
      label: "Fees",
      children: [
        { to: "/fees/allfees", label: "All Fees" },
        { to: "/fees/addfees", label: "Add Fees" },
        // { to: "/fees/editfees", label: "Edit Fees" },
        { to: "/fees/feesdiscount", label: "Fees Discount" },
        { to: "/fees/feesrecipet", label: "Fees Recipet" },
      ],
    },
    // {
    //   to: "",
    //   icon: <FiBook size={24} />,
    //   label: "Class",
    //   children: [
    //     { to: "/class/classlist", label: "ClassList" },
    //     { to: "/class/classtimetable", label: "ClassTimeTable" },
    //   ],
    // },
    {
      to: "",
      icon: <FiFileText size={24} />,
      label: "Enquiry",
      children: [
        { to: "/enquiry/allenquiry", label: "All Enquiry" },
        { to: "/enquiry/enquiryform", label: "Enquiry Form" },
        // { to: "/enquiries/:enquiryNo", label: "Enquiry List" },
      ],
    },
    // {
    //   to: "/humanresources",
    //   icon: <FiBriefcase size={24} />,
    //   label: "Human Resources",
    //   children: [
    //     { to: "/humanresources/empleiesleavereq", label: "All Staff" },
    //     { to: "/humanresources/addstaff", label: "Add Staff" },
    //     { to: "/humanresources/editstaff", label: "Edit Staff" },
    //     { to: "/humanresources/aboutstaff", label: "About Staff" },
    //     { to: "/humanresources/staffattendance", label: "Staff Attendance" },
    //   ],
    // },
    {
      to: "/attendance",
      icon: <FiCheckSquare size={24} />,
      label: "Attendance",
      children: [
        { to: "/students/allstaff", label: "Faculty" },
        { to: "/students/addstaff", label: "Staff" },
        { to: "/students/editstaff", label: "Student" },

      ],
    },
    {
      icon: <GiTeacher size={24} />,
      label: "Session",
      children: [{ to: "/session/allstudents", label: "Add Session" }],
    },
    {
      icon: <FaFileAlt size={24} />,
      label: "Report",
      children: [
        { to: "/report/enquiry", label: "Enquiry" },
        { to: "/report/admission", label: "Admission" },
        { to: "/report/collection", label: "Collection" },
        { to: "/report/payment", label: "Payment" },
        { to: "/report/balance", label: "Balance Fees" },
        { to: "/report/profit&loss", label: "Profit & Loss" }
      ],
    },
    {
      icon: <FaUserShield size={24} />,
      label: "Admin",
      children: [
        { to: "/admin/manage-admin", label: "Manange Admin" },
        { to: "/admin/manage-location", label: "Manage Location" },
        { to: "/admin/manage-teacher", label: "Manage Teacher" },
      ],
    },

    { to: "/settings", icon: <FiSettings size={24} />, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-white shadow-md space-y-6 text-gray-800 dark:text-gray-100 dark:bg-gray-900 p-6">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">College Admin</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2 space-y-6 text-gray-800 dark:text-gray-100 dark:bg-gray-900">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                    className="flex items-center w-full  space-y-6 text-gray-800 dark:text-gray-100 dark:bg-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                  {openDropdown === index && (
                    <ul className="ml-6 mt-1 space-y-1 ">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            className={({ isActive }) =>
                              `block p-2 rounded-md text-sm space-y-6 text-gray-800 dark:text-gray-100 dark:bg-gray-900 ${
                                isActive
                                  ? "bg-blue-100 text-blue-800"
                                  : "hover:bg-gray-100"
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg ${
                      isActive
                        ? "bg-blue-50 text-blue-900"
                        : "hover:bg-gray-100"
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-4 border-t">
          <button className="flex items-center p-2 w-full rounded-lg hover:bg-gray-100 text-red-700">
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
