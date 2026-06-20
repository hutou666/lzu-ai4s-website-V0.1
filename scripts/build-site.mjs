import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const maxAttempts = 3;
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

function rmNext() {
  const dir = path.join(root, ".next");
  if (!fs.existsSync(dir)) return;
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 3, retryDelay: 250 });
}

let lastStatus = 1;

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  if (attempt > 1) {
    console.log(`[build-site] 第 ${attempt}/${maxAttempts} 次重试（已清理 .next）…`);
    rmNext();
  }

  const result = spawnSync(process.execPath, [nextBin, "build"], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });

  lastStatus = result.status ?? 1;

  if (result.status === 0) {
    const indexHtml = path.join(root, "out", "index.html");
    if (!fs.existsSync(indexHtml)) {
      console.error("[build-site] missing out/index.html after export");
      lastStatus = 1;
      continue;
    }
    const fileCount = fs.readdirSync(path.join(root, "out"), { recursive: true }).length;
    console.log(`[build-site] OK (${fileCount} entries under out/)`);
    process.exit(0);
  }
}

console.error(`[build-site] next build 在 ${maxAttempts} 次尝试后仍失败`);
process.exit(lastStatus);
