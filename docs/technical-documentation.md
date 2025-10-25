# Technical Documentation

## Overview
This repository contains a static, client‑side portfolio site for Mohammed. It showcases an About section, Experience timeline, Projects, and a Contact form. The site supports light/dark themes, a time‑based greeting, accessible navigation, and local export of contact messages.

## Architecture
- Static site: no backend or build step required
- Technologies: HTML5, CSS3, vanilla JavaScript (ES6+)
- Single page application style navigation using in‑page anchors

## File structure
- `index.html`: Semantic markup for header, sections (hero, about, experience, projects, contact), and footer
- `styles.css`: Design tokens (CSS variables), layout, components, responsive rules, and color themes
- `script.js`: Behavioral enhancements (greeting, theme management, smooth scrolling focus handling, contact form validation and export)
- `docs/`: Documentation (`ai-usage-report.md`, `technical-documentation.md`)
- `Images/`: Local images used in hero and about sections

## Runtime behavior
### Initialization
`script.js` registers a DOM ready handler. On load it runs:
- `setupYear()`: Sets the current year in the footer
- `setupGreeting()`: Sets a time‑based greeting in the hero
- `setupTheme()`: Resolves theme (light/dark) from localStorage or system preference, updates `html[data-theme]`, and wires a toggle button
- `setupSmoothScroll()`: Enhances in‑page anchor navigation for accessibility by focusing targets after scroll
- `setupContactForm()`: Validates input, stores messages in `localStorage`, and enables exporting messages to `.txt`

### Theme handling
- Attribute `data-theme` is applied to the root `html` element
- Persisted key: `preferred-theme`
- Initial value: user choice from localStorage, otherwise system preference via `prefers-color-scheme`
- Toggle button swaps icon between 🌙/☀️ and updates storage + DOM

### Contact form
- Client‑side validation for `name`, `email` (regex), and `message`
- On submit: builds an entry including a timestamp, appends to `localStorage` under `contact-messages`, and triggers a client‑side download of a per‑message `.txt`
- Export button: aggregates all saved messages and downloads a combined `.txt`
- Status area provides success/error feedback; individual error messages appear under fields

## Accessibility
- Semantic HTML: landmarks (`header`, `main`, `footer`), headings, lists
- Focus management: after anchor navigation, target sections receive focus to aid keyboard users
- Color contrast: dark/light themes use high‑contrast palette; focus outlines and hover states are visible
- Buttons and links: `aria-label`s on icons, `sr-only` text for social icons

## Performance considerations
- No external JS frameworks
- Google Fonts (`Inter`) loaded with `display=swap`
- Images: local PNGs plus externally hosted placeholder images with `loading="lazy"`
- CSS uses modern properties and avoids heavy animations

## State and storage
- `localStorage` keys:
  - `preferred-theme`: string `"light"` or `"dark"`
  - `contact-messages`: JSON array of message objects `{ name, email, message, date }`

## How to run locally
1. Open the folder in VS Code
2. Install the "Live Server" extension (by Ritwick Dey)
3. Right‑click `index.html` → "Open with Live Server"
4. The site opens at a local URL (e.g., `http://127.0.0.1:5500`)
Alternatively, open `index.html` directly in a browser (some features like smooth scrolling focus still work).

## Browser support
- Modern evergreen browsers (Chrome, Edge, Firefox, Safari)
- Requires support for: `classList`, `localStorage`, `matchMedia`, `Blob`, and CSS custom properties

## Known limitations
- No server‑side storage; messages persist only in the user's browser
- External project images are placeholders
- Email sending is not implemented (download simulation only)

## Future improvements
- Replace placeholder images/links with real project assets
- Add server endpoint or service (e.g., Formspree) for real email delivery
- Add basic unit tests for form validation functions
- Add i18n support for greeting and static text

