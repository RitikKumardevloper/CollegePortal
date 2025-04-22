import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiRefreshCw, FiPlus } from "react-icons/fi";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import OverlayModal from "../../components/OverlayModal";
import AddStudent from "./AddStudent"; // You can replace this with your form

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const mockData = [
      {
        id: 3,
        name: "John Deo",
        email: "john.deo@email.com",
        gender: "male",
        mobile: "1234567890",
        department: "computer",
        dob: "2005-04-15",
        address: "789 Pine Street, Springfield, IL",
        parentMobile: "0987654323",
        completion: "complete",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      {
        id: 4,
        name: "Jay Soni",
        email: "jay.soni@email.com",
        gender: "female",
        mobile: "1234567890",
        department: "civil",
        dob: "2005-05-10",
        address: "321 Oak Avenue, Denver, CO",
        parentMobile: "0987654324",
        completion: "incomplete",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      },
    ];
    setStudents(mockData);
  }, []);

  const filtered = students.filter((stu) =>
    stu.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Students</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <FiPlus />
          </button>

          <button className="p-2 bg-gray-300 rounded hover:bg-gray-400">
            <FiRefreshCw />
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search"
        className="w-full max-w-sm mb-4 px-3 py-2 border rounded shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table Header */}
      <div className="grid grid-cols-12 bg-gray-100 p-2 font-semibold text-gray-700 text-sm rounded-md mb-2">
        <div className="col-span-1">Enroll No</div>
        <div className="col-span-2">Name</div>
        <div className="col-span-2">Email</div>
        <div className="col-span-1">Gender</div>
        <div className="col-span-2">Mobile</div>
        <div className="col-span-1">Dept</div>
        <div className="col-span-1">DOB</div>
        <div className="col-span-2">Actions</div>
      </div>

      {/* Table Content */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-6">No students found</div>
      ) : (
        filtered.map((stu) => (
          <div
            key={stu.id}
            className="grid grid-cols-12 items-center p-2 border-b text-sm hover:bg-gray-50 transition"
          >
            <div className="col-span-1">{stu.id}</div>

            <div className="col-span-2 flex items-center gap-2 overflow-hidden">
              <img
                src={stu.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <span className="truncate whitespace-nowrap overflow-hidden max-w-[100px] sm:max-w-[140px]">
                {stu.name}
              </span>
            </div>

            <div className="col-span-2 flex items-center gap-1 overflow-hidden">
              <FaEnvelope className="text-red-500 shrink-0" />
              <span className="truncate whitespace-nowrap overflow-hidden max-w-[120px] sm:max-w-[160px]">
                {stu.email}
              </span>
            </div>

            <div className="col-span-1">
              <span
                className={`px-2 py-1 rounded-full text-white text-xs ${
                  stu.gender === "male" ? "bg-green-500" : "bg-purple-500"
                }`}
              >
                {stu.gender}
              </span>
            </div>

            <div className="col-span-2 flex items-center gap-1 overflow-hidden">
              <FaPhoneAlt className="text-green-500 shrink-0" />
              <span className="truncate whitespace-nowrap overflow-hidden max-w-[110px] sm:max-w-[130px]">
                {stu.mobile}
              </span>
            </div>

            <div className="col-span-1 capitalize">{stu.department}</div>
            <div className="col-span-1">{stu.dob}</div>

            <div className="col-span-2 flex gap-3">
              <button className="text-blue-600 hover:text-blue-800">
                <FiEdit size={20} />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        ))
      )}

      {/* Add Modal */}
      <OverlayModal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <AddStudent closeModal={() => setShowAddModal(false)} />
      </OverlayModal>
    </div>
  );
};

export default AllStudents;
