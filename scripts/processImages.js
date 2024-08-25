const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/processed-images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  if (file.match(/\.(jpg|jpeg|png|gif)$/)) {
    sharp(path.join(inputDir, file))
      .tint({ r: 255, g: 100, b: 100 }) // Add reddish tint
      .modulate({
        brightness: 1.1,
        saturation: 1.2,
        hue: 330 // Shift hue towards red
      })
      .gamma(1.1) // Slightly increase contrast
      .toFile(path.join(outputDir, file))
      .then(() => console.log(`Processed ${file}`))
      .catch(err => console.error(`Error processing ${file}:`, err));
  }
});