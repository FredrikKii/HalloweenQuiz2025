import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { submitAnswer } from "../lib/submitAwnser";
import { ENDPOINT } from "../lib/endpoint";

export default function Question1() {
  const [team, setTeam] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [locked, setLocked] = useState(false);
  const [status, setStatus] = useState("");
  const nav = useNavigate();
  const questionId = 1;

  useEffect(() => {
    const t = localStorage.getItem("team");
    const m = localStorage.getItem("teamMembers");
    if (t) setTeam(t);
    if (m) setMembers(JSON.parse(m));

    // hämta ev. låsning / tidigare svar
    if (t) {
      const keyLock = `locked:q${questionId}:team:${t}`;
      const keyAns = `answer:q${questionId}:team:${t}`;
      if (localStorage.getItem(keyLock) === "1") setLocked(true);
      const prev = localStorage.getItem(keyAns);
      if (prev) setAnswer(prev);
    }
  }, []);

  async function lockIn() {
    if (locked || !answer.trim()) return;
    setStatus("Skickar...");
    try {
      await submitAnswer(ENDPOINT, team, questionId, answer.trim(), members);
      setLocked(true);
      setStatus("✅ Svar skickat!");
      localStorage.setItem(`locked:q${questionId}:team:${team}`, "1");
      localStorage.setItem(`answer:q${questionId}:team:${team}`, answer.trim());
    } catch (err) {
      console.error("Kunde inte skicka svaret:", err);
      setStatus("❌ Kunde inte skicka svaret. Försök igen.");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#0d0d0d",
        color: "#f5f5f5",
        textAlign: "center",
        // padding: "1.5rem",
        height: "667px",
      }}
    >
      <h2
        style={{ color: "#ff7518", marginBottom: "1rem", fontSize: "1.8rem" }}
      >
        Fråga 1 🎃
      </h2>

      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Lag:</strong> {team}
      </p>
      {members.length > 0 && (
        <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "1.5rem" }}>
          {members.join(", ")}
        </p>
      )}

      <p style={{ marginTop: "0.5rem", maxWidth: "300px" }}>
        Vilken klassisk skräckfilm från 1973 handlar om en liten flicka som blir
        besatt av en demon, och där en präst försöker driva ut ondskan?
      </p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={locked}
        placeholder="Skriv ditt svar här..."
        rows={3}
        style={{
          marginTop: "1rem",
          padding: "0.8rem",
          width: "90%",
          maxWidth: "320px",
          borderRadius: "8px",
          border: "2px solid #ff7518",
          backgroundColor: locked ? "#1a1a1a" : "#111",
          color: "#fff",
          fontSize: "1rem",
          resize: "none",
          textAlign: "center",
        }}
      />

      <button
        onClick={lockIn}
        disabled={locked}
        style={{
          marginTop: "1.5rem",
          padding: "0.8rem 2rem",
          backgroundColor: locked ? "#333" : "#ff7518",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1.1rem",
          border: "none",
          borderRadius: "8px",
          cursor: locked ? "not-allowed" : "pointer",
          transition: "0.2s ease",
        }}
      >
        {locked ? "Svar låst ✅" : "Lås in svaret"}
      </button>

      {status && !locked && (
        <p
          style={{
            marginTop: "1rem",
            color: status.startsWith("✅") ? "#6aff6a" : "#ff4444",
            fontSize: "0.95rem",
          }}
        >
          {status}
        </p>
      )}

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => nav("/")}
          style={{
            background: "#ff7518",
            color: "#fff",
            padding: "0.8rem 2rem",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "0.2s ease",
          }}
        >
          ← Tillbaka
        </button>

        <button
          onClick={() => nav("/question/2")}
          style={{
            background: "none",
            border: "2px solid #ff7518",
            color: "#ff7518",
            padding: "0.8rem 2rem",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "0.2s ease",
          }}
        >
          Nästa fråga →
        </button>
      </div>
    </div>
  );
}
