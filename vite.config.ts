import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { installGlobals } from "@remix-run/node";
import { vercelPreset } from '@vercel/remix/vite';

installGlobals({ nativeFetch: true });

export default defineConfig({
  plugins: [
    remix({
      presets: [vercelPreset()],
      future: {
        unstable_singleFetch: true,
      },
    }),
    tsconfigPaths(),
  ],
  server: { port: 3000 },
});
