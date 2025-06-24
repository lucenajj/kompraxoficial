import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        chatbot: "#598EC2",
      },
      fontFamily: {
        opensans: ['"Open Sans"', "sans-serif"],
      },
      textShadow: {
        DEFAULT: "0px 2px 4px rgba(35, 122, 128, 0.5)", // Default sombra #237a80
        md: "0px 3px 6px rgba(35, 122, 128, 0.6)",       // Médio sombra #237a80
        lg: "0px 4px 8px rgba(35, 122, 128, 1)",         // Grande sombra #237a80
        white: "0px 2px 4px rgba(255, 255, 255, 0.5)",   // Sombra branca opaca
        "white-md": "0px 3px 6px rgba(255, 255, 255, 0.6)", // Médio sombra branca
        "white-lg": "0px 4px 8px rgba(255, 255, 255, 1)",   // Grande sombra branca
      },
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
  ],
};

export default config;
