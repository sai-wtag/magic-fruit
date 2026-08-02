/**
 * Runtime vue-i18n options. @nuxtjs/i18n looks for this file by convention;
 * locale registration itself lives in `constants/locales.js`.
 */
export default defineI18nConfig(() => ({
  legacy: false,
  // A key missing from a translation falls back to English rather than
  // rendering the raw key on screen.
  fallbackLocale: 'en',
}))
