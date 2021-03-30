import 'react-i18next';
import en from "./translations/en/translationsEn.json"
declare module 'react-i18next' {
    interface Resources {
        en: typeof en;
    }
}