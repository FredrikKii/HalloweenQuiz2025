import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0d0d0d",
        color: "#fff",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "#ff7518" }}>Halloween i Eskilstorp </h1>
        <h1>🎃</h1>
        <button
          onClick={() => nav("/team")}
          style={{
            marginTop: "1rem",
            padding: "0.9rem 2rem",
            background: "#ff7518",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
        >
          Starta quiz
        </button>
      </div>
    </main>
  );
}
