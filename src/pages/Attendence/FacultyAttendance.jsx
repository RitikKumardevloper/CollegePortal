import { faculty } from "../../data/faculty";
import { DataTable } from "../../components/DataTable";

export default function FacultyAttendance() {
  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "department", title: "Department" },
    { key: "position", title: "Position" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Faculty Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add Faculty
        </button>
      </div>
      <DataTable columns={columns} data={faculty} />
    </div>
  );
}
