import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CANONICAL = "https://www.thenoblemarketing.com/";

const homeSrc = fs.readFileSync(path.join(ROOT, "home/index.html"), "utf8");

const rootHtml = homeSrc
  .replace(/href="\/home\/"/g, 'href="/"')
  .replace(
    "<title>Noble Marketing &amp; Design</title>",
    `<title>Noble Marketing &amp; Design</title>\n  <link rel="canonical" href="${CANONICAL}" />`
  );

fs.writeFileSync(path.join(ROOT, "index.html"), rootHtml);

const homeRedirect = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/Logos/noble-icon.png" type="image/png" sizes="any" />
  <link rel="apple-touch-icon" href="/Logos/noble-icon.png" />
  <title>Noble Marketing &amp; Design</title>
  <link rel="canonical" href="${CANONICAL}" />
  <meta http-equiv="refresh" content="0; url=/" />
  <script>location.replace("/");</script>
</head>
<body>
  <p><a href="/">Continue to Noble Marketing &amp; Design</a></p>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, "home/index.html"), homeRedirect);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

let updated = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  if (rel === "index.html" || rel === "home/index.html") continue;
  const before = fs.readFileSync(file, "utf8");
  if (!before.includes("/home/")) continue;
  const after = before.replaceAll("/home/", "/");
  if (after !== before) {
    fs.writeFileSync(file, after);
    updated++;
  }
}

console.log("root index.html written");
console.log("home/index.html redirect written");
console.log("updated", updated, "html files");
