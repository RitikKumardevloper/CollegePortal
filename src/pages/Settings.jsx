export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">System Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">General Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label>College Name</label>
              <input
                type="text"
                defaultValue="National College"
                className="border border-gray-300 rounded-lg p-2 w-64"
              />
            </div>
            <div className="flex items-center justify-between">
              <label>Academic Year</label>
              <input
                type="text"
                defaultValue="2023-2024"
                className="border border-gray-300 rounded-lg p-2 w-64"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">User Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label>Dark Mode</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
