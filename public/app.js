// pullox.online — tiny progressive enhancement. No cookies, no storage, no third parties.
(() => {
  const $ = (s, r = document) => r.querySelector(s);

  // 1) Executor pipeline: the pulse runs the full width of the line; restart on hover; pause button.
  const pipe = $('[data-pipe]');
  if (pipe) {
    const steps = $('.pipe__steps', pipe);
    const size = () => steps.style.setProperty('--run', steps.clientWidth * 0.92 - 56 + 'px');
    size(); addEventListener('resize', size, { passive: true });
    const anim = [...pipe.querySelectorAll('.pipe__pulse, .step')];
    pipe.addEventListener('mouseenter', () => {
      if (pipe.classList.contains('paused')) return;
      anim.forEach((el) => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
    });
    const btn = $('[data-pause]', pipe);
    btn.addEventListener('click', () => {
      const p = pipe.classList.toggle('paused');
      btn.setAttribute('aria-pressed', p); btn.textContent = p ? btn.dataset.off : btn.dataset.on;
    });
  }

  // 2) GitHub tile: live JSON from the function, fall back to the cached copy shipped with the site.
  const gh = $('[data-gh]');
  if (gh) {
    const lang = gh.dataset.lang === 'bg' ? 'bg-BG' : 'en-GB';
    const graph = $('[data-gh-graph]', gh);
    const empty = () => { graph.innerHTML = '<i></i>'.repeat(53 * 7); };
    empty();
    const render = (d) => {
      if (!d) return;
      const days = (d.weeks || []).flat();
      if (days.length) {
        // pad the first week so weekdays line up with rows
        const first = new Date(days[0].date + 'T00:00:00Z').getUTCDay();
        graph.innerHTML = '<i style="visibility:hidden"></i>'.repeat(first) +
          days.map((x) => `<i data-l="${x.l}" title="${x.c} · ${x.date}"></i>`).join('');
        $('[data-gh-total]', gh).textContent = Number(d.total || 0).toLocaleString(lang);
      } else {
        const note = $('[data-gh-note]', gh);
        note.textContent = note.dataset.pending;
      }
      const list = $('[data-gh-repos]', gh);
      if (d.repos && d.repos.length) {
        const fmt = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric' });
        list.innerHTML = d.repos.slice(0, 6).map((r) => {
          const a = document.createElement('a');
          a.href = r.url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = r.name;
          const t = r.pushedAt ? `<time datetime="${r.pushedAt}">${fmt.format(new Date(r.pushedAt))}</time>` : '<time></time>';
          return `<li>${a.outerHTML}${t}</li>`;
        }).join('');
      }
    };
    const get = (u) => fetch(u, { headers: { accept: 'application/json' } }).then((r) => (r.status === 200 ? r.json() : Promise.reject(r.status)));
    get('/api/github').catch(() => get('/data/github.json')).then(render).catch(() => {});
  }

  // 3) Contact form → Netlify Function → Resend.
  const form = $('[data-form]');
  if (form) {
    const status = $('[data-status]', form);
    const btn = $('button[type=submit]', form);
    const say = (msg, state) => { status.textContent = msg; status.dataset.state = state || ''; };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email || '');
      if (!data.name?.trim() || !okEmail || (data.message || '').trim().length < 10) return say(form.dataset.invalid, 'err');
      btn.disabled = true; const label = btn.textContent; btn.textContent = form.dataset.sending; say('');
      try {
        const r = await fetch(form.action, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
        if (r.ok) { form.reset(); say(form.dataset.ok, 'ok'); }
        else say(r.status === 429 ? form.dataset.limit : r.status === 400 ? form.dataset.invalid : form.dataset.err, 'err');
      } catch { say(form.dataset.err, 'err'); }
      btn.disabled = false; btn.textContent = label;
    });
  }
})();
