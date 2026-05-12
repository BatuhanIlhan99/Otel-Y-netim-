// ============================================================
// Dashboard / Komuta Paneli
// ============================================================

function Dashboard({ currentUser, onNavigate }) {
  const isAdmin = currentUser.role === "admin";

  // Computed stats from data
  const criticalProducts = PRODUCTS.filter(p => p.stock < p.min);
  const pendingOrders = ORDER_REQUESTS.filter(o => o.status === "pending");
  const completedToday = RECENT_COUNTS.filter(c => !c.pending).length;
  const totalSpend = PRODUCTS.reduce((s, p) => s + p.usedToday * p.price, 0);

  return (
    <div className="col gap-lg" data-screen-label="02 Dashboard">

      <header className="page-head">
        <div className="page-head-titles">
          <span className="eyebrow">Komuta Paneli</span>
          <h1 className="page-title">
            {isAdmin ? "Günaydın, Mehmet" : `Merhaba, ${currentUser.name.split(" ")[0]}`} 👋
          </h1>
          <span className="page-sub">{todayStr()} · Operasyon durumu özet</span>
        </div>
        <div className="page-head-meta">
          <div className="meta-chip">
            <small><span className="meta-chip-live-dot" />Canlı</small>
            <strong>Otomasyon aktif</strong>
          </div>
          <div className="meta-chip">
            <small>Sayım Penceresi</small>
            <strong>08:00 – 11:00</strong>
          </div>
          <button className="btn"><Icon name="send" size={15} />Günlük raporu gönder</button>
        </div>
      </header>

      {/* KPI strip */}
      <div className="kpi-grid">
        <Kpi
          icon="alert" iconCls="danger"
          label="Kritik stok"
          value={criticalProducts.length}
          suffix="kalem"
          trend={{ dir: "up", text: "+2 dün" }}
          foot={`${criticalProducts.filter(p => p.stock <= p.min*0.5).length} adet acil müdahale`}
        />
        <Kpi
          icon="package" iconCls="warn"
          label="Bekleyen sipariş"
          value={pendingOrders.length}
          suffix="talep"
          trend={{ dir: "flat", text: "—" }}
          foot={`${pendingOrders.reduce((s,o)=>s+o.qty,0)} kalem · onay bekliyor`}
        />
        <Kpi
          icon="check" iconCls="ok"
          label="Bugünkü sayım"
          value={`${completedToday}/${DEPARTMENTS.length}`}
          trend={{ dir: "up", text: "Hızda" }}
          foot="1 departman bekliyor"
        />
        <Kpi
          icon="trend_up" iconCls="brand"
          label="Günlük kullanım"
          value={fmtMoney(totalSpend)}
          trend={{ dir: "down", text: "−8% hafta" }}
          foot="Tahmini günlük tüketim değeri"
        />
      </div>

      {/* Critical alert banner */}
      {criticalProducts.length > 0 && (
        <CriticalBanner products={criticalProducts.slice(0, 4)} onView={() => onNavigate("orders")} />
      )}

      <div className="grid-2-1">
        {/* Department status */}
        <div className="card card-elev">
          <div className="card-head">
            <div className="card-head-titles">
              <div className="card-title">Departman Durumu</div>
              <div className="card-sub">Bugünkü sayım ve kritik stok durumu</div>
            </div>
            <div className="card-actions">
              <button className="btn-ghost btn btn-sm"><Icon name="refresh" size={14} />Yenile</button>
            </div>
          </div>
          <div className="dept-rows">
            {DEPARTMENTS.map(d => {
              const count = RECENT_COUNTS.find(c => c.dept === d.id);
              const deptProducts = PRODUCTS.filter(p => p.dept === d.id);
              const critical = deptProducts.filter(p => p.stock < p.min).length;
              return (
                <button key={d.id} className="dept-row" onClick={() => onNavigate("stock", d.id)}>
                  <div className="dept-row-mark">
                    <div className={`product-tile ${d.color}`}>{d.short}</div>
                  </div>
                  <div className="dept-row-info">
                    <strong>{d.name}</strong>
                    <small>{deptProducts.length} ürün takipte</small>
                  </div>
                  <div className="dept-row-status">
                    {count?.pending ? (
                      <span className="badge badge-warn">Sayım bekliyor</span>
                    ) : (
                      <span className="badge badge-ok">Tamamlandı · {count?.time}</span>
                    )}
                  </div>
                  <div className="dept-row-crit">
                    {critical > 0 ? (
                      <span className="dept-crit">
                        <Icon name="alert" size={13} />
                        <strong>{critical}</strong>
                        <small>kritik</small>
                      </span>
                    ) : (
                      <span className="dept-crit muted">
                        <Icon name="check" size={13} />
                        <small>Stok yeterli</small>
                      </span>
                    )}
                  </div>
                  <Icon name="arrow_right" size={16} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Activity feed */}
        <div className="card card-elev">
          <div className="card-head">
            <div className="card-head-titles">
              <div className="card-title">Son Hareketler</div>
              <div className="card-sub">Bugün, 11:00 itibarıyla</div>
            </div>
            <button className="btn-ghost btn btn-sm">Tümü</button>
          </div>
          <div className="activity-list">
            {ACTIVITY.map((a, i) => (
              <div key={i} className={`activity-item ${a.level || ""}`}>
                <div className={`activity-icon ${a.level === "danger" ? "danger" : ""}`}>
                  <Icon name={a.icon} size={14} />
                </div>
                <div className="activity-body">
                  <p>{a.text}</p>
                  <span>{a.time} · {a.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions + Mini-chart placeholder */}
      <div className="grid-1-2">
        <div className="card card-elev quick-actions">
          <div className="card-head">
            <div className="card-head-titles">
              <div className="card-title">Hızlı eylemler</div>
              <div className="card-sub">En sık kullanılan işlemler</div>
            </div>
          </div>
          <div className="card-body">
            <div className="quick-actions-grid">
              <QuickAction icon="stock" label="Sayım başlat" sub="Departman seç" onClick={() => onNavigate("stock")} />
              <QuickAction icon="orders" label="Sipariş onayla" sub={`${pendingOrders.length} bekliyor`} onClick={() => onNavigate("orders")} accent />
              <QuickAction icon="reports" label="Günlük rapor" sub="CSV indir" onClick={() => onNavigate("reports")} />
              <QuickAction icon="mail" label="Yöneticiye yolla" sub="Otomatik mail" onClick={() => onNavigate("mail")} />
            </div>
          </div>
        </div>

        <div className="card card-elev">
          <div className="card-head">
            <div className="card-head-titles">
              <div className="card-title">Haftalık kritik stok eğilimi</div>
              <div className="card-sub">Son 7 gün · departman bazlı</div>
            </div>
            <div className="card-actions">
              <div className="segmented">
                <button className="on">7G</button>
                <button>30G</button>
                <button>90G</button>
              </div>
            </div>
          </div>
          <div className="card-body" style={{ paddingTop: 6 }}>
            <MiniChart />
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ icon, iconCls, label, value, suffix, trend, foot }) {
  return (
    <div className="kpi">
      <div className="kpi-label">
        <div className={`kpi-icon ${iconCls || ""}`}><Icon name={icon} size={14} /></div>
        {label}
      </div>
      <div className="kpi-value">
        {value}
        {suffix && <small>{suffix}</small>}
      </div>
      <div className="kpi-foot">
        {trend && (
          <span className={`kpi-trend ${trend.dir}`}>
            {trend.dir === "up" && <Icon name="arrow_up" size={11} />}
            {trend.dir === "down" && <Icon name="arrow_down" size={11} />}
            {trend.text}
          </span>
        )}
        <span>{foot}</span>
      </div>
    </div>
  );
}

function CriticalBanner({ products, onView }) {
  return (
    <div className="critical-banner">
      <div className="critical-icon">
        <Icon name="alert" size={20} />
      </div>
      <div className="critical-body">
        <strong>{products.length} kalem kritik stok seviyesinde — sipariş açılması öneriliyor</strong>
        <div className="critical-items">
          {products.map(p => (
            <span key={p.id} className="critical-pill">
              <strong>{p.name}</strong>
              <span className="tnum">{p.stock} / {p.min} {p.unit}</span>
            </span>
          ))}
        </div>
      </div>
      <button className="btn" onClick={onView}>
        Siparişleri görüntüle <Icon name="arrow_right" size={14} />
      </button>
    </div>
  );
}

function QuickAction({ icon, label, sub, onClick, accent }) {
  return (
    <button className={`quick-action ${accent ? "accent" : ""}`} onClick={onClick}>
      <div className={`quick-action-icon ${accent ? "accent" : ""}`}>
        <Icon name={icon} size={18} />
      </div>
      <div className="quick-action-body">
        <strong>{label}</strong>
        <small>{sub}</small>
      </div>
      <Icon name="arrow_right" size={14} />
    </button>
  );
}

function MiniChart() {
  // SVG sparkline-style stacked area chart
  // 7 days × 5 departments synthetic data
  const days = ["Pz", "Pt", "Sa", "Çr", "Pr", "Cm", "Bg"];
  const series = [
    { name: "Temizlik", color: "#0d6e5e", data: [3, 4, 3, 5, 4, 6, 4] },
    { name: "Restorant", color: "#c08a3e", data: [2, 3, 4, 2, 3, 4, 2] },
    { name: "Büfe", color: "#3a6db5", data: [1, 1, 2, 1, 2, 1, 1] },
    { name: "Smile", color: "#8b5f1f", data: [1, 0, 1, 2, 1, 1, 1] },
    { name: "Resepsiyon", color: "#2e8a6a", data: [0, 1, 0, 1, 1, 0, 1] },
  ];

  const W = 720, H = 220, PAD = { l: 30, r: 14, t: 14, b: 26 };
  const stacked = days.map((_, i) => series.reduce((s, ser) => s + ser.data[i], 0));
  const maxY = Math.max(...stacked) + 2;
  const stepX = (W - PAD.l - PAD.r) / (days.length - 1);

  let cumulative = days.map(() => 0);

  return (
    <div className="mini-chart-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="mini-chart">
        {/* gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map(t => {
          const y = PAD.t + (H - PAD.t - PAD.b) * t;
          return (
            <g key={t}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="#eef1ef" strokeWidth="1" />
              <text x={PAD.l - 6} y={y + 4} fontSize="10" fill="#8b9893" textAnchor="end">
                {Math.round(maxY * (1 - t))}
              </text>
            </g>
          );
        })}
        {/* x axis labels */}
        {days.map((d, i) => (
          <text key={d} x={PAD.l + i * stepX} y={H - 8} fontSize="11" fill="#6b7975" textAnchor="middle" fontWeight="500">{d}</text>
        ))}
        {/* stacked bars */}
        {days.map((d, i) => {
          const x = PAD.l + i * stepX - 18;
          let bottom = H - PAD.b;
          return series.map((ser, sI) => {
            const v = ser.data[i];
            const h = ((H - PAD.t - PAD.b) / maxY) * v;
            const y = bottom - h;
            const rect = (
              <rect
                key={ser.name + i}
                x={x}
                y={y}
                width="36"
                height={h}
                fill={ser.color}
                opacity={i === 6 ? 1 : 0.7}
                rx={sI === series.length - 1 ? 3 : 0}
              />
            );
            bottom = y;
            return rect;
          });
        })}
      </svg>
      <div className="mini-chart-legend">
        {series.map(s => (
          <div key={s.name} className="legend-item">
            <span style={{ background: s.color }} />
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
}

// Dashboard-specific styles
const dashboardStyles = `
.grid-2-1 {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 16px;
}
.grid-1-2 {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
  gap: 16px;
}
@media (max-width: 960px) {
  .grid-2-1, .grid-1-2 { grid-template-columns: 1fr; }
}

/* Critical banner */
.critical-banner {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: linear-gradient(90deg, var(--danger-tint) 0%, var(--surface) 90%);
  border: 1px solid var(--danger-soft);
  border-left: 4px solid var(--danger);
  border-radius: var(--r-md);
}
.critical-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--danger-soft);
  color: var(--danger);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.critical-body { flex: 1; min-width: 0; }
.critical-body strong {
  display: block;
  color: var(--ink-900);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}
.critical-items {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.critical-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 10px;
  border-radius: var(--r-pill);
  background: var(--surface);
  border: 1px solid var(--danger-soft);
  font-size: 12px;
}
.critical-pill strong {
  color: var(--ink-900);
  font-weight: 600;
  font-size: 12px;
  display: inline;
  margin: 0;
}
.critical-pill span {
  color: var(--danger);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
@media (max-width: 700px) {
  .critical-banner { flex-direction: column; align-items: stretch; }
  .critical-banner .btn { width: 100%; }
}

/* Department rows */
.dept-rows { display: flex; flex-direction: column; }
.dept-row {
  display: grid;
  grid-template-columns: auto minmax(0,1fr) auto auto auto;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--line-soft);
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background 0.12s;
  width: 100%;
}
.dept-row:hover { background: #fafbfa; }
.dept-row:last-child { border-bottom: 0; }
.dept-row-info { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.dept-row-info strong { font-size: 14px; font-weight: 600; color: var(--ink-900); }
.dept-row-info small { font-size: 12px; color: var(--ink-500); }
.dept-row-status { min-width: 130px; text-align: right; }
.dept-row-crit { min-width: 110px; text-align: right; }
.dept-crit {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--danger);
  font-size: 12px;
}
.dept-crit strong { font-weight: 600; font-variant-numeric: tabular-nums; font-size: 13px; }
.dept-crit small { color: var(--ink-500); font-weight: 500; }
.dept-crit.muted { color: var(--ok); }
.dept-crit.muted small { color: var(--ink-500); }

@media (max-width: 700px) {
  .dept-row {
    grid-template-columns: auto minmax(0,1fr) auto;
    padding: 12px 14px;
    gap: 10px;
  }
  .dept-row-status, .dept-row-crit { display: none; }
}

/* Activity feed */
.activity-list { padding: 4px 0; }
.activity-item {
  display: flex;
  gap: 12px;
  padding: 11px 18px;
  border-bottom: 1px solid var(--line-soft);
}
.activity-item:last-child { border-bottom: 0; }
.activity-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--surface-soft);
  color: var(--ink-600);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  margin-top: 1px;
}
.activity-icon.danger { background: var(--danger-soft); color: var(--danger); }
.activity-body { flex: 1; }
.activity-body p {
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ink-800);
  margin: 0 0 2px;
}
.activity-body span {
  font-size: 11.5px;
  color: var(--ink-500);
  font-weight: 500;
}

/* Quick actions */
.quick-actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.quick-action {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  cursor: pointer;
  transition: all 0.12s;
  text-align: left;
}
.quick-action:hover {
  border-color: var(--brand);
  background: var(--brand-tint);
  transform: translateY(-1px);
}
.quick-action-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--brand-soft);
  color: var(--brand);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.quick-action-icon.accent { background: var(--accent-soft); color: var(--accent-strong); }
.quick-action-body { flex: 1; min-width: 0; }
.quick-action-body strong {
  display: block;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink-900);
}
.quick-action-body small {
  font-size: 11.5px;
  color: var(--ink-500);
}
@media (max-width: 480px) {
  .quick-actions-grid { grid-template-columns: 1fr; }
}

/* Mini chart */
.mini-chart-wrap { padding: 6px 4px 0; }
.mini-chart { width: 100%; height: auto; display: block; }
.mini-chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 10px 4px 0;
  border-top: 1px solid var(--line-soft);
  margin-top: 8px;
}
.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--ink-600);
}
.legend-item span {
  width: 9px;
  height: 9px;
  border-radius: 2px;
}
`;

Object.assign(window, { Dashboard, Kpi, CriticalBanner, QuickAction, MiniChart, DASHBOARD_STYLES: dashboardStyles });
