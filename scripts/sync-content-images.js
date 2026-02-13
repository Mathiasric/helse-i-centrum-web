/**
 * Synkroniserer content/image til public/content/image
 * slik at bilder kun trenger å ligge under content/image.
 * Kjøres automatisk før dev og build.
 */
const fs = require("fs");
const path = require("path");

const srcDir = path.join(process.cwd(), "content", "image");
const destDir = path.join(process.cwd(), "public", "content", "image");

if (!fs.existsSync(srcDir)) {
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });
for (const name of fs.readdirSync(srcDir)) {
  const src = path.join(srcDir, name);
  if (fs.statSync(src).isFile()) {
    fs.copyFileSync(src, path.join(destDir, name));
  }
}
