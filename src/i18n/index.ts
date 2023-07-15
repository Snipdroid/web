import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './en.json';
import translationZh from './zh.json';

const resources: Resource = {
  en: {
    translation: translationEn,
  },
  zh: {
    translation: translationZh,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});
