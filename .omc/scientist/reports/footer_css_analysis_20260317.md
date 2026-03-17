# CSS Footer Analysis Report
**IDEA LAB Website - ideal.github.io**
**Date:** March 17, 2026

---

## Executive Summary

This analysis examines the CSS styling rules for the footer section of the IDEA LAB website. The main findings reveal:

1. **No responsive footer media queries in main CSS file** (css/style.css) - the 222KB stylesheet contains NO @media rules targeting `.ftco-footer` or footer-related classes
2. **Inline HTML flexbox creates inflexible horizontal layout** - the footer uses `display: flex; gap: 3rem;` without responsive variants
3. **Mobile CSS rules exist in HTML but don't affect the main flex container** - media queries in `<style>` tags apply to child elements but not the wrapper causing wrapping
4. **Large fixed padding (7em) applied to footer** - maintained at all screen sizes, doesn't adapt to mobile

---

## File Locations

| File | Lines | Size | Purpose |
|------|-------|------|---------|
| `css/style.css` | 11,043 | 222 KB | Main stylesheet (NO footer media queries) |
| `index.html` | 1,100+ | 38 KB | Contains inline styles with mobile rules |

---

## CSS Footer Rules in style.css

### Main Footer Container
**Location:** Line 10219

```css
.ftco-footer {
  font-size: 16px;
  background: #000000;
  padding: 7em 0;        /* Large vertical padding - NOT responsive */
  z-index: 0;
}
```

**Issue:** The 7em (≈112px) padding applies to desktop AND mobile, creating excessive vertical spacing on small screens.

---

### Footer Widget Styling
**Locations:** Lines 10225-10301

| Class | Line | Key Rules |
|-------|------|-----------|
| `.ftco-footer .ftco-footer-logo` | 10225 | `text-transform: uppercase; letter-spacing: 0.1em;` |
| `.ftco-footer .ftco-footer-widget h2` | 10229 | `color: #fff; margin-bottom: 40px; font-size: 22px;` |
| `.ftco-footer .ftco-footer-widget ul li` | 10236 | `margin-bottom: 10px;` |
| `.ftco-footer .ftco-footer-widget ul li a` | 10239 | `color: rgba(255, 255, 255, 0.6);` |
| `.ftco-footer p` | 10253 | `color: rgba(255, 255, 255, 0.7);` |
| `.ftco-footer a:hover` | 10259 | `color: #fff;` |

---

### Social Icons (Horizontal Layout)
**Location:** Lines 10268-10291

```css
.ftco-footer-social li {
  list-style: none;
  margin: 0 10px 0 0;
  display: inline-block;      /* Horizontal inline display */
}

.ftco-footer-social li a {
  height: 50px;
  width: 50px;
  display: block;
  float: left;                /* Old-school float layout */
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  position: relative;
}

.ftco-footer-social li a span {
  position: absolute;
  font-size: 26px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**Issue:** Uses `float: left` and `inline-block` - these don't stack vertically on mobile. No media query to change this.

---

### Footer Navigation
**Location:** Lines 10293-10301

```css
.footer-small-nav > li {
  display: inline-block;      /* Forces horizontal layout */
}

.footer-small-nav > li a {
  margin: 0 10px 10px 0;
}

.footer-small-nav > li a:hover, .footer-small-nav > li a:focus {
  color: #fff;
}
```

**Issue:** `inline-block` keeps items side-by-side on mobile with no responsive rule to change this.

---

## Media Queries in style.css

### Search Results: 50+ @media rules found, but NONE target footer

**Max-width: 767.98px** (Line 10313)
```css
@media (max-width: 767.98px) {
  #map {
    height: 300px;
  }
}
```
**Only affects:** `#map` element, NOT footer

**Max-width: 1199.98px** (Line 10432)
```css
@media (max-width: 1199.98px) {
  .ftco-counter {
    background-position: center center !important;
  }
}
```
**Only affects:** `.ftco-counter` component, NOT footer

**Conclusion:** The entire 222KB `style.css` file contains NO responsive rules for `.ftco-footer`, `.footer-*`, or `.ftco-footer-social` classes.

---

## Inline HTML Styles in index.html

### Footer Container (Line 1080)
```html
<footer class="ftco-footer ftco-section" style="padding: 2rem 0;">
```
- **Inline style:** `padding: 2rem 0;`
- **Effect:** Overrides `.ftco-footer { padding: 7em 0; }` with smaller 2rem padding
- **Responsive?** NO - applies to all screen sizes

---

### Footer Content Wrapper (Line 1085) - KEY ISSUE
```html
<div style="display: flex; align-items: center; justify-content: center; gap: 3rem;">
```

| Property | Value | Impact |
|----------|-------|--------|
| `display: flex` | Creates flexbox container | Default: items flow horizontally (row) |
| `align-items: center` | Vertical center alignment | Combined with flex = logo and text side-by-side |
| `justify-content: center` | Horizontal center alignment | Centers the flex items |
| `gap: 3rem` | 48px gap between items | Maintains spacing between logo and text |

**Critical Issue:** No `flex-direction: column;` on mobile means logo and text stay side-by-side, causing wrapping when combined with the logo width.

---

### Footer Logo (Line 1086-1087)
```html
<div class="footer-logo" style="background: transparent;">
  <img src="images/01 캐릭터 마크 - 기본형-04.png"
       alt="Hanyang University ERICA logo"
       style="max-height: 240px;">
</div>
```

| Element | Inline Style | Desktop | Mobile |
|---------|--------------|---------|--------|
| Wrapper | `background: transparent` | No background | No background |
| Image | `max-height: 240px` | 240px height | **No mobile variant** |

---

### Footer Text (Line 1089-1092)
```html
<p style="text-align: center; margin: 0;">
  <span class="footer-line-1">&copy; IDEA LAB, Hanyang University ERICA.</span>
  <span class="footer-line-2">All rights reserved.</span><br>
  <span class="template-credit">This template is made by...</span>
</p>
```

- **Text alignment:** Centered
- **Margins:** Removed (0)
- **Responsive?** NO

---

## Mobile Media Queries in HTML Style Tag

**Location:** `index.html` lines 149-913

These rules exist but DON'T solve the footer wrapping issue:

### Rule 1: Footer Column Direction (Line 894-898) - INSUFFICIENT
```css
@media (max-width: 768px) {
  /* Footer 세로 배치 */
  .ftco-footer .col-md-12 > div {
    flex-direction: column !important;
    gap: 1.5rem !important;
  }
}
```

**Target:** `.ftco-footer .col-md-12 > div`
**Problem:** This targets `.col-md-12 > div` (Bootstrap grid column children), but the actual footer content wrapper is a direct `<div>` child of `.col-md-12` without this class. **The selector may not match the actual layout structure.**

### Rule 2: Footer Logo Resize (Line 900-902)
```css
@media (max-width: 768px) {
  .footer-logo img {
    max-height: 150px !important;
  }
}
```

**Effect:** Reduces logo from 240px to 150px on mobile
**Problem:** Logo is smaller, but the flex container still tries to display logo + text horizontally, causing wrapping

### Rule 3: Footer Text Line Break (Line 905-908)
```css
@media (max-width: 768px) {
  .footer-line-1::after {
    content: '\A';
    white-space: pre;
  }
}
```

**Effect:** Adds line break after first footer line
**Problem:** Only splits text content, doesn't change flex layout direction

---

## Key Findings Summary

### Finding 1: No Responsive Padding
- **CSS Rule:** `.ftco-footer { padding: 7em 0; }` (line 10219)
- **Alternative Rule:** Inline `padding: 2rem 0;` (index.html line 1080)
- **Problem:** Neither adjusts for mobile screens
- **Impact:** Excessive vertical spacing on small devices

### Finding 2: Inflexible Horizontal Flexbox
- **HTML:** `<div style="display: flex; ... gap: 3rem;">`
- **Issue:** No `flex-direction: column;` for mobile
- **Missing:** Media query to change flex direction at max-width: 768px
- **Impact:** Logo and text forced side-by-side, causing wrapping

### Finding 3: CSS Selector Mismatch
- **Rule:** `@media (max-width: 768px) { .ftco-footer .col-md-12 > div { ... } }`
- **Problem:** Targets `.col-md-12 > div`, but inline flexbox is applied directly to an unmarked `<div>` child
- **Impact:** Media query may not apply to the element causing wrapping

### Finding 4: No Social Icons Responsive Rule
- **CSS:** `.ftco-footer-social li a { float: left; display: inline-block; }`
- **Issue:** No media query to change layout on mobile
- **Impact:** Social icons remain horizontal, may contribute to overall wrapping

### Finding 5: Footer Navigation Not Responsive
- **CSS:** `.footer-small-nav > li { display: inline-block; }`
- **Issue:** No media query to stack vertically
- **Impact:** Footer nav items remain side-by-side on mobile

### Finding 6: Logo Size Mismatch on Mobile
- **Desktop:** 240px height
- **Mobile:** 150px height (via media query)
- **Issue:** Logo is smaller but flex container still horizontal
- **Gap:** Still 3rem (48px) between logo and text
- **Result:** On narrow screens, logo (150px) + gap (48px) + text takes > 100% width

---

## File References

### css/style.css
- **Lines 10219-10301:** All footer-related CSS rules
- **Search:** 50+ media queries, 0 targeting footer
- **Status:** NO responsive footer rules

### index.html
- **Line 1080:** Footer container with inline padding
- **Line 1085:** Main flex wrapper (inline style)
- **Lines 1086-1092:** Footer logo and text content
- **Lines 894-908:** Mobile media queries (insufficient coverage)

---

## Conclusion

The footer wrapping issue is caused by:

1. **Inline flexbox with horizontal default** - No media query changes flex-direction on mobile
2. **CSS media query selector mismatch** - `.ftco-footer .col-md-12 > div` may not target the actual flex wrapper
3. **Fixed gap size** - 3rem (48px) remains even on narrow screens
4. **No responsive logo sizing strategy** - Logo reduced to 150px but flex container still tries horizontal layout
5. **Missing responsive rules in style.css** - All footer styling relies on inline HTML, which lacks responsive variants

**Recommendation:** Add proper `@media (max-width: 768px)` rule for the main footer flex wrapper to change `flex-direction: column;` and adjust `gap` and padding for mobile devices.

---

## Appendix: Complete Footer HTML Structure

```html
<footer class="ftco-footer ftco-section" style="padding: 2rem 0;">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <!-- MAIN FLEX WRAPPER - needs media query! -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 3rem;">
          <!-- LOGO SECTION -->
          <div class="footer-logo" style="background: transparent;">
            <img src="images/01 캐릭터 마크 - 기본형-04.png"
                 alt="Hanyang University ERICA logo"
                 style="max-height: 240px;">
          </div>

          <!-- TEXT SECTION -->
          <p style="text-align: center; margin: 0;">
            <span class="footer-line-1">&copy; IDEA LAB, Hanyang University ERICA.</span>
            <span class="footer-line-2">All rights reserved.</span><br>
            <span class="template-credit">This template is made by
              <a href="https://colorlib.com" target="_blank">Colorlib</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>
```

The problematic flex container is the `<div style="display: flex; ...">` element with **no media query to change its behavior on mobile**.
