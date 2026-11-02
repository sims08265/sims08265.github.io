"""Regenerate public/favicon.ico (16, 32, 48 px) and public/apple-touch-icon.png (180 px) from tools/favicon.html.

Usage (from the repository root, Windows with Microsoft Edge):  python tools/favicon.py
Standard library only: Edge renders the page once, then each icon is cropped and packed into the .ico file.
"""
import os
import struct
import subprocess
import tempfile
import zlib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EDGE = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
# (x, size) of each icon in favicon.html, all at y = 0
ICONS = {180: 0, 48: 200, 32: 260, 16: 300}


def read_png(path):
    """Decode an 8-bit RGB/RGBA PNG into (width, height, rows of RGBA bytes)."""
    data = open(path, 'rb').read()
    pos, idat, header = 8, b'', None
    while pos < len(data):
        length = struct.unpack('>I', data[pos:pos + 4])[0]
        kind, body = data[pos + 4:pos + 8], data[pos + 8:pos + 8 + length]
        if kind == b'IHDR':
            header = struct.unpack('>IIBB', body[:10])
        elif kind == b'IDAT':
            idat += body
        pos += 12 + length
    width, height, depth, color = header
    assert depth == 8 and color in (2, 6), 'unexpected PNG format'
    bpp = 4 if color == 6 else 3
    raw, stride, rows, prev, k = zlib.decompress(idat), width * bpp, [], bytearray(width * bpp), 0
    for _ in range(height):
        kind, row = raw[k], bytearray(raw[k + 1:k + 1 + stride])
        k += 1 + stride
        for i in range(stride):
            a = row[i - bpp] if i >= bpp else 0
            b = prev[i]
            c = prev[i - bpp] if i >= bpp else 0
            if kind == 1:
                row[i] = (row[i] + a) & 255
            elif kind == 2:
                row[i] = (row[i] + b) & 255
            elif kind == 3:
                row[i] = (row[i] + (a + b) // 2) & 255
            elif kind == 4:
                pa, pb, pc = abs(b - c), abs(a - c), abs(a + b - 2 * c)
                row[i] = (row[i] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        rows.append(bytes(row) if bpp == 4 else b''.join(bytes(row[i:i + 3]) + b'\xff' for i in range(0, stride, 3)))
        prev = row
    return width, height, rows


def write_png(rows, size):
    def chunk(kind, body):
        return struct.pack('>I', len(body)) + kind + body + struct.pack('>I', zlib.crc32(kind + body) & 0xffffffff)
    pixels = b''.join(b'\0' + r for r in rows)
    return (b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0))
            + chunk(b'IDAT', zlib.compress(pixels, 9)) + chunk(b'IEND', b''))


def main():
    with tempfile.TemporaryDirectory() as tmp:
        sprite = os.path.join(tmp, 'sprite.png')
        subprocess.run([EDGE, '--headless', '--hide-scrollbars', '--allow-file-access-from-files',
                        '--default-background-color=00000000', '--virtual-time-budget=3000',
                        '--window-size=512,512', f'--screenshot={sprite}',
                        os.path.join(ROOT, 'tools', 'favicon.html')], check=True, capture_output=True, timeout=120)
        _, _, rows = read_png(sprite)
    pngs = {size: write_png([r[x * 4:(x + size) * 4] for r in rows[:size]], size) for size, x in ICONS.items()}

    with open(os.path.join(ROOT, 'public', 'apple-touch-icon.png'), 'wb') as f:
        f.write(pngs[180])
    sizes = [16, 32, 48]
    offset = 6 + 16 * len(sizes)
    ico = struct.pack('<HHH', 0, 1, len(sizes))
    for size in sizes:  # ICO entries holding PNG data (supported by all current browsers)
        ico += struct.pack('<BBBBHHII', size, size, 0, 0, 1, 32, len(pngs[size]), offset)
        offset += len(pngs[size])
    with open(os.path.join(ROOT, 'public', 'favicon.ico'), 'wb') as f:
        f.write(ico + b''.join(pngs[s] for s in sizes))
    print('public/favicon.ico (16, 32, 48) and public/apple-touch-icon.png (180) written')


if __name__ == '__main__':
    main()
