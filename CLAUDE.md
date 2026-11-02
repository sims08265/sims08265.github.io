# CLAUDE.md — portfolio of Celestin Simo

Angular 21 site, prerendered to static HTML and deployed to GitHub Pages (https://sims08265.github.io).
Owner: Celestin Gills SIMO NOUAYOU (GitHub `sims08265`).

## Non-negotiable rules

1. **Never lie or inflate.** Only write facts the owner has given. Never add a skill, tool, keyword, number or
   project that the owner did not state. If something is unclear (date, wording, number, translation), **ask; do
   not guess.** Something appearing on the CV is not enough: the owner decides what goes on the site.
   - No self-rated levels: no percentages, bars or scores for skills.
   - The TRUSTY Trust Score is **rule-based**: never call it machine learning.
2. **Confidentiality.** The owner's project repositories on GitHub are **private and stay private**. Describe the
   projects, but never link to their code: each card shows "Code privé — démo sur demande" /
   "Code private — demo on request". (This portfolio repository itself is public.)
   - The phone number is **never** published on the site (it stays on the CV only).
3. **French and English.** Every text exists in both languages, with correct French spelling and accents.
4. **One source of truth.** All content lives in `src/app/core/portfolio.data.ts` (FR + EN). Components only
   display it; never hard-code text in a component or in `index.html`. The only other content files are:
   - `public/*.pdf`: the CV, referenced by `PROFILE.cv`;
   - `tools/og-image.html`: source of `public/og-image.png` (social preview). It shows the name,
     "AI engineering student · Efrei Paris", "Open to a 3-month AI internship · Aug 2027" and a few skills.
     If any of these change, update it and regenerate the PNG with the command in its header comment.
   - `tools/favicon.html`: source of `public/favicon.ico` and `public/apple-touch-icon.png` (the initials
     `PROFILE.initials`). If the initials change, update it and run `python tools/favicon.py`.

## Update procedure

1. Edit the data in `src/app/core/portfolio.data.ts` (both `fr` and `en`).
2. `npm run build` — must pass with **no warnings and no errors**.
3. Commit with the message `content: <what changed>`.
4. Push to `main`.
5. The site redeploys by itself (`.github/workflows/deploy.yml`, about 1–2 minutes).

The project slash command `/maj-portfolio <sentence>` applies this procedure; it shows the diff and waits for the
owner's approval before committing.

## Where things are

- `PROFILE`: identity, contact links, CV file, stats, languages, focus areas. `SITE`: title/description/Open Graph.
- `UI_TEXT`: all interface text and the About paragraphs. `TERMINAL`, `HERO_FLOATS`, `MARQUEE`: hero.
- `EDUCATION`, `SKILLS`, `PROJECTS`, `EXPERIENCES`, `INTERESTS`: sections. An education item without `progress`
  is shown as in progress (no invented percentage). Project `size`: `featured` or `small`.
- New project illustration: add a case in `src/app/shared/project-art.component.ts` and its `art` key in `Project`.

## Technical guard rails

- The page is prerendered at build time (`src/main.server.ts`, `outputMode: "static"`). Code that runs during
  rendering must not touch browser globals: use `inject(DOCUMENT)`, or `afterNextRender` for `window`,
  `localStorage`, `matchMedia`, timers and animations.
- Sections below the hero hydrate on viewport (`@defer (hydrate on viewport ...)` in `app.ts`), all at once when
  the language is not French (the prerendered language).
- `[innerHTML]` is only used with strings from `portfolio.data.ts`, never with user input.
- `aria-label` only on the language and theme buttons; other icon-only controls use a `.sr-only` text.
- `.reveal` content is hidden only when `html.js` is set, so the page stays readable without JavaScript;
  keep `prefers-reduced-motion` support.
- Targets: `npm run build` without warnings; Lighthouse ≥ 90 in Performance, Accessibility, Best Practices, SEO.
