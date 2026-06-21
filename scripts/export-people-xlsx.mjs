/**
 * 将 people-defaults.json 中指定届别人员导出到 Excel。
 * 默认：素材/组织架构 照片/第一届/人员介绍.xlsx
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import XLSX from "xlsx";
import {
  COHORT_XLSX_PATHS,
  ROSTER_COLUMNS,
  personToRow,
  sortPeopleForExport,
} from "./people-roster-columns.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULTS_FILE = path.join(root, "src", "content", "organization", "people-defaults.json");

function resolveXlsxPath(cohortConfig) {
  return path.join(root, "素材", ...cohortConfig.xlsx);
}

function exportCohort(defaults, cohortConfig) {
  const outPath = resolveXlsxPath(cohortConfig);
  const people = sortPeopleForExport(
    defaults.people.filter((p) => p.cohortId === cohortConfig.cohortId),
  );

  const headerRow = ROSTER_COLUMNS.map((c) => c.header);
  const dataRows = people.map((p) => ROSTER_COLUMNS.map((c) => personToRow(p)[c.key] ?? ""));

  const guideRows = [
    ["说明：修改本表后运行 npm run sync:people-roster 即可写回网站数据并同步头像"],
    ["请勿删除「标识(slug)」列；新增成员可留空 slug，导入时会自动生成"],
    ["角色可选：指导老师 / 社团主要负责人 / 社团负责人 / 部门负责人 / 科研小组负责人 / 部门干事"],
    [],
    headerRow,
    ...dataRows,
  ];

  const ws = XLSX.utils.aoa_to_sheet(guideRows);
  ws["!cols"] = ROSTER_COLUMNS.map((c) => ({ wch: c.width }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, cohortConfig.label);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  try {
    XLSX.writeFile(wb, outPath);
  } catch (err) {
    if (err.code === "EBUSY" || err.code === "EPERM") {
      const fallback = outPath.replace(/\.xlsx$/i, "_网站导出.xlsx");
      XLSX.writeFile(wb, fallback);
      return { outPath: fallback, count: people.length, locked: true };
    }
    throw err;
  }

  return { outPath, count: people.length, locked: false };
}

function main() {
  const args = process.argv.slice(2);
  const cohortId = args.find((a) => !a.startsWith("-")) ?? "gen-1";

  if (!fs.existsSync(DEFAULTS_FILE)) {
    console.error("Missing people-defaults.json");
    process.exit(1);
  }

  const defaults = JSON.parse(fs.readFileSync(DEFAULTS_FILE, "utf8"));
  const config = COHORT_XLSX_PATHS.find((c) => c.cohortId === cohortId);
  if (!config) {
    console.error(`Unknown cohort: ${cohortId}`);
    process.exit(1);
  }

  const { outPath, count, locked } = exportCohort(defaults, config);
  console.log(`[export:people-xlsx] ${count} 人 -> ${path.relative(root, outPath)}`);
  if (locked) {
    console.log("[export:people-xlsx] 原文件被 Excel 占用，已写入备用文件。请关闭 Excel 后重命名覆盖，或复制内容到 人员介绍.xlsx");
  }
}

main();
