# File Link Structure for Lunixa Cloud Solutions Website

This document explains how the main HTML files and assets are linked together in the Lunixa Cloud Solutions (SCS) static website project.

---

## Main HTML Files

- **/en/index.html**  
  English homepage. Uses left-to-right layout (`lang="en" dir="ltr"`).
- **/ar/index.html**  
  Arabic homepage. Uses right-to-left layout (`lang="ar" dir="rtl"`).

---

## Shared Stylesheets and Scripts

Both HTML files link to the same shared CSS and JS files (relative to their own location):

- `../css/styles.css` — Main global styles for layout, sections, and components.
- `../css/technologies.css` — Styles for technology/tool and cloud provider grids/cards.
- `../css/responsive.css` — Responsive/adaptive styles for mobile and tablet.
- `../css/scs-loading.css` — Styles for the loading animation overlay.
- `../js/script.js` — Main JavaScript for interactivity and navigation.
- `../js/scs-loading.js` — JavaScript for the loading animation overlay.
- Font Awesome CDN — For icon fonts (cloud, tech, provider icons, etc).

---

## Images and Assets

- `../images/` — Shared image assets (logos, provider icons, etc) used by both language versions.

---

## Section Structure

Each HTML file contains the same main sections (with translated content):
- Hero
- Services
- Technologies & Tools
- Cloud Providers
- Who We Are
- Why Work With Us
- Contact
- Footer

---

## Language Switching

- The English file (`/en/index.html`) links to the Arabic version via a button:  
  `<a href="/ar" class="language-switcher language-link">العربية</a>`
- The Arabic file (`/ar/index.html`) links to the English version via a button:  
  `<a href="/en" class="language-switcher language-link">English</a>`
- Both use sessionStorage to handle language switch visibility.

---

## Summary Table

| File/Folder              | Purpose/Linkage                                      |
|-------------------------|------------------------------------------------------|
| en/index.html           | English homepage, links to shared CSS/JS/assets      |
| ar/index.html           | Arabic homepage, links to shared CSS/JS/assets       |
| ../css/styles.css       | Main global styles (sections, layout, colors, etc)   |
| ../css/technologies.css | Styles for tech/tool and provider grids/cards        |
| ../css/responsive.css   | Responsive styles for all sections                   |
| ../css/scs-loading.css  | Loading animation overlay styles                     |
| ../js/script.js         | Main JS for navigation and interactivity             |
| ../js/scs-loading.js    | JS for loading animation overlay                     |
| ../images/              | Shared images (logos, icons, etc)                    |

---

## Notes
- All CSS/JS/image files are shared between both language versions.
- Only the HTML content and direction differ between `/en/index.html` and `/ar/index.html`.
- Section structure and class names are kept consistent for maintainability.
