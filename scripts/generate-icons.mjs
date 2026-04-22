// One-shot icon generator. Rasterises public/icon.svg into PNG sizes
// required by the web manifest and Apple touch icons. Re-run after
// editing the SVG: `node scripts/generate-icons.mjs`.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const src = await readFile(resolve(root, "public/icon.svg"));

const outputs = [
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
  { file: "icon-maskable-512.png", size: 512, padding: 64, bg: "#0b0f0b" },
  { file: "apple-touch-icon.png", size: 180 },
];

await mkdir(resolve(root, "public"), { recursive: true });

for (const o of outputs) {
  let pipe = sharp(src, { density: 512 }).resize(o.size, o.size);
  if (o.padding) {
    pipe = sharp({
      create: {
        width: o.size,
        height: o.size,
        channels: 4,
        background: o.bg ?? "#000000",
      },
    }).composite([
      {
        input: await sharp(src, { density: 512 })
          .resize(o.size - o.padding * 2, o.size - o.padding * 2)
          .png()
          .toBuffer(),
        top: o.padding,
        left: o.padding,
      },
    ]);
  }
  const buf = await pipe.png().toBuffer();
  await writeFile(resolve(root, "public", o.file), buf);
  console.log(`wrote public/${o.file} (${buf.length} bytes)`);
}
