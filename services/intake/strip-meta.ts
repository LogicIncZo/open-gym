/**
 * Remove metadata from an uploaded photo without decoding the pixels.
 *
 * Two reasons this exists rather than "trust the browser":
 *   1. A direct POST can carry camera EXIF, including GPS.
 *   2. A stored photo that still knows where it was taken is a privacy leak
 *      that no amount of "we do not store your location" copy can undo.
 *
 * JPEG: keep everything except APP1 (EXIF/XMP) and APP2 (ICC) segments.
 * PNG: keep everything except eXIf, tEXt, iTXt, zTXt and tIME chunks.
 * WebP: drop the EXIF/XMP chunks from the RIFF container.
 *
 * Returns an empty Buffer when the metadata could not be removed with
 * confidence — the caller must refuse the photo in that case.
 */

const SOI = 0xd8;
const APP0 = 0xe0;
const APP1 = 0xe1;
const APP2 = 0xe2;
const SOS = 0xda;
const EOI = 0xd9;

function stripJpeg(src: Buffer): Buffer {
  if (src[0] !== 0xff || src[1] !== SOI) return Buffer.alloc(0);
  const parts: Buffer[] = [src.subarray(0, 2)];
  let i = 2;

  while (i + 3 < src.length) {
    if (src[i] !== 0xff) return Buffer.alloc(0);
    const marker = src[i + 1] as number;

    if (marker === SOS || marker === EOI) break;
    if (marker >= 0xd0 && marker <= 0xd7) {
      parts.push(src.subarray(i, i + 2));
      i += 2;
      continue;
    }

    const len = src.readUInt16BE(i + 2);
    if (len < 2 || i + 2 + len > src.length) return Buffer.alloc(0);
    const drop = marker === APP1 || marker === APP2 || marker === APP0;
    if (!drop) parts.push(src.subarray(i, i + 2 + len));
    i += 2 + len;
  }

  if (i >= src.length) return Buffer.alloc(0);
  parts.push(src.subarray(i));
  return Buffer.concat(parts);
}

const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const PNG_DROP = new Set(["eXIf", "tEXt", "iTXt", "zTXt", "tIME"]);

function stripPng(src: Buffer): Buffer {
  if (!src.subarray(0, 8).equals(PNG_SIG)) return Buffer.alloc(0);
  const parts: Buffer[] = [PNG_SIG];
  let i = 8;
  while (i + 8 <= src.length) {
    const len = src.readUInt32BE(i);
    const type = src.subarray(i + 4, i + 8).toString("latin1");
    const end = i + 12 + len;
    if (end > src.length) return Buffer.alloc(0);
    if (!PNG_DROP.has(type)) parts.push(src.subarray(i, end));
    i = end;
    if (type === "IEND") break;
  }
  return Buffer.concat(parts);
}

const WEBP_DROP = new Set(["EXIF", "XMP "]);

function stripWebp(src: Buffer): Buffer {
  if (
    src.subarray(0, 4).toString("latin1") !== "RIFF" ||
    src.subarray(8, 12).toString("latin1") !== "WEBP"
  )
    return Buffer.alloc(0);

  const chunks: Buffer[] = [];
  let i = 12;
  while (i + 8 <= src.length) {
    const type = src.subarray(i, i + 4).toString("latin1");
    const len = src.readUInt32LE(i + 4);
    const end = i + 8 + len + (len % 2);
    if (end > src.length) return Buffer.alloc(0);
    if (!WEBP_DROP.has(type)) chunks.push(src.subarray(i, end));
    i = end;
  }

  const body = Buffer.concat(chunks);
  const head = Buffer.alloc(12);
  head.write("RIFF", 0, "latin1");
  head.writeUInt32LE(body.length + 4, 4);
  head.write("WEBP", 8, "latin1");
  return Buffer.concat([head, body]);
}

export function stripImageMeta(src: Buffer): Buffer {
  if (src.length > 4 && src[0] === 0xff && src[1] === SOI) return stripJpeg(src);
  if (src.length > 12 && src.subarray(0, 4).toString("latin1") === "RIFF") return stripWebp(src);
  if (src.length > 8 && src.subarray(0, 4).toString("hex") === "89504e47") return stripPng(src);
  return Buffer.alloc(0);
}

/** True when the buffer still appears to carry EXIF/GPS/XMP metadata. */
export function hasImageMeta(src: Buffer): boolean {
  if (src[0] === 0xff && src[1] === SOI) {
    let i = 2;
    while (i + 3 < src.length) {
      if (src[i] !== 0xff) return false;
      const marker = src[i + 1] as number;
      if (marker === SOS || marker === EOI) return false;
      const len = src.readUInt16BE(i + 2);
      if (len < 2) return false;
      if (marker === APP1 || marker === APP2) return true;
      i += 2 + len;
    }
    return false;
  }
  if (src.subarray(0, 4).toString("latin1") === "RIFF") {
    return src.includes("EXIF") || src.includes("XMP ");
  }
  if (src.subarray(0, 4).toString("hex") === "89504e47") {
    return src.includes("eXIf") || src.includes("tEXt");
  }
  return false;
}
