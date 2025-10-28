import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <h1>🎃 Halloween i Eskilstorp 🎃</h1>
      <p>Invänta startsignal innan ni klickar på starta quiz!</p>
      <Link to="/question/1">Starta quiz</Link>
    </main>
  );
}
