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

  // Fire-and-forget: undvik preflight + CORS genom text/plain + no-cors.
  // Opaque response = vi kan inte läsa svaret, men Apps Script får POST:en.
  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  // Anta success (vi kan inte läsa svaret pga no-cors, men POST skickas).
  return true;
}
