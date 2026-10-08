export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#2C1810',
        roast: '#3D2314',
        cream: '#FDFBF7',
        caramel: '#C68642',
        latte: '#E8D5B7',
        mocha: '#6F4E37',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glass:
          '0 25px 60px -15px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)',
        'neu-in':
          'inset 3px 3px 8px rgba(0,0,0,0.35), inset -3px -3px 8px rgba(255,255,255,0.04)',
        'neu-out':
          '6px 6px 14px rgba(0,0,0,0.35), -4px -4px 12px rgba(255,255,255,0.04)',
      },
    },
  },
  plugins: [],
};
