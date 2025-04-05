import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBook,
  FiUser,
  FiCalendar,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">College Admin</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {[
            { to: "/", icon: <FiHome />, label: "Dashboard" },
            { to: "/students", icon: <FiUsers />, label: "Students" },
            { to: "/faculty", icon: <FiUser />, label: "Faculty" },
            { to: "/courses", icon: <FiBook />, label: "Courses" },
            { to: "/attendance", icon: <FiCalendar />, label: "Attendance" },
            { to: "/settings", icon: <FiSettings />, label: "Settings" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive ? "bg-blue-50 text-blue-900" : "hover:bg-gray-100"
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
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
