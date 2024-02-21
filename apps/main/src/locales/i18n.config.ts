import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import common from './en/common.yml'
import { ViteBackend } from './i18n.backend'
import { translations } from './loadAsyncLanguage'

export const defaultNS = 'common'

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .use(ViteBackend)
    .init({
      lng: 'en', // if you're using a language detector, do not define the lng option
      // debug: true,
      supportedLngs: ['en', 'vi'],
      resources: {
        en: {
          common,
        },
      },
      defaultNS,
      fallbackNS: defaultNS,
      ns: ['common'],
      interpolation: { escapeValue: false },
      backend: {},
    })
    .then(() => {
      if (import.meta.hot) {
        Object.entries(translations).forEach(([filePath, importFunc]) => {
          import.meta.hot?.accept(filePath, (newModule) => {
            if (newModule) {
              importFunc().then((resources) => {
                const matches = /(\w+)\.yml/.exec(filePath)
                if (matches) {
                  const ns = matches[1]
                  i18next.addResourceBundle(i18next.language, ns, resources)
                }
              })
            }
          })
        })
      }
    })
}
