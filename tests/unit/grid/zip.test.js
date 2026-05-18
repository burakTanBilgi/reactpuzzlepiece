import { describe, expect, it } from 'vitest';
import { makeZip } from '../../../src/grid/zip.js';

// makeZip returns a Blob (so the caller can hand it straight to a
// download anchor). To assert on the bytes we materialise the Blob
// into a Uint8Array for scanning.
async function zipBytes(files) {
  const blob = makeZip(files);
  expect(blob).toBeInstanceOf(Blob);
  expect(blob.type).toBe('application/zip');
  return new Uint8Array(await blob.arrayBuffer());
}

function findIndex(buf, signature) {
  outer: for (let i = 0; i <= buf.length - signature.length; i++) {
    for (let j = 0; j < signature.length; j++) {
      if (buf[i + j] !== signature[j]) continue outer;
    }
    return i;
  }
  return -1;
}

const LOCAL_FILE_SIGNATURE  = [0x50, 0x4b, 0x03, 0x04];
const END_RECORD_SIGNATURE  = [0x50, 0x4b, 0x05, 0x06];

describe('makeZip', () => {
  it('returns a Blob with the EOCD record at the end', async () => {
    const out = await zipBytes([{ name: 'hello.txt', content: 'hi' }]);
    expect(findIndex(out, END_RECORD_SIGNATURE)).toBeGreaterThan(0);
  });

  it('emits one local-file header per entry', async () => {
    const out = await zipBytes([
      { name: 'one.txt',       content: 'a' },
      { name: 'two.txt',       content: 'b' },
      { name: 'dir/three.txt', content: 'c' },
    ]);
    let count = 0;
    for (let i = 0; i <= out.length - 4; i++) {
      if (out[i] === 0x50 && out[i + 1] === 0x4b && out[i + 2] === 0x03 && out[i + 3] === 0x04) count++;
    }
    expect(count).toBe(3);
  });

  it('emits one central-directory header per entry', async () => {
    const out = await zipBytes([
      { name: 'a', content: 'A' },
      { name: 'b', content: 'B' },
    ]);
    let count = 0;
    for (let i = 0; i <= out.length - 4; i++) {
      if (out[i] === 0x50 && out[i + 1] === 0x4b && out[i + 2] === 0x01 && out[i + 3] === 0x02) count++;
    }
    expect(count).toBe(2);
  });

  it('encodes file names as UTF-8 (so non-ASCII names round-trip)', async () => {
    const out = await zipBytes([{ name: '箱庭/hello.txt', content: 'hi' }]);
    const localStart = findIndex(out, LOCAL_FILE_SIGNATURE);
    expect(localStart).toBeGreaterThanOrEqual(0);
    // The name lives right after the 30-byte local header. '箱' (U+7BB1)
    // is `E7 AE B1` in UTF-8.
    const arr = Array.from(out.slice(localStart + 30, localStart + 30 + 16));
    const idx = arr.findIndex((b, i) =>
      b === 0xE7 && arr[i + 1] === 0xAE && arr[i + 2] === 0xB1);
    expect(idx).toBeGreaterThanOrEqual(0);
  });

  it('accepts Uint8Array content as well as strings', async () => {
    const bytes = new Uint8Array([1, 2, 3, 4, 5]);
    // Just ensure no throw + a non-trivial blob comes out.
    const out = await zipBytes([{ name: 'bin', content: bytes }]);
    expect(out.length).toBeGreaterThan(0);
  });
});
