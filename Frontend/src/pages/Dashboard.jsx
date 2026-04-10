import {
  User,
  Phone,
  Mail,
  MapPin,
  Edit,
  ClipboardList,
  ShoppingBag,
  LogOut,
} from "lucide-react";

export default function Profile() {
  // ✅ Demo User
  const user = {
    name: "Yatendra Singh",
    email: "yatendra@gmail.com",
    phone: "+91 9876543210",
    location: "Meerut, Uttar Pradesh",
    image: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <div className="bg-gray-50 min-h-screen py-5">
      
      {/* 🔥 TOP PROFILE CARD */}
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm">
        {/* Profile Image */}
        <img
          src={user.image}
          alt="profile"
          className="w-16 h-16 rounded-full object-cover border"
        />

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800">
            {user.name}
          </h2>

          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Mail size={14} />
            {user.email}
          </div>

          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Phone size={14} />
            {user.phone}
          </div>
        </div>
      </div>

      {/* 🔥 MENU LIST (APP STYLE) */}
      <div className="mt-4 bg-white rounded-xl shadow-sm overflow-hidden">

        {/* Edit Profile */}
        <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50">
          <Edit className="text-green-600" size={18} />
          <span className="text-gray-700 font-medium">Edit Profile</span>
        </button>

        {/* Orders */}
        <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50">
          <ShoppingBag className="text-blue-600" size={18} />
          <span className="text-gray-700 font-medium">My Orders</span>
        </button>

        {/* Consultations */}
        <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50">
          <ClipboardList className="text-purple-600" size={18} />
          <span className="text-gray-700 font-medium">
            My Consultations
          </span>
        </button>

        {/* Location */}
        <div className="flex items-center gap-3 p-4 border-b">
          <MapPin className="text-red-500" size={18} />
          <span className="text-gray-600 text-sm">
            {user.location}
          </span>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center gap-3 p-4 hover:bg-red-50">
          <LogOut className="text-red-600" size={18} />
          <span className="text-red-600 font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}