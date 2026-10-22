# BarberShop — Multi-Client Master Template Platform

A production-ready, data-driven master template engineered to power **approximately 80 independent barbershop websites** from a single GitHub repository (`Dev0081118/BarberShop`) using client-specific Vercel build configurations.

---

## 1. How the Master Template Works

```
                        ┌──────────────────────────────────────────────────┐
                        │      GitHub Repository: Dev0081118/BarberShop     │
                        └─────────────────────────┬────────────────────────┘
                                                  │
                ┌─────────────────────────────────┼─────────────────────────────────┐
                │                                 │                                 │
                ▼                                 ▼                                 ▼
   ┌───────────────────────────┐     ┌───────────────────────────┐     ┌───────────────────────────┐
   │      Vercel Project 1     │     │      Vercel Project 2     │     │     Vercel Project 80     │
   │      (hammoudi-site)      │     │     (district-nine-site)  │     │     (client-80-site)      │
   ├───────────────────────────┤     ├───────────────────────────┤     ├───────────────────────────┤
   │ VITE_BARBER_SLUG=hammoudi │     │ VITE_BARBER_SLUG=...      │     │ VITE_BARBER_SLUG=...      │
   │ Theme: Noir               │     │ Theme: Modern             │     │ Theme: Classic            │
   │ nextlevelbarbershop.com.au│     │ district9barber.com.au    │     │ client80barbers.com.au    │
   └───────────────────────────┘     └───────────────────────────┘     └───────────────────────────┘
```

- **Single Codebase**: All 80 client websites share one tested React + Vite codebase.
- **Client Isolation**: Each client's data is isolated in a separate JSON configuration file (`src/data/clients/<slug>.json`).
- **Build-Time Resolution**: When Vercel builds a project, the environment variable `VITE_BARBER_SLUG` selects that client's configuration.
- **HTML Meta Injection**: Vite injects the client's verified SEO title, meta description, and favicon into `index.html` at build time.
- **Safety Halt**: If `VITE_BARBER_SLUG` is missing on Vercel or points to an unknown slug, the build fails immediately. The application never silently publishes the wrong client's data.

---

## 2. Directory Structure

```
src/
  themes/                       # Clearly separated theme architectures
    noir/
      NoirTheme.jsx             # Noir / Luxury theme (obsidian, champagne gold, editorial)
    modern/
      ModernTheme.jsx           # Modern / Creative studio (bone canvas, Swiss grid, AWST clock)
    classic/
      ClassicTheme.jsx          # Classic / Heritage (mahogany, oxblood, printed service ledger)
    index.js                    # Theme dispatcher & registry
  data/
    clients/                    # Independent client configurations
      hammoudi.json             # Next Level Barbershop (56 William St, Perth CBD)
      district-nine.json        # District 9 Barber Co. (148 Roe St, Northbridge)
      st-george-guild.json      # St. George Barber Guild (182 St Georges Terrace)
      example-client.json       # Blueprint for adding clients #4 to #80
      index.js                  # Client registry & lookup helpers
  config/
    clientResolver.js           # Production & development client resolution logic
  schemas/
    barberSchema.js             # Data validation & schema normalizer
    barberSchema.test.js        # Unit test suite
  components/
    shared/
      DeploymentErrorScreen.jsx # Safe error UI when configuration is missing
      ThemeSwitcherBar.jsx      # Development-only floating switcher
      NoiseOverlay.jsx          # GPU-accelerated grain depth texture
  utils/
    animations.js               # GSAP timelines, ScrollTrigger, reduced-motion detection
scripts/
  vercel-ignore-build.sh        # Smart filter skipping builds for unrelated clients
  verify-templates.js           # Automated SSR & data isolation test script
```

---

## 3. The Three Distinct Design Systems

| Feature | Noir / Luxury (`noir`) | Modern / Creative (`modern`) | Classic / Heritage (`classic`) |
|---|---|---|---|
| **Palette** | Obsidian (`#09090b`), gold (`#d4af37`) | Chalk (`#f4f1ea`), sage (`#414b3c`), graphite | Mahogany (`#251214`), ivory, oxblood |
| **Typography** | `GT Super` serif + tracked sans | Swiss modular typography + monospace accents | Traditional serif + ornamental Roman numerals |
| **Hero Style** | Asymmetrical editorial, layered text | Architectural card with live AWST clock | Classical triple-frame craft overview |
| **Service Layout**| Luxury bordered cards with pricing | Category-filtered matrix (Cuts, Beard, Combos) | Printed guild ledger with dotted leaders |
| **Motion** | GSAP staggered timeline, fine lines | Smooth grid reveals, kinetic marquee | Gentle fades, line drawing, wax seal details |

---

## 4. Client Configuration Schema

Every client file in `src/data/clients/<slug>.json` supports:

```json
{
  "businessName": "Crown & Razor Studio",
  "slug": "crown-and-razor",
  "theme": "noir",
  "tagline": "Precision Cuts & Contemporary Grooming",
  "location": "74 Barrack Street, Perth WA 6000",
  "city": "Perth WA",
  "addressLine": "74 Barrack Street, Perth CBD",
  "mapUrl": "https://maps.google.com/?q=74+Barrack+Street,+Perth+WA+6000",
  "phone": "+61 8 9200 1122",
  "email": "concierge@crownandrazor.com.au",
  "bookingUrl": "https://www.fresha.com",
  "businessDescription": "Independent barbershop specializing in precision fades and traditional shaves.",
  "branding": {
    "logo": null,
    "heroImage": "/src/assets/hero.png",
    "favicon": "/favicon.svg",
    "tag": "PERTH CBD • EST. 2024",
    "accentColor": "#d4af37"
  },
  "seo": {
    "title": "Crown & Razor Studio | Master Barber | Perth",
    "description": "Artisan grooming and haircuts in Perth CBD. Book appointment online.",
    "keywords": ["barber Perth", "skin fade", "mens haircut"]
  },
  "hours": [
    { "days": "Monday – Friday", "time": "8:30 AM – 6:00 PM" },
    { "days": "Saturday", "time": "9:00 AM – 4:00 PM" },
    { "days": "Sunday", "time": "Closed" }
  ],
  "services": [
    {
      "id": "srv-01",
      "number": "01",
      "name": "Classic Haircut",
      "category": "Cuts",
      "description": "Tailored cut, styling, and hot towel neck shave.",
      "price": "$40",
      "duration": "35 mins",
      "popular": true
    }
  ],
  "packages": [],
  "team": [],
  "reviews": [],
  "gallery": [],
  "socialLinks": [
    { "platform": "Instagram", "url": "https://instagram.com", "label": "@crownandrazor" }
  ],
  "sections": {
    "hero": true,
    "marquee": true,
    "story": true,
    "services": true,
    "packages": false,
    "team": false,
    "reviews": false,
    "gallery": false,
    "hours": true,
    "contact": true,
    "footer": true
  }
}
```

*Note: Optional sections (`packages`, `team`, `reviews`, `gallery`) automatically collapse if the array is empty, preventing empty placeholders or `undefined` text.*

---

## 5. Step-by-Step Guide: Adding a New Client (e.g. Client #4)

### Step 1: Create the Client Configuration File
Duplicate `src/data/clients/example-client.json` to `src/data/clients/crown-and-razor.json`:
- Set `"slug": "crown-and-razor"`
- Set `"theme": "noir"` (or `"modern"` or `"classic"`)
- Fill in the verified business name, address, phone, and Fresha booking URL.

### Step 2: Register in `src/data/clients/index.js`
Import and add the raw config:
```javascript
import crownAndRazorRaw from "./crown-and-razor.json";

const rawClients = [
  hammoudiRaw,
  districtNineRaw,
  stGeorgeGuildRaw,
  crownAndRazorRaw,
];
```

### Step 3: Test Locally
```bash
# Preview the new client in development mode
VITE_BARBER_SLUG=crown-and-razor npm run dev

# Or test the production build for this client
VITE_BARBER_SLUG=crown-and-razor npm run build
```

---

## 6. Vercel Project Setup (for each of the 80 Clients)

To deploy a client to its own independent Vercel project:

1. In the Vercel Dashboard, click **Add New... → Project**.
2. Select the repository: `Dev0081118/BarberShop`.
3. Configure the Project Settings:
   - **Project Name**: `<client-slug>-site` (e.g. `crown-and-razor-site`)
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add the required Environment Variable:
   - **Key**: `VITE_BARBER_SLUG`
   - **Value**: `crown-and-razor`
   - **Target**: Production, Preview, Development
5. Configure the Ignored Build Step (prevents rebuilding when other clients change):
   - In **Settings → Git → Ignored Build Step**:
   - Choose **Custom Command**:
     ```bash
     bash scripts/vercel-ignore-build.sh
     ```
6. Click **Deploy**.
7. In **Settings → Domains**, assign the client's custom domain (e.g. `crownandrazor.com.au`).

---

## 7. Scaling to 80 Independent Deployments & Maintenance

### Impact of Shared Repository on Vercel
When 80 Vercel projects connect to one GitHub repository:
- **Shared Code Changes** (e.g. modifying `src/themes/noir/NoirTheme.jsx` or `package.json`):
  `scripts/vercel-ignore-build.sh` detects that core application code changed and returns `exit 1`. All 80 projects rebuild and receive the update safely.
- **Client-Only Changes** (e.g. updating prices in `src/data/clients/hammoudi.json`):
  `scripts/vercel-ignore-build.sh` detects changes ONLY for `hammoudi`. The `hammoudi` project rebuilds (`exit 1`), while the remaining 79 projects skip the build (`exit 0`). This conserves Vercel build minutes and avoids queue congestion.

---

## 8. Verification Commands

```bash
# 1. Run ESLint
npm run lint

# 2. Run unit tests and template/SSR verification
npm test

# 3. Test building specific clients
VITE_BARBER_SLUG=hammoudi npm run build
VITE_BARBER_SLUG=district-nine npm run build
VITE_BARBER_SLUG=st-george-guild npm run build

# 4. Verify invalid slug halts build
VITE_BARBER_SLUG=invalid-slug npm run build  # Exits with error code 1
```

---

## 9. Known Limitations & Operational Considerations

1. **Vercel Project Limits**: Ensure your Vercel account tier supports 80 connected projects.
2. **First Deployment**: The initial deployment for each Vercel project builds once because there is no previous commit hash for `git diff`.
3. **Manual Domain Delegation**: Setting up custom domains and DNS A/CNAME records for each client still requires manual configuration in Vercel or registrar DNS.
4. **No Direct Secret Sharing**: Never store API keys or private database secrets in client JSON files or `VITE_*` variables.
