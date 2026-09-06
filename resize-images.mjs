import fs from "fs";
import path from "path";
import sharp from "sharp";

const sourceDir = "original";
const sizes = [256, 320, 640, 800];

const files = fs
  .readdirSync(sourceDir)
  .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file));

if (!files.length) {
  console.log("Tidak ada gambar di folder original.");
  process.exit(0);
}

for (const file of files) {
  const input = path.join(sourceDir, file);
  const base = path.parse(file).name;

  for (const size of sizes) {
    const outputDir = `s${size}`;
    const output = path.join(outputDir, `${base}.webp`);

    fs.mkdirSync(outputDir, { recursive: true });

    await sharp(input)
      .rotate()
      .resize({
        width: size,
        withoutEnlargement: true,
        fit: "inside"
      })
      .webp({
        quality: 78,
        effort: 4
      })
      .toFile(output);

    console.log(`OK: ${output}`);
  }
}

console.log("CodeFlare Image Engine selesai.");
