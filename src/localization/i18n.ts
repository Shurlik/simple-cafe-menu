import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { commonEN } from "./en/common";
import { commonUA } from "./ua/common";

enum LangCode {
  English = "en",
  Ukraine = "ua",
}

export const defaultNS = "common";

export const resources = {
  en: {
    common: commonEN,
  },
  ua: {
    common: commonUA,
  },
};

export const initi18n = async () => {
  await i18n
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      compatibilityJSON: "v3",
      ns: ["common"],
      defaultNS,
      resources: resources,
      lng: 'ua',
      fallbackLng: LangCode.Ukraine,
      // debug: __DEV__,
      interpolation: {
        escapeValue: false,
      },
    });
};
