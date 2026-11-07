/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chinese: {
          red: '#c02c38',
          crimson: '#de2a18',
          gold: '#e29c45',
          jade: '#248067',
          ink: '#1c1b21',
          paper: '#f9f6f0',
          sand: '#ece5d8',
          slate: '#495057'
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        hanzi: ['"Kaiti SC"', '"STKaiti"', '"KaiTi"', '"PingFang SC"', '"Microsoft YaHei"', 'serif'],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
