# Repository Guidelines

This file provides repository-level guidance to Codex when working on the IDEA LAB website. It is the Codex equivalent of `CLAUDE.md` and applies to this directory and all subdirectories.

## Project Overview

- This is a static, multi-page HTML/CSS/JavaScript website for IDEA LAB at Hanyang University ERICA.
- The site is hosted through GitHub Pages using the custom domain configured in `CNAME`.
- There is no framework, bundler, CMS, or production build step. Each top-level `*.html` file is a standalone page using shared assets from `css/`, `js/`, `images/`, and `fonts/`.
- Key pages include `index.html`, `research.html`, `projects.html`, `team-advisor.html`, `team-researchers.html`, `publications.html`, `conferences.html`, `news.html`, and `news-activities.html`.

## Commands and Verification

- `package.json` does not provide a meaningful build or test workflow. Do not treat its placeholder test script as a real test.
- `css/style.css` is the compiled, hand-edited CSS source of truth. Do not assume an SCSS build is configured.
- Preview locally by serving the repository root with a static file server, such as `python3 -m http.server 8080`, and opening the relevant page through HTTP.
- There are no automated tests. Manually verify affected pages at desktop and mobile widths, including navigation, links, images, and responsive layout.

## Shared Navbar and Footer

- The navbar is injected by `js/navbar.js`; it is not copied directly into every page.
- Every page must use `<div data-navbar data-active="PAGE_KEY"></div>` and load `js/navbar.js`. Use an existing page as the reference for `data-active` and `data-base` values.
- Never hand-write a new `<nav>` block in an individual page.
- The footer is literal HTML duplicated in every page. It is not injected by `js/navbar.js`.
- When changing the navbar, edit the shared `js/navbar.js` template. When changing the footer, apply the same change to every relevant HTML page.
- All pages must use the same top-banner styling. Do not add page-specific navbar tweaks that make one page look different.

## Page and Language Conventions

- Page structure is: shared CSS links and a page-specific `<style>` block in `<head>`, injected navbar placeholder, main page section, literal footer, then the standard script includes.
- `join-us.html` and every `news/*.html` detail page are written in Korean.
- Top-level pages such as `index.html`, `news.html`, `projects.html`, `research.html`, `team-*.html`, `publications.html`, and `conferences.html` are written in English unless existing content or the user explicitly requires otherwise.
- Team, achievements, and news pages are paired by audience or category: `team-advisor.html` / `team-researchers.html`, `publications.html` / `conferences.html`, and `news.html` / `news-activities.html`.

## News System

The News system is manual. Whenever news is added or changed, update all applicable locations:

1. Create the Korean detail page in `news/` using a `YYMMDD_description.html` filename.
2. Add the item to the appropriate full listing, newest first:
   - Research news: `news.html`
   - Education, workshops, and other activities: `news-activities.html`
3. Update the home News section in `index.html` so it contains **exactly the latest 3 news items across both categories**.

- Links in `news.html`, `news-activities.html`, and `index.html` must exactly match the real detail-page filename.
- Place news images in `news/images/` and use relative paths consistent with existing entries.
- Do not list the same news item in both Research and Activities.
- When adding a fourth newer home-page item, remove the oldest of the existing three from `index.html`; do not leave four items.

## Invited Talk Updates

- If a news item is an invited talk, also prepend it to the Invited Talks list in `team-advisor.html`.
- Use this format: `<li>[Institution], "[Talk title]", [Month] [Year].</li>`.
- Do not label a presentation as an invited talk or add it to this list unless the provided information supports that classification.

## Projects Page and Sponsor Logos

- Sponsor and institution logos belong in `images/projects/`.
- Follow the existing `.project-logo-box` pattern in `projects.html`: fixed-size white logo box, `object-fit: contain`, and placement inside `.project-header-row`.
- Preserve the existing float and clearfix layout so different logo aspect ratios do not create uneven spacing.
- Whenever a visible project is added or removed, update both the project count and total-funding animation in the Funding at a Glance banner.
- Do not invent project roles, sponsor relationships, dates, or funding values. Use only supplied or verified information.

## Coding Style

- Keep indentation consistent with the surrounding file. Inline styles generally use 2-space indentation; most other HTML/CSS/JS uses 4 spaces where established.
- Prefer descriptive class names and reuse existing typography and card styles such as `.news-item`, `.publication-card`, and `.project-item`.
- Minimize new inline styles. Put reusable or page-level rules in the page `<style>` block or `css/style.css` as appropriate.
- Use descriptive image filenames in snake case, kebab case, or the established project naming pattern.
- Preserve unrelated user changes in a dirty worktree.

## Git and Pull Requests

- Use concise, present-tense commit messages such as `Update news cards for mobile` or `Refresh research hero layout`.
- Only stage files that belong to the requested change unless the user explicitly asks to commit all local work.
- Pull requests that change layout should describe affected pages, new assets, and manual verification steps, with before/after screenshots when appropriate.
