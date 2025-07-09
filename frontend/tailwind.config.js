export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'news-white': '#f9fafb',
        'news-blue': '#1e40af',
        'news-gray': '#4b5563',
        'news-accent': '#9333ea',
        'yellow-400': '#facc15', // Ajout pour l'accent jaune
      },
      fontFamily: {
        'sans': ['"Poppins"', 'sans-serif'], // Police moderne
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};