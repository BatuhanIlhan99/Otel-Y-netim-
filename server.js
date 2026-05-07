const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const ROOT = __dirname;
const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(ROOT, "data"));
const DATA_FILE = path.join(DATA_DIR, "app-data.json");
const MAIL_LOG_FILE = path.join(DATA_DIR, "mail-log.json");
const MAIL_STATE_FILE = path.join(DATA_DIR, "mail-state.json");
const BACKUP_DIR = path.join(DATA_DIR, "backups");
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const MAX_BODY_BYTES = 1_000_000;
const MAIL_LOG_LIMIT = 500;
const DEFAULT_ALLOWED_ORIGINS = ["https://batuhanilhan99.github.io"];

loadEnvFile(path.join(ROOT, ".env"));

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || (process.env.RENDER || process.env.RAILWAY_ENVIRONMENT ? "0.0.0.0" : "127.0.0.1");
const ALLOWED_ORIGINS = parseListEnv("ALLOWED_ORIGINS", DEFAULT_ALLOWED_ORIGINS);
const sessions = new Map();

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index < 0) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function parseListEnv(name, fallback = []) {
  const raw = process.env[name];
  const values = String(raw || "")
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
  return values.length > 0 ? values : fallback;
}

function originAllowed(origin) {
  if (!origin) return true;
  return ALLOWED_ORIGINS.includes("*") || ALLOWED_ORIGINS.includes(origin);
}

function corsHeaders(res) {
  const origin = res._otelRequestOrigin || "";
  const headers = {
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS",
    "Vary": "Origin",
  };
  if (!origin) {
    headers["Access-Control-Allow-Origin"] = "*";
  } else if (originAllowed(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function securityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "same-origin",
  };
}

function readJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return clone(fallback);
    const raw = fs.readFileSync(filePath, "utf8");
    return raw.trim() ? JSON.parse(raw) : clone(fallback);
  } catch (error) {
    console.error(`JSON okunamadi: ${filePath}`, error);
    return clone(fallback);
  }
}

function writeJsonAtomic(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmpPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  fs.renameSync(tmpPath, filePath);
}

function storageHealth() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const probePath = path.join(DATA_DIR, `.health-${process.pid}-${Date.now()}.tmp`);
    fs.writeFileSync(probePath, "ok", "utf8");
    fs.unlinkSync(probePath);
    return {
      ok: true,
      dataDir: process.env.DATA_DIR ? "configured" : "default",
      persistent: Boolean(process.env.DATA_DIR),
    };
  } catch (error) {
    return {
      ok: false,
      dataDir: process.env.DATA_DIR ? "configured" : "default",
      persistent: Boolean(process.env.DATA_DIR),
      message: error.message,
    };
  }
}

function backupDataFile() {
  if (!fs.existsSync(DATA_FILE)) return;
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const target = path.join(BACKUP_DIR, `app-data-${stamp}.json`);
  fs.copyFileSync(DATA_FILE, target);
}

function defaultMailSettings() {
  return {
    reminder: {
      recipients: "temizlik@otel.com, mutfak@otel.com, bufe@otel.com, smile@otel.com, resepsiyon@otel.com",
      sendTime: "18:00",
      subject: "Stok sayım hatırlatma",
      message: "Lütfen gün sonu stok sayımınızı sisteme giriniz.",
    },
    report: {
      recipients: "yonetim@otel.com, muhasebe@otel.com",
      sendTime: "23:00",
      subject: "Sipariş verilmesi gereken stok raporu",
    },
  };
}

function defaultDepartments() {
  return [
    { id: "temizlik", name: "Temizlik" },
    { id: "gulplaj-restorant", name: "Gülplaj Restorant" },
    { id: "gulplaj-bufe", name: "Gülplaj Büfe" },
    { id: "smile-food-house", name: "Smile Food House" },
    { id: "resepsiyon", name: "Resepsiyon" },
  ];
}

function defaultUsers() {
  return [
    { username: "admin", password: "admin123", name: "Yönetici", role: "admin", departmentId: "all" },
    { username: "temizlik", password: "Temizlik2026", name: "Temizlik Kullanıcısı", role: "staff", departmentId: "temizlik" },
    { username: "mutfak", password: "Mutfak2026", name: "Mutfak Kullanıcısı", role: "staff", departmentId: "gulplaj-restorant" },
    { username: "bufe", password: "Bufe2026", name: "Büfe Kullanıcısı", role: "staff", departmentId: "gulplaj-bufe" },
    { username: "smile", password: "1234", name: "Smile Food House", role: "staff", departmentId: "smile-food-house" },
    { username: "resepsiyon", password: "Resepsiyon2026", name: "Resepsiyon Kullanıcısı", role: "staff", departmentId: "resepsiyon" },
  ];
}

function readFrontendProductArray(constName) {
  const appPath = path.join(ROOT, "app.js");
  if (!fs.existsSync(appPath)) return [];

  const source = fs.readFileSync(appPath, "utf8");
  const start = source.indexOf(`const ${constName} = [`);
  if (start < 0) return [];

  const end = source.indexOf("];", start);
  if (end < 0) return [];

  const block = source.slice(start, end);
  const pattern = /\["((?:[^"\\]|\\.)+)",\s*"([^"]+)",\s*"([^"]+)",\s*(\d+),\s*(\d+)\]/g;
  const products = [];
  let match = pattern.exec(block);

  while (match) {
    products.push({
      name: match[1].replace(/\\"/g, "\""),
      departmentId: match[2],
      unit: match[3],
      lastQty: Number(match[4]),
      minQty: Number(match[5]),
    });
    match = pattern.exec(block);
  }

  return products;
}

function defaultProducts() {
  const products = [];
  const keys = new Set();
  const catalogs = [
    { prefix: "p", items: readFrontendProductArray("seedProducts") },
    { prefix: "temizlik", items: readFrontendProductArray("professionalCleaningCatalog") },
    { prefix: "mutfak", items: readFrontendProductArray("professionalKitchenCatalog") },
    { prefix: "resepsiyon", items: readFrontendProductArray("professionalReceptionCatalog") },
    { prefix: "bufe", items: readFrontendProductArray("professionalBufeCatalog") },
    { prefix: "smile", items: readFrontendProductArray("professionalSmileFoodHouseCatalog") },
  ];

  for (const catalog of catalogs) {
    catalog.items.forEach((item, index) => {
      const key = `${item.departmentId}::${item.name.trim().toLocaleLowerCase("tr-TR")}`;
      if (keys.has(key)) return;

      products.push({
        id: `${catalog.prefix}-${index + 1}`,
        name: item.name,
        departmentId: item.departmentId,
        unit: item.unit,
        lastQty: item.lastQty,
        minQty: item.minQty,
        active: true,
      });
      keys.add(key);
    });
  }

  return products;
}

function defaultDb() {
  return {
    departments: defaultDepartments(),
    users: defaultUsers(),
    products: defaultProducts(),
    counts: {},
    mailSettings: defaultMailSettings(),
  };
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(String(password), salt, 120000, 32, "sha256").toString("hex");
  return `pbkdf2_sha256$120000$${salt}$${hash}`;
}

function verifyPassword(user, password) {
  if (user.passwordHash) {
    const [scheme, iterationsRaw, salt, storedHash] = String(user.passwordHash).split("$");
    if (scheme !== "pbkdf2_sha256" || !iterationsRaw || !salt || !storedHash) return false;
    const iterations = Number(iterationsRaw);
    const candidate = crypto.pbkdf2Sync(String(password), salt, iterations, 32, "sha256").toString("hex");
    if (storedHash.length !== candidate.length) return false;
    return crypto.timingSafeEqual(Buffer.from(storedHash, "hex"), Buffer.from(candidate, "hex"));
  }
  return user.password === password;
}

function normalizeMailSettings(settings = {}) {
  const defaults = defaultMailSettings();
  return {
    reminder: { ...defaults.reminder, ...(settings.reminder || {}) },
    report: { ...defaults.report, ...(settings.report || {}) },
  };
}

function normalizeDb(db) {
  const normalized = { ...defaultDb(), ...db };
  normalized.departments = Array.isArray(normalized.departments) ? normalized.departments : [];
  normalized.users = Array.isArray(normalized.users) ? normalized.users : [];
  normalized.products = Array.isArray(normalized.products) ? normalized.products : [];
  normalized.counts = normalized.counts && typeof normalized.counts === "object" ? normalized.counts : {};
  normalized.mailSettings = normalizeMailSettings(normalized.mailSettings);

  let migrated = false;
  normalized.users = normalized.users.map((user) => {
    if (user.password && !user.passwordHash) {
      migrated = true;
      const { password, ...rest } = user;
      return { ...rest, passwordHash: hashPassword(password) };
    }
    return user;
  });

  return { db: normalized, migrated };
}

function loadDb() {
  const { db, migrated } = normalizeDb(readJson(DATA_FILE, defaultDb()));
  if (migrated) saveDb(db, { skipBackup: true });
  return db;
}

function saveDb(db, options = {}) {
  if (!options.skipBackup) backupDataFile();
  writeJsonAtomic(DATA_FILE, db);
}

function dateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Europe/Istanbul",
  }).formatToParts(date);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${lookup.year}-${lookup.month}-${lookup.day}`;
}

function todayKey() {
  return dateKey();
}

function timeKey() {
  return new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Istanbul",
  }).format(new Date());
}

function publicUser(user) {
  return {
    username: user.username,
    name: user.name,
    role: user.role,
    departmentId: user.departmentId,
  };
}

function publicDb(db, user) {
  const allowedProductIds = new Set(
    db.products
      .filter((product) => user.role === "admin" || product.departmentId === user.departmentId)
      .map((product) => product.id)
  );
  const counts = {};

  for (const [date, dateCounts] of Object.entries(db.counts || {})) {
    counts[date] = {};
    for (const [productId, count] of Object.entries(dateCounts || {})) {
      if (allowedProductIds.has(productId)) counts[date][productId] = count;
    }
  }

  return {
    user: publicUser(user),
    departments: user.role === "admin"
      ? db.departments
      : db.departments.filter((department) => department.id === user.departmentId),
    users: user.role === "admin" ? db.users.map(publicUser) : [publicUser(user)],
    products: db.products.filter((product) => allowedProductIds.has(product.id)),
    counts,
    mailSettings: user.role === "admin" ? db.mailSettings : normalizeMailSettings(db.mailSettings),
  };
}

function departmentName(db, id) {
  if (id === "all") return "Tüm Departmanlar";
  return db.departments.find((department) => department.id === id)?.name || id;
}

function getCount(db, date, productId) {
  return db.counts?.[date]?.[productId] || null;
}

function allowedProductsForUser(db, user, includeInactive = false) {
  return db.products.filter((product) => {
    const departmentAllowed = user.role === "admin" || product.departmentId === user.departmentId;
    const activeAllowed = includeInactive || product.active !== false;
    return departmentAllowed && activeAllowed;
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseRecipients(value) {
  return String(value || "")
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function validateRecipients(recipients) {
  const recipientList = Array.isArray(recipients) ? recipients : parseRecipients(recipients);
  const invalid = recipientList.filter((recipient) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient));
  if (recipientList.length === 0) {
    return { ok: false, recipients: recipientList, message: "En az bir geçerli alıcı mail adresi gerekli." };
  }
  if (invalid.length > 0) {
    return { ok: false, recipients: recipientList, message: `Geçersiz alıcı adresi: ${invalid.join(", ")}` };
  }
  return { ok: true, recipients: recipientList };
}

function buildDailyReport(db, date, departmentId = "all") {
  const activeProducts = (db.products || [])
    .filter((product) => product.active !== false)
    .filter((product) => departmentId === "all" || product.departmentId === departmentId);

  const productStates = activeProducts.map((product) => {
    const count = getCount(db, date, product.id);
    const qty = count ? Number(count.qty) : Number(product.lastQty);
    const minQty = Number(product.minQty);
    const request = count?.orderRequest;
    return {
      productId: product.id,
      productName: product.name,
      departmentId: product.departmentId,
      departmentName: departmentName(db, product.departmentId),
      unit: product.unit,
      qty,
      minQty,
      counted: Boolean(count),
      note: count?.note || "",
      user: count?.user || "",
      time: count?.time || "",
      orderRequest: request?.requested
        ? {
            requested: true,
            requestedQty: Number(request.qty || 0),
            reason: request.reason || "",
          }
        : { requested: false, requestedQty: 0, reason: "" },
    };
  });

  const orderItems = productStates
    .filter((item) => item.qty <= item.minQty || item.orderRequest.requested)
    .map((item) => ({
      productId: item.productId,
      productName: item.productName,
      departmentId: item.departmentId,
      departmentName: item.departmentName,
      unit: item.unit,
      qty: item.qty,
      minQty: item.minQty,
      counted: item.counted,
      note: item.note,
      user: item.user,
      time: item.time,
      requestedQty: item.orderRequest.requestedQty,
      reason: item.orderRequest.reason,
      manualRequest: item.orderRequest.requested,
    }));

  const manualOrderRequests = productStates
    .filter((item) => item.orderRequest.requested)
    .map((item) => ({
      productId: item.productId,
      productName: item.productName,
      departmentId: item.departmentId,
      departmentName: item.departmentName,
      unit: item.unit,
      qty: item.qty,
      minQty: item.minQty,
      requestedQty: item.orderRequest.requestedQty,
      reason: item.orderRequest.reason,
    }));

  const departmentSummaries = (db.departments || [])
    .filter((department) => departmentId === "all" || department.id === departmentId)
    .map((department) => {
      const products = productStates.filter((item) => item.departmentId === department.id);
      const counted = products.filter((item) => item.counted).length;
      const critical = products.filter((item) => item.qty <= item.minQty).length;
      const manual = products.filter((item) => item.orderRequest.requested).length;
      const orderNeeded = products.filter((item) => item.qty <= item.minQty || item.orderRequest.requested).length;
      const completion = products.length ? Math.round((counted / products.length) * 100) : 0;
      return {
        departmentId: department.id,
        departmentName: departmentName(db, department.id),
        products: products.length,
        counted,
        missing: Math.max(products.length - counted, 0),
        critical,
        manualRequests: manual,
        orderNeeded,
        completion,
        complete: products.length > 0 && counted === products.length,
      };
    });

  const notCountedItems = productStates
    .filter((item) => !item.counted)
    .map(({ orderRequest, ...item }) => item);

  return {
    date,
    departmentId,
    generatedAt: new Date().toISOString(),
    totals: {
      activeProducts: productStates.length,
      countedProducts: productStates.filter((item) => item.counted).length,
      missingCounts: notCountedItems.length,
      criticalItems: productStates.filter((item) => item.qty <= item.minQty).length,
      orderNeededItems: orderItems.length,
      manualRequests: manualOrderRequests.length,
      incompleteDepartments: departmentSummaries.filter((item) => !item.complete).length,
    },
    departmentSummaries,
    orderItems,
    manualOrderRequests,
    notCountedItems,
  };
}

function orderItems(db, date, departmentId = "all") {
  return buildDailyReport(db, date, departmentId).orderItems;
}

function manualOrderRequests(db, date, departmentId = "all") {
  return buildDailyReport(db, date, departmentId).manualOrderRequests;
}

function actionReportRows(report, type) {
  const items = type === "critical"
    ? report.orderItems.filter((item) => item.qty <= item.minQty)
    : report.manualOrderRequests;
  return items.map((item) => {
    const shortage = Math.max(Number(item.minQty) - Number(item.qty), 0);
    const requestedQty = item.requestedQty ? `${item.requestedQty} ${item.unit}` : "";
    return {
      departmentName: item.departmentName,
      productName: item.productName,
      current: `${item.qty} ${item.unit}`,
      minimum: `${item.minQty} ${item.unit}`,
      actionQty: type === "critical"
        ? (shortage > 0 ? `${shortage} ${item.unit}` : "Satın alma onayı")
        : (requestedQty || "Miktar belirtilmedi"),
      reason: type === "critical"
        ? (item.note || "Minimum stok seviyesinin altında")
        : (item.reason || "Manuel satın alma talebi"),
    };
  });
}

function appendActionReportTextSection(lines, title, rows, emptyText) {
  lines.push("");
  lines.push(title);
  lines.push("-".repeat(title.length));
  if (rows.length === 0) {
    lines.push(emptyText);
    return;
  }
  rows.forEach((row, index) => {
    lines.push(`${index + 1}. ${row.departmentName} / ${row.productName}`);
    lines.push(`   Mevcut: ${row.current} | Minimum: ${row.minimum} | Aksiyon: ${row.actionQty}`);
    lines.push(`   Açıklama: ${row.reason}`);
  });
}

function buildOrderActionReportMail(db, date, departmentId = "all") {
  const settings = normalizeMailSettings(db.mailSettings).report;
  const report = buildDailyReport(db, date, departmentId);
  const criticalRows = actionReportRows(report, "critical");
  const manualRows = actionReportRows(report, "manual");
  const affectedDepartments = new Set([...criticalRows, ...manualRows].map((item) => item.departmentName)).size;
  const lines = [
    "OTEL YÖNETİM STOK VE SATIN ALMA AKSİYON RAPORU",
    `Tarih: ${date}`,
    `Kapsam: ${departmentName(db, departmentId)}`,
    `Alıcılar: ${settings.recipients}`,
    "",
    "Yönetici Özeti",
    "--------------",
    `Kritik stok kalemi: ${criticalRows.length}`,
    `Manuel sipariş talebi: ${manualRows.length}`,
    `Toplam satın alma aksiyonu: ${report.totals.orderNeededItems}`,
    `Etkilenen departman: ${affectedDepartments}`,
  ];

  appendActionReportTextSection(lines, "1. KRİTİK STOK SEVİYESİNE DÜŞEN ÜRÜNLER", criticalRows, "Kritik stok seviyesine düşen ürün yok.");
  appendActionReportTextSection(lines, "2. STOK YETERLİ OLSA DA TALEP EDİLEN ÜRÜNLER", manualRows, "Manuel sipariş talebi yok.");
  lines.push("");
  lines.push("Not: Rapor yalnızca satın alma aksiyonu gerektiren kalemleri içerir. Normal stok kalemleri sistemde saklanır, bu rapora dahil edilmez.");
  return lines.join("\n");
}

function actionReportHtmlTable(title, rows, emptyText) {
  const body = rows.length
    ? rows.map((item) => `
      <tr>
        <td>${escapeHtml(item.departmentName)}</td>
        <td><strong>${escapeHtml(item.productName)}</strong></td>
        <td>${escapeHtml(item.current)}</td>
        <td>${escapeHtml(item.minimum)}</td>
        <td>${escapeHtml(item.actionQty)}</td>
        <td>${escapeHtml(item.reason)}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="6">${escapeHtml(emptyText)}</td></tr>`;
  return `
    <h3 style="margin:22px 0 8px;color:#0f6758">${escapeHtml(title)}</h3>
    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-bottom:18px">
      <tr style="background:#eef4f2"><th align="left">Departman</th><th align="left">Ürün</th><th align="left">Mevcut</th><th align="left">Minimum</th><th align="left">Aksiyon</th><th align="left">Açıklama</th></tr>
      ${body}
    </table>
  `;
}

function buildOrderActionReportHtml(db, date, departmentId = "all") {
  const report = buildDailyReport(db, date, departmentId);
  const criticalRows = actionReportRows(report, "critical");
  const manualRows = actionReportRows(report, "manual");
  const affectedDepartments = new Set([...criticalRows, ...manualRows].map((item) => item.departmentName)).size;
  return `
    <div style="font-family:Arial,sans-serif;color:#16211f;line-height:1.5">
      <h2 style="margin:0 0 8px;color:#0f6758">Otel Yönetim Stok ve Satın Alma Aksiyon Raporu</h2>
      <p style="margin:0 0 18px;color:#60716d">Tarih: ${escapeHtml(date)} | Kapsam: ${escapeHtml(departmentName(db, departmentId))}</p>
      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-bottom:18px">
        <tr style="background:#eef4f2"><th align="left">Kritik stok</th><th align="left">Manuel talep</th><th align="left">Toplam aksiyon</th><th align="left">Etkilenen departman</th></tr>
        <tr><td>${criticalRows.length}</td><td>${manualRows.length}</td><td>${report.totals.orderNeededItems}</td><td>${affectedDepartments}</td></tr>
      </table>
      ${actionReportHtmlTable("Kritik stok seviyesine düşen ürünler", criticalRows, "Kritik stok seviyesine düşen ürün yok.")}
      ${actionReportHtmlTable("Stok yeterli olsa da talep edilen ürünler", manualRows, "Manuel sipariş talebi yok.")}
      <p style="color:#60716d;font-size:12px">Normal stok kalemleri sistemde saklanır; satın alma aksiyonu gerektirmediği için bu rapora dahil edilmez.</p>
    </div>
  `;
}

function buildOrderReportMail(db, date, departmentId = "all") {
  return buildOrderActionReportMail(db, date, departmentId);
  const settings = normalizeMailSettings(db.mailSettings).report;
  const report = buildDailyReport(db, date, departmentId);
  const lines = [
    settings.subject,
    `Tarih: ${date}`,
    `Oluşturma zamanı: ${new Date(report.generatedAt).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}`,
    `Alıcılar: ${settings.recipients}`,
    `Gönderim saati: ${settings.sendTime}`,
    "",
    "Özet:",
    `- Aktif ürün: ${report.totals.activeProducts}`,
    `- Sayılan ürün: ${report.totals.countedProducts}`,
    `- Sayımı eksik ürün: ${report.totals.missingCounts}`,
    `- Kritik stok: ${report.totals.criticalItems}`,
    `- Manuel sipariş talebi: ${report.totals.manualRequests}`,
    `- Sipariş verilecek toplam ürün: ${report.totals.orderNeededItems}`,
    "",
    "Departman durumu:",
  ];

  for (const item of report.departmentSummaries) {
    lines.push(`- ${item.departmentName}: ${item.counted}/${item.products} sayıldı | %${item.completion} | Sipariş: ${item.orderNeeded} | Kritik: ${item.critical} | Manuel talep: ${item.manualRequests}`);
  }

  lines.push("");
  lines.push("Sipariş verilmesi gereken ürünler:");
  lines.push("");

  if (report.orderItems.length === 0) {
    lines.push("Bugün sipariş verilmesi gereken ürün bulunmuyor.");
    lines.push("");
  } else {
    const grouped = new Map();
    for (const item of report.orderItems) {
      if (!grouped.has(item.departmentName)) grouped.set(item.departmentName, []);
      grouped.get(item.departmentName).push(item);
    }

    for (const [groupName, groupItems] of grouped.entries()) {
      lines.push(groupName);
      for (const item of groupItems) {
        const note = item.note ? ` | Not: ${item.note}` : "";
        const requestedQty = item.requestedQty ? ` | Talep miktarı: ${item.requestedQty} ${item.unit}` : "";
        const reason = item.reason ? ` | Gerekçe: ${item.reason}` : "";
        const reasonLabel = item.qty <= item.minQty ? "Minimum altı" : "Manuel sipariş talebi";
        lines.push(`- ${item.productName}: ${item.qty} ${item.unit} | Minimum: ${item.minQty} | ${reasonLabel}${requestedQty}${reason}${note}`);
      }
      lines.push("");
    }
  }

  lines.push("Manuel sipariş talepleri:");
  lines.push("");

  if (report.manualOrderRequests.length === 0) {
    lines.push("Yeterli stokta olup ayrıca sipariş talep edilen ürün yok.");
  } else {
    for (const item of report.manualOrderRequests) {
      const requestedQty = item.requestedQty ? ` | Talep miktarı: ${item.requestedQty} ${item.unit}` : "";
      const reason = item.reason ? ` | Gerekçe: ${item.reason}` : "";
      lines.push(`- ${item.departmentName} / ${item.productName}: mevcut ${item.qty} ${item.unit}${requestedQty}${reason}`);
    }
  }

  if (report.notCountedItems.length > 0) {
    lines.push("");
    lines.push("Sayımı henüz girilmemiş ilk 25 ürün:");
    report.notCountedItems.slice(0, 25).forEach((item) => {
      lines.push(`- ${item.departmentName} / ${item.productName}`);
    });
  }

  return lines.join("\n");
}

function buildOrderReportHtml(db, date, departmentId = "all") {
  return buildOrderActionReportHtml(db, date, departmentId);
  const settings = normalizeMailSettings(db.mailSettings).report;
  const report = buildDailyReport(db, date, departmentId);
  const rows = (items, emptyText) => {
    if (items.length === 0) return `<tr><td colspan="6">${escapeHtml(emptyText)}</td></tr>`;
    return items.map((item) => `
      <tr>
        <td>${escapeHtml(item.departmentName)}</td>
        <td><strong>${escapeHtml(item.productName)}</strong></td>
        <td>${escapeHtml(item.qty)} ${escapeHtml(item.unit)}</td>
        <td>${escapeHtml(item.minQty)}</td>
        <td>${escapeHtml(item.requestedQty || "")}</td>
        <td>${escapeHtml(item.reason || item.note || "")}</td>
      </tr>
    `).join("");
  };

  const departmentRows = report.departmentSummaries.map((item) => `
    <tr>
      <td>${escapeHtml(item.departmentName)}</td>
      <td>${item.counted}/${item.products}</td>
      <td>%${item.completion}</td>
      <td>${item.orderNeeded}</td>
      <td>${item.critical}</td>
      <td>${item.manualRequests}</td>
      <td>${item.complete ? "Tamamlandı" : "Eksik"}</td>
    </tr>
  `).join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#16211f;line-height:1.5">
      <h2 style="margin:0 0 8px">${escapeHtml(settings.subject)}</h2>
      <p style="margin:0 0 18px;color:#60716d">Tarih: ${escapeHtml(date)} | Oluşturma: ${escapeHtml(new Date(report.generatedAt).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" }))}</p>
      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-bottom:18px">
        <tr style="background:#eef4f2">
          <th align="left">Aktif ürün</th><th align="left">Sayılan</th><th align="left">Eksik</th><th align="left">Sipariş</th><th align="left">Kritik</th><th align="left">Manuel talep</th>
        </tr>
        <tr>
          <td>${report.totals.activeProducts}</td><td>${report.totals.countedProducts}</td><td>${report.totals.missingCounts}</td><td>${report.totals.orderNeededItems}</td><td>${report.totals.criticalItems}</td><td>${report.totals.manualRequests}</td>
        </tr>
      </table>
      <h3>Departman durumu</h3>
      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-bottom:18px">
        <tr style="background:#eef4f2"><th align="left">Departman</th><th align="left">Sayım</th><th align="left">Tamamlanma</th><th align="left">Sipariş</th><th align="left">Kritik</th><th align="left">Manuel</th><th align="left">Durum</th></tr>
        ${departmentRows}
      </table>
      <h3>Sipariş verilmesi gereken ürünler</h3>
      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-bottom:18px">
        <tr style="background:#f9e8e8"><th align="left">Departman</th><th align="left">Ürün</th><th align="left">Mevcut</th><th align="left">Minimum</th><th align="left">Talep</th><th align="left">Not</th></tr>
        ${rows(report.orderItems, "Bugün sipariş verilmesi gereken ürün bulunmuyor.")}
      </table>
      <h3>Manuel sipariş talepleri</h3>
      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
        <tr style="background:#eef4f2"><th align="left">Departman</th><th align="left">Ürün</th><th align="left">Mevcut</th><th align="left">Minimum</th><th align="left">Talep</th><th align="left">Gerekçe</th></tr>
        ${rows(report.manualOrderRequests, "Yeterli stokta olup ayrıca sipariş talep edilen ürün yok.")}
      </table>
    </div>
  `;
}

function buildReminderMail(db) {
  const settings = normalizeMailSettings(db.mailSettings).reminder;
  const report = buildDailyReport(db, todayKey(), "all");
  const lines = [
    settings.subject,
    `Tarih: ${todayKey()}`,
    `Alıcılar: ${settings.recipients}`,
    `Gönderim saati: ${settings.sendTime}`,
    "",
    settings.message,
    "",
    "Bugünkü departman sayım durumu:",
  ];

  for (const item of report.departmentSummaries) {
    lines.push(`- ${item.departmentName}: ${item.counted}/${item.products} sayıldı | Kalan: ${item.missing}`);
  }

  return lines.join("\n");
}

function buildReminderHtml(db) {
  const settings = normalizeMailSettings(db.mailSettings).reminder;
  const report = buildDailyReport(db, todayKey(), "all");
  const rows = report.departmentSummaries.map((item) => `
    <tr>
      <td>${escapeHtml(item.departmentName)}</td>
      <td>${item.counted}/${item.products}</td>
      <td>${item.missing}</td>
      <td>%${item.completion}</td>
    </tr>
  `).join("");
  return `
    <div style="font-family:Arial,sans-serif;color:#16211f;line-height:1.5">
      <h2 style="margin:0 0 8px">${escapeHtml(settings.subject)}</h2>
      <p>${escapeHtml(settings.message)}</p>
      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
        <tr style="background:#eef4f2"><th align="left">Departman</th><th align="left">Sayım</th><th align="left">Kalan</th><th align="left">Tamamlanma</th></tr>
        ${rows}
      </table>
    </div>
  `;
}

function appendMailLog(entry) {
  const log = readJson(MAIL_LOG_FILE, []);
  const record = {
    id: `mail-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
    createdAt: new Date().toISOString(),
    ...entry,
  };
  log.push(record);
  writeJsonAtomic(MAIL_LOG_FILE, log.slice(-MAIL_LOG_LIMIT));
  return record;
}

function readMailState() {
  const state = readJson(MAIL_STATE_FILE, { deliveries: {} });
  state.deliveries ||= {};
  return state;
}

function writeMailState(state) {
  writeJsonAtomic(MAIL_STATE_FILE, state);
}

function deliveryKey(kind, date) {
  return `${kind}:${date}`;
}

function markDelivery(kind, date, result) {
  const state = readMailState();
  state.deliveries[deliveryKey(kind, date)] = {
    kind,
    date,
    status: result.status || (result.sent ? "sent" : "logged"),
    message: result.message || "",
    at: new Date().toISOString(),
  };
  writeMailState(state);
}

function lastDelivery(kind) {
  const deliveries = Object.values(readMailState().deliveries || {})
    .filter((item) => item.kind === kind)
    .sort((a, b) => String(b.at).localeCompare(String(a.at)));
  return deliveries[0] || null;
}

function smtpEnabled() {
  return String(process.env.SMTP_ENABLED || "false").toLowerCase() === "true";
}

function smtpTransportOptions() {
  return {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || "" }
      : undefined,
    connectionTimeout: Number(process.env.SMTP_TIMEOUT_MS || 15000),
    greetingTimeout: Number(process.env.SMTP_TIMEOUT_MS || 15000),
    socketTimeout: Number(process.env.SMTP_TIMEOUT_MS || 15000),
  };
}

function validateSmtpConfig() {
  if (!smtpEnabled()) return { ok: true, enabled: false, message: "SMTP kapalı; gönderimler mail log dosyasına yazılır." };
  const required = ["SMTP_HOST", "SMTP_FROM"];
  const missing = required.filter((key) => !process.env[key]);
  if (process.env.SMTP_USER && !process.env.SMTP_PASS) missing.push("SMTP_PASS");
  if (missing.length > 0) {
    return { ok: false, enabled: true, message: `Eksik SMTP ayarı: ${missing.join(", ")}` };
  }
  return {
    ok: true,
    enabled: true,
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
    from: process.env.SMTP_FROM,
  };
}

function mailFromAddress() {
  const from = process.env.SMTP_FROM || "stok@otel.com";
  const name = process.env.SMTP_FROM_NAME || "Otel Yönetim Stok";
  return `"${name.replaceAll('"', "'")}" <${from}>`;
}

async function sendMailOrLog(kind, subject, recipients, body, html = "", metadata = {}) {
  const recipientValidation = validateRecipients(recipients);
  if (!recipientValidation.ok) {
    appendMailLog({ kind, status: "recipient-error", subject, recipients, body, html, error: recipientValidation.message, metadata });
    return { ok: false, sent: false, logged: true, status: "recipient-error", message: recipientValidation.message };
  }

  const validation = validateSmtpConfig();
  if (!validation.ok) {
    appendMailLog({ kind, status: "config-error", subject, recipients: recipientValidation.recipients, body, html, error: validation.message, metadata });
    return { ok: false, sent: false, logged: true, status: "config-error", message: validation.message };
  }

  if (!smtpEnabled()) {
    appendMailLog({ kind, status: "logged", subject, recipients: recipientValidation.recipients, body, html, metadata });
    return { ok: true, sent: false, logged: true, status: "logged", message: "SMTP kapalı, mail log dosyasına yazıldı." };
  }

  try {
    const transporter = nodemailer.createTransport(smtpTransportOptions());
    const info = await transporter.sendMail({
      from: mailFromAddress(),
      to: recipientValidation.recipients,
      subject,
      text: body,
      html: html || undefined,
    });
    appendMailLog({ kind, status: "sent", subject, recipients: recipientValidation.recipients, body, html, messageId: info.messageId, metadata });
    return { ok: true, sent: true, logged: true, status: "sent", message: "Mail gönderildi.", messageId: info.messageId };
  } catch (error) {
    appendMailLog({ kind, status: "send-error", subject, recipients: recipientValidation.recipients, body, html, error: error.message, metadata });
    return { ok: false, sent: false, logged: true, status: "send-error", message: `Mail gönderilemedi: ${error.message}` };
  }
}

function minuteOfDay(value) {
  const [hour, minute] = String(value || "").split(":").map(Number);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
  return hour * 60 + minute;
}

function isAutomationDue(sendTime, now = timeKey()) {
  const sendMinute = minuteOfDay(sendTime);
  const nowMinute = minuteOfDay(now);
  if (sendMinute === null || nowMinute === null) return false;
  const windowMinutes = Number(process.env.MAIL_CATCH_UP_MINUTES || 120);
  const diff = nowMinute - sendMinute;
  return diff >= 0 && diff <= windowMinutes;
}

function shouldRunAutomation(kind, date, sendTime) {
  const state = readMailState();
  return !state.deliveries[deliveryKey(kind, date)] && isAutomationDue(sendTime);
}

async function runDueAutomations() {
  const db = loadDb();
  db.mailSettings = normalizeMailSettings(db.mailSettings);
  const today = todayKey();

  if (shouldRunAutomation("reminder", today, db.mailSettings.reminder.sendTime)) {
    const body = buildReminderMail(db);
    const html = buildReminderHtml(db);
    const result = await sendMailOrLog("reminder", db.mailSettings.reminder.subject, db.mailSettings.reminder.recipients, body, html, { date: today, automated: true });
    markDelivery("reminder", today, result);
  }

  if (shouldRunAutomation("report", today, db.mailSettings.report.sendTime)) {
    const body = buildOrderReportMail(db, today, "all");
    const html = buildOrderReportHtml(db, today, "all");
    const result = await sendMailOrLog("report", db.mailSettings.report.subject, db.mailSettings.report.recipients, body, html, { date: today, automated: true });
    markDelivery("report", today, result);
  }
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...corsHeaders(res),
    ...securityHeaders(),
  });
  res.end(body);
}

function sendText(res, status, text) {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    ...corsHeaders(res),
    ...securityHeaders(),
  });
  res.end(text);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > MAX_BODY_BYTES) {
        reject(new Error("Request too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

function createSession(user) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, {
    user: publicUser(user),
    expiresAt: Date.now() + SESSION_TTL_MS,
  });
  return token;
}

function cleanupSessions() {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (session.expiresAt < now) sessions.delete(token);
  }
}

function getAuthUser(req) {
  cleanupSessions();
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return null;
  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) return null;
  session.expiresAt = Date.now() + SESSION_TTL_MS;
  return session.user;
}

function requireAuth(req, res, roles = []) {
  const user = getAuthUser(req);
  if (!user) {
    sendJson(res, 401, { ok: false, message: "Oturum gerekli." });
    return null;
  }
  if (roles.length > 0 && !roles.includes(user.role)) {
    sendJson(res, 403, { ok: false, message: "Bu işlem için yetkin yok." });
    return null;
  }
  return user;
}

function validateProduct(product) {
  const errors = [];
  if (!String(product.name || "").trim()) errors.push("Ürün adı zorunlu.");
  if (!String(product.departmentId || "").trim()) errors.push("Departman zorunlu.");
  if (!String(product.unit || "").trim()) errors.push("Birim zorunlu.");
  if (!Number.isFinite(Number(product.lastQty)) || Number(product.lastQty) < 0) errors.push("Mevcut stok geçersiz.");
  if (!Number.isFinite(Number(product.minQty)) || Number(product.minQty) < 0) errors.push("Minimum stok geçersiz.");
  return errors;
}

function serveStatic(req, res, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(ROOT, safePath));
  if (!filePath.startsWith(ROOT)) {
    sendText(res, 403, "Forbidden");
    return;
  }
  const relativePath = path.relative(ROOT, filePath);
  const blockedStaticRoots = ["data", ".git", ".github", ".deploy-secrets", ".deploy-work", "backend"];
  const blockedStaticFiles = new Set([".env", ".env.example", "package-lock.json", "server.js", "package.json", "render.yaml"]);
  if (
    blockedStaticRoots.includes(relativePath.split(path.sep)[0]) ||
    blockedStaticFiles.has(path.basename(filePath))
  ) {
    sendText(res, 404, "Not found");
    return;
  }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    sendText(res, 404, "Not found");
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  const cacheControl = path.basename(filePath) === "config.js"
    ? "no-store"
    : "public, max-age=300";
  res.writeHead(200, {
    "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
    "Cache-Control": cacheControl,
    ...securityHeaders(),
  });
  fs.createReadStream(filePath).pipe(res);
}

async function handleApi(req, res, url) {
  const db = loadDb();
  const { pathname, searchParams } = url;

  if (req.method === "GET" && pathname === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      app: "otel-yonetim",
      time: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
      host: HOST,
      port: PORT,
      storage: storageHealth(),
      allowedOrigins: ALLOWED_ORIGINS,
      smtp: validateSmtpConfig(),
    });
    return;
  }

  if (req.method === "GET" && pathname === "/api/bootstrap") {
    const user = requireAuth(req, res);
    if (!user) return;
    sendJson(res, 200, publicDb(db, user));
    return;
  }

  if (req.method === "POST" && pathname === "/api/login") {
    const body = await parseBody(req);
    const user = db.users.find((item) => item.username === body.username && verifyPassword(item, body.password));
    if (!user) {
      sendJson(res, 401, { ok: false, message: "Kullanıcı adı veya şifre hatalı." });
      return;
    }
    const token = createSession(user);
    sendJson(res, 200, { ok: true, token, user: publicUser(user) });
    return;
  }

  if (req.method === "POST" && pathname === "/api/logout") {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (token) sessions.delete(token);
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "GET" && pathname === "/api/products") {
    const user = requireAuth(req, res);
    if (!user) return;
    const includeInactive = searchParams.get("includeInactive") === "true";
    sendJson(res, 200, allowedProductsForUser(db, user, includeInactive));
    return;
  }

  if (req.method === "POST" && pathname === "/api/products") {
    const user = requireAuth(req, res, ["admin"]);
    if (!user) return;
    const product = await parseBody(req);
    const errors = validateProduct(product);
    if (errors.length > 0) {
      sendJson(res, 400, { ok: false, errors });
      return;
    }
    product.id = product.id || `p-${Date.now()}`;
    product.lastQty = Number(product.lastQty);
    product.minQty = Number(product.minQty);
    product.active = product.active !== false;
    db.products.push(product);
    saveDb(db);
    sendJson(res, 201, product);
    return;
  }

  const productMatch = pathname.match(/^\/api\/products\/([^/]+)$/);
  if (req.method === "PUT" && productMatch) {
    const user = requireAuth(req, res, ["admin"]);
    if (!user) return;
    const id = decodeURIComponent(productMatch[1]);
    const product = await parseBody(req);
    const errors = validateProduct(product);
    if (errors.length > 0) {
      sendJson(res, 400, { ok: false, errors });
      return;
    }
    const index = db.products.findIndex((item) => item.id === id);
    if (index < 0) {
      sendText(res, 404, "Product not found");
      return;
    }
    db.products[index] = {
      ...product,
      id,
      lastQty: Number(product.lastQty),
      minQty: Number(product.minQty),
      active: product.active !== false,
    };
    saveDb(db);
    sendJson(res, 200, db.products[index]);
    return;
  }

  const activeMatch = pathname.match(/^\/api\/products\/([^/]+)\/active$/);
  if (req.method === "PATCH" && activeMatch) {
    const user = requireAuth(req, res, ["admin"]);
    if (!user) return;
    const id = decodeURIComponent(activeMatch[1]);
    const body = await parseBody(req);
    const product = db.products.find((item) => item.id === id);
    if (!product) {
      sendText(res, 404, "Product not found");
      return;
    }
    product.active = Boolean(body.active);
    saveDb(db);
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "POST" && pathname === "/api/counts") {
    const user = requireAuth(req, res);
    if (!user) return;
    const body = await parseBody(req);
    const product = db.products.find((item) => item.id === body.productId);
    if (!product) {
      sendJson(res, 404, { ok: false, message: "Ürün bulunamadı." });
      return;
    }
    if (user.role !== "admin" && product.departmentId !== user.departmentId) {
      sendJson(res, 403, { ok: false, message: "Bu departman için sayım yetkin yok." });
      return;
    }
    if (!Number.isFinite(Number(body.qty)) || Number(body.qty) < 0) {
      sendJson(res, 400, { ok: false, message: "Sayım miktarı geçersiz." });
      return;
    }
    const date = body.date || todayKey();
    db.counts[date] ||= {};
    db.counts[date][body.productId] = {
      qty: Number(body.qty),
      note: body.note || "",
      orderRequest: body.orderRequest?.requested
        ? {
            requested: true,
            qty: Number(body.orderRequest.qty || 0),
            reason: body.orderRequest.reason || "",
          }
        : { requested: false, qty: 0, reason: "" },
      user: user.name,
      username: user.username,
      departmentId: product.departmentId,
      time: body.time || timeKey(),
    };
    saveDb(db);
    sendJson(res, 200, db.counts[date][body.productId]);
    return;
  }

  if (req.method === "GET" && pathname === "/api/report") {
    const user = requireAuth(req, res);
    if (!user) return;
    const date = searchParams.get("date") || todayKey();
    const requestedDepartmentId = searchParams.get("departmentId") || "all";
    const departmentId = user.role === "admin" ? requestedDepartmentId : user.departmentId;
    const report = buildDailyReport(db, date, departmentId);
    sendJson(res, 200, {
      date,
      departmentId,
      totals: report.totals,
      departmentSummaries: report.departmentSummaries,
      orderItems: report.orderItems,
      orderNeededItems: report.orderItems,
      manualOrderRequests: report.manualOrderRequests,
      notCountedItems: report.notCountedItems,
      mailText: buildOrderReportMail(db, date, departmentId),
    });
    return;
  }

  if (req.method === "GET" && pathname === "/api/mail-settings") {
    const user = requireAuth(req, res, ["admin"]);
    if (!user) return;
    sendJson(res, 200, db.mailSettings);
    return;
  }

  if (req.method === "PUT" && pathname === "/api/mail-settings") {
    const user = requireAuth(req, res, ["admin"]);
    if (!user) return;
    db.mailSettings = normalizeMailSettings(await parseBody(req));
    saveDb(db);
    sendJson(res, 200, db.mailSettings);
    return;
  }

  if (req.method === "GET" && pathname === "/api/mail-log") {
    const user = requireAuth(req, res, ["admin"]);
    if (!user) return;
    const limit = Number(searchParams.get("limit") || 50);
    sendJson(res, 200, readJson(MAIL_LOG_FILE, []).slice(-limit).reverse());
    return;
  }

  if (req.method === "GET" && pathname === "/api/mail/status") {
    const user = requireAuth(req, res, ["admin"]);
    if (!user) return;
    sendJson(res, 200, {
      smtp: validateSmtpConfig(),
      automation: {
        reminder: {
          sendTime: db.mailSettings.reminder.sendTime,
          dueNow: isAutomationDue(db.mailSettings.reminder.sendTime),
          lastDelivery: lastDelivery("reminder"),
        },
        report: {
          sendTime: db.mailSettings.report.sendTime,
          dueNow: isAutomationDue(db.mailSettings.report.sendTime),
          lastDelivery: lastDelivery("report"),
        },
      },
      mailLog: readJson(MAIL_LOG_FILE, []).slice(-10).reverse(),
      catchUpMinutes: Number(process.env.MAIL_CATCH_UP_MINUTES || 120),
    });
    return;
  }

  if (req.method === "POST" && pathname === "/api/mail/send-reminder") {
    const user = requireAuth(req, res, ["admin"]);
    if (!user) return;
    const body = buildReminderMail(db);
    const html = buildReminderHtml(db);
    const result = await sendMailOrLog("reminder", db.mailSettings.reminder.subject, db.mailSettings.reminder.recipients, body, html, { date: todayKey(), manual: true, username: user.username });
    sendJson(res, 200, result);
    return;
  }

  if (req.method === "POST" && pathname === "/api/mail/send-report") {
    const user = requireAuth(req, res);
    if (!user) return;
    const date = searchParams.get("date") || todayKey();
    const requestedDepartmentId = searchParams.get("departmentId") || "all";
    const departmentId = user.role === "admin" ? requestedDepartmentId : user.departmentId;
    const body = buildOrderReportMail(db, date, departmentId);
    const html = buildOrderReportHtml(db, date, departmentId);
    const result = await sendMailOrLog("report", db.mailSettings.report.subject, db.mailSettings.report.recipients, body, html, { date, departmentId, manual: true, username: user.username });
    sendJson(res, 200, result);
    return;
  }

  if (req.method === "POST" && pathname === "/api/mail/verify-smtp") {
    const user = requireAuth(req, res, ["admin"]);
    if (!user) return;
    const validation = validateSmtpConfig();
    if (!validation.ok || !validation.enabled) {
      sendJson(res, 200, validation);
      return;
    }
    try {
      const transporter = nodemailer.createTransport(smtpTransportOptions());
      await transporter.verify();
      sendJson(res, 200, { ok: true, enabled: true, message: "SMTP bağlantısı doğrulandı." });
    } catch (error) {
      sendJson(res, 200, { ok: false, enabled: true, message: `SMTP bağlantısı başarısız: ${error.message}` });
    }
    return;
  }

  sendText(res, 404, "API route not found");
}

const server = http.createServer(async (req, res) => {
  try {
    res._otelRequestOrigin = req.headers.origin || "";
    if (req.method === "OPTIONS") {
      if (!originAllowed(res._otelRequestOrigin)) {
        sendText(res, 403, "CORS origin not allowed");
        return;
      }
      sendJson(res, 200, { ok: true });
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }

    serveStatic(req, res, url.pathname);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { ok: false, message: error.message });
  }
});

setInterval(() => {
  runDueAutomations().catch((error) => {
    console.error("Otomasyon hatasi", error);
  });
}, 60_000);

loadDb();
runDueAutomations().catch((error) => {
  console.error("Baslangic otomasyon hatasi", error);
});

server.listen(PORT, HOST, () => {
  console.log(`Otel Yonetim backend calisiyor: http://${HOST}:${PORT}/`);
  console.log("SMTP_ENABLED=true yapilmadikca mailler data/mail-log.json dosyasina yazilir.");
});

function shutdown(signal) {
  console.log(`${signal} alindi, backend kapatiliyor...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("unhandledRejection", (error) => {
  console.error("Yakalanmamis promise hatasi", error);
});
