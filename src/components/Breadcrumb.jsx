import { Link, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi"; // Home icon from react-icons

export default function Breadcrumb() {
  const location = useLocation(); // Use location to get current path

  // Define the breadcrumb structure dynamically
  const breadcrumbs = [
    { label: "Home", path: "/admin/dashboard/main" },
    { label: "Teacher", path: "/admin/teacher" },
    { label: "Add Teacher", path: location.pathname }, // Current page
  ];

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <ul className="breadcrumb flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="breadcrumb-item">
            {index === breadcrumbs.length - 1 ? (
              // Last item should be text, not a link
              <span className="text-gray-600">{breadcrumb.label}</span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                {index === 0 && <FiHome className="breadcrumb-icon mr-2" />}
                {breadcrumb.label}
              </Link>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="mx-2 text-gray-500">/</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
