import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h3: ["50px", "64px"],
        h4: ["34px", "46px"],
        h5: ["26px", "34px"],
        h6: ["22px", "28px"],
        subtitle1: ["18px", "24px"],
        subtitle2: ["16px", "22px"],
        subtitle3: ["14px", "18px"],
        body1: ["18px", "22px"],
        body2: ["16px", "20px"],
        body3: ["14px", "18px"],
        "button-large": ["18px", "22px"],
        "button-medium": ["16px", "20px"],
        "button-small": ["14px", "18px"],
        caption: ["12px", "16px"],
        overline: ["12px", "16px"],
        avatarLetter: ["18px", "22px"],
        inputLabel: ["16px", "20px"],
        chip: ["14px", "18px"],
        helperText: ["12px", "16px"],
        inputText: ["16px", "20px"],
        tooltip: ["10px", "14px"],
      },
      fontWeight: {
        bold: "700",
        semibold: "600",
        medium: "500",
        regular: "400",
      },
      colors: {
        "green-900": "#1F7B44",
        "red-900": "#D91212",
        "gray-10": "#7070701A",
      },
    },
  },
  plugins: [],
};
export default config;
