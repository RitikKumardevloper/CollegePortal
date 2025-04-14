import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EnquiryDetail = () => {
  const { enquiryNo } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/admin/enquiries/getenquiriesbyenquiryNo/${enquiryNo}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch enquiry");
        }
        const data = await response.json();
        setEnquiry(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiry();
  }, [enquiryNo]);
  console.log("Enquiry No:", enquiryNo);
  console.log("Enquiry Data:", enquiry);
  console.log("Loading State:", loading);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!enquiry) {
    return (
      <div className="p-6 text-center text-red-600">Enquiry not found.</div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Enquiry Details: {enquiry.enquiryNo}
        </h2>
        <Link
          to="/enquiry/allenquiry"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          Back to List
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Student Information</h3>
          <div className="space-y-3">
            <p>
              <span className="font-medium">Name:</span> {enquiry.studentName}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {enquiry.phone}
            </p>
            <p>
              <span className="font-medium">Email:</span> {enquiry.email || "-"}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {enquiry.address || "-"}
            </p>
            <p>
              <span className="font-medium">City/State:</span> {enquiry.city}{" "}
              {enquiry.state ? `, ${enquiry.state}` : ""}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Enquiry Information</h3>
          <div className="space-y-3">
            <p>
              <span className="font-medium">Type:</span> {enquiry.enquiryType}
            </p>
            <p>
              <span className="font-medium">Date:</span> {enquiry.date}
            </p>
            <p>
              <span className="font-medium">Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  enquiry.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : enquiry.status === "Follow Up"
                    ? "bg-blue-100 text-blue-800"
                    : enquiry.status === "Converted"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {enquiry.status}
              </span>
            </p>
            <p>
              <span className="font-medium">Course Interest:</span>{" "}
              {enquiry.courseInterest || "-"}
            </p>
            {enquiry.followUpDate && (
              <p>
                <span className="font-medium">Follow-up Date:</span>{" "}
                {enquiry.followUpDate}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Enquiry Details</h3>
        <div className="p-4 bg-gray-50 rounded-md">{enquiry.enquiryDetail}</div>
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          to={`/enquiries/edit/${enquiry.enquiryNo}`}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md mr-2"
        >
          Edit Enquiry
        </Link>
      </div>
    </div>
  );
};

export default EnquiryDetail;
