/* ==========================================================================
   work.js — publication and patent records, plus the renderers for them.

   Adding a paper: copy a record in WORK. Fields:
     venue     short venue label incl. year, in carnelian small caps
     title     full title
     href      where the title points (project page if there is one)
     authors   "Plain Name, [Linked Name](url), **Adnan Armouti**"
     note      one sentence on the contribution, set in the caption voice
     honours   ["Oral", "Best Paper Finalist"] or omit
     figure    path to a ~16:10 crop; add fit:'contain' to letterbox instead
     resources [{ label, href }] — rendered in RESOURCE_ORDER, rule-separated
     featured  true to also list it on the front page
   ========================================================================== */

const WORK = [
  {
    featured: true,
    venue: 'ECCV 2026',
    title: 'mmIR: Frequency-Space Inverse Rendering for 3D Millimeter-Wave Radar ADC Synthesis',
    href: 'https://mmwave-inverse-rendering.github.io/',
    authors: '**Adnan Armouti**, [Yixuan Gao](https://adamgao1996.github.io/), [Rajalakshmi Nandakumar](https://infosci.cornell.edu/~rajalakshmi/)',
    note: 'A differentiable FMCW radar inverse renderer that fits a physics-based forward model to real captures, then re-renders from dense virtual apertures to synthesise high-resolution 3D radar data.',
    figure: 'assets/projects/mmir/mmir_card_light.jpg',
    resources: [
      { label: 'project page', href: 'https://mmwave-inverse-rendering.github.io/' },
      { label: 'paper',        href: 'https://arxiv.org/abs/2608.28913' },
      { label: 'video',        href: 'https://www.youtube.com/watch?v=UjcEwDx3bns' },
      { label: 'poster',       href: 'https://drive.google.com/file/d/1E5c7vM5N7udhou3jiCmoKmwWtcAGs6Rg/view?usp=sharing' },
    ],
  },
  {
    venue: 'MobiCom 2026',
    title: 'mmFHE: mmWave Sensing with End-to-End Fully Homomorphic Encryption',
    href: 'https://tanvir9476.github.io/projects/mmfhe/',
    authors: '[Tanvir Ahmed](https://tanvir9476.github.io), [Yixuan Gao](https://adamgao1996.github.io/), **Adnan Armouti**, [Rajalakshmi Nandakumar](https://infosci.cornell.edu/~rajalakshmi/)',
    note: 'The first system to run an end-to-end mmWave radar sensing pipeline — signal processing and ML inference — entirely under fully homomorphic encryption on an untrusted cloud.',
    figure: 'assets/projects/mmfhe/mmfhe_card.jpg',
    resources: [
      { label: 'project page', href: 'https://tanvir9476.github.io/projects/mmfhe/' },
      { label: 'paper', href: 'https://arxiv.org/abs/2603.22437' },
    ],
  },
  {
    venue: 'ECCV 2024',
    title: 'Implicit Neural Models to Extract Heart Rate from Video',
    href: 'https://implicitppg.github.io/',
    authors: '[Pradyumna Chari](https://pradyumnachari.github.io/)*, [Anirudh Bindiganavale Harish](https://anirudhbharish.github.io/)*, **Adnan Armouti**, [Alexander Vilesov](https://asvilesov.github.io/), [Sanjit Sarda](https://sanjit1.github.io/), [Laleh Jalilian](https://www.uclahealth.org/providers/laleh-jalilian), [Achuta Kadambi](https://www.ee.ucla.edu/achuta-kadambi/)',
    note: 'An implicit neural representation that decomposes face video into a blood plethysmograph component and an appearance component, improving heart-rate recovery on out-of-distribution subjects.',
    figure: 'assets/projects/implicit-ppg/implicitppg_card.jpg',
    fit: 'contain',
    resources: [
      { label: 'project page', href: 'https://implicitppg.github.io/' },
      { label: 'paper',        href: 'https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/10941.pdf' },
      { label: 'code',         href: 'https://github.com/UCLA-VMG/FastImplicitPleth' },
    ],
  },
  {
    venue: 'Preprint 2024',
    title: 'Thermal Imaging and Radar for Remote Sleep Monitoring of Breathing and Apnea',
    href: 'https://arxiv.org/abs/2407.11936',
    authors: 'Kai Del Regno, [Alexander Vilesov](https://asvilesov.github.io/), **Adnan Armouti**, [Anirudh Bindiganavale Harish](https://anirudhbharish.github.io/), Selim Emir Can, [Ashley Kita](https://www.uclahealth.org/providers/ashley-kita), [Achuta Kadambi](https://www.ee.ucla.edu/achuta-kadambi/)',
    note: 'The first comparison of radar and thermal imaging for non-contact sleep monitoring, with a multimodal method to distinguish obstructive from central sleep apneas.',
    figure: 'assets/projects/sleep-apnea/apnea_card.jpg',
    resources: [
      { label: 'paper', href: 'https://arxiv.org/abs/2407.11936' },
      { label: 'code',  href: 'https://github.com/UCLA-VMG/NonContactApneaDetection' },
    ],
  },
  {
    featured: true,
    venue: 'SIGGRAPH 2022',
    title: 'Blending Camera and 77 GHz Radar Sensing for Equitable, Robust Plethysmography',
    href: 'http://visual.ee.ucla.edu/equi_pleth_camera_rf.htm/',
    authors: '[Alexander Vilesov](https://asvilesov.github.io/)*, [Pradyumna Chari](https://pradyumnachari.github.io/)*, **Adnan Armouti***, [Anirudh Bindiganavale Harish](https://anirudhbharish.github.io/), Kimaya Kulkarni, Ananya Deoghare, [Laleh Jalilian](https://www.uclahealth.org/providers/laleh-jalilian), [Achuta Kadambi](https://www.ee.ucla.edu/achuta-kadambi/)',
    note: 'Fusing RGB video with 77 GHz radar for skin-tone-equitable remote plethysmography. Covered by UCLA Newsroom, Daily Bruin, and Forbes.',
    figure: 'assets/projects/equipleth/equipleth_card.jpg',
    resources: [
      { label: 'project page', href: 'http://visual.ee.ucla.edu/equi_pleth_camera_rf.htm/' },
      { label: 'paper',        href: 'https://doi.org/10.1145/3528223.3530161' },
      { label: 'code',         href: 'https://github.com/UCLA-VMG/EquiPleth' },
    ],
  },
];

const PATENTS = [
  {
    title: 'Systems and Methods for Measuring Vital Signs Using Multimodal Health Sensing Platforms',
    number: 'U.S. Patent Application 2023/0233091',
    href: 'https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/20230233091',
    authors: '[Achuta Kadambi](https://www.ee.ucla.edu/achuta-kadambi/), [Laleh Jalilian](https://www.uclahealth.org/providers/laleh-jalilian), [Pradyumna Chari](https://pradyumnachari.github.io/), Chinmay Talegaonkar, Doruk Karinca, Maxime Cannesson, Krish Kabra, Omid Salehi-Abari, [Ashley Kita](https://www.uclahealth.org/providers/ashley-kita), **Adnan Armouti**',
  },
  {
    title: 'Methods and Apparatus to Detect and Classify Forms of Sleep Apnea',
    number: 'U.S. Provisional Application',
    href: null,
    authors: '[Achuta Kadambi](https://www.ee.ucla.edu/achuta-kadambi/), [Ashley Kita](https://www.uclahealth.org/providers/ashley-kita), [Alexander Vilesov](https://asvilesov.github.io/), Kai Del Regno, Selim Emir Can, [Laleh Jalilian](https://www.uclahealth.org/providers/laleh-jalilian), [Anirudh Bindiganavale Harish](https://anirudhbharish.github.io/), **Adnan Armouti**',
  },
];

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
function byline(src) {
  return esc(src)
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
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
  const fig = w.figure
    ? `<div class="entry-fig${fit}"><img src="${esc(w.figure)}" alt="" loading="lazy"></div>`
    : '<div></div>';
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
  <p class="entry-authors">${byline(p.authors)}</p>
</article>`;
}

function paint(id, items, build) {
  const host = document.getElementById(id);
  if (host) host.innerHTML = items.map(build).join('');
}

const paintWork    = (id, items) => paint(id, items || WORK, entry);
const paintPatents = (id, items) => paint(id, items || PATENTS, record);

/* --- Scrolling ledger ---------------------------------------------------- */

// The news list fades at its bottom edge to signal more below. Lift the fade
// once the end is reached, and skip it entirely when nothing overflows.
function wireLedger(id) {
  const list = document.getElementById(id);
  if (!list) return;
  const sync = () => {
    const overflows = list.scrollHeight > list.clientHeight + 1;
    list.classList.toggle('no-overflow', !overflows);
    list.classList.toggle('at-end',
      overflows && list.scrollTop + list.clientHeight >= list.scrollHeight - 1);
  };
  list.addEventListener('scroll', sync, { passive: true });
  addEventListener('resize', sync);
  sync();
}

/* --- Narrow-screen menu -------------------------------------------------- */

// Below the phone breakpoint the nav collapses behind a menu button. Closes on
// Escape, on a click outside, and on choosing a link.
function wireMenu(btnId, navId) {
  const btn = document.getElementById(btnId);
  const nav = document.getElementById(navId);
  if (!btn || !nav) return;

  const setOpen = (open) => {
    nav.dataset.open = String(open);
    btn.setAttribute('aria-expanded', String(open));
  };
  setOpen(false);

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(nav.dataset.open !== 'true');
  });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  // Leaving the narrow band must not strand it open.
  matchMedia('(min-width: 420px)').addEventListener('change', () => setOpen(false));
}

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
  });
}
