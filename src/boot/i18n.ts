import { createI18n } from 'vue-i18n';
import en from 'src/i18n/en';
import pt from 'src/i18n/pt';
import { boot } from 'quasar/wrappers';

const messages = {
  en,
  pt,
};

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'pt',
  messages,
});

export default boot(({ app }) => {
  app.use(i18n);
});

export { i18n };
