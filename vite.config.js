import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { validateBarberConfig } from "./src/schemas/barberSchema.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Multi-Client Master Template Plugin
 * - Validates VITE_BARBER_SLUG at build time
 * - Prevents deploying invalid or missing client configurations
 * - Injects client-specific SEO metadata, favicon, OpenGraph, Twitter, and JSON-LD structured data into HTML
 */
function barberMultiClientPlugin() {
  let resolvedSlug = "";
  let validatedClient = null;

  return {
    name: "barber-multi-client-plugin",

    configResolved(config) {
      const isBuild = config.command === "build";
      const envSlug = (process.env.VITE_BARBER_SLUG || "").trim();
      const clientsDir = path.resolve(__dirname, "src/data/clients");

      // Read all available client JSON filenames
      const availableFiles = fs.existsSync(clientsDir)
        ? fs.readdirSync(clientsDir).filter((f) => f.endsWith(".json"))
        : [];
      const availableSlugs = availableFiles.map((f) => f.replace(/\.json$/, ""));

      // Slug alias mappings (e.g., legacy aliases)
      const aliases = {
        "next-level": "hammoudi",
        "next-level-barbershop": "hammoudi",
        "jules": "hammoudi-original",
        "original": "hammoudi-original",
      };

      if (envSlug) {
        const canonical = aliases[envSlug] || envSlug;
        if (!availableSlugs.includes(canonical)) {
          throw new Error(
            `\n\n❌ [Barber Master Template - Build Failed]\n` +
            `Unknown client slug: "${envSlug}".\n` +
            `No configuration file found at "src/data/clients/${envSlug}.json".\n` +
            `Available client slugs in repository: ${availableSlugs.join(", ")}\n` +
            `Build aborted to prevent deploying an invalid or missing client configuration.\n`
          );
        }
        resolvedSlug = canonical;
      } else {
        // Missing slug handling
        const isStrictProduction = Boolean(process.env.VERCEL || process.env.REQUIRE_CLIENT_SLUG);
        if (isStrictProduction) {
          throw new Error(
            `\n\n❌ [Barber Master Template - Build Failed]\n` +
            `Missing required environment variable: VITE_BARBER_SLUG\n` +
            `This repository is configured as a multi-client master template.\n` +
            `Every Vercel project must specify VITE_BARBER_SLUG in Project Settings -> Environment Variables.\n` +
            `Example: VITE_BARBER_SLUG=hammoudi\n` +
            `Build aborted to prevent deploying an unconfigured website.\n`
          );
        }

        // Safe development default
        resolvedSlug = "hammoudi";
        if (isBuild) {
          console.warn(
            `\n⚠️ [Barber Master Template] Warning: VITE_BARBER_SLUG not specified. Building with default client 'hammoudi' for local verification.\n`
          );
        } else {
          console.log(
            `\n💈 [Barber Master Template] Local Dev Server: Serving default client '${resolvedSlug}'.\n` +
            `   Tip: Run 'VITE_BARBER_SLUG=<slug> npm run dev' to preview another client.\n`
          );
        }
      }

      // Read and validate active client data for HTML head injection
      const clientFilePath = path.resolve(clientsDir, `${resolvedSlug}.json`);
      if (fs.existsSync(clientFilePath)) {
        try {
          const raw = JSON.parse(fs.readFileSync(clientFilePath, "utf-8"));
          validatedClient = validateBarberConfig(raw);
        } catch (err) {
          console.error(`[Barber Master Template] Failed to validate client data from ${clientFilePath}:`, err);
          validatedClient = null;
        }
      }
    },

    transformIndexHtml(html) {
      if (!validatedClient) return html;

      const title = validatedClient.seo?.title || `${validatedClient.businessName} | Master Barber | Perth`;
      const description = validatedClient.seo?.description || validatedClient.businessDescription || `Premier barbershop and precision grooming at ${validatedClient.businessName}.`;
      const favicon = validatedClient.branding?.favicon || "/favicon.svg";
      const canonicalUrl = validatedClient.seo?.canonicalUrl;
      const ogTitle = validatedClient.seo?.ogTitle || title;
      const ogDescription = validatedClient.seo?.ogDescription || description;
      const ogImage = validatedClient.seo?.ogImage || validatedClient.branding?.heroImage;
      const robots = validatedClient.seo?.robots || "index, follow";

      let transformed = html;

      // Replace <title>
      transformed = transformed.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

      // Replace favicon
      transformed = transformed.replace(
        /<link\s+rel="icon"[^>]*>/i,
        `<link rel="icon" type="image/svg+xml" href="${escapeHtml(favicon)}" />`
      );

      // JSON-LD structured data for local business
      const schemaOrgData = {
        "@context": "https://schema.org",
        "@type": "BarberShop",
        "name": validatedClient.businessName,
        "description": description,
        "telephone": validatedClient.phone || undefined,
        "email": validatedClient.email || undefined,
        "url": canonicalUrl || undefined,
        "address": validatedClient.address ? {
          "@type": "PostalAddress",
          "streetAddress": validatedClient.address.street || undefined,
          "addressLocality": validatedClient.address.city || undefined,
          "addressRegion": validatedClient.address.state || undefined,
          "postalCode": validatedClient.address.postcode || undefined,
          "addressCountry": validatedClient.address.country || "AU",
        } : undefined,
      };

      // Remote font links if configured and valid
      const fontTags = Array.isArray(validatedClient.branding?.fontSources)
        ? validatedClient.branding.fontSources.map((fUrl) => `<link rel="stylesheet" href="${escapeHtml(fUrl)}" />`)
        : [];

      const metaTags = [
        ...fontTags,
        `<meta name="description" content="${escapeHtml(description)}" />`,
        `<meta name="robots" content="${escapeHtml(robots)}" />`,
        canonicalUrl ? `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />` : "",
        `<meta property="og:title" content="${escapeHtml(ogTitle)}" />`,
        `<meta property="og:description" content="${escapeHtml(ogDescription)}" />`,
        `<meta property="og:type" content="website" />`,
        ogImage ? `<meta property="og:image" content="${escapeHtml(ogImage)}" />` : "",
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${escapeHtml(ogTitle)}" />`,
        `<meta name="twitter:description" content="${escapeHtml(ogDescription)}" />`,
        ogImage ? `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />` : "",
        `<meta name="generator" content="Barber Master Template v2.0" />`,
        `<script type="application/ld+json">${JSON.stringify(schemaOrgData)}</script>`,
      ].filter(Boolean).join("\n    ");

      transformed = transformed.replace("</head>", `  ${metaTags}\n  </head>`);
      return transformed;
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    barberMultiClientPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/react-router-dom/")) {
            return "vendor";
          }
          if (id.includes("node_modules/lucide-react/")) {
            return "icons";
          }
          if (id.includes("node_modules/gsap/") || id.includes("node_modules/@studio-freight/lenis/")) {
            return "animations";
          }
        },
      },
    },
  },
});
