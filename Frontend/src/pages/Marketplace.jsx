import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { listProducts } from "../services/storage";
import { useAuth } from "../context/AuthContext";

const cats = [
  { key: "all", label: "All" },
  { key: "bhusa", label: "Bhusa" },
  { key: "chara", label: "Chara" },
  { key: "feed", label: "Feed" },
  { key: "supplements", label: "Supplements" },
  { key: "others", label: "Others" },
];

const sorts = [
  { key: "latest", label: "Latest" },
  { key: "price_asc", label: "Price: Low → High" },
  { key: "price_desc", label: "Price: High → Low" },
];

export default function Marketplace() {
  const { isAuthenticated, isPremium } = useAuth();
  const [params, setParams] = useSearchParams();

  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState("latest");

  const cat = params.get("cat") || "all";
  const loc = params.get("loc") || "";

  const filtered = useMemo(() => {
    let all = listProducts().filter((p) => p.isActive);

    if (cat !== "all") all = all.filter((p) => p.category === cat);
    if (loc) all = all.filter((p) => (p.location || "").toLowerCase().includes(loc.toLowerCase()));

    if (q) {
      const qq = q.toLowerCase();
      all = all.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(qq) ||
          (p.description || "").toLowerCase().includes(qq)
      );
    }

    // IMPORTANT: avoid mutating original reference
    const copy = [...all];

    if (sortKey === "latest") copy.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    if (sortKey === "price_asc") copy.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    if (sortKey === "price_desc") copy.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));

    return copy;
  }, [cat, loc, q, sortKey]);

  const totalActive = useMemo(() => listProducts().filter((p) => p.isActive).length, []);

  const setCat = (c) => {
    const next = new URLSearchParams(params);
    next.set("cat", c);
    setParams(next);
  };

  const setLoc = (v) => {
    const next = new URLSearchParams(params);
    if (v) next.set("loc", v);
    else next.delete("loc");
    setParams(next);
  };

  const clearFilters = () => {
    setQ("");
    setSortKey("latest");
    setParams(new URLSearchParams());
  };

  const catLabel = cats.find((c) => c.key === cat)?.label || "All";

  return (
    <div style={pageWrap}>
      {/* Header */}
      <div style={headerRow}>
        <div style={{ minWidth: 240 }}>
          <h1 style={h1}>Marketplace</h1>
          <div style={subText}>
            Browse products category-wise, search by location, and contact sellers (Premium unlocks full access).
          </div>
        </div>

        <div style={statsPills}>
          <span style={pill}>Active: <b>{totalActive}</b></span>
          <span style={pill}>Category: <b>{catLabel}</b></span>
          <span style={pill}>Location: <b>{loc || "Any"}</b></span>
        </div>
      </div>

      {/* Notices */}
      {!isAuthenticated && (
        <div style={notice("#fffbeb", "#fde68a")}>
          Login to contact sellers. <Link to="/login">Login</Link>
        </div>
      )}

      {isAuthenticated && !isPremium && (
        <div style={notice("#ecfeff", "#a5f3fc")}>
          Free users have limited access. Upgrade to <Link to="/premium">Premium</Link>.
        </div>
      )}

      {/* Filters (responsive) */}
      <section style={{ marginTop: 14 }}>
        <div style={filterGrid}>
          <input
            placeholder="Search product name/description..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={input}
          />
          <input
            placeholder="Search by location (city/village)..."
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            style={input}
          />
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} style={input}>
            {sorts.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
          <button onClick={clearFilters} style={btnOutline}>Clear filters</button>
        </div>

        <div style={catRow}>
          {cats.map((c) => {
            const active = c.key === cat;
            return (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                style={chip(active)}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results */}
      <section style={{ marginTop: 16 }}>
        <div style={resultsBar}>
          <div style={{ color: "#111827", fontWeight: 900 }}>
            Showing: {filtered.length} result(s)
          </div>
          <div style={{ color: "#6b7280", fontSize: 13 }}>
            Tip: Location filter se nearby sellers jaldi milte hain.
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ marginTop: 14, ...card }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>No listings found</div>
            <div style={{ marginTop: 6, color: "#6b7280", fontSize: 13 }}>
              Try clearing filters or change category/location.
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={clearFilters} style={btnDark}>Reset</button>
              <Link to="/premium" style={btnBlue}>View Premium</Link>
            </div>
          </div>
        ) : (
          <div style={cardsGrid}>
            {filtered.map((p) => (
              <div key={p.id} style={card}>
                <div style={cardTop}>
                  <div style={{ fontWeight: 900, lineHeight: 1.2 }}>{p.name}</div>
                  <span style={tag}>{String(p.category).toUpperCase()}</span>
                </div>

                <div style={metaLine}>
                  {p.location || "—"} • Posted: {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "-"}
                </div>

                <div style={priceRow}>
                  <div style={priceText}>₹{p.price}</div>
                  {!isPremium && <span style={lockPill}>Contact locked</span>}
                </div>

                <div style={desc}>
                  {truncate(p.description || "No description.", 90)}
                </div>

                <div style={actionsRow}>
                  <Link to={`/product/${p.id}`} style={btnDark}>View</Link>
                  {isPremium ? (
                    <a href={`tel:${p.contactNumber}`} style={btnGreen}>Call Seller</a>
                  ) : (
                    <Link to="/premium" style={btnBlue}>Unlock Call</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* helpers */
function truncate(str, n) {
  if (!str) return "";
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

/* styles (responsive-friendly) */
const pageWrap = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "12px 12px", // ✅ mobile padding
};

const h1 = { margin: 0, fontSize: "clamp(20px, 3.2vw, 28px)" }; // fluid heading [web:114]
const subText = { marginTop: 6, color: "#6b7280", fontSize: 13, lineHeight: 1.35 };

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  alignItems: "flex-start",
};

const statsPills = { display: "flex", gap: 8, flexWrap: "wrap" };
const pill = {
  padding: "8px 10px",
  borderRadius: 999,
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  color: "#111827",
  fontSize: 12,
  fontWeight: 800,
};

const filterGrid = {
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", // ✅ mobile -> 1 col [web:111]
  alignItems: "stretch",
};

const input = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  outline: "none",
  background: "white",
  fontWeight: 800,
};

const catRow = { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 };
const chip = (active) => ({
  padding: "10px 12px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  background: active ? "#111827" : "white",
  color: active ? "white" : "#111827",
  fontWeight: 900,
  cursor: "pointer",
});

const resultsBar = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
};

const cardsGrid = {
  marginTop: 14,
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", // ✅ prevents overflow [web:111]
};

const card = {
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 14,
  background: "white",
  boxShadow: "0 1px 0 rgba(0,0,0,0.03)",
};

const cardTop = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" };
const metaLine = { color: "#6b7280", fontSize: 13, marginTop: 6 };

const tag = {
  fontSize: 11,
  fontWeight: 900,
  padding: "4px 8px",
  borderRadius: 999,
  background: "#ecfeff",
  border: "1px solid #a5f3fc",
  color: "#0e7490",
  whiteSpace: "nowrap",
};

const priceRow = {
  marginTop: 10,
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
};

const priceText = { fontWeight: 900, color: "#065f46", fontSize: 18 };

const lockPill = {
  padding: "6px 10px",
  borderRadius: 999,
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  color: "#9a3412",
  fontSize: 12,
  fontWeight: 900,
};

const desc = { marginTop: 10, color: "#374151", fontSize: 14, lineHeight: 1.35 };

const actionsRow = { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 };

function notice(bg, border) {
  return { marginTop: 12, padding: 12, borderRadius: 12, background: bg, border: `1px solid ${border}` };
}

const btnBase = {
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: 12,
  fontWeight: 900,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
};

const btnDark = { ...btnBase, background: "#111827", color: "white" };
const btnGreen = { ...btnBase, background: "#16a34a", color: "white" };
const btnBlue = { ...btnBase, background: "#0ea5e9", color: "white" };

const btnOutline = {
  ...btnBase,
  background: "white",
  border: "1px solid #e5e7eb",
  color: "#111827",
  cursor: "pointer",
};
