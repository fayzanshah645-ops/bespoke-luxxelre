import { NextResponse } from "next/server";
import { sql, type SubscriberRow } from "../../lib/db";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const email = String((body as { email?: unknown })?.email ?? "")
    .trim()
    .toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid e-mail address." },
      { status: 400 }
    );
  }

  try {
    await sql<SubscriberRow>`
      INSERT INTO subscribers (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[subscribe] failed to store subscriber", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not subscribe you right now. Please try again, or message us on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
