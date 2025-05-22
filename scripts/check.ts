import fs from 'fs'
import path from 'path'

import { Ajv, ValidateFunction } from 'ajv'

const ajv = new Ajv()
function compile(schemaFile: string) {
  return ajv.compile(JSON.parse(fs.readFileSync(schemaFile, 'utf8')))
}
function validate(schema: ValidateFunction, data: unknown) {
  if (!schema(data)) {
    console.error('Validation failed:', schema.errors)
    process.exit(1)
  }
}

// First line should contain exactly "# " and then the title, then a blank line
function checkMarkdownFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const lines = fileContent.split('\n')
  if (lines.length === 0) {
    console.error(`File ${filePath} is empty`)
    process.exit(1)
  }
  if (!lines[0].startsWith('# ')) {
    console.error(`First line of ${filePath} should start with exactly "# "`)
    process.exit(1)
  }
  if (lines.length >= 2 && lines[1].trim() !== '') {
    console.error(`Second line of ${filePath} should be empty`)
    process.exit(1)
  }
}

function checkMarkdownFiles(projectDir: string) {
  for (const file of fs.readdirSync(projectDir)) {
    if (file.startsWith('desc_') && file.endsWith('.md')) {
      checkMarkdownFile(path.join(projectDir, file))
    }
  }
}

function checkJsonFile(projectPath: string, schema: ValidateFunction) {
  validate(schema, JSON.parse(fs.readFileSync(path.join(projectPath, 'data.json'), 'utf8')))
}

// Check a folder like "web" or "others"
function checkContentFolder(
  supportedLanguages: string[],
  projectsFolder: string,
  mandatoryFiles: string[],
) {
  const projects = fs
    .readdirSync(projectsFolder, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(projectsFolder, dirent.name))

  if (projects.length === 0) {
    console.error(`No projects found in ${projectsFolder}`)
    process.exit(1)
  }

  const schemaFile = path.join(projectsFolder, 'schema.json')

  checkEntry(schemaFile)

  const dataSchema = compile(schemaFile)

  for (const project of projects) {
    checkFolder(project, mandatoryFiles)
    checkFolder(
      project,
      supportedLanguages.map((l) => `desc_${l}.md`),
    )
    checkJsonFile(project, dataSchema)
    checkMarkdownFiles(project)
  }
}

function checkFolder(homeDir: string, mandatoryFiles: string[]) {
  for (const fileName of mandatoryFiles) {
    checkEntry(path.join(homeDir, fileName))
  }
}

function checkEntry(entryPath: string) {
  if (!fs.existsSync(entryPath)) {
    console.error(`Entry ${entryPath} does not exist`)
    process.exit(1)
  }
}

function checkEntries(entries: string[]) {
  for (const entry of entries) {
    checkEntry(entry)
  }
}

// Check existence of necessary files and directories
export function checkContent(supportedLanguages: string[], contentDir: string) {
  checkEntry(contentDir)

  const homeDir = path.join(contentDir, 'home')
  const webDir = path.join(contentDir, 'web')
  const othersDir = path.join(contentDir, 'others')

  checkEntries([homeDir, webDir, othersDir])

  const webProjectSchemaPath = path.resolve(webDir, 'schema.json')
  const othersProjectSchemaPath = path.resolve(othersDir, 'schema.json')

  checkEntries([webProjectSchemaPath, othersProjectSchemaPath])

  const homeMandatoryFiles = supportedLanguages.map((l) => `home_${l}.md`)
  checkFolder(homeDir, homeMandatoryFiles)

  const projectsMandatoryFiles = supportedLanguages.map((l) => `desc_${l}.md`).concat(['data.json'])
  checkContentFolder(supportedLanguages, webDir, projectsMandatoryFiles.concat(['image.webp']))
  checkContentFolder(supportedLanguages, othersDir, projectsMandatoryFiles)
}
