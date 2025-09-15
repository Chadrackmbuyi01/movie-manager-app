// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Custom colors for your movie app
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // Gray scale that matches your dark theme
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        // You can add custom fonts here
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      animation: {
        // Custom animations
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-light": "bounce 1s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        // Custom shadows
        "movie-card":
          "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
      },
      spacing: {
        // Custom spacing
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      screens: {
        // Custom breakpoints
        xs: "475px",
        "3xl": "1600px",
      },
    },
  },
  plugins: [
    // You can add Tailwind plugins here
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
    require("@tailwindcss/line-clamp"), // for line clamping utilities
  ],
};
