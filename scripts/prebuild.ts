import path from 'path'
import { checkContent } from './check'
import { buildContent } from './build'

import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const supportedLanguages = ['en', 'fr']

checkContent(supportedLanguages, path.resolve(__dirname, '../src/content'))

buildContent(supportedLanguages, path.resolve(__dirname, '../public/content'))
