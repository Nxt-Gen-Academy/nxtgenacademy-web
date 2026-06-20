
export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return Response.json({ error: "Failed to save" }, { status: 500 });
  }

  return Response.json({ success: true });
}