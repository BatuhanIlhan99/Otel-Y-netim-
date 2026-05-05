const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const DATA_FILE = path.join(DATA_DIR, "app-data.json");
const MAIL_LOG_FILE = path.join(DATA_DIR, "mail-log.json");
const BACKUP_DIR = path.join(DATA_DIR, "backups");
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const MAX_BODY_BYTES = 1_000_000;

loadEnvFile(path.join(ROOT, ".env"));

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || "127.0.0.1";
const sessions = new Map();
let lastReminderDate = "";
let lastReportDate = "";

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
      recipients: "temizlik@otel.com, mutfak@otel.com, bufe@otel.com, resepsiyon@otel.com",
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

function todayKey() {
  return new Date().toISOString().slice(0, 10);
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

function publicDb(db) {
  return {
    departments: db.departments,
    users: db.users.map(publicUser),
    products: db.products,
    counts: db.counts,
    mailSettings: db.mailSettings,
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

function orderItems(db, date, departmentId = "all") {
  return (db.products || [])
    .filter((product) => product.active !== false)
    .filter((product) => departmentId === "all" || product.departmentId === departmentId)
    .map((product) => {
      const count = getCount(db, date, product.id);
      const qty = count ? Number(count.qty) : Number(product.lastQty);
      return {
        productId: product.id,
        productName: product.name,
        departmentId: product.departmentId,
        departmentName: departmentName(db, product.departmentId),
        unit: product.unit,
        qty,
        minQty: Number(product.minQty),
        note: count?.note || "",
      };
    })
    .filter((item) => item.qty <= item.minQty);
}

function manualOrderRequests(db, date, departmentId = "all") {
  return (db.products || [])
    .filter((product) => product.active !== false)
    .filter((product) => departmentId === "all" || product.departmentId === departmentId)
    .map((product) => {
      const count = getCount(db, date, product.id);
      const request = count?.orderRequest;
      if (!request?.requested) return null;
      const qty = count ? Number(count.qty) : Number(product.lastQty);
      return {
        productId: product.id,
        productName: product.name,
        departmentId: product.departmentId,
        departmentName: departmentName(db, product.departmentId),
        unit: product.unit,
        qty,
        minQty: Number(product.minQty),
        requestedQty: Number(request.qty || 0),
        reason: request.reason || "",
      };
    })
    .filter(Boolean);
}

function buildOrderReportMail(db, date, departmentId = "all") {
  const settings = normalizeMailSettings(db.mailSettings).report;
  const items = orderItems(db, date, departmentId);
  const manualItems = manualOrderRequests(db, date, departmentId);
  const lines = [
    settings.subject,
    `Tarih: ${date}`,
    `Alıcılar: ${settings.recipients}`,
    `Gönderim saati: ${settings.sendTime}`,
    "",
    "Sipariş verilmesi gereken ürünler:",
    "",
  ];

  if (items.length === 0) {
    lines.push("Bugün minimum stok seviyesinin altında ürün bulunmuyor.");
    lines.push("");
  } else {
    const grouped = new Map();
    for (const item of items) {
      if (!grouped.has(item.departmentName)) grouped.set(item.departmentName, []);
      grouped.get(item.departmentName).push(item);
    }

    for (const [groupName, groupItems] of grouped.entries()) {
      lines.push(groupName);
      for (const item of groupItems) {
        const note = item.note ? ` | Not: ${item.note}` : "";
        lines.push(`- ${item.productName}: ${item.qty} ${item.unit} | Minimum: ${item.minQty} | Sipariş gerekli${note}`);
      }
      lines.push("");
    }
  }

  lines.push("Manuel sipariş talepleri:");
  lines.push("");

  if (manualItems.length === 0) {
    lines.push("Yeterli stokta olup ayrıca sipariş talep edilen ürün yok.");
  } else {
    for (const item of manualItems) {
      const requestedQty = item.requestedQty ? ` | Talep miktarı: ${item.requestedQty} ${item.unit}` : "";
      const reason = item.reason ? ` | Gerekçe: ${item.reason}` : "";
      lines.push(`- ${item.departmentName} / ${item.productName}: mevcut ${item.qty} ${item.unit}${requestedQty}${reason}`);
    }
  }

  return lines.join("\n");
}

function buildReminderMail(db) {
  const settings = normalizeMailSettings(db.mailSettings).reminder;
  return [
    settings.subject,
    `Alıcılar: ${settings.recipients}`,
    `Gönderim saati: ${settings.sendTime}`,
    "",
    settings.message,
    "",
    "Departmanlar: Temizlik, Mutfak, Büfe, Smile Food House, Resepsiyon",
  ].join("\n");
}

function appendMailLog(entry) {
  const log = readJson(MAIL_LOG_FILE, []);
  log.push({
    id: `mail-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
    createdAt: new Date().toISOString(),
    ...entry,
  });
  writeJsonAtomic(MAIL_LOG_FILE, log);
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
  };
}

function validateSmtpConfig() {
  if (!smtpEnabled()) return { ok: true, enabled: false };
  const required = ["SMTP_HOST", "SMTP_FROM"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    return { ok: false, enabled: true, message: `Eksik SMTP ayarı: ${missing.join(", ")}` };
  }
  return { ok: true, enabled: true };
}

async function sendMailOrLog(kind, subject, recipients, body) {
  const validation = validateSmtpConfig();
  if (!validation.ok) {
    appendMailLog({ kind, status: "config-error", subject, recipients, body, error: validation.message });
    return { sent: false, logged: true, message: validation.message };
  }

  if (!smtpEnabled()) {
    appendMailLog({ kind, status: "logged", subject, recipients, body });
    return { sent: false, logged: true, message: "SMTP kapalı, mail log dosyasına yazıldı." };
  }

  const transporter = nodemailer.createTransport(smtpTransportOptions());
  await transporter.sendMail({
    from: process.env.SMTP_FROM || "stok@otel.com",
    to: recipients,
    subject,
    text: body,
  });
  appendMailLog({ kind, status: "sent", subject, recipients, body });
  return { sent: true, logged: true, message: "Mail gönderildi." };
}

async function runDueAutomations() {
  const db = loadDb();
  const now = timeKey();
  const today = todayKey();

  if (db.mailSettings.reminder.sendTime === now && lastReminderDate !== today) {
    const body = buildReminderMail(db);
    await sendMailOrLog("reminder", db.mailSettings.reminder.subject, db.mailSettings.reminder.recipients, body);
    lastReminderDate = today;
  }

  if (db.mailSettings.report.sendTime === now && lastReportDate !== today) {
    const body = buildOrderReportMail(db, today, "all");
    await sendMailOrLog("report", db.mailSettings.report.subject, db.mailSettings.report.recipients, body);
    lastReportDate = today;
  }
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS",
  });
  res.end(body);
}

function sendText(res, status, text) {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
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
  const blockedStaticRoots = ["data", ".git", ".github"];
  const blockedStaticFiles = new Set([".env", ".env.example", "package-lock.json"]);
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
  res.writeHead(200, {
    "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
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
      smtp: validateSmtpConfig(),
    });
    return;
  }

  if (req.method === "GET" && pathname === "/api/bootstrap") {
    sendJson(res, 200, publicDb(db));
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
    sendJson(res, 200, {
      date,
      departmentId,
      orderItems: orderItems(db, date, departmentId),
      manualOrderRequests: manualOrderRequests(db, date, departmentId),
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
    sendJson(res, 200, readJson(MAIL_LOG_FILE, []));
    return;
  }

  if (req.method === "POST" && pathname === "/api/mail/send-reminder") {
    const user = requireAuth(req, res, ["admin"]);
    if (!user) return;
    const body = buildReminderMail(db);
    const result = await sendMailOrLog("reminder", db.mailSettings.reminder.subject, db.mailSettings.reminder.recipients, body);
    sendJson(res, 200, result);
    return;
  }

  if (req.method === "POST" && pathname === "/api/mail/send-report") {
    const user = requireAuth(req, res, ["admin"]);
    if (!user) return;
    const date = searchParams.get("date") || todayKey();
    const body = buildOrderReportMail(db, date, "all");
    const result = await sendMailOrLog("report", db.mailSettings.report.subject, db.mailSettings.report.recipients, body);
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
    const transporter = nodemailer.createTransport(smtpTransportOptions());
    await transporter.verify();
    sendJson(res, 200, { ok: true, enabled: true, message: "SMTP bağlantısı doğrulandı." });
    return;
  }

  sendText(res, 404, "API route not found");
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "OPTIONS") {
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

server.listen(PORT, HOST, () => {
  console.log(`Otel Yonetim backend calisiyor: http://${HOST}:${PORT}/`);
  console.log("SMTP_ENABLED=true yapilmadikca mailler data/mail-log.json dosyasina yazilir.");
});
