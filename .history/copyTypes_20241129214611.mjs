import fs from "fs";
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const destinationFolder = "/types";
const destinationDir = resolve(__dirname, `../jenn-site/${destinationFolder}`);

const files = [
  {
    src: join(__dirname, "../dough-boy/types/generated/contentTypes.d.ts"),
    dest: join(__dirname, `${destinationDir}/${destinationFolder}/contentTypes.d.ts`),
  },
  {
    src: join(__dirname, "../dough-boy/types/generated/components.d.ts"),
    dest: join(__dirname, `${destinationDir}/${destinationFolder}/components.d.ts`),
  },
];

function copyFile({ src, dest }) {
  const destinationDir = dirname(dest);

  // Check if source file exists
  if (!fs.existsSync(src)) {
    console.error(`Source file does not exist: ${src}`);
    process.exit(1);
  }

  // Ensure destination directory exists or create it
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }

  // Read the source file, modify its content and write to the destination file
  const content = fs.readFileSync(src, "utf8");

  fs.writeFile(dest, content, (err) => {
    if (err) {
      console.error(`Error writing to destination file: ${err}`);
      process.exit(1);
    } else {
      console.log(`File ${src} copied and modified successfully!`);
    }
  });
}

files.forEach((file) => copyFile(file));