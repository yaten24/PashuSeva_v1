import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserMd,
  FaUsers,
  FaPaw,
} from "react-icons/fa";

export default function Sidebar({ open }) {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: <FaUserMd />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <FaUsers />,
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen w-72 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 shadow-2xl transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Brand */}
      <div className="p-6 border-b border-yellow-300">
        <div className="flex items-center gap-3">
          <div className="bg-white/30 p-3 text-xl">
            <FaPaw />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-wide">
              Pashu<span className="text-white">Seva</span>
            </h2>
            <p className="text-xs font-medium text-yellow-100">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4 mt-3">
        <ul className="space-y-3">
          {menu.map((item) => {
            const active = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-5 py-3 font-semibold transition-all duration-200
                  ${
                    active
                      ? "bg-white text-yellow-600 shadow-md"
                      : "hover:bg-white/30"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Card */}
      <div className="absolute bottom-6 left-4 right-4 bg-white/20 p-4 backdrop-blur-sm">
        <p className="text-sm font-semibold">Welcome Admin 👋</p>
        <p className="text-xs mt-1 text-gray-800">
          Manage doctors, users & system easily.
        </p>
      </div>
    </aside>
  );
}