import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en/translationsEn.json";
import pt from "./translations/por/translationsPor.json";
import sp from "./translations/spa/translationsSpa.json";

const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
  sp: {
    translation: sp,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  fallbackLng: "pt",
  keySeparator: "/",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
