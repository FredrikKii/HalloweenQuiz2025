// src/pages/Team.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitAnswer } from "../lib/submitAwnser";
import { ENDPOINT } from "../lib/endpoint";

export default function Team() {
  const [team, setTeam] = useState("");
  const [members, setMembers] = useState<string[]>(["", ""]); // minst 2
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  // Om team redan finns sparat, gå vidare direkt (kan tas bort om du vill alltid visa sidan)
  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    const savedMembers = localStorage.getItem("teamMembers");
    if (savedTeam && savedMembers) navigate("/question/1");
  }, [navigate]);

  const canAdd = members.length < 4;
  const canRemove = members.length > 2;

  function addMember() {
    if (!canAdd) return;
    setMembers((m) => [...m, ""]);
  }

  function removeMember(index: number) {
    if (!canRemove) return;
    setMembers((m) => m.filter((_, i) => i !== index));
  }

  function updateMember(index: number, value: string) {
    setMembers((m) => m.map((v, i) => (i === index ? value : v)));
  }

  async function start() {
    const t = team.trim();
    const cleaned = members.map((m) => m.trim()).filter(Boolean);

    if (!t) {
      alert("Ange lagnamn.");
      return;
    }
    if (cleaned.length < 2) {
      alert("Ange minst två lagmedlemmar.");
      return;
    }

    // Spara lokalt
    localStorage.setItem("team", t);
    localStorage.setItem("teamMembers", JSON.stringify(cleaned));

    // Registrera laget direkt i Sheet (questionId = 0)
    try {
      setSending(true);
      await submitAnswer(ENDPOINT, t, 0, "Registrerat lag", cleaned);
      // Vi bryr oss inte om svaret (no-cors), men POST:en går fram.
    } catch (err) {
      // Om sändning av någon anledning misslyckar låter vi ändå laget gå vidare.
      console.warn("Kunde inte registrera laget just nu:", err);
    } finally {
      setSending(false);
    }

    navigate("/question/1");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "radial-gradient(circle at top, #111 0%, #000 100%)",
        color: "#ffedd5",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: 520, width: "100%" }}>
        <h1 style={{ textAlign: "center", marginBottom: 8 }}>🎃 Halloween-quiz</h1>
        <p style={{ textAlign: "center", marginBottom: 16 }}>
          Skriv in lagnamn och lagmedlemmar (2–4 st)
        </p>

        {/* Lagnamn */}
        <label style={{ display: "block", marginBottom: 6 }}>Lagnamn</label>
        <input
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          placeholder="Ex: Team Spöke"
          style={{
            width: "100%",
            padding: "0.9rem",
            borderRadius: 10,
            border: "1px solid #444",
            marginBottom: 16,
            background: "#0f0f0f",
            color: "#ffedd5",
          }}
        />

        {/* Medlemmar */}
        <label style={{ display: "block", marginBottom: 6 }}>Lagmedlemmar</label>
        <div style={{ display: "grid", gap: 10 }}>
          {members.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 8 }}>
              <input
                value={m}
                onChange={(e) => updateMember(i, e.target.value)}
                placeholder={`Medlem ${i + 1}`}
                style={{
                  flex: 1,
                  padding: "0.9rem",
                  borderRadius: 10,
                  border: "1px solid #444",
                  background: "#0f0f0f",
                  color: "#ffedd5",
                }}
              />
              {canRemove && (
                <button
                  type="button"
                  onClick={() => removeMember(i)}
                  title="Ta bort"
                  style={{
                    padding: "0.9rem 1rem",
                    borderRadius: 10,
                    border: "1px solid #444",
                    background: "#222",
                    color: "#eee",
                    cursor: "pointer",
                  }}
                >
                  −
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Kontroller */}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button
            type="button"
            onClick={addMember}
            disabled={!canAdd || sending}
            style={{
              flex: 1,
              padding: "0.9rem 1rem",
              borderRadius: 10,
              border: "none",
              background: canAdd ? "#444" : "#333",
              color: "#fff",
              cursor: canAdd && !sending ? "pointer" : "not-allowed",
            }}
          >
            + Lägg till medlem
          </button>

          <button
            onClick={start}
            disabled={sending}
            style={{
              flex: 1,
              padding: "0.9rem 1rem",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(180deg, #ff6600, #cc5200)",
              color: "#000",
              fontWeight: "bold",
              cursor: sending ? "wait" : "pointer",
              boxShadow: "0 0 10px #ff6600",
            }}
          >
            {sending ? "Startar..." : "Starta quiz"}
          </button>
        </div>

        <p style={{ opacity: 0.75, fontSize: 12, marginTop: 10, textAlign: "center" }}>
          Ditt lag registreras när du startar quizet.
        </p>
      </div>
    </main>
  );
}
