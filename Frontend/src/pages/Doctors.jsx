import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useAuth } from "../context/AuthContext";

export default function Doctors() {
  const { isAuthenticated, isPremium, user } = useAuth();

  const [globalFilter, setGlobalFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [specFilter, setSpecFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);

  // ✅ Dummy data (API ready) — add isVerified to match SRS flow
  const data = useMemo(
    () => [
      {
        id: "d1",
        name: "Dr Sharma",
        location: "Bareilly",
        specialization: "Surgery",
        qualification: "BVSc",
        experienceYears: 7,
        fee: 199,
        phone: "9876543210",
        status: "Available",
        isVerified: true,
      },
      {
        id: "d2",
        name: "Dr Verma",
        location: "Delhi",
        specialization: "Medicine",
        qualification: "MVSc",
        experienceYears: 10,
        fee: 299,
        phone: "9123456780",
        status: "Busy",
        isVerified: true,
      },
      {
        id: "d3",
        name: "Dr Singh",
        location: "Lucknow",
        specialization: "Animal Care",
        qualification: "BVSc",
        experienceYears: 5,
        fee: 149,
        phone: "9988776655",
        status: "Available",
        isVerified: false,
      },
    ],
    []
  );

  const locationOptions = useMemo(() => {
    const s = new Set(data.map((d) => d.location));
    return ["", ...Array.from(s)];
  }, [data]);

  const specOptions = useMemo(() => {
    const s = new Set(data.map((d) => d.specialization));
    return ["", ...Array.from(s)];
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        d.specialization.toLowerCase().includes(globalFilter.toLowerCase()) ||
        d.location.toLowerCase().includes(globalFilter.toLowerCase());

      const matchesLocation = locationFilter ? d.location === locationFilter : true;
      const matchesSpec = specFilter ? d.specialization === specFilter : true;
      const matchesStatus = statusFilter ? d.status === statusFilter : true;

      // Optional: show only verified doctors (SRS-style)
      // const matchesVerified = d.isVerified === true;

      return matchesSearch && matchesLocation && matchesSpec && matchesStatus;
    });
  }, [data, globalFilter, locationFilter, specFilter, statusFilter]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Doctor",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 font-bold">
              {(row.original.name || "D").slice(0, 1)}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-gray-900 truncate">
                {row.original.name}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {row.original.qualification} • {row.original.experienceYears} yrs
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue()}</span>
        ),
      },
      {
        accessorKey: "specialization",
        header: "Specialization",
        cell: ({ getValue }) => (
          <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "fee",
        header: "Fee",
        cell: ({ getValue }) => (
          <span className="font-semibold text-emerald-700">₹{getValue()}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
              getValue() === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "isVerified",
        header: "Verified",
        cell: ({ getValue }) => (
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
              getValue()
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {getValue() ? "Verified" : "Pending"}
          </span>
        ),
      },
      {
        header: "Action",
        cell: ({ row }) => {
          const d = row.original;
          const canCall = isAuthenticated && isPremium && d.isVerified;

          return (
            <div className="flex flex-wrap gap-2">
              {canCall ? (
                <a
                  href={`tel:${d.phone}`}
                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Call
                </a>
              ) : (
                <Link
                  to={isAuthenticated ? "/premium" : "/login"}
                  className="rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Unlock Call
                </Link>
              )}

              <button
                onClick={() => setSelected(d)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                View
              </button>
            </div>
          );
        },
      },
    ],
    [isAuthenticated, isPremium]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const total = data.length;
  const showing = filteredData.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-emerald-700">
                Available Pashu Chikitsak
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Find verified doctors and consult (Premium unlocks calls).
              </p>
            </div>

            {user?.role === "doctor" && (
              <Link
                to="/doctor/profile"
                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Update my profile
              </Link>
            )}
          </div>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="text-sm text-gray-500">Total doctors</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{total}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="text-sm text-gray-500">Showing</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{showing}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="text-sm text-gray-500">Tip</div>
              <div className="mt-1 text-sm font-semibold text-gray-900">
                Location + specialization select karo.
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap gap-3">
            <input
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400 sm:w-72"
              placeholder="Search doctor / location / specialization..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />

            <select
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm sm:w-56"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {locationOptions
                .filter(Boolean)
                .map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
            </select>

            <select
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm sm:w-56"
              value={specFilter}
              onChange={(e) => setSpecFilter(e.target.value)}
            >
              <option value="">All Specializations</option>
              {specOptions
                .filter(Boolean)
                .map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
            </select>

            <select
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm sm:w-44"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
            </select>

            <button
              onClick={() => {
                setGlobalFilter("");
                setLocationFilter("");
                setSpecFilter("");
                setStatusFilter("");
              }}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 sm:w-auto"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Mobile cards */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {filteredData.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-600">
              No doctors found
            </div>
          ) : (
            filteredData.map((d) => {
              const canCall = isAuthenticated && isPremium && d.isVerified;

              return (
                <div key={d.id} className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-base font-bold text-gray-900">{d.name}</div>
                      <div className="mt-1 text-sm text-gray-600">
                        {d.qualification} • {d.specialization} • {d.location}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Fee ₹{d.fee}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            d.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {d.status}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            d.isVerified
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {d.isVerified ? "Verified" : "Pending"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelected(d)}
                      className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900"
                    >
                      View
                    </button>
                  </div>

                  <div className="mt-3 flex gap-2">
                    {canCall ? (
                      <a
                        href={`tel:${d.phone}`}
                        className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white"
                      >
                        Call
                      </a>
                    ) : (
                      <Link
                        to={isAuthenticated ? "/premium" : "/login"}
                        className="w-full rounded-xl bg-sky-600 px-4 py-2 text-center text-sm font-semibold text-white"
                      >
                        Unlock Call
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
          <table className="w-full border-collapse">
            <thead className="bg-emerald-50">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-700"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-8 text-center text-gray-500">
                    No doctors found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap border-t px-4 py-3 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelected(null)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <div>
                <div className="text-lg font-bold text-gray-900">{selected.name}</div>
                <div className="text-sm text-gray-600">
                  {selected.qualification} • {selected.specialization}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900"
              >
                Close
              </button>
            </div>

            <div className="p-4 space-y-3">
              <InfoRow label="Location" value={selected.location} />
              <InfoRow label="Experience" value={`${selected.experienceYears} years`} />
              <InfoRow label="Consultation fee" value={`₹${selected.fee}`} />
              <InfoRow label="Status" value={selected.status} />
              <InfoRow label="Verified" value={selected.isVerified ? "Yes" : "Pending"} />
              <InfoRow label="Phone" value={selected.phone} />

              <div className="pt-2 flex flex-col gap-2">
                {isAuthenticated && isPremium && selected.isVerified ? (
                  <a
                    href={`tel:${selected.phone}`}
                    className="rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    Call Now
                  </a>
                ) : (
                  <Link
                    to={isAuthenticated ? "/premium" : "/login"}
                    className="rounded-xl bg-sky-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-sky-700"
                  >
                    Unlock Consultation
                  </Link>
                )}

                <Link
                  to="/consultations"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  View consultation history
                </Link>
              </div>

              {!selected.isVerified && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                  This doctor profile is pending verification (admin approval required).
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 p-3">
      <div className="text-xs font-semibold text-gray-500">{label}</div>
      <div className="text-sm font-semibold text-gray-900 text-right">{value}</div>
    </div>
  );
}
