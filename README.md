# Perth Independent Barber Website System — Multi-Theme Agency Platform

An art-directed, performance-optimized, data-driven multi-theme website architecture tailored for independent barbershops across Perth and Western Australia.

---

## 1. System Overview & Creative Design Systems

This repository provides three distinct design systems engineered from the ground up:

### Template A — Noir / Luxury Grooming (`noir-luxury`)
- **Aesthetic**: Cinematic dark editorial, obsidian surfaces (`#09090b`), selective champagne gold accents (`#d4af37`), dramatic negative space.
- **Typography**: Expressive serif headers (`GT Super`) paired with tracked neo-grotesque sans (`Helvetica Neue`).
- **Motion**: GSAP hero entrance timeline, staggered scroll-triggered reveals, subtle SVG grain depth, interactive button magnet states.
- **Sample Profile**: *Next Level Barbershop* (56 William St, Perth CBD).

### Template B — Modern / Creative Studio (`modern-studio`)
- **Aesthetic**: Contemporary urban studio, warm bone canvas (`#f4f1ea`, `#eae6dc`), deep graphite, muted sage/olive accents (`#414b3c`).
- **Typography**: Swiss modernist typographic grid, large numbers, crisp layout hierarchy.
- **Features & Motion**: Live Perth Local Time (AWST, UTC+8), interactive category-filtered Service Matrix (Cuts, Beard, Treatments), kinetic craft ticker, mobile-first booking bar.
- **Sample Profile**: *District 9 Barber Co.* (148 Roe St, Northbridge Creative Precinct).

### Template C — Classic / Heritage Barbershop (`heritage-classic`)
- **Aesthetic**: Reimagined traditional barbershop identity with an editorial finish. Deep mahogany, rich oxblood burgundy (`#251214`, `#87232e`), warm antique parchment (`#fbf9f4`), burnished brass borders.
- **Typography**: Classical serif presentation, ornamental corner brackets, Roman numeral service ledger (`I.`, `II.`, `III.`).
- **Features**: The Master Barbering Craft Charter, traditional dotted menu leaders, cut-throat royal shave ceremony.
- **Sample Profile**: *St. George Barber Guild* (182 St Georges Terrace, Perth Heritage Quarter).

---

## 2. Architecture & Directory Structure

```
src/
  schemas/
    barberSchema.js             # Data validation, type normalization & safe fallback handling
    barberSchema.test.js        # Unit test suite for schema validation
  data/
    barbers/
      nextLevel.json            # Profile 1: Next Level Barbershop (Noir Luxury)
      districtNine.json         # Profile 2: District 9 Barber Co. (Modern Studio)
      stGeorgeGuild.json        # Profile 3: St. George Barber Guild (Heritage Classic)
      index.js                  # Barber registry and resolver helpers
  templates/
    NoirLuxuryTemplate.jsx      # Design System A component
    ModernStudioTemplate.jsx    # Design System B component
    HeritageClassicTemplate.jsx # Design System C component
    TemplateRouter.jsx          # Route dispatcher & state coordinator
  components/
    shared/
      ThemeSwitcherBar.jsx      # Floating preview switcher for live testing
      NoiseOverlay.jsx          # Lightweight SVG grain texture
    NavBar.jsx                  # Original components preserved
    Footer.jsx
  utils/
    animations.js               # GSAP timelines, ScrollTrigger, reduced-motion detection
```

---

## 3. How to Add a New Barber in One Step

To launch a new barbershop website on this system, create a single JSON file in `src/data/barbers/` (e.g. `src/data/barbers/barrackStreet.json`):

```json
{
  "businessName": "Barrack St Grooming Co.",
  "slug": "barrack-street",
  "theme": "noir-luxury",
  "tagline": "Modern Barbering on Barrack Street.",
  "location": "82 Barrack St, Perth WA 6000",
  "phone": "+61 8 9325 1100",
  "email": "chair@barrackst.com.au",
  "bookingUrl": "https://www.fresha.com",
  "businessDescription": "Tailored grooming in the heart of Perth CBD.",
  "hours": [
    { "days": "Monday – Friday", "time": "8:30 AM – 6:00 PM" },
    { "days": "Saturday", "time": "9:00 AM – 4:00 PM" }
  ],
  "services": [
    {
      "name": "Classic Haircut",
      "price": "$42",
      "duration": "30 mins",
      "description": "Tailored cut and hot towel neck shave."
    }
  ]
}
```

Then register it in `src/data/barbers/index.js`:
```javascript
import barrackStreetRaw from "./barrackStreet.json";
// Add to rawBarbers array:
const rawBarbers = [nextLevelRaw, districtNineRaw, stGeorgeGuildRaw, barrackStreetRaw];
```

The system automatically validates all fields, normalizes prices and numbers, sets up section visibility flags, and applies the selected theme (`noir-luxury`, `modern-studio`, or `heritage-classic`).

---

## 4. Routing & Preview Controls

The application supports clean multi-tenant and multi-theme routing:

| URL Route | Behavior |
|---|---|
| `/` | Default barbershop (`next-level-barbershop`) rendered in its configured theme |
| `/barber/:slug` | Renders specific barber profile by slug |
| `/theme/:themeName` | Forces any of the three themes (`noir-luxury`, `modern-studio`, `heritage-classic`) |
| `/?theme=...&barber=...` | Query param overrides for quick URL sharing |
| `/privacy` | Dynamically branded Privacy Policy |

### Interactive Theme Switcher Bar
A floating control pill is located at the bottom right. Clicking it opens a live preview drawer that allows you to:
1. Switch between Noir Luxury, Modern Studio, and Classic Heritage instantly.
2. Switch between any registered barber data profiles.
3. Test layout reactivity without refreshing.

---

## 5. Motion, Performance & Accessibility

- **GSAP & StrictMode Safety**: All animations run inside `createAnimationScope()`, properly cleaning up ScrollTriggers and timelines on component unmount to prevent duplicate animations or memory leaks.
- **prefers-reduced-motion**: If a user has reduced motion enabled in their operating system, animations are automatically disabled.
- **Fast Build Times**: Vite build finishes in under 250ms with zero runtime warnings.
- **Zero Undefined Placeholders**: Missing optional sections (e.g., reviews, team, packages) gracefully collapse without empty white cards or `undefined` text.

---

## 6. Development & Verification Commands

```bash
# Run ESLint validation
npm run lint

# Run unit tests and SSR template verification suite
npm test

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
