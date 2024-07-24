import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { installGlobals } from "@remix-run/node";

installGlobals({ nativeFetch: true });

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        unstable_singleFetch: true,
        unstable_fogOfWar: true,
      },
    }),
    tsconfigPaths(),
  ],
  define: {
    "process.env": process.env,
  },
});
