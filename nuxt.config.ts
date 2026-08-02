import { LOCALES, DEFAULT_LOCALE } from './constants/locales'

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['@nuxtjs/i18n', '@pinia/nuxt'],

  css: ['~/assets/css/main.css'],

  // Flat component names (`<FruitGrid>`, not `<GameFruitGrid>`) so the folder
  // structure can be reorganised without touching every template.
  components: [{ path: '~/components', pathPrefix: false }],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport:
        'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5',
      title: 'Magic Fruit',
      meta: [
        {
          name: 'description',
          content: 'Think of a fruit — Magic Fruit will guess it in 7 questions.',
        },
        { name: 'theme-color', content: '#10b981' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/images/mango.svg' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page', mode: 'out-in' },
  },

  i18n: {
    locales: LOCALES,
    lazy: true,
    langDir: 'lang/',
    defaultLocale: DEFAULT_LOCALE,
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'magic-fruit-locale',
      redirectOn: 'root',
    },
  },
})
