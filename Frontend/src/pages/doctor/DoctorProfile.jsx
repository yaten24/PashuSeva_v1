import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDoctorByUserId, uid, upsertDoctor } from "../../services/storage";

export default function DoctorProfile() {
  const { user } = useAuth();

  const existing = useMemo(() => getDoctorByUserId(user?.id), [user?.id]);

  const [name, setName] = useState(existing?.name || user?.name || "");
  const [qualification, setQualification] = useState(existing?.qualification || "");
  const [specialization, setSpecialization] = useState(existing?.specialization || "");
  const [experienceYears, setExperienceYears] = useState(existing?.experienceYears || "");
  const [fee, setFee] = useState(existing?.fee || "");
  const [phone, setPhone] = useState(existing?.phone || user?.phone || "");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr(""); setMsg("");

    if (!name || !qualification || !specialization || !experienceYears || !fee || !phone) {
      setErr("All fields are required.");
      return;
    }

    const doc = {
      id: existing?.id || uid("d"),
      userId: user.id,
      name,
      qualification,
      specialization,
      experienceYears: Number(experienceYears),
      fee: Number(fee),
      phone,
      isVerified: existing?.isVerified || false, // admin will verify
      createdAt: existing?.createdAt || Date.now(),
    };

    upsertDoctor(doc);
    setMsg("Profile saved. Admin verification pending.");
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Doctor Profile</h1>
      <p style={{ color: "#6b7280" }}>
        Admin verification is mandatory before your profile becomes visible. [file:61]
      </p>

      {existing && (
        <div style={{ marginTop: 10, padding: 12, borderRadius: 12, border: "1px solid #e5e7eb", background: "white" }}>
          <b>Status:</b> {existing.isVerified ? "VERIFIED" : "PENDING"}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ marginTop: 12, display: "grid", gap: 10 }}>
        <input placeholder="Doctor name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Qualification (e.g., BVSc/MVSc)" value={qualification} onChange={(e) => setQualification(e.target.value)} />
        <input placeholder="Specialization (e.g., Cattle, Goat, Poultry)" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
        <input placeholder="Experience (years)" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} />
        <input placeholder="Consultation fee (₹)" value={fee} onChange={(e) => setFee(e.target.value)} />
        <input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />

        {err && <div style={{ color: "crimson" }}>{err}</div>}
        {msg && <div style={{ color: "#065f46", fontWeight: 800 }}>{msg}</div>}

        <button style={primaryBtn} type="submit">Save Profile</button>
      </form>
    </div>
  );
}

const primaryBtn = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#111827",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};
