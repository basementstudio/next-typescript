module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      system: 'var(--font-system)',
      body: 'var(--font-body)'
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
