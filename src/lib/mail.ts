// Wysyłka maila przez API Resend (zwykły fetch, bez dodatkowych paczek).
// Żeby użyć innego dostawcy (SMTP, SendGrid...), wystarczy podmienić treść tej jednej funkcji.

export async function sendMail(opts: { to: string; subject: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!apiKey || !from) {
    throw new Error("Brak konfiguracji poczty (RESEND_API_KEY / MAIL_FROM)");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [opts.to],
      subject: opts.subject,
      text: opts.text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Wysyłka maila nie powiodła się (HTTP ${res.status})`);
  }
}
