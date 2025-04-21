import React from "react";

export default function Settings({ darkMode, toggleDarkMode }) {
  const [collegeName, setCollegeName] = React.useState("National College");
  const [academicYear, setAcademicYear] = React.useState("2023-2024");

  const handleSave = () => {
    localStorage.setItem("collegeName", collegeName);
    localStorage.setItem("academicYear", academicYear);
    // alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 text-gray-800 dark:text-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold">System Settings</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">General Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-800 dark:text-gray-200">
                College Name
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-64 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-800 dark:text-gray-200">
                Academic Year
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-64 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">User Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <span className="mr-3 text-gray-800 dark:text-gray-200">
                  Dark Mode
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={darkMode}
                    onChange={toggleDarkMode} // Trigger the parent function to toggle dark mode
                  />
                  <div
                    className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                      darkMode ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      darkMode ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
