import { useMemo } from "react";
import { listDoctors, upsertDoctor } from "../../services/storage";

export default function AdminVerifyDoctors() {
  const doctors = useMemo(() => listDoctors().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)), []);

  const toggle = (doc) => {
    upsertDoctor({ ...doc, isVerified: !doc.isVerified });
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <h1>Verify Doctors</h1>
      <p style={{ color: "#6b7280" }}>Admin verification is mandatory for activation. [file:61]</p>

      <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
        {doctors.map((d) => (
          <div key={d.id} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 900 }}>{d.name}</div>
                <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>
                  {d.qualification} • {d.specialization} • {d.experienceYears} yrs • Fee ₹{d.fee}
                </div>
                <div style={{ marginTop: 6, fontWeight: 900 }}>
                  Status: <span style={{ color: d.isVerified ? "#16a34a" : "#ef4444" }}>{d.isVerified ? "VERIFIED" : "PENDING"}</span>
                </div>
              </div>

              <button onClick={() => toggle(d)} style={btn(d.isVerified ? "#ef4444" : "#16a34a")}>
                {d.isVerified ? "Mark Pending" : "Verify"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const card = { border: "1px solid #e5e7eb", borderRadius: 16, padding: 14, background: "white" };
function btn(bg) {
  return { padding: "10px 12px", borderRadius: 12, background: bg, color: "white", border: "none", cursor: "pointer", fontWeight: 900 };
}
