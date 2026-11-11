# Ehsan Talebian — Next.js site

Next.js (App Router, TypeScript) port of the static site in the repo root. The original
CSS, fonts and images are reused unchanged, so it renders the same.

## Run

```bash
cp .env.example .env.local   # then fill in TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## What changed vs. the static site

- jQuery, Bootstrap JS, masonry/gallery/hoverdir/modernizr are gone (unused on these pages).
  The preloader, scroll-reveal animation and mobile menu are small React components.
- `POST /api/contact` (`app/api/contact/route.ts`) replaces the browser→Telegram call.
  The bot token now lives only in server env vars. It validates input, escapes the message,
  rate-limits per IP (5 / 10 min, in-memory) and has a hidden honeypot field.
- Page copy lives in `lib/content.ts` (About / Contact) and the page files in `app/`.

## Deploying

The API route needs a Node server, so GitHub Pages won't work. Use Vercel, or any host
that runs `next start` (set the two env vars there). For multiple instances/serverless,
swap `lib/rateLimit.ts` for a shared store such as Redis/Upstash.
