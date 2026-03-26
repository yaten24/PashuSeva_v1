import { useMemo } from "react";
import { listUsers } from "../../services/storage";

export default function AdminUsers() {
  const users = useMemo(() => listUsers().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)), []);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h1>Users</h1>
      <p style={{ color: "#6b7280" }}>Admin can manage platform users. [file:61]</p>

      {users.length === 0 ? (
        <div style={{ color: "#6b7280" }}>No users yet (register some demo accounts).</div>
      ) : (
        <div style={{ marginTop: 12, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "white", border: "1px solid #e5e7eb" }}>
            <thead>
              <tr>
                {["Name", "Phone", "Role", "Premium Until"].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={td}>{u.name}</td>
                  <td style={td}>{u.phone}</td>
                  <td style={td}>{u.role}</td>
                  <td style={td}>{u.premiumUntil ? new Date(u.premiumUntil).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const th = { textAlign: "left", padding: 10, borderBottom: "1px solid #e5e7eb", fontWeight: 900, fontSize: 13, color: "#111827" };
const td = { padding: 10, borderBottom: "1px solid #f3f4f6", fontSize: 13, color: "#111827" };
