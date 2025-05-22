export enum Language {
  EN = 'en',
  FR = 'fr',
}

const defaultLanguage = Language.EN

export function guessLanguage(): Language {
  const userLang = navigator.language
  const supportedLanguages = [Language.EN, Language.FR]

  for (const lang of supportedLanguages) {
    if (userLang === lang || userLang.startsWith(lang + '-')) {
      return lang
    }
  }

  return defaultLanguage
}
