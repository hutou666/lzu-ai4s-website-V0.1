/**
 * 同步加入社团 QQ 群二维码。
 * 素材：素材/加入我们 照片/
 *   社团总QQ群.png / qq-group-qr.png  → public/assets/join/group-qr.{ext}
 *   2026级新生群.jpg / freshmen-2026-qr.jpg → public/assets/join/freshmen-2026-qr.{ext}
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(root, "素材", "加入我们 照片");
const DST_DIR = path.join(root, "public", "assets", "join");
const IMAGE_EXT = [".png", ".jpg", ".jpeg", ".webp"];

const QR_SETS = [
  {
    outBasename: "group-qr",
    candidates: ["社团总QQ群", "qq-group-qr"],
    label: "社团总QQ群",
  },
  {
    outBasename: "freshmen-2026-qr",
    candidates: ["2026级新生群", "freshmen-2026-qr"],
    label: "2026级新生群",
  },
];

function findSource(basenames) {
  for (const basename of basenames) {
    const srcFile = IMAGE_EXT.map((ext) => `${basename}${ext}`).find((name) =>
      fs.existsSync(path.join(SRC_DIR, name))
    );
    if (srcFile) return srcFile;
  }
  return null;
}

export function syncJoinQr(options = {}) {
  const { quiet = false } = options;
  const copied = [];

  fs.mkdirSync(SRC_DIR, { recursive: true });
  fs.mkdirSync(DST_DIR, { recursive: true });

  for (const set of QR_SETS) {
    const srcFile = findSource(set.candidates);
    if (!srcFile) {
      if (!quiet) {
        console.warn(`[sync:join-qr] skip ${set.label} — place ${set.candidates[0]}.png in 素材/加入我们 照片/`);
      }
      continue;
    }

    const ext = path.extname(srcFile).toLowerCase();
    const dstFile = `${set.outBasename}${ext}`;
    fs.copyFileSync(path.join(SRC_DIR, srcFile), path.join(DST_DIR, dstFile));
    copied.push({ src: srcFile, dst: dstFile });

    if (!quiet) {
      console.log(`[sync:join-qr] ${srcFile} -> public/assets/join/${dstFile}`);
    }
  }

  if (quiet && copied.length) {
    console.log(`[sync:join-qr] synced ${copied.map((item) => item.dst).join(", ")}`);
  }

  return { copied: copied.length > 0, files: copied };
}

function main() {
  const quiet = process.argv.includes("--quiet");
  syncJoinQr({ quiet });
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
