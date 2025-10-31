import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type QA = { q: number; a: string };

export default function Thanks() {
  const nav = useNavigate();
  const [team, setTeam] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  useEffect(() => {
    const t = localStorage.getItem("team");
    const m = localStorage.getItem("teamMembers");
    if (!t || !m) {
      nav("/team");
      return;
    }
    setTeam(t);
    setMembers(JSON.parse(m));
  }, [nav]);

  // Hämta alla svar för aktuellt lag ur localStorage
  const answers: QA[] = useMemo(() => {
    if (!team) return [];
    const out: QA[] = [];
    for (const k of Object.keys(localStorage)) {
      // matchar nycklar som: answer:q{num}:team:{teamName}
      const m = k.match(/^answer:q(\d+):team:(.*)$/);
      if (m && m[2] === team) {
        const q = Number(m[1]);
        const a = localStorage.getItem(k) || "";
        out.push({ q, a });
      }
    }
    // sortera på frågenummer
    out.sort((a, b) => a.q - b.q);
    return out;
  }, [team]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d0d0d",
        color: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: 520, textAlign: "center" }}>
        <h1
          style={{
            color: "#ff7518",
            fontSize: "2rem",
            marginBottom: "0.75rem",
          }}
        >
          Tack för att ni deltog! <br></br>🎃
        </h1>

        <p style={{ margin: 0 }}>
          <strong>Lag:</strong> {team}
        </p>
        {members.length > 0 && (
          <p style={{ marginTop: 4, opacity: 0.85 }}>{members.join(", ")}</p>
        )}

        <hr style={{ borderColor: "#333", margin: "1rem 0 1.25rem" }} />

        <h2
          style={{
            color: "#ff7518",
            fontSize: "1.2rem",
            marginBottom: "0.75rem",
          }}
        >
          Era inlämnade svar
        </h2>

        {answers.length === 0 ? (
          <p style={{ opacity: 0.8 }}>Inga svar hittades för detta lag.</p>
        ) : (
          <div
            style={{
              textAlign: "left",
              background: "#111",
              border: "1px solid #333",
              borderRadius: 10,
              padding: "0.75rem",
              maxHeight: "50vh",
              overflow: "auto",
            }}
          >
            {answers.map(({ q, a }) => (
              <div
                key={q}
                style={{
                  padding: "0.6rem 0.75rem",
                  borderBottom: "1px solid #222",
                }}
              >
                <div style={{ color: "#ffb347", fontWeight: 700 }}>
                  Fråga {q}
                </div>
                <div style={{ whiteSpace: "pre-wrap", marginTop: 4 }}>
                  {a || "—"}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        ></div>

        <p style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
          Tip: Arrangören ser alla svar i Google Sheet.
        </p>
      </div>
    </div>
  );
}
