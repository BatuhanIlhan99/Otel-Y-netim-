// Precompiles .jsx sources into bundle.js
// Run: node build.js
const fs = require("fs");
const path = require("path");

let babel;
try {
  babel = require("@babel/core");
} catch {
  console.error("@babel/core not installed. Run: npm i -D @babel/core @babel/preset-react");
  process.exit(1);
}

const ORDER = ["data.jsx", "login.jsx", "dashboard.jsx", "stock.jsx", "screens.jsx", "app.jsx"];

const parts = ORDER.map((f) => {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) {
    console.error(`Missing source: ${f}`);
    process.exit(1);
  }
  return `// === ${f} ===\n` + fs.readFileSync(p, "utf8");
});

const RENDER = `
// === Render ===
const styleEl = document.getElementById("__runtime-styles");
if (styleEl) {
  styleEl.textContent = [
    window.LOGIN_STYLES, window.DASHBOARD_STYLES, window.STOCK_STYLES,
    window.SCREEN_STYLES, window.SHELL_STYLES,
  ].filter(Boolean).join("\\n");
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
`;

const src = parts.join("\n\n") + "\n" + RENDER;

const result = babel.transformSync(src, {
  presets: [["@babel/preset-react", { runtime: "classic" }]],
  filename: "bundle.jsx",
  compact: true,
  comments: false,
});

const out = path.join(__dirname, "bundle.js");
fs.writeFileSync(out, result.code, "utf8");
console.log(`bundle.js written: ${(fs.statSync(out).size / 1024).toFixed(1)} KB`);
