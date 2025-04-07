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
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoLibraryOutline } from "react-icons/io5";

export default function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { to: "/", icon: <FiHome />, label: "Dashboard" },

    {
      icon: <HiOutlineBuildingOffice />,
      label: "Frountoffice",
      children: [
        { to: "/frontoffice/admission-inquiry", label: "Admission Inquiry" },
        { to: "/frontoffice/visitor-book", label: "Visitor Book" },
        { to: "/frontoffice/complaints", label: "Complaints" },
      ],
    },

    {
      icon: <FiUsers />,
      label: "Students",
      children: [
        { to: "/students/allstudents", label: "All Students" },
        { to: "/students/addstudents", label: "Add Students" },
        { to: "/students/edittudent", label: "Edit Students" },
        { to: "/students/aboutstudents", label: "About Student" },
        { to: "/students/studentattendance", label: "Student Attendance" },
      ],
    },
    {
      icon: <FiUser />,
      label: "Teacher",
      children: [
        { to: "/teacher/allteacher", label: "All Teacher" },
        { to: "/teacher/editteacher", label: "Edit Teacher" },
        { to: "/teacher/addteacher", label: "Add Teacher" },
        { to: "/teacher/aboutteacher", label: "About Teacher" },
        { to: "/teacher/teachertimetable", label: "Teacher TimeTable" },
      ],
    },
    {
      icon: <FiBook />,
      label: "Courses",
      children: [
        { to: "/courses/allcourses", label: "All Courses" },
        { to: "/courses/editcourses", label: "Edit Courses" },
        { to: "/courses/addcourses", label: "Add Courses" },
        { to: "/courses/aboutcourses", label: "About Courses" },
      ],
    },
    { to: "/library", icon: <IoLibraryOutline />, label: "Library" },
    { to: "/department", icon: <FiBriefcase />, label: "Department" },
    { to: "/staff", icon: <FiUsers />, label: "Staff" },
    { to: "/holiday", icon: <FiCalendar />, label: "Holiday" },
    { to: "/fees", icon: <FiDollarSign />, label: "Fees" },
    { to: "/class", icon: <FiBook />, label: "Class" },
    { to: "/enquiry", icon: <FiFileText />, label: "Enquiry" },
    { to: "/humanresources", icon: <FiBriefcase />, label: "Human Resources" },
    { to: "/attendance", icon: <FiCheckSquare />, label: "Attendance" },
    { to: "/settings", icon: <FiSettings />, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">College Admin</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                    className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                  {openDropdown === index && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            className={({ isActive }) =>
                              `block p-2 rounded-md text-sm ${
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
