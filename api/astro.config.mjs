import { defineConfig } from "astro/config";
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: "server",
  adapter: vercel(),
  server: { port: parseInt(process.env.PORT) || 4321, host: true },
});