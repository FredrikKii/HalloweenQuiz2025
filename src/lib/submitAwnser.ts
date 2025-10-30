// src/lib/submitAnswer.ts
export async function submitAnswer(
  endpoint: string,
  team: string,
  questionId: number,
  answer: string,
  members?: string[]
) {
  const payload = {
    team,
    members,
    questionId,
    answer,
    userAgent: navigator.userAgent,
  };

  // 🟠 Viktigt: "no-cors" + text/plain => ingen preflight och Apps Script tar emot
  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  return true;
}
