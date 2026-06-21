import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "素材", "lzu-ai4s-logos", "logos");
const dstDir = path.join(root, "public", "assets", "partners");
const clubSrc = path.join(root, "素材", "lzu-ai4s-logos", "club-logo");
const clubDstDir = path.join(root, "public", "assets");

const PARTNER_FILES = [
  { name: "lzu-sie", ext: "svg" },
  { name: "bytedance", ext: "svg" },
  { name: "china-mobile", ext: "svg" },
  { name: "moore-threads", ext: "svg" },
  { name: "ubtech", ext: "svg" },
  { name: "unitree", ext: "svg" },
  { name: "qiyuan-lab", ext: "svg" },
  { name: "metax", ext: "png" },
];

function copyIfExists(src, dst) {
  if (!fs.existsSync(src)) return false;
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  return true;
}

fs.mkdirSync(dstDir, { recursive: true });

if (!fs.existsSync(srcDir)) {
  console.warn("Partner logo source not found:", srcDir);
  process.exit(0);
}

let count = 0;
for (const { name, ext } of PARTNER_FILES) {
  const src = path.join(srcDir, `${name}.${ext}`);
  const dst = path.join(dstDir, `${name}.${ext}`);
  if (copyIfExists(src, dst)) {
    console.log(`partner: ${name}.${ext}`);
    count += 1;
  } else {
    console.warn(`missing: ${name}.${ext}`);
  }
}

const monoSrc = path.join(srcDir, "monochrome-white");
const monoDst = path.join(dstDir, "monochrome-white");
if (fs.existsSync(monoSrc)) {
  fs.mkdirSync(monoDst, { recursive: true });
  for (const file of fs.readdirSync(monoSrc).filter((f) => f.endsWith(".svg"))) {
    fs.copyFileSync(path.join(monoSrc, file), path.join(monoDst, file));
    console.log(`monochrome: ${file}`);
  }
}

const CLUB_NAMES = ["club-logo.png", "club-logo.jpg", "club-logo.webp", "club-logo.svg"];
if (fs.existsSync(clubSrc)) {
  for (const file of CLUB_NAMES) {
    if (copyIfExists(path.join(clubSrc, file), path.join(clubDstDir, file))) {
      console.log(`club: ${file}`);
    }
  }
}

console.log(`Synced ${count} partner logo(s) to public/assets/partners`);
