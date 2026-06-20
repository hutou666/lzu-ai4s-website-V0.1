/**
 * 同步加入社团 QQ 群二维码。
 * 素材：素材/加入我们 照片/qq-group-qr.{jpg|png|webp}
 * 输出：public/assets/join/group-qr.{ext}
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(root, "素材", "加入我们 照片");
const DST_DIR = path.join(root, "public", "assets", "join");
const BASENAME = "qq-group-qr";
const OUT_BASENAME = "group-qr";
const IMAGE_EXT = [".png", ".jpg", ".jpeg", ".webp"];

export function syncJoinQr(options = {}) {
  const { quiet = false } = options;

  fs.mkdirSync(SRC_DIR, { recursive: true });
  fs.mkdirSync(DST_DIR, { recursive: true });

  const srcFile = IMAGE_EXT.map((ext) => `${BASENAME}${ext}`).find((name) =>
    fs.existsSync(path.join(SRC_DIR, name))
  );

  if (!srcFile) {
    if (!quiet) {
      console.warn(`[sync:join-qr] skip — place ${BASENAME}.png in 素材/加入我们 照片/`);
    }
    return { copied: false };
  }

  const ext = path.extname(srcFile).toLowerCase();
  const dstFile = `${OUT_BASENAME}${ext}`;
  fs.copyFileSync(path.join(SRC_DIR, srcFile), path.join(DST_DIR, dstFile));

  if (!quiet) {
    console.log(`[sync:join-qr] ${srcFile} -> public/assets/join/${dstFile}`);
  } else {
    console.log(`[sync:join-qr] synced public/assets/join/${dstFile}`);
  }

  return { copied: true, dst: `/assets/join/${dstFile}` };
}

function main() {
  const quiet = process.argv.includes("--quiet");
  syncJoinQr({ quiet });
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
