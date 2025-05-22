import { marked } from 'marked'

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface ProjectData {
  title: string
  description: string
}

async function extractProjectData(filePath: string): Promise<ProjectData> {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const lines = fileContent.split('\n')
  const title = lines[0].replace('# ', '')
  const description = lines.slice(2).join('\n')
  const html = await marked(description)
  return { title, description: html.trim() }
}

async function buildProjects(
  supportedLanguages: string[],
  filePath: string,
  outputFolderPath: string,
  outputImageDir: string | null = null,
) {
  const projects = fs
    .readdirSync(filePath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(filePath, dirent.name))

  const globalData = {}
  for (const lang of supportedLanguages) {
    globalData[lang] = []
  }

  for (const project of projects) {
    // A JSON file PER language (so only the relevant language is loaded for the user)
    for (const lang of supportedLanguages) {
      const localeData = await extractProjectData(path.join(project, `desc_${lang}.md`))
      const projectData = JSON.parse(fs.readFileSync(path.join(project, 'data.json'), 'utf8'))
      delete projectData.$schema // Schema not needed after build

      // get projectData for the current language
      const data = {
        title: localeData.title,
        description: localeData.description,
        ...projectData,
      }
      if (data.githubRepository) {
        data.githubUrl = `https://github.com/${data.githubOwner || 'ArthurLeFloch'}/${data.githubRepository}`
      }
      if (outputImageDir) {
        data.imageUrl = `content/images/${path.basename(project)}.webp`
      }
      delete data.githubRepository
      delete data.githubOwner

      globalData[lang].push(data)
    }

    if (outputImageDir) {
      const imageFilePath = path.join(project, 'image.webp')
      if (fs.existsSync(imageFilePath)) {
        const imageFileName = path.basename(project) + '.webp'
        console.log(`Copying ${imageFilePath} to ${outputImageDir}/${imageFileName}`)
        const outputImagePath = path.join(outputImageDir, imageFileName)
        fs.copyFileSync(imageFilePath, outputImagePath)
      }
    }
  }

  for (const lang of supportedLanguages) {
    const outputFilePath = path.join(outputFolderPath, `${lang}.json`)
    fs.writeFileSync(outputFilePath, JSON.stringify(globalData[lang].reverse(), null, 2))
    console.log(`Wrote ${outputFilePath}`)
  }
}

async function buildHome(supportedLanguages: string[], homeDir: string, outputDir: string) {
  for (const lang of supportedLanguages) {
    const text = fs.readFileSync(path.join(homeDir, `home_${lang}.md`), 'utf8')
    const html = await marked(text)
    const outputFilePath = path.join(outputDir, `${lang}.html`)
    fs.writeFileSync(outputFilePath, html.trim())
  }
}

export async function buildContent(supportedLanguages: string[], outputDir: string) {
  const outputImagesDir = path.join(outputDir, 'images')
  const outputHomeDir = path.join(outputDir, 'home')
  const outputWebDir = path.join(outputDir, 'web')
  const outputOthersDir = path.join(outputDir, 'others')
  const homeDir = path.join(__dirname, '../src/content/home')
  const webDir = path.join(__dirname, '../src/content/web')
  const othersDir = path.join(__dirname, '../src/content/others')

  if (!fs.existsSync(outputImagesDir)) {
    fs.mkdirSync(outputImagesDir, { recursive: true })
  }
  if (!fs.existsSync(outputWebDir)) {
    fs.mkdirSync(outputWebDir, { recursive: true })
  }
  if (!fs.existsSync(outputOthersDir)) {
    fs.mkdirSync(outputOthersDir, { recursive: true })
  }
  if (!fs.existsSync(outputHomeDir)) {
    fs.mkdirSync(outputHomeDir, { recursive: true })
  }

  buildHome(supportedLanguages, homeDir, outputHomeDir)
  buildProjects(supportedLanguages, webDir, outputWebDir, outputImagesDir)
  buildProjects(supportedLanguages, othersDir, outputOthersDir)
}
