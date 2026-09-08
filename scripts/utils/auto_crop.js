import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import canvas from 'canvas';
import { createRequire } from 'module';
import { cropHeadshot } from './crop_headshot.js';

const require = createRequire(import.meta.url);
const faceapi = require('@vladmandic/face-api/dist/face-api.node-wasm.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

let modelsLoaded = false;

async function loadModels() {
    if (modelsLoaded) return;
    await faceapi.tf.ready();
    const modelPath = path.resolve(__dirname, '../../node_modules/@vladmandic/face-api/model');
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
    modelsLoaded = true;
}

/**
 * 100% Automated 1-Pass Face Detection & Crop Function
 * Uses TensorFlow.js / face-api WASM 68-point facial landmarks in Node.js to detect face bounds
 * and calculate exact face centroid and 240px scale fill in 1 attempt.
 *
 * @param {string} rawImagePath - Path to uncropped master image in raw_sources/
 * @param {string} guestId - Unique guest identifier (e.g. 'chrissy_fiore')
 * @param {object} [options] - Optional target hint coordinates { hintX, hintY } for group photos
 * @param {string} [customPreviewPath] - Path to save preview crop
 */
export async function autoCropGuest(rawImagePath, guestId, options = {}, customPreviewPath = null) {
    await loadModels();

    const resolvedPath = path.resolve(rawImagePath);
    if (!fs.existsSync(resolvedPath)) {
        throw new Error(`Raw source image not found: ${resolvedPath}`);
    }

    const img = await canvas.loadImage(resolvedPath);

    // 1. Detect faces & 68-point landmarks
    const detections = await faceapi.detectAllFaces(img)
        .withFaceLandmarks();

    if (!detections || detections.length === 0) {
        throw new Error(`No face detected in ${rawImagePath}.`);
    }

    // 2. Target face selection (closest to hint point or largest face in photo)
    let targetDetection = detections[0];

    if (detections.length > 1) {
        if (options.hintX !== undefined && options.hintY !== undefined && !isNaN(options.hintX) && !isNaN(options.hintY)) {
            targetDetection = detections.reduce((closest, curr) => {
                const box = curr.detection.box;
                const currCx = box.x + box.width / 2;
                const currCy = box.y + box.height / 2;
                const currDist = Math.hypot(currCx - options.hintX, currCy - options.hintY);

                const cBox = closest.detection.box;
                const cCx = cBox.x + cBox.width / 2;
                const cCy = cBox.y + cBox.height / 2;
                const cDist = Math.hypot(cCx - options.hintX, cCy - options.hintY);

                return currDist < cDist ? curr : closest;
            });
        } else {
            targetDetection = detections.reduce((largest, curr) => {
                return (curr.detection.box.width * curr.detection.box.height > largest.detection.box.width * largest.detection.box.height) ? curr : largest;
            });
        }
    }

    const landmarks = targetDetection.landmarks;
    const positions = landmarks.positions;

    // 3. Precise Face Centroid & Inner Face Height Calculation via 68 Landmarks
    const chinPoint = positions[8]; // Point 8 is chin tip
    const leftEyePt = positions[36];
    const rightEyePt = positions[45];

    const eyeCenterY = (leftEyePt.y + rightEyePt.y) / 2;
    const eyeCenterX = (leftEyePt.x + rightEyePt.x) / 2;

    const chinToEyeDist = Math.abs(chinPoint.y - eyeCenterY);
    
    // Total inner face height (chin tip to forehead hairline)
    const face_h = Math.round(chinToEyeDist * 1.65);

    // Centroid is locked to eye/nose bridge center
    const c_x = Math.round(eyeCenterX);
    const c_y = Math.round(eyeCenterY + (chinPoint.y - eyeCenterY) * 0.12);

    console.log(`🤖 Automated CV Landmark Detection [${guestId}]: Centroid=(${c_x}, ${c_y}), FaceHeight=${face_h}px`);

    // 4. Delegate to bulletproof crop function
    return await cropHeadshot(resolvedPath, c_x, c_y, face_h, guestId, customPreviewPath);
}

// CLI Execution support
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
    const rawPath = process.argv[2];
    const guestId = process.argv[3];
    const hintX = process.argv[4] ? parseFloat(process.argv[4]) : undefined;
    const hintY = process.argv[5] ? parseFloat(process.argv[5]) : undefined;
    const previewPath = process.argv[6];

    if (!rawPath || !guestId) {
        console.error("Usage: node auto_crop.js <raw_image_path> <guest_id> [hintX] [hintY] [preview_path]");
        process.exit(1);
    }

    autoCropGuest(rawPath, guestId, { hintX, hintY }, previewPath)
        .then(res => {
            console.log("Automated 1-pass crop success:", JSON.stringify(res, null, 2));
        })
        .catch(err => {
            console.error("Automated crop error:", err.message);
            process.exit(1);
        });
}
