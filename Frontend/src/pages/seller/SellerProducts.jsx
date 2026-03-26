import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { deleteProduct, listProducts } from "../../services/storage";

export default function SellerProducts() {
  const { user } = useAuth();

  const items = useMemo(() => {
    return listProducts()
      .filter((p) => p.sellerId === user?.id)
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }, [user?.id]);

  const onDelete = (id) => {
    if (!confirm("Delete this product?")) return;
    deleteProduct(id);
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <h1>My Products</h1>
        <Link to="/seller/products/new" style={btn("#111827")}>+ Add Product</Link>
      </div>

      {items.length === 0 ? (
        <div style={{ color: "#6b7280" }}>No products yet. Add your first listing. [file:61]</div>
      ) : (
        <div style={{ marginTop: 14, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {items.map((p) => (
            <div key={p.id} style={card}>
              <div style={{ fontWeight: 900 }}>{p.name}</div>
              <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>
                {p.location} • {p.category.toUpperCase()}
              </div>
              <div style={{ marginTop: 8, fontWeight: 900, color: "#065f46" }}>₹{p.price}</div>

              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Link to={`/seller/products/${p.id}/edit`} style={btn("#0ea5e9")}>Edit</Link>
                <button onClick={() => onDelete(p.id)} style={btn2("#ef4444")}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const card = { border: "1px solid #e5e7eb", borderRadius: 16, padding: 14, background: "white" };
function btn(bg) {
  return { textDecoration: "none", padding: "10px 12px", borderRadius: 12, background: bg, color: "white", fontWeight: 900 };
}
function btn2(bg) {
  return { padding: "10px 12px", borderRadius: 12, background: bg, color: "white", fontWeight: 900, border: "none", cursor: "pointer" };
}
