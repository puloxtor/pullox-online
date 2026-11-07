// POST /.netlify/functions/contact — validates, drops honeypot hits, rate-limits per IP,
// and sends the message through Resend. The destination address only exists in env (CONTACT_TO).
import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

const LIMIT = 5; // messages
const WINDOW = 60 * 60 * 1000; // per hour, per IP
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'cache-control': 'no-store' } });

async function ipKey(ip: string) {
  const salt = Netlify.env.get('RATE_SALT') || 'pullox';
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ip));
  return [...new Uint8Array(buf)].slice(0, 16).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return json({ error: 'method' }, 405);

  let body: Record<string, string>;
  try {
    const raw = await req.text();
    if (raw.length > 20000) return json({ error: 'too_large' }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'bad_json' }, 400);
  }

  // Honeypot: bots fill "company". Pretend success, send nothing.
  if ((body.company || '').trim()) return json({ ok: true });

  const name = String(body.name || '').trim().slice(0, 120);
  const email = String(body.email || '').trim().slice(0, 200);
  const message = String(body.message || '').trim().slice(0, 5000);
  const lang = body.lang === 'bg' ? 'bg' : 'en';
  if (!name || !EMAIL.test(email) || message.length < 10 || /[\r\n]/.test(name + email)) return json({ error: 'invalid' }, 400);

  // Simple rate limit in Blobs (no cookies, IP stored only as a salted hash).
  const rl = getStore('contact-ratelimit');
  const key = await ipKey(context.ip || 'unknown');
  const now = Date.now();
  const hits: number[] = ((await rl.get(key, { type: 'json' }).catch(() => null)) as number[] | null)?.filter((t) => now - t < WINDOW) ?? [];
  if (hits.length >= LIMIT) return json({ error: 'rate_limited' }, 429);
  await rl.setJSON(key, [...hits, now]);

  const apiKey = Netlify.env.get('RESEND_API_KEY');
  const to = Netlify.env.get('CONTACT_TO');
  const from = Netlify.env.get('CONTACT_FROM');
  if (!apiKey || !to || !from) {
    console.error('contact: RESEND_API_KEY, CONTACT_TO or CONTACT_FROM missing');
    return json({ error: 'not_configured' }, 503);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: `pullox.online <${from}>`,
      to: [to],
      reply_to: email,
      subject: `pullox.online — ${name}`,
      text: `${message}\n\n—\n${name} <${email}>\nLanguage: ${lang.toUpperCase()}\nSent from the contact form on pullox.online`,
    }),
  });
  if (!res.ok) {
    console.error('contact: resend failed', res.status, await res.text().catch(() => ''));
    return json({ error: 'send_failed' }, 502);
  }
  return json({ ok: true });
};
