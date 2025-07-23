import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import az from "./locales/az.json";

const savedLanguage = Cookies.get("language") || "az";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    az: { translation: az },
  },
  lng: savedLanguage,
  fallbackLng: "az",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
