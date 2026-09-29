// Local runner (no Vercel needed): `node server.js` then open http://localhost:3000
// Requires Node 18+.
const http = require("http");
const fs = require("fs");
const path = require("path");
const push = require("./api/push");

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    if (req.url.startsWith("/api/push")) {
      let data = "";
      req.on("data", (c) => (data += c));
      req.on("end", () => {
        req.body = data;
        res.status = (code) => { res.statusCode = code; return res; };
        res.json = (obj) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(obj));
        };
        push(req, res);
      });
      return;
    }
    const file = path.join(__dirname, "index.html");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`Bio push utility on http://localhost:${PORT}`));
