import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('public/images');
const SRC_DIR = path.resolve('src');

async function optimizeImages() {
  const files = fs.readdirSync(IMAGES_DIR);
  const conversionMap = {};

  console.log('Starting image optimization...');

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if ((ext === '.png' || ext === '.jpg' || ext === '.jpeg') && file !== 'logo-mark.png') {
      const baseName = path.basename(file, ext);
      const inputPath = path.join(IMAGES_DIR, file);
      const outputPath = path.join(IMAGES_DIR, `${baseName}.webp`);

      console.log(`Converting: ${file} -> ${baseName}.webp`);
      
      try {
        const info = await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        const originalSize = fs.statSync(inputPath).size;
        const newSize = info.size;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
        
        console.log(`  Size: ${(originalSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024 / 1024).toFixed(2)} MB (${savings}% savings)`);
        
        conversionMap[file] = `${baseName}.webp`;
        
        // Remove the original file to clean up unused assets
        fs.unlinkSync(inputPath);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }

  console.log('\nUpdating file references in src/...');
  updateReferences(SRC_DIR, conversionMap);
}

function updateReferences(dir, map) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      updateReferences(fullPath, map);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.tsx' || ext === '.ts' || ext === '.json' || ext === '.css') {
        let content = fs.readFileSync(fullPath, 'utf8');
        let updated = false;

        for (const [oldName, newName] of Object.entries(map)) {
          if (content.includes(oldName)) {
            // Replace exact file references
            const regex = new RegExp(oldName, 'g');
            content = content.replace(regex, newName);
            updated = true;
            console.log(`  Updated reference: ${oldName} -> ${newName} in ${path.relative(process.cwd(), fullPath)}`);
          }
        }

        if (updated) {
          fs.writeFileSync(fullPath, content, 'utf8');
        }
      }
    }
  }
}

optimizeImages().then(() => {
  console.log('Image optimization and reference updates complete!');
}).catch(err => {
  console.error('Optimization failed:', err);
});
