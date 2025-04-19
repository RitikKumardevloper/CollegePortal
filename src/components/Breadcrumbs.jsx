import { useLocation, Link } from "react-router-dom";
import {
    FiHome,
    FiUsers,
    FiBook,
    FiUser,
    FiCalendar,
    FiDollarSign,
    FiFileText,
    FiBriefcase,
    FiSettings,
    FiLogOut,
    FiCheckSquare,
  } from "react-icons/fi";
  import { MdOutlineCastForEducation } from "react-icons/md";
  import { FaFileAlt } from "react-icons/fa"; // "Report Document" look
  import { HiOutlineBuildingOffice } from "react-icons/hi2";
  import { IoLibraryOutline } from "react-icons/io5";
  import { GiTeacher } from "react-icons/gi";
  import { FaUserShield, FaChartLine } from "react-icons/fa"; // Font Awesome
  import { MdDashboard } from "react-icons/md"; // Material Design

const ICON_MAP = {
  dashboard: <FiHome />,
  students: <FiUsers />,
  teacher: <FiUser />,
  courses: <FiBook />,
  staff: <FiUsers />,
  fees: <FiDollarSign />,
  enquiry: <FiFileText />,
  attendance: <FiCheckSquare />,
  session: <GiTeacher />,
  report: <FaFileAlt />,
  admin: <FaUserShield />,
  settings: <FiSettings />,
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="px-4 py-3 bg-gray-100 text-sm text-gray-700">
      <div className="flex items-center gap-2 flex-wrap">
        <Link to="/" className="font-bold text-gray-800 flex items-center gap-1">
          Dashboard <FiHome />
        </Link>

        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const label = name.charAt(0).toUpperCase() + name.slice(1);
          const iconKey = pathnames[index - 1] || name;
          const icon = ICON_MAP[iconKey.toLowerCase()];

          return (
            <span key={routeTo} className="flex items-center gap-2">
              <span className="after:content-['>'] after:mx-1 text-gray-400" />
              {index === pathnames.length - 1 ? (
                <span className="font-semibold text-gray-900 flex items-center gap-1">
                  {icon}
                  {label.replaceAll("-", " ")}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:underline text-gray-700 flex items-center gap-1"
                >
                  {icon}
                  {label.replaceAll("-", " ")}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
