import { i18n as I18n } from 'i18next'

// This is a dynamic import so not all languages are bundled in frontend.
export const translations = import.meta.glob('./**/*.yml')
export const DEFAULT_LOCALE = 'en'

export async function loadAsyncLanguage(i18n: I18n, locale = DEFAULT_LOCALE) {
  try {
    const bundle =
      Object.entries(translations).filter(([key]) => key.includes(`/${locale}/`)) || []
    const tasks = bundle.map(async ([path, importLocale]) => [
      /(\w+)\.yml/.exec(path)?.[1],
      await importLocale(),
    ])

    const results = (await Promise.all(tasks)) as [string, Module][]
    if (results) {
      results.forEach(([ns, resources]) => {
        i18n.addResourceBundle(locale, ns, resources)
      })
      i18n.changeLanguage(locale)
    }
  } catch (error) {
    console.error(error)
  }
}

// ================================================================================================

interface Module {
  default: object
}
