const http = require("http");
const fs = require("fs");
const path = require("path");
const Busboy = require("busboy");
const { randomUUID } = require("crypto");

const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/upload") {
    const busboy = Busboy({ headers: req.headers });
    let fileUrl = "";

    busboy.on("file", (fieldname, file, fileInfo) => {
      const filename = typeof fileInfo === "string" ? fileInfo : fileInfo.filename;
      if (!filename) {
        console.error("Filename is missing!");
        return;
      }

      const ext = path.extname(filename);
      const newFilename = `${randomUUID()}${ext}`;
      const saveTo = path.join(UPLOAD_DIR, newFilename);
      file.pipe(fs.createWriteStream(saveTo));
      fileUrl = `/uploads/${newFilename}`;
    });

    busboy.on("error", (err) => {
      console.error("Busboy error:", err);
      res.writeHead(500);
      res.end("Upload error");
    });

    busboy.on("finish", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ url: fileUrl }));
    });

    req.pipe(busboy);
  } 
  else if (req.method === "DELETE" && req.url.startsWith("/upload/")) {
    const filename = decodeURIComponent(req.url.replace("/upload/", ""));
    const filePath = path.join(UPLOAD_DIR, filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.writeHead(404);
        res.end("Файл не найден");
        return;
      }

      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Ошибка при удалении:", unlinkErr);
          res.writeHead(500);
          res.end("Ошибка при удаления");
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Файл успешно удалён" }));
      });
    });
  }
  else if (req.method === "GET" && req.url.startsWith("/uploads/")) {
    const filePath = path.join(__dirname, req.url);
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end("Файл не найден");
      return;
    }

    const ext = path.extname(filePath).slice(1).toLowerCase();
    const mimeTypes = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
    };

    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
    });
    fs.createReadStream(filePath).pipe(res);
  } 
  else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3001, () => {
  console.log("📸 Сервер загрузки картинок работает на http://localhost:3001");
});
