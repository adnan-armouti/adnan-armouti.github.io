# adnan-armouti.github.io

Personal academic site for **Adnan Armouti** — CS PhD candidate at Cornell Tech.

Live at <https://adnan-armouti.github.io>.

## Structure

Static HTML, one stylesheet, one data file. No build step; GitHub Pages serves it directly.

```
index.html         About, news, selected work
publications.html  Full publication list + patents
style.css          The whole design system
work.js            Publication/patent records + their renderers
images/            Portrait
files/pdf/         CV and award PDFs
assets/projects/   Per-paper figures
```

## Design

The visual language is taken from my ECCV 2026 poster: carnelian (`#b31b1b`)
section marks, panelled content, a left-hand label rail, and captions set in
italic. IBM Plex Sans and Plex Mono throughout.

Layout is a sticky identity rail beside a single content column. Publication
entries run **year rail → body → figure**, with resources as rule-separated
text rather than buttons.

Light and dark both derive from one token set at the top of `style.css`
(`--paper`, `--ink`, `--rule`, `--mark`, …). The theme follows the OS by
default; the switch in the rail overrides it and persists to `localStorage`.

## Adding a paper

Copy a record in the `WORK` array in [`work.js`](work.js):

```js
{
  featured: true,                  // also list it on the front page
  year: '2027',
  venue: 'CVPR 2027',              // rendered in carnelian small caps
  title: 'Paper Title',
  href: 'https://project-page.example',
  authors: 'Plain Name, [Linked Name](https://…), **Adnan Armouti**',
  note: 'One sentence on the contribution.',
  honours: ['Oral'],               // optional
  figure: 'assets/projects/<slug>/figure.jpg',
  resources: [{ label: 'paper', href: '…' }],
}
```

Figures want roughly **16:10**; they are cropped to fill. Add `fit: 'contain'`
to letterbox a wide diagram instead. Resource links print in the order set by
`RESOURCE_ORDER`, whatever order you list them in. Patents live in `PATENTS`
in the same file.

## Local preview

```bash
python3 -m http.server 8787 --directory .   # http://localhost:8787
```

Over SSH: `ssh -N -L 8787:localhost:8787 <user>@<host>`.

A `Stop` hook in `.claude/settings.json` starts this automatically when working
with Claude Code and prints the link after each turn.
