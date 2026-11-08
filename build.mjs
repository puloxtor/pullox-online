// Static build for pullox.online: renders / (EN) and /bg/ (BG) from src/content.mjs.
// Run: node build.mjs   → output in dist/
import { mkdirSync, writeFileSync, readFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { LANGS, SITE } from './src/content.mjs';
import { ICONS } from './src/icons.mjs';
import { BRAND } from './src/brand-icons.mjs';

const OUT = 'dist';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('public', OUT, { recursive: true });

const css = readFileSync('src/styles.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '\n');
const cfToken = process.env.CF_BEACON_TOKEN || '';
// Netlify sets CONTEXT=production for the live site. There, open {{TODO}} items are dropped instead of shown;
// deploy previews and local builds still render them as dashed chips. Set SHOW_TODO=1 to force them on.
const HIDE_TODO = process.env.CONTEXT === 'production' && process.env.SHOW_TODO !== '1';
const TODO_RE = /\{\{TODO:?\s*([\s\S]*?)\}\}/g;
const isTodo = (s) => /\{\{TODO/.test(String(s));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Render {{TODO: …}} placeholders as visible chips so they can't be missed in review.
const txt = (s) => (HIDE_TODO ? esc(String(s).replace(TODO_RE, '')).trim() : esc(s).replace(TODO_RE, '<mark class="todo">{{TODO: $1}}</mark>'));

const icon = (id, size = 18) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" focusable="false"><path d="${ICONS[id]}"/></svg>`;

const socials = (cls) =>
  `<ul class="${cls}" role="list">${SITE.social
    .filter((s) => s.id !== 'x' || SITE.showX)
    .map((s) => `<li><a href="${s.href}" rel="me noopener" target="_blank" aria-label="${s.label}">${icon(s.id)}</a></li>`)
    .join('')}</ul>`;

// Real brand icons in their own colours; very dark marks fall back to the text colour so they stay visible in dark mode.
const brand = (slug, size = 14) => {
  const s = BRAND[slug];
  if (!s) return '';
  const h = s.hex, lum = (parseInt(h.slice(0, 2), 16) * 299 + parseInt(h.slice(2, 4), 16) * 587 + parseInt(h.slice(4, 6), 16) * 114) / 1000;
  return `<svg class="bi" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" focusable="false" style="fill:${lum < 60 ? 'currentColor' : '#' + h}"><path d="${s.path}"/></svg>`;
};
const MCP_ICONS = ['', 'googlesheets', '', 'googleads', 'shopify', ''];
const STACK = [['Microsoft Dataverse / Power Platform', ''], ['SharePoint', ''], ['Claude agents', 'claude'], ['Custom MCP servers', ''], ['Railway', 'railway'], ['Postgres', 'postgresql']];

const label = (path) => `<p class="label">~/${path}</p>`;

function page(t) {
  const other = t.lang === 'en' ? LANGS.bg : LANGS.en;
  const steps = t.bio.steps
    .map((s, i) => `<li class="step${i === 2 ? ' step--gate' : ''}" style="--i:${i}"><span class="step__n">${i + 1}</span>${esc(s)}</li>`)
    .join('');

  const career = t.careerItems
    .map(
      (c) => `<li class="job${c.current ? ' job--now' : ''}">
        <span class="job__years">${esc(c.years)}</span>
        <div><p class="job__org">${esc(c.org)}</p><p class="job__role">${esc(c.role)}</p>${c.detail ? `<p class="job__detail">${esc(c.detail)}</p>` : ''}</div>
      </li>`
    )
    .join('');

  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<link rel="canonical" href="${SITE.url}${t.path}">
<link rel="alternate" hreflang="en" href="${SITE.url}/">
<link rel="alternate" hreflang="bg" href="${SITE.url}/bg/">
<link rel="alternate" hreflang="x-default" href="${SITE.url}/">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#E9EEEC">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#070C0B">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/img/alex-520.webp" as="image" type="image/webp" imagesrcset="/img/alex-520.webp 520w, /img/alex-880.webp 880w" imagesizes="(max-width:760px) 92vw, 340px">
<link rel="preload" href="/fonts/geist-${t.lang === 'bg' ? 'cyrillic' : 'latin'}-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.description)}">
<meta property="og:url" content="${SITE.url}${t.path}">
<meta property="og:image" content="${SITE.url}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(t.title)}">
<meta property="og:locale" content="${t.locale}">
<meta property="og:locale:alternate" content="${other.locale}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: SITE.url,
    jobTitle: 'Commercial Director & Chief AI Officer',
    worksFor: { '@type': 'Organization', name: 'BioPharma Laboratories' },
    address: { '@type': 'PostalAddress', addressLocality: 'Plovdiv', addressCountry: 'BG' },
    knowsAbout: LANGS.en.skills.list,
    sameAs: SITE.social.filter((s) => s.id !== 'x' || SITE.showX).map((s) => s.href),
  })}</script>
<style>${css}</style>
<script src="/app.js" defer></script>
${cfToken ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"${esc(cfToken)}"}'></script>` : ''}
</head>
<body>
<a class="skip" href="#main">${t.lang === 'bg' ? 'Към съдържанието' : 'Skip to content'}</a>
<header class="top">
  <a class="mono-mark" href="${t.path}" aria-label="AK — ${SITE.name}"><span>AK</span></a>
  <nav class="top__nav" aria-label="${t.lang === 'bg' ? 'Основна' : 'Main'}">
    <a class="lang" href="${t.nav.switchHref}" hreflang="${other.lang}" lang="${other.lang}">${t.lang === 'en' ? '<b>EN</b> <span>BG</span>' : '<span>EN</span> <b>BG</b>'}<i class="sr"> — ${t.nav.switchLabel}</i></a>
    <a class="btn btn--ghost" href="#contact">${esc(t.nav.contact)}</a>
  </nav>
</header>

<main id="main" class="bento">

  <section class="tile tile--hero" aria-labelledby="h-hero">
    <div class="hero__grid" aria-hidden="true"></div>
    <picture class="hero__photo">
      <source type="image/webp" srcset="/img/alex-520.webp 520w, /img/alex-880.webp 880w" sizes="(max-width:760px) 92vw, 340px">
      <img src="/img/alex-520.webp" width="520" height="650" alt="${esc(t.photoAlt)}" fetchpriority="high" decoding="async">
    </picture>
    <div class="hero__body">
    <p class="hero__name">${SITE.name}</p>
    <h1 id="h-hero" class="hero__headline">${esc(t.hero.headline)}</h1>
    <p class="hero__sub">${esc(t.hero.sub)}</p>
    <div class="hero__actions">
      <a class="btn btn--accent" href="#contact">${esc(t.hero.cta)}</a>
      ${socials('socials')}
    </div>
    </div>
  </section>

  <section class="tile tile--now" aria-label="${esc(t.now.title)}">
    ${label('now')}
    <p class="now__text"><span class="pulse" aria-hidden="true"></span>${esc(t.now.text)}</p>
    <p class="now__place">${esc(t.now.place)}</p>
  </section>

  <section class="tile tile--off" aria-labelledby="h-off">
    ${label('off-the-clock')}
    <h2 id="h-off" class="sr">${esc(t.off.title)}</h2>
    <ul class="off" role="list">${t.off.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
  </section>

  <section class="tile tile--svc" aria-labelledby="h-svc">
    ${label('services')}
    <div class="svc__head">
      <h2 id="h-svc" class="tile__title tile__title--xl">${esc(t.svc.title)}</h2>
      <p class="tile__text">${esc(t.svc.lead)}</p>
    </div>
    <ul class="svc" role="list">${t.svc.items.map(([h, d]) => `<li><h3>${esc(h)}</h3><p>${esc(d)}</p></li>`).join('')}</ul>
    <a class="btn btn--accent svc__cta" href="#contact">${esc(t.svc.cta)}</a>
  </section>

  <section class="tile tile--feature tile--bio" aria-labelledby="h-bio">
    ${label('work/biopharma')}
    <h2 id="h-bio" class="tile__title tile__title--xl">${esc(t.bio.title)}</h2>
    <p class="bio__context">${esc(t.bio.context)}</p>
    <div class="bio__cols">
      <p>${esc(t.bio.bot)}</p>
      <p>${esc(t.bio.executor)}</p>
    </div>
    <div class="pipe" data-pipe>
      <button class="pipe__pause" type="button" data-pause aria-pressed="false" data-on="${t.lang === 'bg' ? 'Пауза' : 'Pause'}" data-off="${t.lang === 'bg' ? 'Пусни' : 'Play'}">${t.lang === 'bg' ? 'Пауза' : 'Pause'}</button>
      <div class="pipe__rail"><span class="pipe__pulse" aria-hidden="true"></span><ol class="pipe__steps" role="list">${steps}</ol></div>
      <div class="pipe__fork">
        <p class="fork fork--auto"><span aria-hidden="true">●</span>${esc(t.bio.auto)}</p>
        <p class="fork fork--human"><span aria-hidden="true">○</span>${esc(t.bio.human)}</p>
      </div>
    </div>
    <p class="bio__plus">${esc(t.bio.plus)}</p>
    <div class="bio__foot">
      <ul class="stack" role="list">${STACK.map(([s, i]) => `<li>${brand(i, 13)}${s}</li>`).join('')}</ul>
      ${HIDE_TODO && isTodo(t.bio.resultsTodo) ? '' : `<p class="bio__results"><span>${esc(t.bio.results)}</span> ${txt(t.bio.resultsTodo)}</p>`}
    </div>
  </section>

  <section class="tile tile--map" aria-labelledby="h-map">
    ${label('work/biopharma/warehouse-map')}
    <div class="map__head">
      <h2 id="h-map" class="tile__title">${esc(t.map.title)}</h2>
      <p class="tile__text">${esc(t.map.text)}</p>
    </div>
    <div class="map__shots">
      <figure class="shot"><a href="/img/map.webp" target="_blank" rel="noopener" title="${esc(t.map.open)}"><img src="/img/map.webp" width="1239" height="760" loading="lazy" decoding="async" alt="${esc(t.map.alt1)}"></a></figure>
      <figure class="shot"><a href="/img/map-search.webp" target="_blank" rel="noopener" title="${esc(t.map.open)}"><img src="/img/map-search.webp" width="1374" height="920" loading="lazy" decoding="async" alt="${esc(t.map.alt2)}"></a></figure>
    </div>
  </section>

  <section class="tile tile--mcp" aria-labelledby="h-mcp">
    ${label('work/mcp')}
    <h2 id="h-mcp" class="tile__title">${esc(t.mcp.title)}</h2>
    <p class="tile__text">${esc(t.mcp.text)}</p>
    <ul class="mcp" role="list">${t.mcp.list.map((i, n) => `<li>${brand(MCP_ICONS[n], 13)}${esc(i)}</li>`).join('')}</ul>
    <p class="mcp__open">${esc(t.mcp.open)}</p>
    <ul class="repos repos--inline" role="list">${SITE.publicRepos
      .map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${icon('github', 14)}<span>${r.name}</span></a></li>`)
      .join('')}</ul>
  </section>

  <section class="tile tile--m365" aria-labelledby="h-m365">
    ${label('work/m365')}
    <h2 id="h-m365" class="tile__title">${esc(t.m365.title)}</h2>
    <p class="tile__text">${esc(t.m365.text)}</p>
    ${HIDE_TODO && isTodo(t.m365.todo) ? '' : `<p class="tile__text">${txt(t.m365.todo)}</p>`}
  </section>

  <section class="tile tile--lab" aria-labelledby="h-lab">
    ${label('homelab')}
    <h2 id="h-lab" class="tile__title">${esc(t.lab.title)}</h2>
    <p class="tile__text">${esc(t.lab.text)}</p>
    <figure class="lab" aria-label="Internet → Cloudflare tunnel → Proxmox → Home Assistant, n8n, ${esc(t.lab.nodes.automations)}, ${esc(t.lab.nodes.media)}">
      <div class="lab__chain">
        <span class="node">${esc(t.lab.nodes.internet)}</span>
        <span class="wire" aria-hidden="true"></span>
        <span class="node node--tunnel">${brand('cloudflare', 14)}${esc(t.lab.nodes.tunnel)}</span>
        <span class="wire" aria-hidden="true"></span>
        <span class="node node--host">${brand('proxmox', 14)}Proxmox</span>
      </div>
      <div class="lab__leaves">
        <span class="leaf">${brand('homeassistant', 18)}Home Assistant</span>
        <span class="leaf">${brand('n8n', 18)}n8n</span>
        <span class="leaf">${brand('claude', 18)}${esc(t.lab.nodes.automations)}</span>
        <span class="leaf leaf--quiet">${esc(t.lab.nodes.media)}</span>
      </div>
    </figure>
  </section>

  <section class="tile tile--gh gh--empty" aria-labelledby="h-gh" data-gh data-lang="${t.lang}">
    ${label('github')}
    <h2 id="h-gh" class="sr">${esc(t.gh.title)}</h2>
    <p class="gh__total"><b data-gh-total>—</b> <span>${esc(t.gh.contributions)}</span></p>
    <div class="gh__graph" data-gh-graph role="img" aria-label="${esc(t.gh.title)}"></div>
    <div class="gh__meta">
      <p class="gh__note" data-gh-note data-pending="${esc(t.gh.pending)}">${esc(t.gh.privateNote)}</p>
      <p class="gh__legend" aria-hidden="true">${esc(t.gh.less)} <i data-l="0"></i><i data-l="1"></i><i data-l="2"></i><i data-l="3"></i><i data-l="4"></i> ${esc(t.gh.more)}</p>
    </div>
    <h3 class="gh__h">${esc(t.gh.repos)}</h3>
    <ul class="repos" role="list" data-gh-repos data-pushed="${esc(t.gh.pushed)}">${SITE.publicRepos
      .map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.name}</a><time></time></li>`)
      .join('')}</ul>
  </section>

  <section class="tile tile--career" aria-labelledby="h-career">
    ${label('career')}
    <h2 id="h-career" class="tile__title">${esc(t.career.title)}</h2>
    <ol class="timeline" role="list">${career}</ol>
    <div class="edu">
      <h3 class="edu__h">${esc(t.career.edu)}</h3>
      <ul role="list">${t.career.eduItems.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
    </div>
  </section>

  <section class="tile tile--skills" aria-labelledby="h-skills">
    ${label('skills')}
    <h2 id="h-skills" class="sr">${esc(t.skills.title)}</h2>
    <ul class="chips" role="list">${t.skills.list.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
  </section>

  <section class="tile tile--contact" id="contact" aria-labelledby="h-contact">
    <div class="contact__intro">
      ${label('contact')}
      <h2 id="h-contact" class="tile__title tile__title--xl">${esc(t.contact.title)}</h2>
      <p class="tile__text">${esc(t.contact.lead)}</p>
    </div>
    <form class="form" data-form action="/.netlify/functions/contact" method="post" novalidate
      data-ok="${esc(t.contact.ok)}" data-err="${esc(t.contact.err)}" data-invalid="${esc(t.contact.invalid)}" data-limit="${esc(t.contact.limit)}" data-sending="${esc(t.contact.sending)}">
      <input type="hidden" name="lang" value="${t.lang}">
      <div class="hp" aria-hidden="true"><label>Company <input name="company" tabindex="-1" autocomplete="off"></label></div>
      <label class="field"><span>${esc(t.contact.name)}</span><input name="name" required maxlength="120" autocomplete="name"></label>
      <label class="field"><span>${esc(t.contact.email)}</span><input name="email" type="email" required maxlength="200" autocomplete="email"></label>
      <label class="field field--wide"><span>${esc(t.contact.message)}</span><textarea name="message" required minlength="10" maxlength="5000" rows="5"></textarea></label>
      <div class="form__foot">
        <button class="btn btn--accent" type="submit">${esc(t.contact.send)}</button>
        <p class="form__status" role="status" aria-live="polite" data-status></p>
        <p class="form__status form__nojs" id="sent" data-state="ok">${esc(t.contact.ok)}</p>
        <p class="form__status form__nojs" id="send-error" data-state="err">${esc(t.contact.err)}</p>
      </div>
    </form>
  </section>

</main>

<footer class="foot">
  <div class="foot__row">
    ${socials('socials socials--foot')}
    <a class="lang" href="${t.nav.switchHref}" hreflang="${other.lang}" lang="${other.lang}">${t.lang === 'en' ? '<b>EN</b> <span>BG</span>' : '<span>EN</span> <b>BG</b>'}<i class="sr"> — ${t.nav.switchLabel}</i></a>
  </div>
  <p class="foot__copy">© <span data-year>${new Date().getFullYear()}</span> ${SITE.name}</p>
</footer>
</body>
</html>`;
}

for (const t of Object.values(LANGS)) {
  const dir = t.lang === 'en' ? OUT : `${OUT}/bg`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, page(t));
}

// Netlify serves /404.html for any unknown path. One bilingual page, same styles.
writeFileSync(`${OUT}/404.html`, `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>404 — ${SITE.name}</title>
<meta name="color-scheme" content="light dark">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>${css}</style>
</head>
<body>
<main class="bento bento--404">
  <section class="tile tile--hero tile--404">
    <div class="hero__grid" aria-hidden="true"></div>
    <div class="hero__body">
      <p class="hero__name">404</p>
      <h1 class="hero__headline">This page doesn’t exist.</h1>
      <p class="hero__sub" lang="bg">Тази страница не съществува.</p>
      <div class="hero__actions">
        <a class="btn btn--accent" href="/">Go to the homepage</a>
        <a class="btn btn--ghost" href="/bg/" lang="bg">Към началото</a>
      </div>
    </div>
  </section>
</main>
</body>
</html>`);

writeFileSync(
  `${OUT}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${['/', '/bg/']
  .map(
    (p) => `<url><loc>${SITE.url}${p}</loc><xhtml:link rel="alternate" hreflang="en" href="${SITE.url}/"/><xhtml:link rel="alternate" hreflang="bg" href="${SITE.url}/bg/"/></url>`
  )
  .join('\n')}
</urlset>
`
);
writeFileSync(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
if (!existsSync(`${OUT}/data/github.json`)) throw new Error('missing seed public/data/github.json');
console.log('built →', OUT);
