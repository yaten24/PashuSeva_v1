import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <h1>Admin Panel</h1>
      <p style={{ color: "#6b7280" }}>
        Manage users, verify doctors, moderate products, manage subscriptions. [file:61]
      </p>

      <div style={{ marginTop: 14, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <AdminCard title="Users" desc="View platform users" to="/admin/users" />
        <AdminCard title="Verify Doctors" desc="Approve doctor profiles" to="/admin/doctors" />
        <AdminCard title="Moderate Products" desc="Enable/disable listings" to="/admin/products" />
        <AdminCard title="Subscriptions" desc="Premium validity overview" to="/admin/subscriptions" />
      </div>
    </div>
  );
}

function AdminCard({ title, desc, to }) {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, padding: 14, background: "white" }}>
        <div style={{ fontWeight: 900, color: "#111827" }}>{title}</div>
        <div style={{ marginTop: 6, color: "#6b7280", fontSize: 13 }}>{desc}</div>
        <div style={{ marginTop: 10, fontWeight: 900, color: "#065f46" }}>Open →</div>
      </div>
    </Link>
  );
}
