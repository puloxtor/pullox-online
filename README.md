# pullox.online

[![Netlify Status](https://api.netlify.com/api/v1/badges/2389db0c-6018-4648-ac09-1964650eefa5/deploy-status)](https://app.netlify.com/projects/pullox-online/deploys)

Personal site of Alexandros Kotzegien — https://www.pullox.online (EN) and https://www.pullox.online/bg/ (BG).

Static HTML/CSS built by a small Node script, hosted on Netlify. Every push to `main` deploys automatically.

## Where things live

| What | File |
|---|---|
| All copy, EN and BG (hero, services, case studies, career, form texts) | `src/content.mjs` |
| Social links, public repos, show/hide X | `SITE` at the top of `src/content.mjs` |
| Page structure / tiles | `build.mjs` (the `page()` template) |
| Design (colours, grid, tiles, responsive) | `src/styles.css` |
| Client-side JS (pipeline animation, GitHub tile, form) | `public/app.js` |
| Images (photo, warehouse map), fonts, favicon, OG image | `public/` |
| Contact form → Resend | `netlify/functions/contact.mts` |
| GitHub tile data (daily sync → Netlify Blobs, served at `/api/github`) | `netlify/functions/github*.mts`, `netlify/lib/github.mts` |

`{{TODO: …}}` in the copy renders as a visible dashed chip, so open items can't be missed.

## Local build

```bash
npm install
node build.mjs        # output in dist/
npx serve dist        # or any static server
```

## Rules (from the build brief)

- Never publish: phone, date of birth, email address, home address, salary, M365 tenant domain, ClickUp/Dataverse IDs, BioPharma colleagues' names, internal decision numbers, homelab IPs/hostnames.
- Don't mention Alex's other brands or businesses (the list is in his private build brief), or media-server software (media = "a hobby").
- Commit as `puloxtor <101748823+puloxtor@users.noreply.github.com>` (GitHub noreply), never a personal email: the repo is public.
- Xbox and Google Workspace roles: name the product and the role, never "at Microsoft/Google" or the partner company.
- No cookies, no third-party trackers. Screenshots of internal systems: blur client codes and client names.
- No numbers Alex hasn't given.

## Environment variables (Netlify → Project configuration → Environment variables)

`RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`, `GITHUB_TOKEN` (classic, `read:user`), optional `CF_BEACON_TOKEN` (Cloudflare Web Analytics). They are secrets: never hard-code their values (Netlify's secret scanner fails the build).

## DNS

`pullox.online` is on Cloudflare. Apex → CNAME `apex-loadbalancer.netlify.com`, `www` → CNAME `pullox-online.netlify.app`, both DNS-only. Other subdomains run through the homelab Cloudflare tunnel — don't touch them.

## Deploying

The repo is public on purpose: Netlify's Free plan builds a private repo only for commits from verified team members, and the puloxtor GitHub account is linked to a different Netlify account. Push to `main` and Netlify builds and publishes in about 30 seconds. There are no secrets in the repo; keep it that way.
