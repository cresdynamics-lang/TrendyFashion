#!/usr/bin/env node
/**
 * Re-encode product WebPs/JPEGs for faster loads without a visible quality drop.
 * Uses sharp near-lossless / high-quality settings + max edge 1600px.
 */
import { readdirSync, statSync, renameSync, unlinkSync, existsSync } from "fs";
import path from "path";

const root = process.argv[2] || path.join(process.cwd(), "public", "uploads", "images");
const MAX_EDGE = 1600;
const WEBP_QUALITY = 90;

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("sharp not installed — run: npm i sharp");
    process.exit(1);
  }

  const files = [];
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = statSync(full);
      if (st.isDirectory()) walk(full);
      else if (/\.(webp|jpe?g|png)$/i.test(name) && !name.includes(".bak.")) files.push(full);
    }
  }
  if (!existsSync(root)) {
    console.error("missing", root);
    process.exit(1);
  }
  walk(root);

  let saved = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;
  let n = 0;

  for (const file of files) {
    const before = statSync(file).size;
    bytesBefore += before;
    const tmp = file + ".tmp.webp";
    try {
      await sharp(file)
        .rotate()
        .resize({
          width: MAX_EDGE,
          height: MAX_EDGE,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: WEBP_QUALITY, effort: 4, smartSubsample: true })
        .toFile(tmp);
      const after = statSync(tmp).size;
      // Keep original if compression did not help (or grew)
      if (after < before * 0.98) {
        const dest = file.replace(/\.(jpe?g|png)$/i, ".webp");
        renameSync(tmp, dest);
        if (dest !== file && existsSync(file)) unlinkSync(file);
        saved += before - after;
        bytesAfter += after;
        n++;
      } else {
        unlinkSync(tmp);
        bytesAfter += before;
      }
    } catch (err) {
      if (existsSync(tmp)) unlinkSync(tmp);
      bytesAfter += before;
      console.warn("skip", file, err.message);
    }
  }

  console.log(
    JSON.stringify(
      {
        files: files.length,
        recompressed: n,
        beforeMB: +(bytesBefore / 1e6).toFixed(2),
        afterMB: +(bytesAfter / 1e6).toFixed(2),
        savedMB: +(saved / 1e6).toFixed(2),
      },
      null,
      2,
    ),
  );
}

main();
