// Minimal static server for the built registry: `node scripts/serve-registry.mjs <dir> <port>`.
// Serves <dir>/r/<name>.json at http://localhost:<port>/r/<name>.json (no dependencies).
import fs from "node:fs"
import http from "node:http"
import path from "node:path"

const root = path.resolve(process.argv[2] ?? "public")
const port = Number(process.argv[3] ?? 4000)

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname)
  const file = path.join(root, pathname)
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { "content-type": "text/plain" })
    res.end("not found")
    return
  }
  res.writeHead(200, {
    "content-type": file.endsWith(".json") ? "application/json" : "application/octet-stream",
    "access-control-allow-origin": "*",
  })
  fs.createReadStream(file).pipe(res)
})

server.listen(port, () => console.log(`registry: serving ${root} on http://localhost:${port}`))
