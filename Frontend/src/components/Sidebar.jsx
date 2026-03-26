import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ open }) {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Doctors", path: "/doctors" },
    { name: "Users", path: "/users" }, // future
  ];

  return (
    <aside
      className={`fixed md:static top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-green-700 to-green-800 text-white transform transition-transform
      ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Brand */}
      <div className="p-6 border-b border-green-600">
        <h2 className="text-2xl font-bold">
          Pashu<span className="text-yellow-300">Seva</span>
        </h2>
        <p className="text-xs text-green-200">Admin Panel</p>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded-lg transition ${
                  location.pathname === item.path
                    ? "bg-green-600"
                    : "hover:bg-green-600"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
