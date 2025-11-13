/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#8B104E',
          orange: '#FF9900',
          redorange: '#FD6400',
        },
        esg: {
          environmental: '#10B981',
          social: '#3B82F6',
          governance: '#8B5CF6',
        },
        risk: {
          low: '#10B981',
          medium: '#F59E0B',
          high: '#FF9900',
          critical: '#FD6400',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #8B104E 0%, #FF9900 50%, #FD6400 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(139, 16, 78, 0.1) 0%, rgba(255, 153, 0, 0.1) 100%)',
      },
    },
  },
  plugins: [],
};
