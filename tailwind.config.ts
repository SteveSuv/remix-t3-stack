import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  plugins: [daisyui],
  darkMode: "class",
  daisyui: {
    themes: ["light", "dark"],
  },
} satisfies Config;
