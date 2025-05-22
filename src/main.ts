import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'petite-vue-i18n'

import App from './App.vue'
import router from './router'
import { guessLanguage } from './utils/guess-lang'

const i18n = createI18n({
  locale: guessLanguage(),
  fallbackLocale: 'en',
  messages: {
    en: {
      web_projects_title: 'Web',
      other_projects_title: 'Other',
      see_website: 'See Website',
      see_website_dev: 'See Development Website',
      see_github: 'GitHub Repository',
      no_github: 'GitHub Repository not available',
    },
    fr: {
      web_projects_title: 'Web',
      other_projects_title: 'Autres',
      see_website: 'Voir le site',
      see_website_dev: 'Voir la version dev.',
      see_github: 'Dépôt GitHub',
      no_github: 'Dépôt GitHub non disponible',
    },
  },
})

createApp(App).use(router).use(i18n).mount('#app')
