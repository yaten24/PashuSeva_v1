import { useMemo } from "react";
import { listUsers } from "../../services/storage";

export default function AdminSubscriptions() {
  const rows = useMemo(() => {
    const now = Date.now();
    return listUsers()
      .map((u) => ({
        ...u,
        premiumStatus: u.premiumUntil && u.premiumUntil > now ? "ACTIVE" : "INACTIVE",
      }))
      .sort((a, b) => (b.premiumUntil || 0) - (a.premiumUntil || 0));
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h1>Subscriptions</h1>
      <p style={{ color: "#6b7280" }}>
        Premium plans should auto-expire based on validity. [file:61]
      </p>

      <div style={{ marginTop: 12, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white", border: "1px solid #e5e7eb" }}>
          <thead>
            <tr>
              {["User", "Phone", "Role", "Status", "Valid Until"].map((h) => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id}>
                <td style={td}>{u.name}</td>
                <td style={td}>{u.phone}</td>
                <td style={td}>{u.role}</td>
                <td style={td}>
                  <span style={{ fontWeight: 900, color: u.premiumStatus === "ACTIVE" ? "#16a34a" : "#ef4444" }}>
                    {u.premiumStatus}
                  </span>
                </td>
                <td style={td}>{u.premiumUntil ? new Date(u.premiumUntil).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = { textAlign: "left", padding: 10, borderBottom: "1px solid #e5e7eb", fontWeight: 900, fontSize: 13, color: "#111827" };
const td = { padding: 10, borderBottom: "1px solid #f3f4f6", fontSize: 13, color: "#111827" };
