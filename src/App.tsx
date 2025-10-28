import { Link } from 'react-router-dom'


export default function App() {
return (
<main className="min-h-dvh bg-black text-orange-100 flex items-center justify-center p-6">
<div className="max-w-xl w-full text-center space-y-6">
<h1 className="text-4xl font-extrabold">🎃 Halloweenquiz</h1>
<p className="opacity-80">Vågar du testa dina skräck-kunskaper?</p>
<Link to="/quiz/demo" className="inline-block rounded-2xl bg-orange-500 px-6 py-3 font-semibold hover:opacity-90">
Starta demo-quiz
</Link>
</div>
</main>
)
}