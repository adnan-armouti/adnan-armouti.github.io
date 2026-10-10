/* ==========================================================================
   work.js — renders the records in content.js and drives the page: the
   disclosures, the clip pairs and the day/night switch. Load it after
   content.js.
   ========================================================================== */

/* --- Rendering ----------------------------------------------------------- */

// Resource links always print in this sequence, whatever order a record lists.
const RESOURCE_ORDER = ['project page', 'paper', 'code', 'video', 'poster'];

// Glyphs matching the buttons on the mmIR project page (globe, file-pdf,
// github, youtube, image), inlined so the site pulls no icon library.
const ICONS = {
  'project page': '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-2.95a15.6 15.6 0 0 0-1.38-3.56A8 8 0 0 1 18.9 8ZM12 4.04c.64.93 1.19 2.2 1.5 3.96h-3c.31-1.76.86-3.03 1.5-3.96ZM4.26 14a8 8 0 0 1 0-4h3.38a16.6 16.6 0 0 0 0 4Zm.84 2h2.95c.32 1.3.78 2.5 1.38 3.56A8 8 0 0 1 5.1 16Zm2.95-8H5.1a8 8 0 0 1 4.33-3.56A15.6 15.6 0 0 0 8.05 8ZM12 19.96c-.64-.93-1.19-2.2-1.5-3.96h3c-.31 1.76-.86 3.03-1.5 3.96ZM13.8 14h-3.6a14.4 14.4 0 0 1 0-4h3.6a14.4 14.4 0 0 1 0 4Zm.77 5.56c.6-1.06 1.06-2.26 1.38-3.56h2.95a8 8 0 0 1-4.33 3.56ZM16.36 14a16.6 16.6 0 0 0 0-4h3.38a8 8 0 0 1 0 4Z"/>',
  'paper': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 2 4.5 4.5H14ZM8 13h8v1.5H8Zm0 3.5h8V18H8Z"/>',
  'code': '<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"/>',
  'video': '<path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6Z"/>',
  'poster': '<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 14H4l3.5-4.5 2.5 3L13.5 12Zm-11-7.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Z"/>',
};

const glyph = (label) => ICONS[label]
  ? `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${ICONS[label]}</svg>`
  : '';

const esc = (v) => String(v).replace(/[&<>"]/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// "[Name](url)" becomes a link, "**Name**" becomes bold. Everything else is escaped.
function byline(src, initials) {
  const text = initials ? src.split(', ').map(shorten).join(', ') : src;
  return esc(text)
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

const PARTICLES = new Set(['de', 'del', 'della', 'di', 'da', 'dos', 'van', 'von', 'der',
  'den', 'ter', 'la', 'le', 'du', 'bin', 'ibn', 'al', 'el', 'st', 'mac', 'mc']);

// Patent bylines run long, so they take the citation form: given names to
// initials, surname in full. Markdown around a name is left intact.
function shorten(token) {
  return token.replace(/^(\[|\*\*)?(.+?)(\]\(.+?\)|\*\*)?$/, (all, open, name, close) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length < 2) return all;
    let last = parts.pop();
    // Keep a surname particle with the surname: Kai Del Regno -> K. Del Regno.
    while (parts.length > 1 && PARTICLES.has(parts[parts.length - 1].toLowerCase())) {
      last = parts.pop() + '\u00a0' + last;
    }
    return (open || '') + parts.map((w) => w[0].toUpperCase() + '.').join('\u00a0') + '\u00a0' + last + (close || '');
  });
}

function honours(list) {
  if (!list || !list.length) return '';
  return list.map((h) => `<span class="honour">${esc(h)}</span>`).join('');
}

function resources(list) {
  if (!list || !list.length) return '';
  const rank = (r) => {
    const i = RESOURCE_ORDER.indexOf(r.label);
    return i < 0 ? RESOURCE_ORDER.length : i;
  };
  return [...list]
    .sort((a, b) => rank(a) - rank(b))
    .map((r) => `<a href="${esc(r.href)}">${glyph(r.label)}${esc(r.label)}</a>`)
    .join('');
}

function entry(w) {
  const fit = w.fit === 'contain' ? ' contain' : '';
  const vid = (c, extra = '') => {
    const d = c.dark || {};
    return `<video data-src="${esc(c.src)}"${c.poster ? ` data-poster="${esc(c.poster)}"` : ''}`
      + (d.src ? ` data-src-dark="${esc(d.src)}"` : '') + (d.poster ? ` data-poster-dark="${esc(d.poster)}"` : '')
      + ` muted playsinline preload="metadata" aria-hidden="true"${extra}></video>`;
  };
  let fig;
  if (w.clips && w.clips.length === 2) {
    // Two clips. Loop is off: the pair controller decides what plays next.
    fig = `<div class="entry-fig pair${fit}" data-pair="${esc(w.pair || 'alternate')}">${vid(w.clips[0])}${vid(w.clips[1])}</div>`;
  } else if (w.figure && /\.(mp4|webm)$/i.test(w.figure)) {
    fig = `<div class="entry-fig${fit}">${vid({ src: w.figure, poster: w.poster }, ' loop')}</div>`;
  } else if (w.figure) {
    const img = `<img src="${esc(w.figure)}" alt="" loading="lazy">`;
    // Phones get the wide crop when there is one; the picture element swaps at the phone band.
    fig = `<div class="entry-fig${fit}">${w.wide
      ? `<picture><source media="(max-width: 720px)" srcset="${esc(w.wide)}">${img}</picture>` : img}</div>`;
  } else {
    fig = '<div></div>';
  }
  return `<article class="entry">
  <span class="entry-venue">${esc(w.venue)}${honours(w.honours)}</span>
  ${fig}
  <div class="entry-body">
    <a class="entry-title" href="${esc(w.href)}">${esc(w.title)}</a>
    <p class="entry-authors">${byline(w.authors)}</p>
    <p class="entry-note">${esc(w.note)}</p>
    <nav class="entry-links">${resources(w.resources)}</nav>
  </div>
</article>`;
}

function record(p) {
  const head = p.href
    ? `<a class="record-title" href="${esc(p.href)}">${esc(p.title)}</a>`
    : `<span class="record-title">${esc(p.title)}</span>`;
  return `<article class="record">
  <span class="record-no">${esc(p.number)}</span>
  ${head}
  <p class="entry-authors">${byline(p.authors, true)}</p>
</article>`;
}

// Paint a list. With `fold`, entries outside the selected few are grouped into
// collapsed drawers, each sitting at the date where its tiles belong: opening
// one therefore grows the list in place, the later entries sliding down to make
// room rather than being appended after them.
function paint(id, items, build, fold) {
  const host = document.getElementById(id);
  if (!host) return;
  let html = '', run = [], n = 0;
  const flush = () => {
    if (!run.length) return;
    html += `<div class="drawer" id="more-list-${++n}"><div class="drawer-inner">${run.map(build).join('')}</div></div>`;
    run = [];
  };
  for (const w of items) {
    if (!fold || w.featured) { flush(); html += build(w); } else run.push(w);
  }
  flush();
  host.innerHTML = html;
  watchVideos(host);
}

/* --- The rest of the work, in place -------------------------------------- */

// Without scripting, the section is a plain heading beside a link to the
// publications page. With it, the heading itself becomes the control: one
// affordance in the space the section label already occupies, with a chevron
// that turns as the drawers open.
const CHEVRON = '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

function wireMoreWork(listId, linkId) {
  const host = document.getElementById(listId);
  const link = document.getElementById(linkId);
  if (!host) return;
  const drawers = [...host.querySelectorAll('.drawer')];
  if (!drawers.length) return;
  const rubric = link ? link.closest('.rubric') : null;
  if (!rubric) return;

  // The heading says which set you are looking at, swapping its first word as
  // the list grows: the two words trade places in a box that resizes between
  // their widths, so "Papers" slides across and the rule takes up the slack.
  const name = rubric.querySelector('.section-name');
  let swap = null, wShut = 0, wOpen = 0;
  if (name) {
    name.innerHTML = '<span class="swap"><span class="w w-shut">Selected</span>'
                   + '<span class="w w-open">All</span></span> Papers';
    swap = name.querySelector('.swap');
    const voice = () => {                              // only the live word is read out
      swap.querySelector('.w-shut').setAttribute('aria-hidden', String(swap.classList.contains('is-open')));
      swap.querySelector('.w-open').setAttribute('aria-hidden', String(!swap.classList.contains('is-open')));
    };
    swap.voice = voice; voice();
    const measure = () => {
      wShut = Math.ceil(swap.querySelector('.w-shut').getBoundingClientRect().width);
      wOpen = Math.ceil(swap.querySelector('.w-open').getBoundingClientRect().width);
      swap.style.width = (swap.classList.contains('is-open') ? wOpen : wShut) + 'px';
    };
    measure();
    addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  }

  discloser(link, drawers, host.querySelectorAll('.entry').length, (isOpen) => {
    if (!swap) return;
    swap.classList.toggle('is-open', isOpen);
    swap.style.width = (isOpen ? wOpen : wShut) + 'px';
    swap.voice();
  });
}

// Replace a link with the control that opens a set of drawers. The label says
// what clicking does; the count says how much is folded away.
function discloser(link, drawers, total, after) {
  const shut = `show all (${total})`;
  const open = 'show fewer';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'more more-toggle';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', drawers.map((d) => d.id).join(' '));
  btn.innerHTML = `<span>${shut}</span>${CHEVRON}`;
  link.replaceWith(btn);
  const fold = (isOpen) => drawers.forEach((d) => {
    d.hidden = false;
    d.classList.toggle('is-open', isOpen);
    d.inert = !isOpen;              // closed: not tabbable, not announced
  });
  fold(false);

  let isOpen = false;
  btn.addEventListener('click', () => {
    isOpen = !isOpen;
    fold(isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.querySelector('span').textContent = isOpen ? open : shut;
    if (after) after(isOpen);
  });
}

// The news list folds the same way. Without scripting every entry is simply
// listed, so the drawer here starts open and the script collapses it.
function wireMoreNews(listId, linkId) {
  const list = document.getElementById(listId);
  const link = document.getElementById(linkId);
  if (!list || !link) return;
  const drawers = [...list.querySelectorAll('.drawer')];
  if (!drawers.length) return;
  const mark = (isOpen) => list.classList.toggle('is-folded', !isOpen);
  mark(false);
  discloser(link, drawers, list.querySelectorAll('.ledger-row').length, mark);
}

// Phones show a clip pair side by side; wider screens show one slot.
const narrow = matchMedia('(max-width: 720px)');

// Is the page currently dark? The switch sets data-mode; otherwise the OS decides.
const isNight = () => {
  const m = document.documentElement.dataset.mode;
  return m ? m === 'night' : matchMedia('(prefers-color-scheme: dark)').matches;
};

// Point a video at the source for the current theme. Keeps position and play
// state across the swap so a theme toggle mid-clip does not restart it.
function applyTheme(v) {
  const dark = isNight() && v.dataset.srcDark;
  const src = dark ? v.dataset.srcDark : v.dataset.src;
  const poster = dark ? (v.dataset.posterDark || v.dataset.poster) : v.dataset.poster;
  if (v.getAttribute('src') === src) return;
  const t = v.currentTime, playing = !v.paused;
  if (poster) v.poster = poster;
  v.src = src;
  // Resume at the same point once the new file can play. Needs a server
  // that honours Range requests (GitHub Pages does); on one that does not,
  // the seek clamps to 0 and the clip simply restarts.
  v.addEventListener('canplay', () => { seek(v, t); if (playing) playVideo(v); }, { once: true });
}

// Safari throws on a seek before the file has metadata, and it is the same
// call that starts playback, so an unguarded rewind stops a clip from ever
// playing. Both helpers below are therefore forgiving by design.
function seek(v, t) { try { if (v.readyState >= 1) v.currentTime = t; } catch (_) {} }

// Start a clip. iOS only honours play() on a muted inline video, and refuses
// it altogether until the page has been touched (Low Power Mode, and Safari's
// autoplay rules generally). A refusal therefore arms a one-shot retry on the
// next touch anywhere on the page, which is why toggling the theme used to be
// the only thing that got these running.
function playVideo(v) {
  v.muted = true;                       // iOS reads the property, not just the attribute
  const p = v.play();
  if (p && p.catch) p.catch(() => {
    v.addEventListener('canplay', () => { v.play().catch(onGesture); }, { once: true });
    onGesture();
  });
  // Safari can also decline without rejecting. If nothing is running a moment
  // later, fall back to the same retry.
  setTimeout(() => { if (v.paused && onScreen(v)) onGesture(); }, 1200);
}
const onScreen = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
let armed = false;
function onGesture() {
  if (armed) return;
  armed = true;
  const go = () => {
    armed = false;
    ['touchstart', 'touchend', 'click'].forEach((e) => removeEventListener(e, go));
    // Hand each figure back to its own controller, so a pair that takes turns
    // resumes with one clip running rather than both at once.
    document.querySelectorAll('.entry-fig').forEach((fig) => {
      if (!onScreen(fig)) return;
      if (fig._start) fig._start();
      else fig.querySelectorAll('video').forEach(playVideo);
    });
  };
  // touchstart first: playing inside the gesture handler itself is what Safari
  // actually grants, and a scroll or a tap both begin with one.
  ['touchstart', 'touchend', 'click'].forEach((e) => addEventListener(e, go, { once: true, passive: true }));
}
function applyThemeAll() { document.querySelectorAll('.entry-fig video').forEach(applyTheme); }
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyThemeAll);

// Drive every clip pair. On a wide screen the two play in turn in the one
// slot. On a phone, 'alternate' plays one while the other waits faded and then
// swaps; 'together' runs both in step. Single clips just loop. Everything is
// paused while off screen so the page is not decoding video nobody can see.
function watchVideos(root) {
  root.querySelectorAll('.entry-fig video').forEach(applyTheme);
  const pairs = root.querySelectorAll('.entry-fig.pair');
  const singles = root.querySelectorAll('.entry-fig:not(.pair) video');

  pairs.forEach((box) => {
    const [a, b] = box.querySelectorAll('video');
    const mode = box.dataset.pair;
    let active = 0;
    const show = (i) => {
      box.dataset.active = String(i);
      const vids = [a, b], out = vids[1 - i];
      clearTimeout(box._leave);
      // the finished clip stays visible beneath the incoming one for the
      // length of its fade-in (see .is-leaving), then goes without a fade
      if (out.classList.contains('is-active')) {
        out.classList.add('is-leaving');
        box._leave = setTimeout(() => out.classList.remove('is-leaving'), 260);
      }
      out.classList.remove('is-active');
      vids[i].classList.remove('is-leaving'); vids[i].classList.add('is-active');
    };
    const play = (v) => { seek(v, 0); playVideo(v); };
    const together = () => mode === 'together' && narrow.matches;

    const start = () => {
      if (together()) { a.loop = b.loop = true; play(a); play(b); return; }
      a.loop = b.loop = false;
      show(active); play([a, b][active]);
    };
    const stop = () => { a.pause(); b.pause(); };

    [a, b].forEach((v, k) => v.addEventListener('ended', () => {
      if (together()) return;
      active = 1 - k; show(active); play([a, b][active]);
    }));
    narrow.addEventListener('change', () => { stop(); if (box.dataset.visible === '1') start(); });

    box._start = start; box._stop = stop;
    show(0);
  });

  if (!('IntersectionObserver' in window)) { pairs.forEach((p) => p._start()); singles.forEach(playVideo); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (target.classList.contains('pair')) {
        target.dataset.visible = isIntersecting ? '1' : '0';
        if (isIntersecting) target._start(); else target._stop();
      } else if (isIntersecting) playVideo(target);
      else target.pause();
    });
  }, { threshold: 0.25 });
  pairs.forEach((p) => io.observe(p));
  singles.forEach((v) => io.observe(v));
}

const paintWork         = (id, items) => paint(id, items || WORK, entry);
const paintSelectedWork = (id, items) => paint(id, items || WORK, entry, true);
const paintPatents      = (id, items) => paint(id, items || PATENTS, record);



/* --- Day / night --------------------------------------------------------- */

function wireMode(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener('click', () => {
    const root = document.documentElement;
    const dark = root.dataset.mode
      ? root.dataset.mode === 'night'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.mode = dark ? 'day' : 'night';
    try { localStorage.setItem('mode', root.dataset.mode); } catch (_) {}
    applyThemeAll();
  });
}
