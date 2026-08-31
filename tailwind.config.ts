import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F3F2F2",
        surface: "#EAE9E9",
        ink: "#201E1D",
        accent: {
          DEFAULT: "#0088B0",
          100: "#E9F8FF",
          200: "#CBEEFF",
          600: "#1186AC",
          700: "#006786",
          800: "#004961",
        },
        "accent-2": {
          DEFAULT: "#D6006C",
          100: "#FFF1F4",
          800: "#790E3D",
        },
        process: {
          yellow: "#EDBB00",
        },
        neutral: {
          100: "#F8F4F4",
          200: "#EAE7E7",
          300: "#D7D3D3",
          400: "#BAB6B6",
          500: "#9B9797",
          600: "#7D7979",
          700: "#605D5D",
          800: "#444141",
          900: "#2D2B2B",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "1px",
        md: "2px",
        lg: "4px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(45,43,43,0.14)",
        md: "0 3px 10px rgba(45,43,43,0.16)",
        lg: "0 12px 32px rgba(45,43,43,0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
