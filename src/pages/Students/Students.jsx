import { useState } from "react";
import { students } from "../../data/students";
import { DataTable } from "../../components/DataTable";
import Breadcrumb from "../../components/Breadcrumb";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "program", title: "Program" },
    { key: "year", title: "Year" },
    { key: "status", title: "Status" },
  ];

  return (
    <>
  
      <div className="space-y-6m ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Management</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Add Student
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Search students..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DataTable columns={columns} data={filteredStudents} />
      </div>
    </>
  );
}
