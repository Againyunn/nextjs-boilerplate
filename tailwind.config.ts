/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        comeFromRight: {
          "0%": { transform: "translateX(1000em) rotate(0)" },
          "100%": { transform: "translateX(0em)" },
        },
      },
      animation: {
        comeFromRight: "comeFromRight 0.4s forwards",
      },
    },
  },
  plugins: [],
};
