import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en/translationsEn.json";
import por from "./translations/por/translationsPor.json";
import spa from "./translations/spa/translationsSpa.json";

const resources = {
  en: {
    translation: en,
  },
  por: {
    translation: por,
  },
  spa: {
    translation: spa,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  keySeparator: "/",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
