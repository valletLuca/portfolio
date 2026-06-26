import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Retourne la variable d'env si elle est non vide, sinon la valeur par défaut. */
function envOr(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

// Adresse "from" : par défaut le domaine de test Resend (onboarding@resend.dev),
// qui ne peut livrer qu'à l'adresse du propriétaire du compte. Pour envoyer
// depuis ton propre domaine, vérifie-le sur Resend puis renseigne CONTACT_FROM_EMAIL.
const FROM_EMAIL = envOr(process.env.CONTACT_FROM_EMAIL, "Portfolio <onboarding@resend.dev>");
const TO_EMAIL = envOr(process.env.CONTACT_TO_EMAIL, "lucval1701@gmail.com");

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante — impossible d'envoyer l'email.");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name || !email || !message || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return NextResponse.json({ error: "fields_too_long" }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Nouveau corbeau de ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
      html: `
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      console.error("Erreur Resend :", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Exception lors de l'envoi :", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
