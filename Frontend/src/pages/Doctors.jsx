import { useState } from "react";

export default function Doctors() {
  const [selected, setSelected] = useState(null);

  const doctors = [
    {
      id: 1,
      name: "Dr Sharma",
      location: "Bareilly",
      specialization: "Surgery",
      experience: "7 years",
      fee: 199,
      status: "Available",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Dr Verma",
      location: "Delhi",
      specialization: "Medicine",
      experience: "10 years",
      fee: 299,
      status: "Busy",
      phone: "9123456780",
    },
    {
      id: 3,
      name: "Dr Singh",
      location: "Lucknow",
      specialization: "Animal Care",
      experience: "5 years",
      fee: 149,
      status: "Available",
      phone: "9988776655",
    },
    {
      id: 4,
      name: "Dr Khan",
      location: "Noida",
      specialization: "Surgery",
      experience: "8 years",
      fee: 249,
      status: "Available",
      phone: "8899001122",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 HEADER */}
      <div className="bg-white px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-800">
          PashuSeva Doctors
        </h1>
      </div>

      {/* 🔥 CARDS GRID */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

        {doctors.map((d) => (
          <div
            key={d.id}
            className="bg-white border border-gray-200 p-3 hover:border-green-600 transition flex flex-col"
          >
            {/* TOP */}
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  {d.name}
                </div>
                <div className="text-xs text-gray-500">
                  {d.specialization}
                </div>
              </div>

              <span
                className={`text-[10px] px-2 py-1 ${
                  d.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {d.status}
              </span>
            </div>

            {/* INFO */}
            <div className="mt-2 text-xs text-gray-600 space-y-1">
              <div>{d.location}</div>
              <div>{d.experience}</div>
            </div>

            {/* PRICE */}
            <div className="mt-2 text-green-600 font-semibold text-sm">
              ₹{d.fee}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 bg-green-600 text-white text-xs py-1.5 hover:bg-green-700"
                onClick={() => alert(`Call ${d.phone}`)}
              >
                Call
              </button>

              <button
                onClick={() => setSelected(d)}
                className="flex-1 border text-xs py-1.5 hover:bg-gray-100"
              >
                View
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* 🔥 DRAWER */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 flex justify-end">

          <div className="bg-white w-80 h-full p-4 border-l">

            <h2 className="text-lg font-semibold text-gray-800">
              {selected.name}
            </h2>

            <div className="mt-4 text-sm space-y-2 text-gray-700">
              <p><b>Specialization:</b> {selected.specialization}</p>
              <p><b>Location:</b> {selected.location}</p>
              <p><b>Experience:</b> {selected.experience}</p>
              <p><b>Fee:</b> ₹{selected.fee}</p>
              <p><b>Status:</b> {selected.status}</p>
              <p><b>Phone:</b> {selected.phone}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                className="flex-1 bg-green-600 text-white py-2 text-sm"
                onClick={() => alert(`Call ${selected.phone}`)}
              >
                Call
              </button>

              <button
                onClick={() => setSelected(null)}
                className="flex-1 border py-2 text-sm"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}