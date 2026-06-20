/**
 * 按姓名将届别成员照片从素材文件夹同步到 public，并写入 avatar 字段。
 *
 * 素材路径：素材/组织架构 照片/<届别文件夹>/
 * 文件命名：与成员姓名一致，如 胡家瑞.jpg、杨裔.jpg
 * 输出路径：public/assets/organization-people/<cohortId>/<slug>.<ext>
 * 数据文件：src/content/organization/people-defaults.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MATERIALS_DIR = path.join(root, "素材");
const DEFAULTS_FILE = path.join(root, "src", "content", "organization", "people-defaults.json");
const PUBLIC_DIR = path.join(root, "public", "assets", "organization-people");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

/** 届别文件夹名 → cohortId */
export const COHORT_PHOTO_DIRS = [
  { cohortId: "gen-1", folder: path.join("组织架构 照片", "第一届"), label: "第一届" },
];

function normalizeName(name) {
  return name.replace(/\s+/g, "").trim();
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && IMAGE_EXT.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }));
}

function fileNeedsCopy(src, dst) {
  if (!fs.existsSync(dst)) return true;
  const srcStat = fs.statSync(src);
  const dstStat = fs.statSync(dst);
  return srcStat.mtimeMs > dstStat.mtimeMs || srcStat.size !== dstStat.size;
}

function syncCohort(defaults, { cohortId, folder, label }, { quiet }) {
  const srcDir = path.join(MATERIALS_DIR, folder);
  const dstDir = path.join(PUBLIC_DIR, cohortId);

  if (!fs.existsSync(srcDir)) {
    if (!quiet) console.log(`[${label}] skip — folder not found: 素材/${folder}`);
    return { matched: 0, skipped: 0, updated: 0 };
  }

  fs.mkdirSync(dstDir, { recursive: true });

  const cohortPeople = defaults.people.filter((p) => p.cohortId === cohortId);
  const byName = new Map(cohortPeople.map((p) => [normalizeName(p.name), p]));
  const files = listImages(srcDir);

  let matched = 0;
  let skipped = 0;
  let updated = 0;

  if (!quiet) {
    console.log(`\n[${label}] ${label} (${cohortId})`);
    console.log(`  Source: 素材/${folder}/`);
  }

  for (const file of files) {
    const stem = normalizeName(path.basename(file, path.extname(file)));
    const person = byName.get(stem);

    if (!person) {
      if (!quiet) console.log(`  skip ${file} — 未找到同名成员「${stem}」`);
      skipped += 1;
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    const outName = `${person.slug}${ext}`;
    const srcPath = path.join(srcDir, file);
    const dstPath = path.join(dstDir, outName);
    const url = `/assets/organization-people/${cohortId}/${outName}`;

    const shouldCopy = fileNeedsCopy(srcPath, dstPath);
    const shouldUpdateAvatar = person.avatar !== url;

    if (shouldCopy) {
      fs.copyFileSync(srcPath, dstPath);
    }

    if (shouldUpdateAvatar) {
      person.avatar = url;
      updated += 1;
    }

    if (shouldCopy || shouldUpdateAvatar) {
      if (!quiet) console.log(`  ${file} -> ${person.name} (${url})`);
      matched += 1;
    }
  }

  if (!quiet) {
    console.log(`  Imported/updated ${matched} photo(s), skipped ${skipped}`);
  }

  return { matched, skipped, updated };
}

/**
 * @param {{ filterId?: string, quiet?: boolean }} options
 * @returns {{ matched: number, skipped: number, updated: number, wrote: boolean }}
 */
export function syncOrganizationPeoplePhotos(options = {}) {
  const { filterId, quiet = false } = options;

  if (!fs.existsSync(DEFAULTS_FILE)) {
    if (!quiet) {
      console.error("Missing src/content/organization/people-defaults.json");
    }
    return { matched: 0, skipped: 0, updated: 0, wrote: false };
  }

  const defaults = JSON.parse(fs.readFileSync(DEFAULTS_FILE, "utf8"));
  const defaultsBefore = JSON.stringify(defaults.people.map((p) => p.avatar));

  const sets = filterId
    ? COHORT_PHOTO_DIRS.filter((c) => c.cohortId === filterId || c.label === filterId)
    : COHORT_PHOTO_DIRS;

  if (filterId && sets.length === 0) {
    throw new Error(`Unknown cohort: ${filterId}`);
  }

  if (!quiet) console.log("Syncing organization people photos...");

  let totalMatched = 0;
  let totalSkipped = 0;
  let totalUpdated = 0;

  for (const cohort of sets) {
    const result = syncCohort(defaults, cohort, { quiet });
    totalMatched += result.matched;
    totalSkipped += result.skipped;
    totalUpdated += result.updated;
  }

  const defaultsAfter = JSON.stringify(defaults.people.map((p) => p.avatar));
  const wrote = defaultsBefore !== defaultsAfter;

  if (wrote) {
    fs.writeFileSync(DEFAULTS_FILE, `${JSON.stringify(defaults, null, 2)}\n`, "utf8");
  }

  if (!quiet) {
    console.log(`\nDone. ${totalMatched} photo(s) synced, ${totalSkipped} skipped.`);
    if (wrote) console.log("Updated src/content/organization/people-defaults.json");
  } else if (totalMatched > 0 || wrote) {
    console.log(`[sync:people-photos] ${totalMatched} photo(s) synced${wrote ? ", roster updated" : ""}`);
  }

  return { matched: totalMatched, skipped: totalSkipped, updated: totalUpdated, wrote };
}

function main() {
  const args = process.argv.slice(2);
  const quiet = args.includes("--quiet");
  const filterId = args.find((a) => a !== "--quiet");

  try {
    syncOrganizationPeoplePhotos({ filterId, quiet });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
