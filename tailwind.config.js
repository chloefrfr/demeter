/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: "#00000",
      fontFamily: {
        sans: ["sans-serif"],
      },
      animation: {
        pulse: "pulse 2s infinite",
      },
      keyframes: {
        pulse: {
          "0%": { opacity: "0.4" },
          "50%": { opacity: "0.6" },
          "100%": { opacity: "0.4" },
        },
      },
      colors: {
        "blue-700": "#2b6cb0",
        "blue-600": "#3182ce",
        "blue-500": "#4299e1",
        "purple-600": "#805ad5",
      },
      boxShadow: {
        lg: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        xl: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
