import { execFileSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

/** @deprecated 请使用 npm run sync:photos；此脚本仅同步首页发展历程照片 */
const script = path.join(path.dirname(fileURLToPath(import.meta.url)), "sync-page-photos.mjs");
execFileSync(process.execPath, [script, "home-overview"], { stdio: "inherit" });
