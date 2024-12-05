import fs from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'

const __dirname = dirname(new URL(import.meta.url).pathname)

const sourcePath = join(__dirname, '../dough-boy/types/generated/contentTypes.d.ts')
const normalizedTypePath = join(__dirname, '../dough-boy/myTypes.ts')

const destinationPath = join(__dirname, './types/contentTypes.d.ts')
const normalizedDestinationPath = join(__dirname, './collections.d.ts')

const destinationDir = dirname(destinationPath)

// Check if source file exists
if (!fs.existsSync(sourcePath)) {
  console.error(`Source file does not exist: ${sourcePath}`)
  process.exit(1)
}

if (!fs.existsSync(normalizedTypePath)) {
  console.error(`Normalized file does not exist: ${normalizedTypePath}`)
  process.exit(1)
}

// Ensure destination directory exists or create it
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true })
}

if (!fs.existsSync(normalizedDestinationPath)) {
  fs.mkdirSync(normalizedDestinationPath, { recursive: true })
}

// Read the source file, modify its content and write to the destination file
const content = fs.readFileSync(sourcePath, 'utf8')
const modifiedContent = content.replace('@strapi/strapi', '@strapi/types')
const normalizedContent = fs.readFileSync(normalizedTypePath, 'utf8')

fs.writeFile(destinationPath, modifiedContent, (err) => {
  if (err) {
    console.error(`Error writing to destination file: ${err}`)
    process.exit(1)
  }
  else {
    console.log('File copied and modified successfully!')
  }
})

fs.writeFile(normalizedDestinationPath, normalizedContent, (err) => {
  if (err) {
    console.error(`Error writing to destination file: ${err}`)
    process.exit(1)
  }
  else {
    console.log('File copied and modified successfully!')
  }
})
