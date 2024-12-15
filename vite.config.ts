import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import babel from "vite-plugin-babel";

export default defineConfig({
  server: { port: 3000 },
  plugins: [		
    babel({
    filter: /\.tsx?$/,
    babelConfig: {
      presets: ["@babel/preset-typescript"],
      plugins: ["babel-plugin-react-compiler"]
    }
  }),
  reactRouter(), tsconfigPaths()],
  define: {
    "process.env": process.env,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
