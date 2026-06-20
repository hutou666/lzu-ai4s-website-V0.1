/**
 * 批量压缩 public/assets 与 素材 中的位图，减小部署体积。
 * 在 sync 脚本之后、next build 之前运行。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TARGET_DIRS = [
  path.join(root, "public", "assets"),
  path.join(root, "素材"),
];

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png"]);
const SKIP_IF_UNDER_KB = 180;
const MIN_SAVINGS_RATIO = 0.04;

/** @type {Array<{ test: RegExp; maxWidth: number; quality: number; pngQuality?: number }>} */
const RULES = [
  { test: /[\\/]news[\\/]/i, maxWidth: 1400, quality: 82 },
  { test: /organization-people[\\/]/i, maxWidth: 1200, quality: 82 },
  { test: /page-photos[\\/]home-overview[\\/]/i, maxWidth: 1600, quality: 82 },
  { test: /page-photos[\\/]/i, maxWidth: 1400, quality: 82 },
  { test: /join[\\/]/i, maxWidth: 960, quality: 85, pngQuality: 80 },
  { test: /partners[\\/]/i, maxWidth: 640, quality: 90, pngQuality: 80 },
  { test: /[\\/]resources[\\/]/i, maxWidth: 800, quality: 82, pngQuality: 75 },
];

const DEFAULT_RULE = { maxWidth: 1600, quality: 82, pngQuality: 80 };

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function walkImages(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "overview-gallery" || entry.name === "node_modules") continue;
      walkImages(full, files);
    } else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

function ruleFor(filePath) {
  const rel = filePath.replace(/\\/g, "/");
  return RULES.find((r) => r.test.test(rel)) ?? DEFAULT_RULE;
}

async function compressBuffer(input, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const rule = ruleFor(filePath);
  const meta = await sharp(input, { failOn: "none" }).metadata();
  const width = meta.width ?? 0;
  const needsResize = width > rule.maxWidth;

  let pipeline = sharp(input, { failOn: "none" });
  if (needsResize) {
    pipeline = pipeline.resize({
      width: rule.maxWidth,
      withoutEnlargement: true,
      fit: "inside",
    });
  }

  if (ext === ".png") {
    if (meta.hasAlpha) {
      return pipeline.png({ compressionLevel: 9, palette: meta.width && meta.width <= 512 }).toBuffer();
    }
    return pipeline.jpeg({ quality: rule.quality, mozjpeg: true }).toBuffer();
  }

  return pipeline.jpeg({ quality: rule.quality, mozjpeg: true }).toBuffer();
}

async function compressFile(filePath) {
  const before = fs.statSync(filePath).size;
  if (before < SKIP_IF_UNDER_KB * 1024) {
    return { filePath, before, after: before, skipped: true, reason: "small" };
  }

  const input = fs.readFileSync(filePath);
  const meta = await sharp(input, { failOn: "none" }).metadata();
  const needsResize = (meta.width ?? 0) > ruleFor(filePath).maxWidth;
  if (!needsResize && before < 400 * 1024) {
    return { filePath, before, after: before, skipped: true, reason: "within limits" };
  }

  const buffer = await compressBuffer(input, filePath);
  const after = buffer.length;
  const savings = (before - after) / before;
  if (after >= before || savings < MIN_SAVINGS_RATIO) {
    return { filePath, before, after: before, skipped: true, reason: "no gain" };
  }

  const tmp = `${filePath}.compress.tmp`;
  fs.writeFileSync(tmp, buffer);
  fs.renameSync(tmp, filePath);
  return { filePath, before, after, skipped: false };
}

async function main() {
  const quiet = process.argv.includes("--quiet");
  const files = TARGET_DIRS.flatMap((dir) => walkImages(dir));
  let totalBefore = 0;
  let totalAfter = 0;
  let changed = 0;
  let skipped = 0;

  for (const file of files) {
    try {
      const result = await compressFile(file);
      totalBefore += result.before;
      totalAfter += result.after;
      if (result.skipped) {
        skipped += 1;
      } else {
        changed += 1;
        if (!quiet) {
          const rel = path.relative(root, result.filePath);
          console.log(`  ${rel}: ${formatBytes(result.before)} -> ${formatBytes(result.after)}`);
        }
      }
    } catch (err) {
      console.warn(`[compress-images] skip ${path.relative(root, file)}: ${err.message}`);
      skipped += 1;
    }
  }

  const saved = totalBefore - totalAfter;
  console.log(
    `[compress-images] ${files.length} file(s), ${changed} compressed, ${skipped} skipped, saved ${formatBytes(saved)} (${totalBefore ? ((saved / totalBefore) * 100).toFixed(1) : 0}%)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
