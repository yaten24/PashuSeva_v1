import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProduct } from "../services/storage";

export default function ProductDetails() {
  const { id } = useParams();
  const { isAuthenticated, isPremium } = useAuth();
  const p = getProduct(id);

  if (!p) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1>Product</h1>
        <p style={{ color: "#6b7280" }}>Product not found.</p>
        <Link to="/marketplace">Back to Marketplace</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 6 }}>{p.name}</h1>
      <div style={{ color: "#6b7280" }}>
        {p.location} • {String(p.category || "").toUpperCase()}
      </div>

      <div style={{ marginTop: 10, fontWeight: 900, fontSize: 18, color: "#065f46" }}>
        ₹{p.price}
      </div>

      <div style={{ marginTop: 10, padding: 12, borderRadius: 12, border: "1px solid #e5e7eb", background: "white" }}>
        <div style={{ fontWeight: 900 }}>Description</div>
        <p style={{ marginTop: 8, color: "#374151" }}>
          {p.description || "No description provided."}
        </p>

        <div style={{ marginTop: 10, fontWeight: 900 }}>Contact</div>

        {!isAuthenticated ? (
          <div style={{ marginTop: 8 }}>
            <Link to="/login" style={btn("#111827")}>Login to contact</Link>
          </div>
        ) : isPremium ? (
          <div style={{ marginTop: 8 }}>
            <a href={`tel:${p.contactNumber}`} style={btn("#16a34a")}>Call Seller</a>
          </div>
        ) : (
          <div style={{ marginTop: 8 }}>
            <Link to="/premium" style={btn("#0ea5e9")}>Upgrade to call</Link>
          </div>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <Link to="/marketplace" style={btnOutline}>← Back</Link>
      </div>
    </div>
  );
}

function btn(bg) {
  return {
    display: "inline-block",
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: 12,
    background: bg,
    color: "white",
    fontWeight: 900,
  };
}

const btnOutline = {
  display: "inline-block",
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: 12,
  background: "white",
  border: "1px solid #e5e7eb",
  color: "#111827",
  fontWeight: 900,
};
