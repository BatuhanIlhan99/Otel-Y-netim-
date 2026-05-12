// ============================================================
// Mock data — based on actual repo structure (Otel Yönetim)
// ============================================================

const DEPARTMENTS = [
  { id: "temizlik", name: "Temizlik", short: "TM", color: "brand", icon: "spray" },
  { id: "restorant", name: "Gülplaj Restorant", short: "GR", color: "accent", icon: "chef" },
  { id: "bufe", name: "Gülplaj Büfe", short: "GB", color: "accent", icon: "cup" },
  { id: "smile", name: "Smile Food House", short: "SF", color: "accent", icon: "burger" },
  { id: "resepsiyon", name: "Resepsiyon", short: "RS", color: "brand", icon: "concierge" },
];

const USERS = [
  { id: "u-admin",    username: "admin",      password: "admin123",       name: "Yönetici",                role: "admin",     department: null,         email: "yonetici@otel.com" },
  { id: "u-satin",    username: "satinalma",  password: "SatinAlma2026",  name: "Satın Alma Sorumlusu",    role: "admin",     department: null,         email: "satinalma@otel.com" },
  { id: "u-ops",      username: "operasyon",  password: "Operasyon2026",  name: "Operasyon Müdürü",        role: "admin",     department: null,         email: "operasyon@otel.com" },
  { id: "u-tem",      username: "temizlik",   password: "Temizlik2026",   name: "Temizlik Kullanıcısı",    role: "departman", department: "temizlik",   email: "temizlik@otel.com" },
  { id: "u-mut",      username: "mutfak",     password: "Mutfak2026",     name: "Mutfak Kullanıcısı",      role: "departman", department: "restorant",  email: "mutfak@otel.com" },
  { id: "u-buf",      username: "bufe",       password: "Bufe2026",       name: "Büfe Kullanıcısı",        role: "departman", department: "bufe",       email: "bufe@otel.com" },
  { id: "u-smi",      username: "smile",      password: "1234",           name: "Smile Food House",        role: "departman", department: "smile",      email: "smile@otel.com" },
  { id: "u-res",      username: "resepsiyon", password: "Resepsiyon2026", name: "Resepsiyon Kullanıcısı",  role: "departman", department: "resepsiyon", email: "resepsiyon@otel.com" },
];

const CATEGORIES = {
  temizlik: ["Yıkama & Çamaşır", "Hijyen & Sabun", "Kağıt Ürünleri", "Kat Hizmetleri", "Sarf Malzeme"],
  restorant: ["Et & Tavuk", "Sebze & Meyve", "Süt Ürünleri", "Bakliyat & Tahıl", "Yağ & Şeker", "Baharat"],
  bufe: ["İçecek", "Atıştırmalık", "Dondurma", "Tatlı"],
  smile: ["Et & Tavuk", "Ekmek & Hamur", "Sos & Garnitür", "İçecek"],
  resepsiyon: ["Misafir Sarfı", "Ofis Sarfı", "Anahtar & Kart"],
};

// Realistic products with current/min/used today
const PRODUCTS = [
  // Temizlik
  { id: "p001", dept: "temizlik", cat: "Kağıt Ürünleri", name: "Tuvalet Kağıdı Jumbo", spec: "60 yaprak × 12'li koli", unit: "koli", stock: 4, min: 8, usedToday: 2, supplier: "Tezel Kağıt", price: 480 },
  { id: "p002", dept: "temizlik", cat: "Kağıt Ürünleri", name: "Z Kağıt Havlu", spec: "200'lü × 12'li", unit: "koli", stock: 12, min: 6, usedToday: 1, supplier: "Tezel Kağıt", price: 320 },
  { id: "p003", dept: "temizlik", cat: "Hijyen & Sabun", name: "Sıvı Sabun Refill", spec: "5L bidon", unit: "adet", stock: 3, min: 6, usedToday: 0, supplier: "Hijyenex", price: 145 },
  { id: "p004", dept: "temizlik", cat: "Yıkama & Çamaşır", name: "Çamaşır Deterjanı", spec: "20kg endüstriyel", unit: "torba", stock: 2, min: 4, usedToday: 1, supplier: "Hijyenex", price: 980 },
  { id: "p005", dept: "temizlik", cat: "Yıkama & Çamaşır", name: "Yumuşatıcı", spec: "5L bidon", unit: "adet", stock: 5, min: 3, usedToday: 1, supplier: "Hijyenex", price: 195 },
  { id: "p006", dept: "temizlik", cat: "Hijyen & Sabun", name: "Çamaşır Suyu (Klor)", spec: "5L bidon", unit: "adet", stock: 8, min: 6, usedToday: 2, supplier: "Bekir Hijyen", price: 95 },
  { id: "p007", dept: "temizlik", cat: "Sarf Malzeme", name: "Çöp Poşeti 80L", spec: "Siyah, 10'lu paket", unit: "paket", stock: 18, min: 10, usedToday: 4, supplier: "Tezel Kağıt", price: 65 },
  { id: "p008", dept: "temizlik", cat: "Kat Hizmetleri", name: "Bornoz", spec: "Beyaz, M-XL", unit: "adet", stock: 14, min: 30, usedToday: 0, supplier: "Lazo Tekstil", price: 420 },
  { id: "p009", dept: "temizlik", cat: "Kat Hizmetleri", name: "Banyo Havlusu", spec: "70×140 beyaz", unit: "adet", stock: 28, min: 40, usedToday: 6, supplier: "Lazo Tekstil", price: 165 },
  { id: "p010", dept: "temizlik", cat: "Hijyen & Sabun", name: "Cam Silici", spec: "750ml sprey", unit: "adet", stock: 9, min: 5, usedToday: 0, supplier: "Bekir Hijyen", price: 48 },

  // Restorant (kitchen)
  { id: "p101", dept: "restorant", cat: "Et & Tavuk", name: "Dana Bonfile", spec: "1.kalite, kg", unit: "kg", stock: 8, min: 12, usedToday: 4, supplier: "Yıldız Et", price: 740 },
  { id: "p102", dept: "restorant", cat: "Et & Tavuk", name: "Tavuk Göğüs Fileto", spec: "Taze, kg", unit: "kg", stock: 14, min: 10, usedToday: 6, supplier: "Banvit", price: 195 },
  { id: "p103", dept: "restorant", cat: "Sebze & Meyve", name: "Domates", spec: "Salkım, kg", unit: "kg", stock: 5, min: 15, usedToday: 8, supplier: "Hal Toptan", price: 38 },
  { id: "p104", dept: "restorant", cat: "Sebze & Meyve", name: "Soğan", spec: "Kuru, kg", unit: "kg", stock: 22, min: 10, usedToday: 4, supplier: "Hal Toptan", price: 24 },
  { id: "p105", dept: "restorant", cat: "Süt Ürünleri", name: "Tereyağı", spec: "İnek, 250gr", unit: "adet", stock: 11, min: 20, usedToday: 5, supplier: "İçim", price: 145 },
  { id: "p106", dept: "restorant", cat: "Süt Ürünleri", name: "Beyaz Peynir", spec: "Tam yağlı, kg", unit: "kg", stock: 7, min: 6, usedToday: 1, supplier: "İçim", price: 285 },
  { id: "p107", dept: "restorant", cat: "Yağ & Şeker", name: "Ayçiçek Yağı", spec: "5L teneke", unit: "adet", stock: 6, min: 8, usedToday: 1, supplier: "Yudum", price: 480 },
  { id: "p108", dept: "restorant", cat: "Bakliyat & Tahıl", name: "Pirinç Baldo", spec: "Premium, kg", unit: "kg", stock: 28, min: 15, usedToday: 3, supplier: "Reis", price: 88 },

  // Büfe
  { id: "p201", dept: "bufe", cat: "İçecek", name: "Coca-Cola", spec: "330ml kutu × 24'lü", unit: "koli", stock: 12, min: 8, usedToday: 3, supplier: "CCİ", price: 320 },
  { id: "p202", dept: "bufe", cat: "İçecek", name: "Su 0.5L", spec: "12'li koli", unit: "koli", stock: 5, min: 10, usedToday: 2, supplier: "Erikli", price: 95 },
  { id: "p203", dept: "bufe", cat: "Dondurma", name: "Algida Magnum", spec: "Çikolata, adet", unit: "adet", stock: 18, min: 24, usedToday: 6, supplier: "Algida", price: 65 },

  // Smile
  { id: "p301", dept: "smile", cat: "Ekmek & Hamur", name: "Hamburger Ekmeği", spec: "Susamlı, 12'li", unit: "paket", stock: 6, min: 5, usedToday: 2, supplier: "Pakmaya", price: 78 },
  { id: "p302", dept: "smile", cat: "Sos & Garnitür", name: "Patates Parmak", spec: "Donuk, 2.5kg", unit: "paket", stock: 4, min: 6, usedToday: 1, supplier: "Aytaç", price: 245 },

  // Resepsiyon
  { id: "p401", dept: "resepsiyon", cat: "Misafir Sarfı", name: "Karşılama Kalemi", spec: "Logolu", unit: "adet", stock: 240, min: 100, usedToday: 12, supplier: "Promax", price: 8 },
  { id: "p402", dept: "resepsiyon", cat: "Anahtar & Kart", name: "Oda Kart Anahtarı", spec: "RFID, beyaz", unit: "adet", stock: 12, min: 30, usedToday: 0, supplier: "Salto", price: 24 },
];

const ORDER_REQUESTS = [
  { id: "or-1", productId: "p001", qty: 6, reason: "Hafta sonu rezervasyon yoğunluğu", status: "pending", requestedBy: "Ayşe Demir", requestedAt: "Bugün, 09:14" },
  { id: "or-2", productId: "p008", qty: 25, reason: "Yaz sezonu öncesi tamamlama", status: "approved", requestedBy: "Ayşe Demir", requestedAt: "Bugün, 08:32" },
  { id: "or-3", productId: "p103", qty: 30, reason: "Açık büfe akşam yemeği", status: "pending", requestedBy: "Hasan Aksoy", requestedAt: "Bugün, 10:05" },
  { id: "or-4", productId: "p402", qty: 50, reason: "Bayan asistan ekibinden talep", status: "pending", requestedBy: "Elif Çelik", requestedAt: "Dün, 17:42" },
];

const RECENT_COUNTS = [
  { dept: "temizlik", time: "10:42", user: "Ayşe Demir", items: 47, critical: 4 },
  { dept: "restorant", time: "10:18", user: "Hasan Aksoy", items: 62, critical: 2 },
  { dept: "bufe", time: "09:55", user: "Selin Korkmaz", items: 18, critical: 1 },
  { dept: "resepsiyon", time: "09:30", user: "Elif Çelik", items: 12, critical: 1 },
  { dept: "smile", time: "Bekliyor", user: "Burak Şahin", items: 0, critical: 0, pending: true },
];

const ACTIVITY = [
  { time: "10:42", icon: "edit", text: "Ayşe Demir, Temizlik departmanı sayımını tamamladı.", meta: "47 kalem · 4 kritik" },
  { time: "10:14", icon: "alert", text: "Domates stoğu kritik seviyenin altına düştü.", meta: "5 kg / minimum 15 kg", level: "danger" },
  { time: "09:30", icon: "mail", text: "Yöneticiye günlük sipariş raporu e-postası gönderildi.", meta: "mehmet@otel.com" },
  { time: "09:14", icon: "package", text: "Yeni sipariş talebi: Tuvalet kağıdı Jumbo × 6", meta: "Ayşe Demir · Temizlik" },
  { time: "08:48", icon: "check", text: "Hasan Aksoy giriş yaptı.", meta: "Mutfak kullanıcısı" },
];

// Icons (Lucide-style inline SVGs)
const ICON = {
  dashboard: <path d="M3 12L12 4l9 8M5 10v10h14V10" />,
  stock: <><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M8 8V5a4 4 0 018 0v3" /></>,
  orders: <><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M9 12h6M9 16h4" /></>,
  reports: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></>,
  admin: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" /></>,
  products: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27,6.96 12,12.01 20.73,6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 6 10-6" /></>,
  bell: <><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></>,
  search: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" /></>,
  user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  minus: <line x1="5" y1="12" x2="19" y2="12" />,
  check: <polyline points="20 6 9 17 4 12" />,
  x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  alert: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><circle cx="12" cy="17" r="0.5" fill="currentColor" /></>,
  info: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
  arrow_right: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
  arrow_up: <><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></>,
  arrow_down: <><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></>,
  download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
  filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
  trend_up: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>,
  package: <><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></>,
  edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
  trash: <><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></>,
  more: <><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></>,
  refresh: <><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></>,
  spark: <><polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" /></>,
  send: <><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>,
  history: <><path d="M3 3v5h5" /><path d="M3.05 13A9 9 0 1015 4l-7 7" /><path d="M12 7v5l4 2" /></>,
  copy: <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></>,
  menu: <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>,
  eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
};

function Icon({ name, size = 18, ...rest }) {
  const content = ICON[name];
  if (!content) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {content}
    </svg>
  );
}

function initials(name) {
  return name.split(" ").map(s => s[0]).join("").slice(0, 2).toUpperCase();
}

function deptById(id) {
  return DEPARTMENTS.find(d => d.id === id);
}

function productById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function stockStatus(p) {
  if (p.stock <= p.min * 0.5) return { key: "critical", label: "Kritik", cls: "badge-danger" };
  if (p.stock < p.min) return { key: "low", label: "Düşük", cls: "badge-warn" };
  if (p.stock < p.min * 1.5) return { key: "ok", label: "Yeterli", cls: "badge-ok" };
  return { key: "ample", label: "Bol", cls: "badge-ghost" };
}

function todayStr() {
  const d = new Date();
  const months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  const days = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} · ${days[d.getDay()]}`;
}

function fmtNum(n) {
  return new Intl.NumberFormat("tr-TR").format(n);
}

function fmtMoney(n) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
}

// ============================================================
// localStorage adapter — kalıcı veri için
// ============================================================
const LS_KEY = "otel-yonetim";
const lsLoad = (key, fallback) => {
  try {
    const raw = localStorage.getItem(`${LS_KEY}:${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
};
const lsSave = (key, value) => {
  try { localStorage.setItem(`${LS_KEY}:${key}`, JSON.stringify(value)); }
  catch (e) { /* quota or disabled */ }
};
const todayKey = () => new Date().toISOString().slice(0, 10);

// Login auth — eski parolalı sistem
function authenticate(username, password) {
  const u = USERS.find(x => x.username === String(username || "").toLowerCase().trim());
  if (!u) return { ok: false, error: "Kullanıcı bulunamadı." };
  if (u.password !== password) return { ok: false, error: "Şifre hatalı." };
  return { ok: true, user: u };
}

Object.assign(window, {
  DEPARTMENTS, USERS, CATEGORIES, PRODUCTS, ORDER_REQUESTS, RECENT_COUNTS, ACTIVITY,
  Icon, ICON, initials, deptById, productById, stockStatus, todayStr, fmtNum, fmtMoney,
  lsLoad, lsSave, todayKey, authenticate, LS_KEY,
});
