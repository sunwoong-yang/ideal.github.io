# Repository Guidelines

## Project Structure & Module Organization
- Root contains static site sources for IDEA LAB. Key directories: `index.html` and `.html` subpages for content, `css/` and `scss/` for styling, `js/` for behavior (notably `navbar.js`), `images/` and `fonts/` for assets.
- Shared navbar and footer markup is loaded via `js/navbar.js`; most pages import it with `<div data-navbar ...>`. Keep variants in `team-*.html`, `projects.html`, etc. consistent. **All pages must use the exact same top banner styling**—do not introduce page-specific navbar tweaks that make the banner look different anywhere.
- Use `images/Research Overview_260209.png`, `images/HYU_logo_singlecolor_png.png`, etc. for hero graphics; place new assets in `images/` and reference relative paths.
- The News system is manual. Add new entries at the top of `news.html` (newest first) and ensure only the latest four appear in the home page News section (`index.html`). Remove or comment out older entries from the home page as new ones are added.

## Build, Test, and Development Commands
- Static site: no build tooling required. Serve locally via any HTTP server (`python3 -m http.server 8080`).
- Node dependencies are present (`package.json`) for tooling; run `npm install` if scripts are added. No automated test suite currently.

## Coding Style & Naming Conventions
- HTML/CSS/JS follow 2-space indentation in inline styles, 4 spaces elsewhere. Maintain consistent indentation within `<style>` tags.
- Prefer descriptive class names and reuse existing typography rules (`.key-components`, `.news-item`). Inline styles should be minimized; add global rules in page `<style>` blocks or `css/style.css`.
- Image names use descriptive snake case or Pascal case (`Research Overview_v3.png`).

## Testing Guidelines
- Manual verification only. After edits, open affected `.html` pages in desktop and mobile viewports to confirm layout, navbar behavior, and shared assets.
- Ensure interactive elements (e.g., news links) navigate correctly and that `js/navbar.js` still injects the navbar.

## Commit & Pull Request Guidelines
- Follow concise commit messages summarizing scope (e.g., `Update news cards for mobile`, `Refresh research hero layout`). Use present tense.
- Pull requests should describe visual changes, reference new assets, and include before/after screenshots when layout shifts occur. Mention impacted pages and manual test steps performed.
