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
  // Read into memory buffer first so Windows never locks file descriptor
  const inputBuffer = fs.readFileSync(filePath);
  const originalSize = inputBuffer.length;

  // Skip tiny icons/favicons under 40KB
  if (originalSize < 40 * 1024) {
    return { path: filePath, originalSize, newSize: originalSize, skipped: true };
  }

  // Preserve the exact transparent logo file
  if (filePath.includes('abcd(logo)final')) {
    return { path: filePath, originalSize, newSize: originalSize, skipped: true };
  }

  const ext = path.extname(filePath).toLowerCase();

  try {
    const image = sharp(inputBuffer);
    const metadata = await image.metadata();

    // Cap max dimension to 2048px (ultra-crisp 4K retina clarity)
    const pipeline = sharp(inputBuffer).resize({
      width: 2048,
      height: 2048,
      fit: 'inside',
      withoutEnlargement: true
    });

    let compressedBuffer;

    if (ext === '.jpg' || ext === '.jpeg') {
      compressedBuffer = await pipeline
        .jpeg({
          quality: 84,
          mozjpeg: true,
          progressive: true
        })
        .toBuffer();
    } else if (ext === '.png') {
      const stats = await image.stats();
      const hasRealAlpha = stats.channels[3] && stats.channels[3].min < 255;

      if (hasRealAlpha) {
        compressedBuffer = await pipeline
          .png({
            compressionLevel: 9,
            effort: 7
          })
          .toBuffer();
      } else {
        // Solid architectural render: optimize with palette quantizing for massive savings
        compressedBuffer = await pipeline
          .png({
            quality: 86,
            compressionLevel: 9,
            effort: 7,
            palette: true
          })
          .toBuffer();
      }
    } else if (ext === '.webp') {
      compressedBuffer = await pipeline
        .webp({
          quality: 85,
          effort: 6
        })
        .toBuffer();
    }

    if (compressedBuffer && compressedBuffer.length < originalSize) {
      // Overwrite safely
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
  console.log(`Found ${files.length} images. Starting in-memory visually-lossless compression...\n`);

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
      const origMB = (result.originalSize / 1024 / 1024).toFixed(2);
      const newMB = (result.newSize / 1024 / 1024).toFixed(2);
      console.log(`[${i + 1}/${files.length}] Optimized: ${rel} | ${origMB}MB -> ${newMB}MB (-${result.savedPercent}%)`);
    } else {
      console.log(`[${i + 1}/${files.length}] Kept: ${rel}`);
    }
  }

  const origTotalMB = (totalOriginal / 1024 / 1024).toFixed(2);
  const newTotalMB = (totalNew / 1024 / 1024).toFixed(2);
  const totalSavedMB = ((totalOriginal - totalNew) / 1024 / 1024).toFixed(2);
  const totalSavedPercent = (((totalOriginal - totalNew) / totalOriginal) * 100).toFixed(1);

  console.log('\n=============================================');
  console.log(`Total images processed: ${files.length}`);
  console.log(`Images optimized:       ${optimizedCount}`);
  console.log(`Original total size:    ${origTotalMB} MB`);
  console.log(`New total size:         ${newTotalMB} MB`);
  console.log(`Total data saved:       ${totalSavedMB} MB (-${totalSavedPercent}%)`);
  console.log('=============================================');
}

main();
