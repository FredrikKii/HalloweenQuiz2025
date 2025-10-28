import { Link } from "react-router-dom";

export default function Question3() {
  return (
    <main>
      <h1>Fråga 3</h1>
      <p>Lorem Ipsum</p>

      <div style={{ display: "grid", gap: "1rem", width: "100%", maxWidth: "400px" }}>
        <button>asd</button>
        <button>fgdhfgh</button>
        <button>Lasdfa</button>
        <button>Vitasdfq</button>
      </div>

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "2rem",
  }}
>
  <Link
    to="/Question/2"
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

  <Link
    to="/question/2"
    style={{
      background: "linear-gradient(180deg, #ff6600 0%, #cc5200 100%)",
      color: "#000",
      padding: "0.8rem 1.5rem",
      borderRadius: "10px",
      textDecoration: "none",
      fontWeight: "bold",
      boxShadow: "0 0 8px #ff6600",
    }}
  >
    Nästa fråga
  </Link>
</div>

    </main>
  );
}
