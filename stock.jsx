// ============================================================
// Stock Counting Screen — mobile-first, card-based
// ============================================================

function StockCount({ currentUser, selectedDept, onNavigate }) {
  const isAdmin = currentUser.role === "admin";
  const userDept = currentUser.department;

  const [dept, setDept] = React.useState(selectedDept || userDept || "temizlik");
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState("all"); // all | critical | low | counted | uncounted
  const [counts, setCounts] = React.useState({}); // {productId: {used, stock, note}}
  const [openRow, setOpenRow] = React.useState(null);

  const department = deptById(dept);
  const products = PRODUCTS.filter(p => p.dept === dept);

  const filtered = products.filter(p => {
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (filter === "critical" && !(p.stock <= p.min * 0.5)) return false;
    if (filter === "low" && !(p.stock < p.min && p.stock > p.min * 0.5)) return false;
    if (filter === "counted" && !counts[p.id]) return false;
    if (filter === "uncounted" && counts[p.id]) return false;
    return true;
  });

  const counted = Object.keys(counts).length;
  const total = products.length;
  const progress = total ? Math.round((counted / total) * 100) : 0;
  const criticalCount = products.filter(p => p.stock < p.min).length;

  function updateCount(id, field, value) {
    setCounts(c => ({
      ...c,
      [id]: { ...c[id], [field]: value },
    }));
  }

  function quickAdd(id, delta) {
    const p = productById(id);
    const cur = counts[id]?.stock ?? p.stock;
    const next = Math.max(0, cur + delta);
    updateCount(id, "stock", next);
  }

  return (
    <div className="col gap-lg" data-screen-label="03 Stok Sayım">

      <header className="page-head">
        <div className="page-head-titles">
          <span className="eyebrow">Stok Yönetimi</span>
          <h1 className="page-title">{department.name} · Günlük Sayım</h1>
          <span className="page-sub">
            {todayStr()} · Sayım penceresi 08:00 – 11:00
          </span>
        </div>
        <div className="page-head-meta">
          <div className="meta-chip" style={{ minWidth: 0 }}>
            <small>İlerleme</small>
            <strong>{counted}/{total} kalem · {progress}%</strong>
          </div>
          <button className="btn btn-ghost"><Icon name="history" size={14} />Geçmiş sayımlar</button>
          <button className="btn" disabled={counted === 0}>
            <Icon name="check" size={15} />Sayımı tamamla
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="progress-card">
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
        <div className="progress-stats">
          <div><strong className="tnum">{total - counted}</strong> kalem kaldı</div>
          <div><strong className="tnum" style={{ color: "var(--danger)" }}>{criticalCount}</strong> kritik stok</div>
          <div><strong className="tnum">{products.reduce((s,p)=>s+p.usedToday,0)}</strong> bugünkü tüketim</div>
        </div>
      </div>

      {/* Department switcher — only for admin */}
      {isAdmin && (
        <div className="dept-tabs">
          {DEPARTMENTS.map(d => {
            const c = PRODUCTS.filter(p => p.dept === d.id && p.stock < p.min).length;
            return (
              <button
                key={d.id}
                className={`dept-tab ${d.id === dept ? "on" : ""}`}
                onClick={() => { setDept(d.id); setCounts({}); }}
              >
                <span className={`product-tile ${d.color}`}>{d.short}</span>
                <span className="dept-tab-info">
                  <strong>{d.name}</strong>
                  <small>{PRODUCTS.filter(p => p.dept === d.id).length} ürün · {c} kritik</small>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Toolbar */}
      <div className="stock-toolbar">
        <div className="input-with-icon grow" style={{ maxWidth: 360 }}>
          <span className="input-icon"><Icon name="search" size={16} /></span>
          <input
            className="input"
            placeholder="Ürün adıyla ara..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="filter-chips">
          <button className={`chip ${filter === "all" ? "on" : ""}`} onClick={() => setFilter("all")}>
            Tümü <strong>{products.length}</strong>
          </button>
          <button className={`chip critical ${filter === "critical" ? "on" : ""}`} onClick={() => setFilter("critical")}>
            Kritik <strong>{products.filter(p => p.stock <= p.min*0.5).length}</strong>
          </button>
          <button className={`chip warn ${filter === "low" ? "on" : ""}`} onClick={() => setFilter("low")}>
            Düşük <strong>{products.filter(p => p.stock < p.min && p.stock > p.min*0.5).length}</strong>
          </button>
          <button className={`chip ${filter === "counted" ? "on" : ""}`} onClick={() => setFilter("counted")}>
            Sayılan <strong>{counted}</strong>
          </button>
          <button className={`chip ${filter === "uncounted" ? "on" : ""}`} onClick={() => setFilter("uncounted")}>
            Sayılmadı <strong>{total - counted}</strong>
          </button>
        </div>
      </div>

      {/* Category groups */}
      <div className="card card-elev">
        <div className="card-head">
          <div className="card-head-titles">
            <div className="card-title">
              {filtered.length} ürün
              {filter !== "all" && <span className="badge badge-brand no-dot">Filtrelenmiş</span>}
            </div>
            <div className="card-sub">Stok ve kullanım miktarlarını girin — değişiklikler otomatik kaydedilir</div>
          </div>
          <div className="card-actions">
            <div className="segmented hide-mobile">
              <button className="on">Kart</button>
              <button>Tablo</button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            <Icon name="package" size={36} />
            <strong>Eşleşen ürün yok</strong>
            <span>Arama veya filtreyi değiştirin.</span>
          </div>
        ) : (
          <div className="stock-list">
            {filtered.map(p => (
              <StockRow
                key={p.id}
                product={p}
                count={counts[p.id]}
                isOpen={openRow === p.id}
                onToggle={() => setOpenRow(o => o === p.id ? null : p.id)}
                onUpdate={(field, value) => updateCount(p.id, field, value)}
                onQuickAdd={delta => quickAdd(p.id, delta)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sticky save bar on mobile */}
      {counted > 0 && (
        <div className="sticky-save-bar">
          <div className="ssb-info">
            <strong>{counted}</strong> kalem hazır
            <small>· Otomatik kaydedildi</small>
          </div>
          <button className="btn"><Icon name="check" size={15} />Sayımı tamamla</button>
        </div>
      )}
    </div>
  );
}

function StockRow({ product: p, count, isOpen, onToggle, onUpdate, onQuickAdd }) {
  const status = stockStatus(p);
  const currentStock = count?.stock ?? p.stock;
  const used = count?.used ?? "";
  const note = count?.note ?? "";

  const isCounted = count && (count.stock !== undefined || count.used !== "");
  const cls = status.key === "critical" ? "critical" : status.key === "low" ? "low" : "";

  return (
    <div className={`stock-row ${cls} ${isOpen ? "open" : ""} ${isCounted ? "counted" : ""}`}>
      <div className="stock-row-main">
        <button className="stock-row-head" onClick={onToggle}>
          <div className={`product-tile ${status.key === "critical" ? "" : ""}`}>{p.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
          <div className="stock-row-info">
            <div className="stock-row-title-line">
              <strong>{p.name}</strong>
              <span className={`badge ${status.cls}`}>{status.label}</span>
            </div>
            <small>{p.spec} · {p.cat}</small>
          </div>
          <div className="stock-row-current">
            <div className="stock-row-num">
              <strong className="tnum">{currentStock}</strong>
              <small>/ min {p.min} {p.unit}</small>
            </div>
            {isCounted && <span className="counted-mark"><Icon name="check" size={14} /></span>}
          </div>
        </button>

        {isOpen && (
          <div className="stock-row-edit">
            <div className="edit-grid">
              <div className="field">
                <label className="field-label">Mevcut stok</label>
                <div className="num-stepper">
                  <button onClick={() => onQuickAdd(-1)} type="button"><Icon name="minus" size={16} /></button>
                  <input
                    type="number"
                    className="input input-num"
                    value={currentStock}
                    onChange={e => onUpdate("stock", parseFloat(e.target.value) || 0)}
                  />
                  <button onClick={() => onQuickAdd(1)} type="button"><Icon name="plus" size={16} /></button>
                </div>
                <span className="field-hint">{p.unit}</span>
              </div>
              <div className="field">
                <label className="field-label">Bugün kullanılan</label>
                <input
                  type="number"
                  className="input input-num"
                  placeholder="0"
                  value={used}
                  onChange={e => onUpdate("used", e.target.value)}
                />
                <span className="field-hint">{p.usedToday > 0 ? `Önceki ortalama: ${p.usedToday} ${p.unit}` : "İlk sayım"}</span>
              </div>
              <div className="field">
                <label className="field-label">Not (opsiyonel)</label>
                <input
                  type="text"
                  className="input"
                  placeholder="örn. Yeni teslimat alındı"
                  value={note}
                  onChange={e => onUpdate("note", e.target.value)}
                />
              </div>
            </div>

            <div className="edit-actions">
              {p.stock < p.min ? (
                <button className="btn btn-soft btn-sm">
                  <Icon name="package" size={14} />
                  Sipariş talep et ({Math.ceil(p.min - p.stock)} {p.unit})
                </button>
              ) : (
                <button className="btn btn-ghost btn-sm">
                  <Icon name="package" size={14} />
                  Manuel sipariş ekle
                </button>
              )}
              <span className="muted-meta">Tedarikçi: <strong>{p.supplier}</strong> · {fmtMoney(p.price)} / {p.unit}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const stockStyles = `
/* Progress card */
.progress-card {
  padding: 14px 18px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.progress-bar {
  height: 8px;
  background: var(--surface-sunken);
  border-radius: var(--r-pill);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--brand), var(--ok));
  border-radius: var(--r-pill);
  transition: width 0.3s ease;
}
.progress-stats {
  display: flex;
  gap: 24px;
  font-size: 12.5px;
  color: var(--ink-500);
  flex-wrap: wrap;
}
.progress-stats strong {
  color: var(--ink-900);
  font-size: 14.5px;
  font-weight: 600;
  margin-right: 4px;
}

/* Department tabs (admin) */
.dept-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
}
.dept-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px 9px 9px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  text-align: left;
  flex-shrink: 0;
  min-width: 180px;
  cursor: pointer;
  transition: all 0.12s;
}
.dept-tab:hover {
  border-color: var(--brand);
  background: var(--brand-tint);
}
.dept-tab.on {
  border-color: var(--brand);
  background: var(--brand-tint);
  box-shadow: 0 0 0 3px rgba(13,110,94,0.08);
}
.dept-tab-info { display: flex; flex-direction: column; line-height: 1.25; min-width: 0; }
.dept-tab-info strong { font-size: 13px; font-weight: 600; color: var(--ink-900); white-space: nowrap; }
.dept-tab-info small { font-size: 11.5px; color: var(--ink-500); }

/* Toolbar */
.stock-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.filter-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-pill);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--ink-700);
  cursor: pointer;
  transition: all 0.12s;
  white-space: nowrap;
}
.chip strong {
  font-weight: 600;
  background: var(--surface-sunken);
  color: var(--ink-600);
  padding: 1px 7px;
  border-radius: var(--r-pill);
  font-size: 11px;
  min-width: 16px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.chip:hover {
  border-color: var(--ink-400);
  color: var(--ink-900);
}
.chip.on {
  background: var(--brand);
  color: #fff;
  border-color: var(--brand);
}
.chip.on strong {
  background: rgba(255,255,255,0.2);
  color: #fff;
}
.chip.critical.on { background: var(--danger); border-color: var(--danger); }
.chip.warn.on { background: var(--accent); border-color: var(--accent); }
.chip.critical strong { background: var(--danger-soft); color: var(--danger); }
.chip.warn strong { background: var(--accent-soft); color: var(--accent-strong); }
.chip.critical.on strong, .chip.warn.on strong { background: rgba(255,255,255,0.22); color: #fff; }

@media (max-width: 700px) {
  .stock-toolbar > .input-with-icon { max-width: none !important; width: 100%; }
  .hide-mobile { display: none; }
}

/* Stock list & rows */
.stock-list { display: flex; flex-direction: column; }
.stock-row {
  border-bottom: 1px solid var(--line-soft);
}
.stock-row:last-child { border-bottom: 0; }
.stock-row.open { background: var(--brand-tint); }
.stock-row.critical .stock-row-head::before {
  content: "";
  width: 3px;
  background: var(--danger);
  border-radius: 0 2px 2px 0;
  position: absolute;
  left: 0; top: 8px; bottom: 8px;
}
.stock-row.low .stock-row-head::before {
  content: "";
  width: 3px;
  background: var(--accent);
  border-radius: 0 2px 2px 0;
  position: absolute;
  left: 0; top: 8px; bottom: 8px;
}
.stock-row-main { position: relative; }
.stock-row-head {
  display: grid;
  grid-template-columns: auto minmax(0,1fr) auto;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  width: 100%;
  background: transparent;
  text-align: left;
  cursor: pointer;
  position: relative;
  transition: background 0.12s;
}
.stock-row-head:hover { background: rgba(13,110,94,0.04); }
.stock-row.open .stock-row-head { background: transparent; }
.stock-row-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.stock-row-title-line {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.stock-row-title-line strong {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-900);
}
.stock-row-info small {
  font-size: 12px;
  color: var(--ink-500);
  font-weight: 400;
}
.stock-row-current {
  display: flex;
  align-items: center;
  gap: 10px;
}
.stock-row-num {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.15;
}
.stock-row-num strong {
  font-size: 18px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--ink-900);
}
.stock-row.critical .stock-row-num strong { color: var(--danger); }
.stock-row.low .stock-row-num strong { color: var(--accent-strong); }
.stock-row-num small {
  font-size: 11px;
  color: var(--ink-500);
  font-weight: 500;
}
.counted-mark {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--ok);
  color: #fff;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.stock-row-edit {
  padding: 4px 18px 16px 70px;
  border-top: 1px dashed var(--line);
}
.edit-grid {
  display: grid;
  grid-template-columns: minmax(180px, 0.7fr) minmax(180px, 0.7fr) minmax(220px, 1.2fr);
  gap: 14px;
  margin-top: 12px;
}
.edit-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  flex-wrap: wrap;
}
.muted-meta {
  font-size: 11.5px;
  color: var(--ink-500);
  margin-left: auto;
}
.muted-meta strong {
  color: var(--ink-800);
  font-weight: 600;
}

@media (max-width: 700px) {
  .stock-row-head { padding: 12px 14px; gap: 11px; }
  .stock-row-head .product-tile { display: none; }
  .stock-row-edit { padding: 4px 14px 14px; }
  .edit-grid { grid-template-columns: 1fr 1fr; }
  .edit-grid .field:last-child { grid-column: 1 / -1; }
  .edit-actions { flex-direction: column; align-items: stretch; }
  .muted-meta { margin-left: 0; }
}

/* Number stepper */
.num-stepper {
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  overflow: hidden;
  transition: border-color 0.12s, box-shadow 0.12s;
}
.num-stepper:focus-within {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(13, 110, 94, 0.12);
}
.num-stepper input {
  flex: 1;
  height: 38px;
  border: 0;
  text-align: center;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  font-size: 15px;
  background: transparent;
  color: var(--ink-900);
  min-width: 0;
}
.num-stepper input:focus { outline: 0; }
.num-stepper button {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  color: var(--ink-700);
  background: var(--surface-soft);
  transition: background 0.12s;
}
.num-stepper button:hover {
  background: var(--brand-soft);
  color: var(--brand-strong);
}
.num-stepper button:first-child { border-right: 1px solid var(--line); }
.num-stepper button:last-child { border-left: 1px solid var(--line); }

/* Sticky save bar */
.sticky-save-bar {
  display: none;
}
@media (max-width: 960px) {
  .sticky-save-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    position: fixed;
    bottom: 76px;
    left: 12px;
    right: 12px;
    z-index: 20;
    background: var(--ink-900);
    color: #fff;
    padding: 12px 14px;
    border-radius: var(--r-md);
    box-shadow: var(--shadow-lg);
  }
  .ssb-info { flex: 1; font-size: 13.5px; color: #d8e3df; }
  .ssb-info strong { color: #fff; font-weight: 600; font-variant-numeric: tabular-nums; }
  .ssb-info small { font-size: 12px; color: #94a59f; margin-left: 4px; }
  .sticky-save-bar .btn { height: 38px; }
}
`;

Object.assign(window, { StockCount, StockRow, STOCK_STYLES: stockStyles });
