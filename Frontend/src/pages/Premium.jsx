import { useAuth } from "../context/AuthContext";

const plans = [
  { key: "weekly", title: "Weekly", days: 7, price: 49 },
  { key: "monthly", title: "Monthly", days: 30, price: 149 },
  { key: "quarterly", title: "Quarterly", days: 90, price: 399 },
];

export default function Premium() {
  const { user, isPremium, activatePremium } = useAuth();

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Premium Subscription</h1>
      <p style={{ color: "#6b7280" }}>
        Premium unlocks unlimited seller contact + doctor consultations. [file:61]
      </p>

      <div style={{ marginTop: 10, padding: 12, borderRadius: 12, border: "1px solid #e5e7eb", background: "white" }}>
        <div style={{ fontWeight: 900 }}>Status: {isPremium ? "ACTIVE" : "INACTIVE"}</div>
        <div style={{ color: "#6b7280", marginTop: 6, fontSize: 13 }}>
          Valid until: {user?.premiumUntil ? new Date(user.premiumUntil).toLocaleString() : "Not active"}
        </div>
      </div>

      <div style={{ marginTop: 16, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {plans.map((p) => (
          <div key={p.key} style={card}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>{p.title}</div>
            <div style={{ marginTop: 6, color: "#6b7280", fontSize: 13 }}>{p.days} days access</div>
            <div style={{ marginTop: 10, fontWeight: 900, color: "#065f46", fontSize: 18 }}>₹{p.price}</div>

            <button
              style={primaryBtn}
              onClick={() => {
                // Demo payment success (UPI integration later)
                activatePremium(p.key);
                alert("Demo: Payment success. Premium activated.");
              }}
            >
              Pay via UPI (Demo)
            </button>

            <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
              Gateway later: UPI integration + auto-expiry tracking. [file:61]
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const card = { border: "1px solid #e5e7eb", borderRadius: 16, padding: 14, background: "white" };
const primaryBtn = {
  marginTop: 12,
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#111827",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};
