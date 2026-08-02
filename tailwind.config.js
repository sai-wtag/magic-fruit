/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: [
    './components/**/*.{js,ts,vue}',
    './composables/**/*.{js,ts}',
    './constants/**/*.{js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      // Semantic tokens, backed by CSS variables in `assets/css/main.css`, so
      // light/dark is one variable swap instead of a `dark:` on every node.
      colors: {
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        brand: {
          DEFAULT: 'rgb(var(--c-brand) / <alpha-value>)',
          soft: 'rgb(var(--c-brand-soft) / <alpha-value>)',
          strong: 'rgb(var(--c-brand-strong) / <alpha-value>)',
        },
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        danger: 'rgb(var(--c-danger) / <alpha-value>)',
        'on-brand': 'rgb(var(--c-on-brand) / <alpha-value>)',
      },
      fontFamily: {
        sans: [
          'ui-rounded',
          '"SF Pro Rounded"',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          '"Noto Sans Bengali"',
          '"Noto Sans Devanagari"',
          'sans-serif',
        ],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgb(0 0 0 / 0.04), 0 12px 32px -12px rgb(0 0 0 / 0.18)',
        lift: '0 2px 4px rgb(0 0 0 / 0.06), 0 24px 48px -16px rgb(0 0 0 / 0.28)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '70%': { transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        pop: 'pop 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
