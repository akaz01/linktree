import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        // accent = 핫 핑크(상호작용), volt = 사이버 라임(정체성).
        // Tailwind 기본 lime 팔레트를 덮어쓰지 않도록 이름을 따로 둔다.
        accent: "var(--accent)",
        volt: "var(--volt)",
        line: "var(--line)",
      },
      fontFamily: {
        sans: ["var(--font-display)"],
      },
      boxShadow: {
        // 테마마다 값이 달라야 해서 변수로 받는다.
        card: "var(--shadow-card)",
      },
    },
  },
  plugins: [],
};

export default config;
