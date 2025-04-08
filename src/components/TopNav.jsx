import { FiBell, FiSearch } from "react-icons/fi";
import { Avatar } from "./Avatar";
import { NavLink } from "react-router-dom";

export default function TopNav() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <FiBell className="text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <div className="flex items-center space-x-2">
            <NavLink
              to="/login"
              className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </NavLink>
          </div>

          <div className="flex items-center space-x-2">
            <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
            <span className="font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
