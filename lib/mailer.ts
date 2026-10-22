import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { getSettings } from "./content";
import { SITE_URL } from "./site";

/**
 * SMTP email (Microsoft 365 / Outlook by default). Configured only through env vars:
 * SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, optional SMTP_FROM and NOTIFY_EMAIL.
 * When SMTP is not configured, sending is skipped so forms keep working.
 */
let transporter: Transporter | null = null;

export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 587);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // 587 uses STARTTLS
      requireTLS: port !== 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS?.replace(/\\\$/g, "$") },
    });
  }
  return transporter;
}

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Branded, inline-styled HTML email (email clients ignore stylesheets). */
function layout(title: string, body: string, businessName: string) {
  return `<!doctype html><html><body style="margin:0;background:#f7f7f7;font-family:Arial,Helvetica,sans-serif;color:#111">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden">
<tr><td style="background:#e50914;padding:18px 24px;color:#fff;font-size:20px;font-weight:bold">${esc(businessName)}</td></tr>
<tr><td style="padding:24px"><h1 style="margin:0 0 16px;font-size:20px">${esc(title)}</h1>${body}</td></tr>
<tr><td style="padding:16px 24px;background:#fafafa;font-size:12px;color:#777">${esc(businessName)} &middot; Mobile foot care in Calgary &middot; <a href="${SITE_URL}" style="color:#e50914">${esc(SITE_URL.replace(/^https?:\/\//, ""))}</a></td></tr>
</table></td></tr></table></body></html>`;
}

function rows(fields: [string, unknown][]) {
  return `<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">${fields
    .filter(([, v]) => String(v ?? "").trim())
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 10px;border-bottom:1px solid #eee;color:#555;width:150px;vertical-align:top">${esc(k)}</td><td style="padding:8px 10px;border-bottom:1px solid #eee;white-space:pre-line">${esc(v)}</td></tr>`
    )
    .join("")}</table>`;
}

async function send(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  await getTransporter().sendMail({ from, ...opts });
}

/** Sends the business notification and the customer confirmation. Never throws. */
async function notify(kind: string, run: () => Promise<void>) {
  if (!isMailConfigured()) return;
  try {
    await run();
  } catch (e) {
    console.error(`[mail] ${kind} failed:`, (e as Error).message);
  }
}

export type BookingMail = {
  name: string;
  email: string;
  phone: string;
  service: string;
  locationType: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  city: string;
  postalCode: string;
  mobilityNotes?: string;
  notes?: string;
};

export function sendBookingEmails(b: BookingMail) {
  return notify("booking", async () => {
    const s = await getSettings();
    const inbox = process.env.NOTIFY_EMAIL || s.email;
    const details = rows([
      ["Name", b.name],
      ["Email", b.email],
      ["Phone", b.phone],
      ["Service", b.service],
      ["Visit location", b.locationType],
      ["Preferred date", b.preferredDate],
      ["Preferred time", b.preferredTime],
      ["Address", `${b.address}, ${b.city} ${b.postalCode}`],
      ["Mobility notes", b.mobilityNotes],
      ["Additional notes", b.notes],
    ]);
    await send({
      to: inbox,
      replyTo: b.email,
      subject: `New booking request: ${b.service} (${b.name})`,
      html: layout(
        "New booking request",
        `<p style="margin:0 0 16px">A new appointment request was submitted on the website.</p>${details}
<p style="margin:20px 0 0"><a href="${SITE_URL}/admin/bookings" style="background:#e50914;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:bold">Open in Admin</a></p>`,
        s.businessName
      ),
    });
    await send({
      to: b.email,
      replyTo: inbox,
      subject: `We received your appointment request | ${s.businessName}`,
      html: layout(
        `Thank you, ${b.name.split(" ")[0]}!`,
        `<p style="margin:0 0 12px">We have received your request for <strong>${esc(b.service)}</strong>. We will contact you shortly to confirm your visit date and time.</p>
<p style="margin:0 0 16px">Here is a copy of your request:</p>${details}
<p style="margin:20px 0 0">Questions? Call or text <strong>${esc(s.phone)}</strong> or reply to this email.</p>`,
        s.businessName
      ),
    });
  });
}

export type ContactMail = { name: string; email: string; phone?: string; subject: string; message: string };

export function sendContactEmails(m: ContactMail) {
  return notify("contact", async () => {
    const s = await getSettings();
    const inbox = process.env.NOTIFY_EMAIL || s.email;
    await send({
      to: inbox,
      replyTo: m.email,
      subject: `New website message: ${m.subject}`,
      html: layout(
        "New contact message",
        `${rows([
          ["Name", m.name],
          ["Email", m.email],
          ["Phone", m.phone],
          ["Subject", m.subject],
          ["Message", m.message],
        ])}<p style="margin:20px 0 0">Reply to this email to answer ${esc(m.name)} directly.</p>`,
        s.businessName
      ),
    });
    await send({
      to: m.email,
      replyTo: inbox,
      subject: `Thanks for contacting ${s.businessName}`,
      html: layout(
        `Thank you, ${m.name.split(" ")[0]}!`,
        `<p style="margin:0 0 12px">We have received your message and will reply as soon as possible, usually within one business day.</p>
<p style="margin:0">For anything urgent, call or text <strong>${esc(s.phone)}</strong>.</p>`,
        s.businessName
      ),
    });
  });
}
