import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      fs.rmSync(dir, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      return;
    } catch (err) {
      if (attempt === 2) throw err;
    }
  }
}

for (const name of [".next", "out"]) {
  rmDir(path.join(root, name));
}

console.log("[clean-next] removed .next and out");
