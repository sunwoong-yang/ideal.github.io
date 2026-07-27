# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page HTML/CSS/JS website for IDEA LAB (Hanyang University ERICA), hosted via GitHub Pages (custom domain in `CNAME`). No build step, no bundler, no framework — every top-level `*.html` file is a standalone page sharing common CSS (`css/`), JS (`js/`), and image assets (`images/`, `fonts/`).

## Commands

- No build/lint/test tooling. `package.json`'s only script is a placeholder (`"test": "echo ... && exit 1"`); `sass` is listed as a devDependency but there is no `scss` build wired into it — treat `css/style.css` as the compiled, hand-edited source of truth.
- To preview locally: serve the repo root with any static file server, e.g. `python3 -m http.server 8080`, then open the page directly (`http://localhost:8080/index.html`).
- No automated tests exist. Verification is manual: open the changed page(s) in a browser at desktop and mobile widths and check layout, nav behavior, and links.

## Architecture

### Shared navbar vs. shared footer — these are NOT the same mechanism
- **Navbar is JS-injected, not copy-pasted.** Every page includes `<div data-navbar data-active="PAGE_KEY"></div>` in `<body>` and loads `js/navbar.js`, which builds the `<nav>` markup from a template and drops it in at runtime. `data-active` (e.g. `"projects"`, `"team"`, `"news"`) controls which nav item is highlighted. **Never hand-write a `<nav>` block in a new page** — add the `data-navbar` div and the script tag instead, matching an existing page like `projects.html`.
- **Footer is literal HTML, copied per page.** Unlike the navbar, the `<footer class="ftco-footer ...">...</footer>` block (logo + copyright) is duplicated as static markup in every page (see `index.html`). When it needs to change, edit it in every `*.html` file — there is no shared JS template for it.
- This distinction matters because the two are edited differently even though the top-level project rule ("all pages share the same nav/footer") applies to both.

### Page structure
- Every page follows: `<head>` with shared CSS links + a page-specific `<style>` block for one-off layout rules, then `<body data-spy="scroll" ...>` containing the injected navbar div, the page's main `<section>`, the literal footer, and the standard script includes (`jquery`, `bootstrap`, `owl.carousel`, `aos`, `js/navbar.js`, `js/main.js`) at the bottom.
- Team/achievements/news pages come in pairs by audience (`team-advisor.html` / `team-researchers.html`, `news.html` / `news-activities.html`, `publications.html` / `conferences.html` under "Achievements").

### Language convention
- **`join-us.html` and every `news/*.html` detail page are written in Korean.** All other pages (`index.html`, `news.html` itself, `projects.html`, `research.html`, `team-*.html`, `publications.html`, `conferences.html`, etc.) are in English.
- When creating a new news detail page or editing `join-us.html`, write the content in Korean to match the existing convention. When editing any other page, keep it in English.

### News system (manual, no CMS)
- Detail pages live in `news/YYMMDD_description.html`.
- `news.html` lists all news, newest first.
- `index.html`'s home News section mirrors only the latest 3 entries.
- Links in `news.html` and `index.html` must match the actual filenames in `news/` exactly — there's no build step to catch broken links.
- If a news item is an invited talk, it also gets prepended to the Invited Talks list in `team-advisor.html` (format: `<li>[Institution], "[Talk title]", [Month] [Year].</li>`).

### Projects page sponsor logos
- Sponsor/institution logos live in `images/projects/` (mixed formats: svg/png/jpg, inconsistent native aspect ratios).
- Pattern used in `projects.html`: a fixed-size `.project-logo-box` (white background, `object-fit: contain`) floated top-right inside `.project-header-row`, so it visually spans the status/role tag line and the Sponsor line without leaving a blank gap. Follow this pattern (float + clearfix wrapper, not a flex row) when adding new sponsors so logo aspect ratio differences don't force uneven spacing.

## News 업데이트 규칙

뉴스를 추가하거나 수정할 때 **반드시 아래 세 곳을 모두 업데이트**한다:

1. `news/` 폴더에 상세 페이지 HTML 파일 생성
   - 파일명은 `YYMMDD_설명.html` 형식 (예: `260507_news-26CAE-conference.html`)
2. `news.html` — 뉴스 목록에 항목 추가 (최신순, 맨 위)
3. `index.html` — 홈 화면 하단 News 섹션을 **최신 3개**로 유지 (링크 포함)

news.html과 index.html의 링크는 항상 실제 파일명과 일치해야 한다.

## Invited Talk 업데이트 규칙

뉴스가 Invited Talk에 해당하는 경우, `team-advisor.html`의 Invited Talks 목록 **맨 위**에도 추가한다.
형식: `<li>[기관명], "[발표 제목]", [월] [연도].</li>`

## HTML 페이지 공통 구조 규칙

모든 HTML 페이지는 **동일한 형태의 상단 네비게이션 바와 하단 푸터 배너**를 가져야 한다.

- 새 HTML 페이지를 생성할 때, 네비게이션 바는 `<div data-navbar data-active="..."></div>` + `js/navbar.js` 로드로 구성한다 (직접 `<nav>` 마크업을 작성하지 않는다). 푸터는 `index.html`의 `<footer>` 섹션을 그대로 복사하여 사용한다.
- 네비게이션 바와 푸터의 구조, 링크, 스타일을 임의로 변경하지 않는다.
- 페이지 간 일관성을 유지하기 위해 nav/footer를 수정해야 할 경우, **모든 HTML 파일에 동일하게 반영**한다 (nav는 `js/navbar.js` 템플릿 한 곳만 고치면 되지만, footer는 각 파일마다 수정해야 한다).
