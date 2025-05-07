import React from 'react';

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border">Enrollment No</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Course</th>
            <th className="py-2 px-4 border">Fee Paid</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="text-center border-t">
              <td className="py-2 px-4 border">{student.enrollmentNo}</td>
              <td className="py-2 px-4 border">{student.studentName}</td>
              <td className="py-2 px-4 border">{student.course?.courseName || 'N/A'}</td>
              <td className="py-2 px-4 border">{student.course?.isFeePaid ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => onEdit(student)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(student._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
