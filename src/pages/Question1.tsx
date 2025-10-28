import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { submitAnswer } from "../lib/submitAwnser";
import { ENDPOINT } from "../lib/endpoint";

export default function Question1() {
  const navigate = useNavigate();

  const [team, setTeam] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [locked, setLocked] = useState(false);
  const questionId = 1; // ändra till 2, 3, 4 osv. på nästa frågor

  // ✅ Hämta lagnamn och medlemmar från localStorage
  useEffect(() => {
    const t = localStorage.getItem("team");
    const m = JSON.parse(localStorage.getItem("teamMembers") || "[]");

    if (!t) {
      navigate("/team"); // om inget lag valt → tillbaka till team-sidan
      return;
    }

    setTeam(t);
    setMembers(m);

    // Kolla om svaret redan är låst
    const keyLock = `locked:q${questionId}:team:${t}`;
    const keyAns = `answer:q${questionId}:team:${t}`;
    if (localStorage.getItem(keyLock) === "1") setLocked(true);
    const prev = localStorage.getItem(keyAns);
    if (prev) setAnswer(prev);
  }, [navigate]);

  // ✅ Skicka svaret till Google Sheet via Apps Script
  async function lockIn() {
    if (!answer.trim() || !team) {
      alert("Skriv ett svar innan du låser in det!");
      return;
    }

    try {
      await submitAnswer(ENDPOINT, team, questionId, answer.trim(), members);

      // markera som låst lokalt
      setLocked(true);
      localStorage.setItem(`locked:q${questionId}:team:${team}`, "1");
      localStorage.setItem(`answer:q${questionId}:team:${team}`, answer.trim());

      alert("Svar inskickat! ✅");
      // navigate("/question/2"); // om du vill gå vidare automatiskt
    } catch (err) {
      alert("Kunde inte skicka svaret. Försök igen.");
      console.error(err);
    }
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
        {/* 🔸 Toppbar med laginfo */}
        <div
          style={{
            position: "sticky",
            top: 0,
            marginBottom: "1rem",
            background: "#111",
            color: "#ffedd5",
            border: "1px solid #333",
            borderRadius: 10,
            padding: "0.6rem 0.9rem",
            textAlign: "center",
          }}
        >
          <strong>Lag:</strong> {team}
          <br />
          <small>
            <strong>Medlemmar:</strong>{" "}
            {members.length > 0 ? members.join(", ") : "–"}
          </small>
        </div>

        {/* 🔸 Själva frågan */}
        <h1 style={{ textAlign: "center" }}>Fråga 1</h1>
        <p style={{ textAlign: "center", marginBottom: "1rem" }}>
          Vilket djur förknippas ofta med häxor? 🧙‍♀️
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={locked}
          placeholder="Skriv ert svar här..."
          style={{
            width: "100%",
            minHeight: 120,
            padding: "1rem",
            borderRadius: 10,
            border: "1px solid #444",
            resize: "vertical",
          }}
        />

        {/* 🔸 Knappar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Link
            to="/"
            style={{
              background: "linear-gradient(180deg, #666 0%, #333 100%)",
              color: "#fff",
              padding: "0.8rem 1.5rem",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Tillbaka
          </Link>

          <button
            onClick={lockIn}
            disabled={locked}
            style={{
              background: locked
                ? "#555"
                : "linear-gradient(180deg, #ff6600 0%, #cc5200 100%)",
              color: locked ? "#ddd" : "#000",
              padding: "0.8rem 1.5rem",
              borderRadius: "10px",
              fontWeight: "bold",
              border: "none",
              cursor: locked ? "not-allowed" : "pointer",
            }}
          >
            {locked ? "Svar låst ✅" : "Lås in svaret"}
          </button>
        </div>

        {/* 🔸 Nästa fråga */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link
            to="/question/2"
            style={{ color: "#ff6600", textDecoration: "underline" }}
          >
            Nästa fråga
          </Link>
        </div>
      </div>
    </main>
  );
}
