import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { submitAnswer } from "../lib/submitAwnser";
import { ENDPOINT } from "../lib/endpoint";

export default function Question2() {
  const navigate = useNavigate();
  const [team, setTeam] = useState("");
  const [answer, setAnswer] = useState("");
  const [locked, setLocked] = useState(false);
  const questionId = 2; // 👈 ändrat till fråga 2

  // ✅ Hämta lagets namn och tidigare status
  useEffect(() => {
    const t = localStorage.getItem("team");
    if (!t) {
      navigate("/team");
      return;
    }
    setTeam(t);

    const keyLock = `locked:q${questionId}:team:${t}`;
    const keyAns = `answer:q${questionId}:team:${t}`;
    if (localStorage.getItem(keyLock) === "1") setLocked(true);
    const prev = localStorage.getItem(keyAns);
    if (prev) setAnswer(prev);
  }, [navigate]);

  // ✅ Lås in svaret (skickas till Google Sheet)
  async function lockIn() {
    if (!answer.trim() || !team) return;
    try {
      await submitAnswer(ENDPOINT, team, questionId, answer.trim());
      setLocked(true);
      localStorage.setItem(`locked:q${questionId}:team:${team}`, "1");
      localStorage.setItem(`answer:q${questionId}:team:${team}`, answer.trim());
      alert("Svar inskickat! ✅");
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
        <h1 style={{ textAlign: "center" }}>Fråga 2</h1>
        <p style={{ textAlign: "center", marginBottom: "1rem" }}>
          Vilken färg har pumpans klassiska Halloweenlykta? 🎃
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Link
            to="/question/1"
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

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link
            to="/question/3"
            style={{ color: "#ff6600", textDecoration: "underline" }}
          >
            Nästa fråga
          </Link>
        </div>
      </div>
    </main>
  );
}
