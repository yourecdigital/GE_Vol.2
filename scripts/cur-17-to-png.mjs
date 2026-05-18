/**
 * Одноразовый разбор Cursor_17: 1× иконка 32×32, 4 bpp, с AND-маской.
 * node scripts/cur-17-to-png.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public/cursors/cursor-17-discount.cur");
const output = path.join(root, "public/cursors/cursor-17-discount.png");

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function writeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typ = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typ, data])));
  return Buffer.concat([len, typ, data, crc]);
}

function encodePngRgba(width, height, rgba) {
  const idat = [];
  for (let y = 0; y < height; y++) {
    idat.push(0);
    const rowStart = y * width * 4;
    idat.push(...rgba.subarray(rowStart, rowStart + width * 4));
  }
  const raw = Buffer.from(idat);
  const compressed = zlib.deflateSync(raw, { level: 9 });

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8);
  ihdr.writeUInt8(6, 9);
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  return Buffer.concat([
    signature,
    writeChunk("IHDR", ihdr),
    writeChunk("IDAT", compressed),
    writeChunk("IEND", Buffer.alloc(0)),
  ]);
}

const buf = fs.readFileSync(input);
if (buf.readUInt16LE(2) !== 2) throw new Error("Not a .cur file");
if (buf.readUInt16LE(4) !== 1) throw new Error("Expected single image");

const offset = buf.readUInt32LE(18);
const dib = buf.subarray(offset);

let p = 0;
const hdrSize = dib.readUInt32LE(p);
p += 4;
const width = dib.readInt32LE(p);
p += 4;
const heightField = dib.readInt32LE(p);
p += 4;
const xorHeight = Math.abs(heightField) / 2;
const planes = dib.readUInt16LE(p);
p += 2;
const bitCount = dib.readUInt16LE(p);
p += 2;

if (bitCount !== 4) throw new Error(`Expected 4 bpp, got ${bitCount}`);
if (width !== 32 || xorHeight !== 32) throw new Error(`Unexpected size ${width}×${xorHeight}`);

p = hdrSize;
const palette = [];
for (let i = 0; i < 16; i++) {
  const b = dib[p++];
  const g = dib[p++];
  const r = dib[p++];
  const _ = dib[p++];
  palette.push([r, g, b]);
}

const bytesPerRow = Math.ceil((width * bitCount) / 32) * 4;
const xorBytes = bytesPerRow * xorHeight;
const xorData = dib.subarray(p, p + xorBytes);
p += xorBytes;
const andRowBytes = Math.ceil(width / 32) * 4;
const andBytes = andRowBytes * xorHeight;
const andData = dib.subarray(p, p + andBytes);

const rgba = new Uint8Array(width * xorHeight * 4);

for (let y = 0; y < xorHeight; y++) {
  const bmpRow = xorHeight - 1 - y;
  const xorRowOff = bmpRow * bytesPerRow;
  const andRowOff = bmpRow * andRowBytes;
  for (let x = 0; x < width; x++) {
    const byteIdx = xorRowOff + (x >> 1);
    const nib = (x & 1) === 0 ? xorData[byteIdx] >> 4 : xorData[byteIdx] & 0xf;
    const [r, g, b] = palette[nib] ?? [0, 0, 0];
    const andB = andData[andRowOff + (x >> 3)];
    const andBit = (andB >> (7 - (x & 7))) & 1;
    const transparent = andBit === 1;
    const o = (y * width + x) * 4;
    rgba[o] = r;
    rgba[o + 1] = g;
    rgba[o + 2] = b;
    rgba[o + 3] = transparent ? 0 : 255;
  }
}

const png = encodePngRgba(width, xorHeight, rgba);
fs.writeFileSync(output, png);
console.log("OK", output, `${width}×${xorHeight}`);
