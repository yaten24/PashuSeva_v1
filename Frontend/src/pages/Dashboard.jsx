import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    // ✅ min-h-screen removed (Layout handles height)
    // ✅ pb-20 so fixed bottom nav doesn't cover content on mobile
    <div className="bg-gray-50 px-4 py-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Welcome, <span className="text-green-700">{user?.name}</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your consultations and find nearby Pashu Chikitsak
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500">Available Doctors</p>
          <h2 className="text-4xl font-bold text-green-700 mt-2">24</h2>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500">Consultations</p>
          <h2 className="text-4xl font-bold text-blue-600 mt-2">5</h2>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500">Subscription Status</p>
          <p className="mt-3 text-green-600 font-semibold">Active</p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500">Support</p>
          <p className="mt-3 text-gray-700">24×7 Available</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-3">Find a Doctor</h3>
          <p className="text-gray-600 mb-4">
            Browse verified Pashu Chikitsak near your location
          </p>
          <Link
            to="/doctors"
            className="inline-flex items-center justify-center bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            View Doctors
          </Link>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-3">My Consultations</h3>
          <p className="text-gray-600 mb-4">
            View your past and ongoing consultations
          </p>
          <button className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            View History
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex justify-between gap-4">
            <span className="truncate">Consulted Dr Sharma</span>
            <span className="text-gray-400 whitespace-nowrap">2 days ago</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="truncate">Subscription renewed</span>
            <span className="text-gray-400 whitespace-nowrap">5 days ago</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="truncate">Viewed Dr Verma profile</span>
            <span className="text-gray-400 whitespace-nowrap">1 week ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
