import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Bulletproof exact face crop function.
 * Enforces strict 240px face scale, (200, 200) canvas midpoint, and NEVER allows cropping an already-cropped photo.
 *
 * @param {string} rawImagePath - Path to the raw uncropped source image.
 * @param {number} face_x - Face center X in raw image pixels.
 * @param {number} face_y - Face center Y in raw image pixels.
 * @param {number} face_h - Face height in raw image pixels.
 * @param {string} guestId - Unique identifier for the guest (e.g. 'steve_nares').
 * @param {string} [customPreviewPath] - Optional additional path to save preview image.
 */
export async function cropHeadshot(rawImagePath, face_x, face_y, face_h, guestId, customPreviewPath = null) {
    if (!rawImagePath || typeof face_x !== 'number' || typeof face_y !== 'number' || typeof face_h !== 'number' || !guestId) {
        throw new Error('Invalid arguments passed to cropHeadshot. Required: rawImagePath, face_x, face_y, face_h, guestId');
    }

    const resolvedPath = path.resolve(rawImagePath);

    // 1. Guardrail: Strict prevention of double-cropping
    if (resolvedPath.includes('/public/headshots/') || resolvedPath.includes('/master_archive/public_headshots/')) {
        throw new Error(`CRITICAL GUARDRAIL FAILURE: Attempted to crop an already-cropped image (${rawImagePath}). You MUST pass the uncropped raw source photo from raw_sources/!`);
    }

    if (!fs.existsSync(resolvedPath)) {
        throw new Error(`Raw source image not found: ${resolvedPath}`);
    }

    const image = await loadImage(resolvedPath);

    // 2. Guardrail: Verify image is uncropped raw photo, not a 400x400 processed image
    if (image.width === 400 && image.height === 400 && !resolvedPath.includes('raw_sources')) {
        throw new Error(`CRITICAL GUARDRAIL: Input image ${rawImagePath} is 400x400. It appears to be an already-cropped headshot. Must crop strictly from raw_sources/ master photos.`);
    }

    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext('2d');

    // 3. Exact Math: 240px face height on 400x400 canvas (60% fill), centered at (200, 200)
    // Original photo dimensions are completely ignored for scale. Only face_h determines crop size.
    const crop_size = face_h * (400 / 240);

    const src_x = face_x - crop_size / 2;
    const src_y = face_y - crop_size / 2;
    const src_w = crop_size;
    const src_h = crop_size;

    // 4. Base background fill
    ctx.fillStyle = '#181820';
    ctx.fillRect(0, 0, 400, 400);

    // 5. Edge Extension Padding (Extends edge pixels smoothly so there are zero black bars and zero ghost images)
    if (src_x + src_w > image.width) {
        const overflow_raw = (src_x + src_w) - image.width;
        const dest_overflow_w = (overflow_raw / src_w) * 400;
        const dest_overflow_x = 400 - dest_overflow_w;
        
        ctx.drawImage(
            image,
            image.width - 2, Math.max(0, Math.floor(src_y)), 2, Math.min(src_h, image.height),
            Math.floor(dest_overflow_x) - 1, 0, Math.ceil(dest_overflow_w) + 2, 400
        );
    }

    if (src_x < 0) {
        const overflow_raw = Math.abs(src_x);
        const dest_overflow_w = (overflow_raw / src_w) * 400;
        
        ctx.drawImage(
            image,
            0, Math.max(0, Math.floor(src_y)), 2, Math.min(src_h, image.height),
            0, 0, Math.ceil(dest_overflow_w) + 2, 400
        );
    }

    if (src_y + src_h > image.height) {
        const overflow_raw = (src_y + src_h) - image.height;
        const dest_overflow_h = (overflow_raw / src_h) * 400;
        const dest_overflow_y = 400 - dest_overflow_h;
        
        ctx.drawImage(
            image,
            Math.max(0, Math.floor(src_x)), image.height - 2, Math.min(src_w, image.width), 2,
            0, Math.floor(dest_overflow_y) - 1, 400, Math.ceil(dest_overflow_h) + 2
        );
    }

    if (src_y < 0) {
        const overflow_raw = Math.abs(src_y);
        const dest_overflow_h = (overflow_raw / src_h) * 400;
        
        ctx.drawImage(
            image,
            Math.max(0, Math.floor(src_x)), 0, Math.min(src_w, image.width), 2,
            0, 0, 400, Math.ceil(dest_overflow_h) + 2
        );
    }

    // 6. Exact Sub-Region Crop Render
    ctx.drawImage(
        image,
        src_x, src_y, src_w, src_h,
        0, 0, 400, 400
    );

    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });

    // 7. Immediate Permanent Persistence to public/headshots and master archive
    const repoRoot = path.resolve(__dirname, '../..');
    const publicHeadshotPath = path.join(repoRoot, 'public/headshots', `${guestId}.jpg`);
    const archiveHeadshotPath = path.join(repoRoot, 'media_backups/master_archive/public_headshots', `${guestId}.jpg`);

    const pathsToSave = [publicHeadshotPath, archiveHeadshotPath];
    if (customPreviewPath) {
        pathsToSave.push(path.resolve(customPreviewPath));
    }

    for (const targetPath of pathsToSave) {
        const dir = path.dirname(targetPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(targetPath, buffer);
        console.log(`Saved exact headshot crop to: ${targetPath}`);
    }

    return {
        success: true,
        guestId,
        cropSizePx: Math.round(crop_size),
        publicPath: publicHeadshotPath,
        archivePath: archiveHeadshotPath,
        customPreviewPath
    };
}

// CLI Execution support
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
    const rawPath = process.argv[2];
    const x = parseFloat(process.argv[3]);
    const y = parseFloat(process.argv[4]);
    const h = parseFloat(process.argv[5]);
    const guestId = process.argv[6];
    const previewPath = process.argv[7];

    if (!rawPath || isNaN(x) || isNaN(y) || isNaN(h) || !guestId) {
        console.error("Usage: node crop_headshot.js <raw_image_path> <face_x> <face_y> <face_h> <guest_id> [preview_path]");
        process.exit(1);
    }

    cropHeadshot(rawPath, x, y, h, guestId, previewPath)
        .then(res => {
            console.log("Crop completed successfully:", JSON.stringify(res, null, 2));
        })
        .catch(err => {
            console.error("Crop failed:", err.message);
            process.exit(1);
        });
}
