#!/usr/bin/env node
// Assemble index.html (deployable artifact) from the sources in src/.
// Run: node build.js   (or: npm run build)
const fs = require("fs");
const path = require("path");
const r = (f) => fs.readFileSync(path.join(__dirname, f), "utf8");

// 1. Inject fonts + styles into the template (replace markers, keep <style> tags)
let template = r("src/template.html")
  .replace("/*__FONTS__*/", () => r("src/fonts.css"))
  .replace("/*__STYLES__*/", () => r("src/styles.css"));

// 2. Inject the template + app logic into the document shell
const out = r("src/index.shell.html")
  .replace("<!--__TEMPLATE__-->", () => template)
  .replace("/*__APP__*/", () => r("src/app.js"));

fs.writeFileSync(path.join(__dirname, "index.html"), out);
console.log("Built index.html (" + out.length + " bytes) from src/.");
