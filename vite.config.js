import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Multi-Client Master Template Plugin
 * - Validates VITE_BARBER_SLUG at build time
 * - Prevents deploying invalid or missing client configurations
 * - Injects client-specific SEO metadata and favicon into HTML
 */
function barberMultiClientPlugin() {
  let resolvedSlug = "";
  let clientData = null;

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

      // Read active client data for HTML head injection
      const clientFilePath = path.resolve(clientsDir, `${resolvedSlug}.json`);
      if (fs.existsSync(clientFilePath)) {
        try {
          clientData = JSON.parse(fs.readFileSync(clientFilePath, "utf-8"));
        } catch {
          clientData = null;
        }
      }
    },

    transformIndexHtml(html) {
      if (!clientData) return html;

      const title = clientData.seo?.title || `${clientData.businessName} | Master Barber | Perth`;
      const description =
        clientData.seo?.description ||
        clientData.businessDescription ||
        `Premier barbershop and precision grooming at ${clientData.businessName}.`;
      const favicon = clientData.branding?.favicon || "/favicon.svg";

      let transformed = html;

      // Replace <title>
      transformed = transformed.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);

      // Replace favicon
      transformed = transformed.replace(
        /<link\s+rel="icon"[^>]*>/i,
        `<link rel="icon" type="image/svg+xml" href="${favicon}" />`
      );

      // Inject SEO & OpenGraph meta tags
      const metaTags = `
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta name="generator" content="Barber Master Template v2.0" />
      `.trim();

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
});
