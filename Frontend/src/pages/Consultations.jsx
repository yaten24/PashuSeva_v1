import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addConsult, listConsults, listDoctors, uid } from "../services/storage";

export default function Consultations() {
  const { user, isPremium } = useAuth();
  const [note, setNote] = useState("");

  const doctors = useMemo(() => listDoctors().filter((d) => d.isVerified), []);
  const myConsults = useMemo(() => {
    const all = listConsults().filter((c) => c.userId === user?.id);
    const docMap = new Map(listDoctors().map((d) => [d.id, d]));
    return all.map((c) => ({ ...c, doctor: docMap.get(c.doctorId) }));
  }, [user?.id]);

  const [doctorId, setDoctorId] = useState(doctors[0]?.id || "");

  const createDemoConsult = () => {
    if (!doctorId) return;

    addConsult({
      id: uid("c"),
      userId: user.id,
      doctorId,
      note: note || "Phone consultation",
      createdAt: Date.now(),
    });

    setNote("");
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: 950, margin: "0 auto" }}>
      <h1>Consultation History</h1>

      {!isPremium && (
        <div style={notice}>
          Doctor consultations are premium benefit. <Link to="/premium">Upgrade</Link>
        </div>
      )}

      <div style={{ marginTop: 12, display: "grid", gap: 12, gridTemplateColumns: "1fr" }}>
        <div style={card}>
          <div style={{ fontWeight: 900 }}>Add consultation (demo)</div>
          <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>
            Doctors page se call karne ke baad backend me history save hogi; demo me manually add kar rahe hain.
          </div>

          <div style={{ marginTop: 10, display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
            <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} style={input}>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.specialization})
                </option>
              ))}
            </select>

            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note (optional)"
              style={input}
            />
          </div>

          <button onClick={createDemoConsult} style={btnDark}>
            Save consultation
          </button>
        </div>

        {myConsults.length === 0 ? (
          <div style={{ color: "#6b7280" }}>No consultations yet.</div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {myConsults.map((c) => (
              <div key={c.id} style={card}>
                <div style={{ fontWeight: 900 }}>{c.doctor?.name || "Doctor"}</div>
                <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>
                  {new Date(c.createdAt).toLocaleString()} • Fee: ₹{c.doctor?.fee ?? "-"}
                </div>
                <div style={{ marginTop: 8, color: "#374151" }}>{c.note}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const card = { border: "1px solid #e5e7eb", borderRadius: 16, padding: 14, background: "white" };
const input = { padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb", outline: "none" };
const btnDark = { marginTop: 10, padding: "10px 12px", borderRadius: 12, border: "none", background: "#111827", color: "white", fontWeight: 900, cursor: "pointer" };
const notice = { padding: 12, borderRadius: 12, background: "#ecfeff", border: "1px solid #a5f3fc" };
