#!/usr/bin/env python3
"""Static preview server with HTTP Range support.

python's stock http.server has no Range support, so browsers treat every
video as unseekable (Chromium reports an empty seekable range and clamps
seeks to 0). GitHub Pages does support ranges, so without this the local
preview behaves differently from the live site for anything that seeks —
the theme swap on the clip tiles, for one.
"""
import os, re, sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class RangeHandler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path) or not os.path.exists(path):
            return super().send_head()
        rng = self.headers.get("Range")
        size = os.path.getsize(path)
        ctype = self.guess_type(path)
        m = re.match(r"bytes=(\d*)-(\d*)$", rng or "")
        if not m:
            self.send_response(200)
            self.send_header("Content-Type", ctype)
            self.send_header("Content-Length", str(size))
            self.send_header("Accept-Ranges", "bytes")
            self.end_headers()
            return open(path, "rb")
        a, b = m.groups()
        start = int(a) if a else max(size - int(b), 0)
        end = int(b) if (a and b) else size - 1
        end = min(end, size - 1)
        if start > end or start >= size:
            self.send_response(416)
            self.send_header("Content-Range", f"bytes */{size}")
            self.end_headers()
            return None
        self.send_response(206)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(end - start + 1))
        self.send_header("Accept-Ranges", "bytes")
        self.end_headers()
        f = open(path, "rb"); f.seek(start)
        return _Slice(f, end - start + 1)

    def log_message(self, *a): pass

class _Slice:
    def __init__(self, f, n): self.f, self.n = f, n
    def read(self, k=-1):
        if self.n <= 0: return b""
        k = self.n if k < 0 else min(k, self.n)
        d = self.f.read(k); self.n -= len(d); return d
    def close(self): self.f.close()

if __name__ == "__main__":
    port = int(sys.argv[1]); root = sys.argv[2]
    os.chdir(root)
    ThreadingHTTPServer(("127.0.0.1", port), RangeHandler).serve_forever()
