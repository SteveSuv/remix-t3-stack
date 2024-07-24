import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
} satisfies Config;
