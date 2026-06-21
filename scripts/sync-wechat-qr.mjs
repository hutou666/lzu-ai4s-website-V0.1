/**
 * 同步微信公众号二维码。
 * 素材：素材/加入我们 照片/wechat-official-qr.{jpg|png|webp}
 * 输出：public/assets/join/wechat-qr.{ext}
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(root, "素材", "加入我们 照片");
const DST_DIR = path.join(root, "public", "assets", "join");
const BASENAME = "wechat-official-qr";
const OUT_BASENAME = "wechat-qr";
const IMAGE_EXT = [".png", ".jpg", ".jpeg", ".webp"];

export function syncWechatQr(options = {}) {
  const { quiet = false } = options;

  fs.mkdirSync(SRC_DIR, { recursive: true });
  fs.mkdirSync(DST_DIR, { recursive: true });

  const srcFile = IMAGE_EXT.map((ext) => `${BASENAME}${ext}`).find((name) =>
    fs.existsSync(path.join(SRC_DIR, name))
  );

  if (!srcFile) {
    if (!quiet) {
      console.warn(`[sync:wechat-qr] skip — place ${BASENAME}.png in 素材/加入我们 照片/`);
    }
    return { copied: false };
  }

  const ext = path.extname(srcFile).toLowerCase();
  const dstFile = `${OUT_BASENAME}${ext}`;
  fs.copyFileSync(path.join(SRC_DIR, srcFile), path.join(DST_DIR, dstFile));

  if (!quiet) {
    console.log(`[sync:wechat-qr] ${srcFile} -> public/assets/join/${dstFile}`);
  } else {
    console.log(`[sync:wechat-qr] synced public/assets/join/${dstFile}`);
  }

  return { copied: true, dst: `/assets/join/${dstFile}` };
}

function main() {
  const quiet = process.argv.includes("--quiet");
  syncWechatQr({ quiet });
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
