"""Local static mock preview. Run: python3 docs/mock/serve.py [port]. No directory listing."""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, unquote
import mimetypes
import sys
ROOT = Path(__file__).resolve().parent
ALLOWED = {p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and p.suffix in {'.html', '.css', '.js', '.png', '.webp'}}
class Preview(BaseHTTPRequestHandler):
    def do_GET(self):
        route = unquote(urlsplit(self.path).path).lstrip('/') or 'index.html'
        if route not in ALLOWED:
            self.send_error(404)
            return
        data = (ROOT / route).read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', mimetypes.guess_type(route)[0] or 'application/octet-stream')
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Content-Security-Policy', "default-src 'none'; img-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; base-uri 'none'; form-action 'none'")
        self.end_headers()
        self.wfile.write(data)
    def log_message(self, *_):
        pass
server = ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1]) if len(sys.argv) > 1 else 0), Preview)
print(f'Static mock: http://127.0.0.1:{server.server_port}/', flush=True)
server.serve_forever()
