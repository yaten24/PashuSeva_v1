import { useMemo } from "react";
import { listProducts, upsertProduct } from "../../services/storage";

export default function AdminModerateProducts() {
  const products = useMemo(
    () => listProducts().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
    []
  );

  const toggle = (p) => {
    upsertProduct({ ...p, isActive: !p.isActive });
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h1>Moderate Products</h1>
      <p style={{ color: "#6b7280" }}>Enable/disable listings.</p>

      <div style={{ marginTop: 14, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {products.map((p) => (
          <div key={p.id} style={card}>
            <div style={{ fontWeight: 900 }}>{p.name}</div>
            <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>
              {p.location} • {String(p.category).toUpperCase()} • ₹{p.price}
            </div>
            <div style={{ marginTop: 8, fontWeight: 900 }}>
              Status:{" "}
              <span style={{ color: p.isActive ? "#16a34a" : "#ef4444" }}>
                {p.isActive ? "ACTIVE" : "DISABLED"}
              </span>
            </div>

            <button onClick={() => toggle(p)} style={btn(p.isActive ? "#ef4444" : "#16a34a")}>
              {p.isActive ? "Disable" : "Enable"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const card = { border: "1px solid #e5e7eb", borderRadius: 16, padding: 14, background: "white" };
const btn = (bg) => ({
  marginTop: 12,
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  background: bg,
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: 900,
});
