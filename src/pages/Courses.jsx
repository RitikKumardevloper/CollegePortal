import { courses } from "../data/courses";
import { DataTable } from "../components/DataTable";

export default function Courses() {
  const columns = [
    { key: "code", title: "Course Code" },
    { key: "title", title: "Title" },
    { key: "credits", title: "Credits" },
    { key: "department", title: "Department" },
    { key: "instructor", title: "Instructor" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add Course
        </button>
      </div>
      <DataTable columns={columns} data={courses} />
    </div>
  );
}
