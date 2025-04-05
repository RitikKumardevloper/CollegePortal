export default function Attendance() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Attendance Tracking</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Today's Classes</h2>
          <select className="border border-gray-300 rounded-lg p-2">
            <option>All Courses</option>
            <option>Computer Science</option>
            <option>Electrical Engineering</option>
            <option>Business</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left">Course</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Students</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  course: "CS101 - Intro to CS",
                  time: "9:00 AM",
                  students: 45,
                  status: "Pending",
                },
                {
                  course: "EE201 - Circuit Analysis",
                  time: "11:00 AM",
                  students: 32,
                  status: "Pending",
                },
                {
                  course: "BUS301 - Business Mgmt",
                  time: "2:00 PM",
                  students: 28,
                  status: "Completed",
                },
              ].map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{item.course}</td>
                  <td className="py-3 px-4">{item.time}</td>
                  <td className="py-3 px-4">{item.students}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
