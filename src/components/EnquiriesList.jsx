import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EnquiriesList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    const storedEnquiries = JSON.parse(localStorage.getItem("enquiries")) || [];
    setEnquiries(storedEnquiries);
  }, []);

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.enquiryNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || enquiry.status === filterStatus;
    const matchesType =
      filterType === "All" || enquiry.enquiryType === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const updateStatus = (enquiryNo, newStatus) => {
    const updatedEnquiries = enquiries.map((enquiry) =>
      enquiry.enquiryNo === enquiryNo
        ? { ...enquiry, status: newStatus }
        : enquiry
    );
    setEnquiries(updatedEnquiries);
    localStorage.setItem("enquiries", JSON.stringify(updatedEnquiries));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Student Enquiries</h2>
        <Link
          to="/enquiries/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Add New Enquiry
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by name or enquiry no"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Converted">Converted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="All">All Types</option>
            <option value="Direct">Direct</option>
            <option value="Telephone">Telephone</option>
            <option value="Email">Email</option>
            <option value="Website">Website</option>
            <option value="Walk-in">Walk-in</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enquiry No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEnquiries.length > 0 ? (
              filteredEnquiries.map((enquiry) => (
                <tr key={enquiry.enquiryNo}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {enquiry.enquiryNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {enquiry.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {enquiry.courseInterest || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {enquiry.enquiryType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {enquiry.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={enquiry.status}
                      onChange={(e) =>
                        updateStatus(enquiry.enquiryNo, e.target.value)
                      }
                      className={`text-xs rounded-full px-2 py-1 ${
                        enquiry.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : enquiry.status === "Follow Up"
                          ? "bg-blue-100 text-blue-800"
                          : enquiry.status === "Converted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Follow Up">Follow Up</option>
                      <option value="Converted">Converted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      to={`/enquiries/${enquiry.enquiryNo}`}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No enquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiriesList;
