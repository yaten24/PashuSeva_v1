import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getProduct, uid, upsertProduct } from "../../services/storage";

const options = [
  { key: "bhusa", label: "Bhusa" },
  { key: "chara", label: "Chara" },
  { key: "feed", label: "Feed" },
  { key: "supplements", label: "Supplements" },
  { key: "others", label: "Others" },
];

export default function ProductForm({ mode = "create" }) {
  const { user } = useAuth();
  const { id } = useParams();
  const nav = useNavigate();

  const existing = useMemo(() => (mode === "edit" ? getProduct(id) : null), [mode, id]);

  const [name, setName] = useState(existing?.name || "");
  const [category, setCategory] = useState(existing?.category || "bhusa");
  const [price, setPrice] = useState(existing?.price || "");
  const [location, setLocation] = useState(existing?.location || "");
  const [description, setDescription] = useState(existing?.description || "");
  const [contactNumber, setContactNumber] = useState(existing?.contactNumber || user?.phone || "");
  const [isActive, setIsActive] = useState(existing?.isActive ?? true);
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!name || !price || !location || !contactNumber) {
      setErr("Name, price, location, contact number required.");
      return;
    }

    const product = {
      id: existing?.id || uid("p"),
      sellerId: user.id,
      name,
      category,
      price: Number(price),
      location,
      description,
      images: existing?.images || [],
      contactNumber,
      isActive,
      createdAt: existing?.createdAt || Date.now(),
    };

    upsertProduct(product);
    nav("/seller/products", { replace: true });
  };

  if (mode === "edit" && !existing) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1>Edit Product</h1>
        <p style={{ color: "#6b7280" }}>Product not found.</p>
        <Link to="/seller/products">Back</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h1>{mode === "edit" ? "Edit Product" : "Add Product"}</h1>
      <p style={{ color: "#6b7280" }}>
        Seller product details: name, category, price, location, description, contact number. [file:61]
      </p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <input placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {options.map((o) => (
            <option key={o.key} value={o.key}>{o.label}</option>
          ))}
        </select>
        <input placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="Location (city/village)" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input placeholder="Contact number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        <textarea placeholder="Description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Active listing
        </label>

        {err && <div style={{ color: "crimson" }}>{err}</div>}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button type="submit" style={btn2("#111827")}>Save</button>
          <Link to="/seller/products" style={btn("white", "#111827")}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}

function btn(bg, color) {
  return { padding: "10px 12px", borderRadius: 12, background: bg, color, border: "1px solid #e5e7eb", textDecoration: "none", fontWeight: 900 };
}
function btn2(bg) {
  return { padding: "10px 12px", borderRadius: 12, background: bg, color: "white", border: "none", cursor: "pointer", fontWeight: 900 };
}
