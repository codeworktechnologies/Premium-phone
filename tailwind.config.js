/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "radial-soft-dark":
          "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.20), transparent 55%), radial-gradient(800px 500px at 50% 90%, rgba(236,72,153,0.18), transparent 55%)",
        "radial-soft-light":
          "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.12), transparent 55%), radial-gradient(800px 500px at 50% 90%, rgba(236,72,153,0.10), transparent 55%)",
      },
    },
  },
  plugins: [],
};
