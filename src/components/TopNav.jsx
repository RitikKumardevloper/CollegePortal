import { FiBell, FiSearch } from "react-icons/fi";
import { Avatar } from "./Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuth } from "../api/auth";
import axiosInstance from "../api/axios";

export default function TopNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const res = await checkAuth();
      // console.log("DEBUG USER", res.user); // 👀 check response
      setIsAuthenticated(res.isAuthenticated);
      setUser(res.user || null);
    };
    check();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="bg-white shadow-sm space-y-6 text-gray-800 dark:text-gray-100 dark:bg-gray-900 p-6">
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

          {/* Show login/signup if not authenticated */}
          {!isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-md space-y-6 text-gray-800 dark:text-gray-100 dark:bg-gray-900 text-gray-600 hover:bg-gray-100 transition-colors"
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
          ) : (
            // Show avatar and username when authenticated
            <div className="flex items-center space-x-3">
              <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
              <span className="font-medium">
                {user?.username || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
