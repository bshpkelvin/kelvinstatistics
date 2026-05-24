import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(2000),
});

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const TO = "bshpkelvin@gmail.com";
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#1e3a8a;margin:0 0 16px;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escape(data.name)}</p>
        <p><strong>Email:</strong> ${escape(data.email)}</p>
        <p><strong>Subject:</strong> ${escape(data.subject)}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
        <p style="white-space:pre-wrap;">${escape(data.message)}</p>
      </div>`;

    // Notification to site owner
    const notify = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [TO],
        reply_to: data.email,
        subject: `[Portfolio] ${data.subject}`,
        html,
      }),
    });

    if (!notify.ok) {
      const err = await notify.text();
      console.error("Resend notify failed:", notify.status, err);
      throw new Error(`Failed to send email (${notify.status})`);
    }

    // Auto-confirmation to visitor
    const confirmHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#1e3a8a;">Thanks for reaching out, ${escape(data.name)}!</h2>
        <p>I've received your message and will get back to you within 24 hours.</p>
        <p style="color:#64748b;font-size:14px;">For reference, here's a copy of your message:</p>
        <blockquote style="border-left:3px solid #3b82f6;padding-left:12px;color:#475569;white-space:pre-wrap;">${escape(data.message)}</blockquote>
        <p>Best regards,<br/><strong>Kelvin Wambua</strong><br/>M&amp;E Specialist · Data Analyst</p>
      </div>`;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Kelvin Wambua <onboarding@resend.dev>",
        to: [data.email],
        subject: "Thanks for getting in touch",
        html: confirmHtml,
      }),
    });

    return { success: true };
  });
