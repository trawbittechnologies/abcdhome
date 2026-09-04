const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function getAllImages(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await getAllImages(fullPath));
    } else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function compressImage(filePath) {
  const inputBuffer = fs.readFileSync(filePath);
  const originalSize = inputBuffer.length;

  // Skip tiny icons under 5KB
  if (originalSize < 5 * 1024) {
    return { path: filePath, originalSize, newSize: originalSize, skipped: true };
  }

  const ext = path.extname(filePath).toLowerCase();

  try {
    const image = sharp(inputBuffer);

    // If it's the brand logo, optimize with 100% lossless PNG compression (preserves full alpha)
    if (filePath.includes('abcd(logo)final')) {
      const logoBuffer = await image
        .png({
          compressionLevel: 9,
          effort: 9
        })
        .toBuffer();

      if (logoBuffer.length < originalSize) {
        fs.writeFileSync(filePath, logoBuffer);
        return {
          path: filePath,
          originalSize,
          newSize: logoBuffer.length,
          savedPercent: (((originalSize - logoBuffer.length) / originalSize) * 100).toFixed(1)
        };
      }
      return { path: filePath, originalSize, newSize: originalSize, skipped: true };
    }

    const pipeline = sharp(inputBuffer).resize({
      width: 2048,
      height: 2048,
      fit: 'inside',
      withoutEnlargement: true
    });

    let compressedBuffer;

    if (ext === '.jpg' || ext === '.jpeg') {
      // Try quality 82 first, then 78 if original was already heavily compressed WhatsApp jpeg
      for (const q of [82, 80, 78, 76]) {
        const testBuf = await pipeline
          .jpeg({
            quality: q,
            mozjpeg: true,
            progressive: true
          })
          .toBuffer();

        if (testBuf.length < originalSize) {
          compressedBuffer = testBuf;
          break;
        }
      }
    } else if (ext === '.png') {
      const stats = await image.stats();
      const hasRealAlpha = stats.channels[3] && stats.channels[3].min < 255;

      if (hasRealAlpha) {
        compressedBuffer = await pipeline
          .png({
            compressionLevel: 9,
            effort: 8
          })
          .toBuffer();
      } else {
        compressedBuffer = await pipeline
          .png({
            quality: 85,
            compressionLevel: 9,
            effort: 8,
            palette: true
          })
          .toBuffer();
      }
    } else if (ext === '.webp') {
      compressedBuffer = await pipeline
        .webp({
          quality: 84,
          effort: 6
        })
        .toBuffer();
    }

    if (compressedBuffer && compressedBuffer.length < originalSize) {
      fs.writeFileSync(filePath, compressedBuffer);
      return {
        path: filePath,
        originalSize,
        newSize: compressedBuffer.length,
        savedPercent: (((originalSize - compressedBuffer.length) / originalSize) * 100).toFixed(1)
      };
    } else {
      return { path: filePath, originalSize, newSize: originalSize, skipped: true };
    }
  } catch (err) {
    console.error(`Error compressing ${path.basename(filePath)}:`, err.message);
    return { path: filePath, originalSize, newSize: originalSize, error: err.message };
  }
}

async function main() {
  const targetDir = path.resolve('public');
  console.log(`Scanning images in: ${targetDir}`);

  const files = await getAllImages(targetDir);
  console.log(`Found ${files.length} images. Optimizing balance images...\n`);

  let totalOriginal = 0;
  let totalNew = 0;
  let optimizedCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const rel = path.relative(targetDir, file);
    const result = await compressImage(file);

    totalOriginal += result.originalSize;
    totalNew += result.newSize;

    if (!result.skipped && !result.error) {
      optimizedCount++;
      const origKB = (result.originalSize / 1024).toFixed(1);
      const newKB = (result.newSize / 1024).toFixed(1);
      console.log(`[${i + 1}/${files.length}] Optimized: ${rel} | ${origKB}KB -> ${newKB}KB (-${result.savedPercent}%)`);
    } else {
      console.log(`[${i + 1}/${files.length}] Already optimal: ${rel}`);
    }
  }

  const origTotalMB = (totalOriginal / 1024 / 1024).toFixed(2);
  const newTotalMB = (totalNew / 1024 / 1024).toFixed(2);
  const totalSavedMB = ((totalOriginal - totalNew) / 1024 / 1024).toFixed(2);
  const totalSavedPercent = (((totalOriginal - totalNew) / totalOriginal) * 100).toFixed(1);

  console.log('\n=============================================');
  console.log(`Total images processed: ${files.length}`);
  console.log(`Images newly optimized: ${optimizedCount}`);
  console.log(`Original total size:    ${origTotalMB} MB`);
  console.log(`New total size:         ${newTotalMB} MB`);
  console.log(`Additional data saved:  ${totalSavedMB} MB (-${totalSavedPercent}%)`);
  console.log('=============================================');
}

main();
