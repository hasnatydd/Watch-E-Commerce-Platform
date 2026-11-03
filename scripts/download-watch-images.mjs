import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

const imagesToDownload = {
  "skeleton-watch.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/7/75/Montre_squelette.jpg",
  "automatic-movement.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/8/84/Self-winding_wristwatch_%28transparent_backside%29.jpg",
  "classic-calatrava.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/0/0b/Calatrava1.jpg",
  "classic-tank.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Cartier_Tank.jpg",
  "navitimer-chronograph.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Breitling_Navitimer_slide_rule.jpg",
  "tag-heuer-monaco.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/TAG_Heuer_Monaco_40th_Anniversary_re-edition.JPG",
  "rolex-datejust-two-tone.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/9/9d/Rolex_Datejust_16013.jpg",
  "cartier-santos.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/7/79/Cartier_Santos_wristwatch.jpg",
  "louis-george-engraved.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/3/30/Louis_George_Uhrwerk_2.jpg",
  "omega-caliber-321.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/1/1c/Omega_Cal._321_Chronograph_movement_%28detail%29.jpg",
};

const targetDir = path.resolve("public/images/watches");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function fetchAndSave(filename, url) {
  const destPath = path.join(targetDir, filename);
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 10000) {
    console.log(`- Skipping ${filename} (already exists, ${Math.round(fs.statSync(destPath).size / 1024)} KB)`);
    return;
  }

  console.log(`Downloading ${filename}...`);
  const res = await fetch(url, {
    headers: {
      "User-Agent": "ArvanoWatch/1.0 (contact@arvano.com)",
      "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status} ${res.statusText}`);
  }

  const fileStream = fs.createWriteStream(destPath);
  await pipeline(Readable.fromWeb(res.body), fileStream);
  const size = fs.statSync(destPath).size;
  console.log(`✓ ${filename} (${Math.round(size / 1024)} KB)`);
}

async function run() {
  for (const [filename, url] of Object.entries(imagesToDownload)) {
    try {
      await fetchAndSave(filename, url);
      // Small 200ms delay to be polite to Wikimedia
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.error(`✗ Error downloading ${filename}:`, err.message);
    }
  }
}

run();
