# Celestin Simo — portfolio

Personal portfolio of Celestin Gills SIMO NOUAYOU, AI engineering student at Efrei Paris.
French / English, dark / light theme. Live at **https://sims08265.github.io**.

## Stack

- Angular 21: standalone components, signals, zoneless change detection
- Static prerendering (`@angular/ssr`, `outputMode: "static"`) with incremental hydration: the page is plain HTML
  first, then each section becomes interactive when it scrolls into view
- Plain CSS, self-hosted fonts (`public/fonts`, SIL Open Font License)
- No backend: the contact form opens the visitor's mail app (`mailto:`)

## Run and build

```bash
npm ci          # install dependencies
npm start       # dev server on http://localhost:4200
npm run build   # production build in dist/simo-portfolio/browser (prerendered, static)
```

## Edit the content

All text lives in **`src/app/core/portfolio.data.ts`**, in French and English. The components only display it.

| What | Where in `portfolio.data.ts` |
| --- | --- |
| Interface text (titles, buttons, About paragraphs) | `UI_TEXT` (`fr` and `en`) |
| Page title, description, social preview | `SITE` |
| Name, contact links, CV file, stats, languages, focus areas | `PROFILE` |
| Hero terminal and floating cards | `TERMINAL`, `HERO_FLOATS` |
| Education, skills, projects, experience, interests | `EDUCATION`, `SKILLS`, `PROJECTS`, `EXPERIENCES`, `INTERESTS` |

- **CV**: put the PDF in `public/` and set `PROFILE.cv` to its file name.
- **Social preview image** (`public/og-image.png`, 1200×630): edit `tools/og-image.html`, then regenerate it with
  the command in that file's header comment (headless Microsoft Edge).
- **Favicon** (`public/favicon.ico`, `public/apple-touch-icon.png`): the initials on the site gradient, drawn by
  `tools/favicon.html`; regenerate with `python tools/favicon.py` (standard library + Microsoft Edge).
- Content rules (facts only, private repositories never linked, FR + EN) are in [CLAUDE.md](CLAUDE.md).
  With Claude Code, `/maj-portfolio <what changed>` applies an update end to end.

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every push to `main`: `npm ci`,
`ng build --base-href /`, copies `index.html` to `404.html`, and publishes `dist/simo-portfolio/browser`
to GitHub Pages. Nothing else to do: push, and the site updates a minute or two later.
