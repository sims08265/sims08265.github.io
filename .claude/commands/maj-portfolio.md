---
description: Update the portfolio content (FR + EN) from one sentence, build, show the diff, then commit and push once approved
argument-hint: <what changed, e.g. "certification AWS Cloud Practitioner obtenue le 20/12/2026">
---

Update the portfolio with this change from the owner:

> $ARGUMENTS

Follow `CLAUDE.md` strictly (facts only, private repositories never linked, FR + EN, one source of truth).

1. **Understand the change.** Use only the facts in the sentence above. If anything needed is missing or
   ambiguous (exact title, organisation, dates, where it should appear, the French or English wording, whether
   an existing item is replaced or kept), **ask before editing**. Never invent or embellish: no extra skills,
   numbers, results or adjectives.
2. **Find every place the fact appears.** Search `src/app/core/portfolio.data.ts` and `tools/og-image.html` for
   related words in both languages (for example a new internship touches `hero.status`, `badge.open`,
   `about.p3`, `TERMINAL`, `SITE.description`, `EXPERIENCES` and the og image). Also check whether
   `PROFILE.stats` (e.g. "4 key projects") is still true; ask if unsure.
3. **Edit `src/app/core/portfolio.data.ts`** in French and English, matching the existing style. Correct French
   spelling and accents.
   - New project: add it to `PROJECTS` with its period, context, highlights and tags, all from the owner.
     Link the code **only** if the owner says the repository is public **and**
     `gh repo view <owner/repo> --json visibility` returns `PUBLIC`. Otherwise keep the
     "Code private — demo on request" line and no link. Reuse the closest `art` illustration or add a simple new
     case in `src/app/shared/project-art.component.ts`, and say which in the summary.
   - New certification or other kind of item with no obvious place: propose where to show it and ask.
4. **New CV PDF** (if the owner gives one): read it, copy it into `public/` with a clear name, set `PROFILE.cv`,
   and ask before deleting the previous PDF. Report any difference between the CV and the site, without
   changing the site content on your own.
5. **Social preview**: if a fact shown in `tools/og-image.html` changed, update it and regenerate
   `public/og-image.png` with the command in that file's header comment, then look at the image.
6. **Build**: `npm run build` must pass with no warnings and no errors. Fix and rebuild if needed.
7. **Show the diff and stop.** Show `git status --short` and `git diff` (the full diff of
   `portfolio.data.ts`), plus a short FR/EN summary of what changed and what you asked. **Do not commit
   until the owner explicitly approves.**
8. After approval: `git add -A`, commit with the message `content: <what changed>` (short, in English, with no `Co-Authored-By` / `Claude-Session` / AI attribution line), and
   `git push`. Then report the commit, the deploy run (`gh run list --workflow deploy.yml --limit 1`) and the
   site URL https://sims08265.github.io (it updates about 1–2 minutes after the push).
