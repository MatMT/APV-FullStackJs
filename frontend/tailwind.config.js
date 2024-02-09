/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  safelist: [
    'text-emerald-600',
    'text-sky-600',
    'text-yellow-600',
    'text-pink-600'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

