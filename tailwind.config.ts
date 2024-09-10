import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  darkMode: "class",
  daisyui: {
    themes: ["light", "dark"],
  },
} satisfies Config;
