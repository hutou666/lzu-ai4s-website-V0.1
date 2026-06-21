/**
 * 从 Excel 读回人员信息，更新 people-defaults.json。
 * 默认：素材/组织架构 照片/第一届/人员介绍.xlsx
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import XLSX from "xlsx";
import {
  COHORT_XLSX_PATHS,
  ROSTER_COLUMNS,
  VALID_ROLES,
  rowToPerson,
  sortPeopleForExport,
} from "./people-roster-columns.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULTS_FILE = path.join(root, "src", "content", "organization", "people-defaults.json");

function resolveXlsxPath(cohortConfig) {
  return path.join(root, "素材", ...cohortConfig.xlsx);
}

function slugifyName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u4e00-\u9fff-]/gi, "");
}

function makeUniqueSlug(base, used) {
  let slug = base;
  let n = 2;
  while (used.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  used.add(slug);
  return slug;
}

function findHeaderRowIndex(rows) {
  const headerCells = ROSTER_COLUMNS.map((c) => c.header);
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    if (!row) continue;
    if (headerCells.every((h, idx) => String(row[idx] ?? "").trim() === h)) {
      return i;
    }
    const first = String(row[0] ?? "").trim();
    if (first === headerCells[0]) return i;
  }
  return -1;
}

function parseSheetRows(sheet) {
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
  const headerIdx = findHeaderRowIndex(rows);
  if (headerIdx < 0) {
    throw new Error("未找到表头行，请使用 export:people-xlsx 导出的列名");
  }

  const header = rows[headerIdx].map((c) => String(c).trim());
  const keyByHeader = new Map(ROSTER_COLUMNS.map((c) => [c.header, c.key]));

  const parsed = [];
  for (let i = headerIdx + 1; i < rows.length; i += 1) {
    const row = rows[i];
    if (!row || row.every((c) => String(c ?? "").trim() === "")) continue;

    const record = {};
    for (let col = 0; col < header.length; col += 1) {
      const key = keyByHeader.get(header[col]);
      if (key) record[key] = row[col] ?? "";
    }

    if (!String(record.name ?? "").trim()) continue;
    parsed.push(record);
  }

  return parsed;
}

function importCohort(defaults, cohortConfig, { quiet = false } = {}) {
  const xlsxPath = resolveXlsxPath(cohortConfig);

  if (!fs.existsSync(xlsxPath)) {
    if (!quiet) console.log(`[import:people-xlsx] skip — ${path.relative(root, xlsxPath)} 不存在`);
    return { updated: 0, added: 0, skipped: 0, count: 0 };
  }

  let wb;
  try {
    wb = XLSX.readFile(xlsxPath);
  } catch (err) {
    if (err.code === "EBUSY" || err.code === "EPERM") {
      if (!quiet) {
        console.log(`[import:people-xlsx] skip — Excel 正在占用 ${path.basename(xlsxPath)}，请先保存并关闭`);
      }
      return { updated: 0, added: 0, skipped: 0, count: 0 };
    }
    throw err;
  }

  const sheetName = wb.SheetNames.includes(cohortConfig.label)
    ? cohortConfig.label
    : wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  const rows = parseSheetRows(sheet);

  const cohortId = cohortConfig.cohortId;
  const otherPeople = defaults.people.filter((p) => p.cohortId !== cohortId);
  const existingBySlug = new Map(
    defaults.people.filter((p) => p.cohortId === cohortId).map((p) => [p.slug, p]),
  );
  const usedSlugs = new Set(defaults.people.map((p) => p.slug));

  let updated = 0;
  let added = 0;
  let skipped = 0;
  const imported = [];

  for (const row of rows) {
    let person = rowToPerson(row, { cohortId });

    if (!VALID_ROLES.has(person.role)) {
      if (!quiet) console.warn(`  skip ${person.name} — 无效角色「${person.role}」`);
      skipped += 1;
      continue;
    }

    if (!person.slug) {
      const base = `${cohortId}-${slugifyName(person.name) || "member"}`;
      person.slug = makeUniqueSlug(base, usedSlugs);
      added += 1;
    } else if (existingBySlug.has(person.slug)) {
      const prev = existingBySlug.get(person.slug);
      if (!person.avatar && prev.avatar) person.avatar = prev.avatar;
      usedSlugs.add(person.slug);
      updated += 1;
    } else {
      usedSlugs.add(person.slug);
      added += 1;
    }

    if (!person.avatar) {
      person.avatar = `/assets/organization-people/${cohortId}/${person.slug}.jpg`;
    }

    imported.push(person);
  }

  defaults.people = [...otherPeople, ...sortPeopleForExport(imported)];

  return { updated, added, skipped, count: imported.length };
}

/**
 * @param {{ cohortId?: string, quiet?: boolean, write?: boolean }} options
 */
export function importPeopleFromXlsx(options = {}) {
  const { cohortId = "gen-1", quiet = false, write = true } = options;

  if (!fs.existsSync(DEFAULTS_FILE)) {
    throw new Error("Missing people-defaults.json");
  }

  const defaults = JSON.parse(fs.readFileSync(DEFAULTS_FILE, "utf8"));
  const config = COHORT_XLSX_PATHS.find((c) => c.cohortId === cohortId);
  if (!config) throw new Error(`Unknown cohort: ${cohortId}`);

  const result = importCohort(defaults, config, { quiet });

  if (write && result.count > 0) {
    fs.writeFileSync(DEFAULTS_FILE, `${JSON.stringify(defaults, null, 2)}\n`, "utf8");
  }

  if (!quiet && result.count > 0) {
    console.log(
      `[import:people-xlsx] ${config.label}: ${result.count} 条（更新 ${result.updated}，新增 ${result.added}，跳过 ${result.skipped}）`,
    );
  } else if (!quiet) {
    console.log(`[import:people-xlsx] ${config.label}: 无变更`);
  }

  return { ...result, wrote: write && result.count > 0 };
}

function main() {
  const args = process.argv.slice(2);
  const quiet = args.includes("--quiet");
  const cohortId = args.find((a) => a !== "--quiet") ?? "gen-1";

  try {
    importPeopleFromXlsx({ cohortId, quiet, write: true });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
