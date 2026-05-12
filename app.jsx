// ============================================================
// App Shell — sidebar, mobile nav, routing
// ============================================================

const NAV_ITEMS = [
  { id: "dashboard", label: "Komuta Paneli", icon: "dashboard", roles: ["admin", "departman"] },
  { id: "stock", label: "Stok Sayım", icon: "stock", roles: ["admin", "departman"] },
  { id: "orders", label: "Sipariş Talepleri", icon: "orders", roles: ["admin", "departman"], badge: "danger" },
  { id: "reports", label: "Günlük Rapor", icon: "reports", roles: ["admin"] },
];

const ADMIN_NAV = [
  { id: "products", label: "Ürün Yönetimi", icon: "products", roles: ["admin"] },
  { id: "users", label: "Kullanıcı Yönetimi", icon: "user", roles: ["admin"] },
  { id: "mail", label: "Mail & Otomasyon", icon: "mail", roles: ["admin"] },
];

const MOBILE_NAV = [
  { id: "dashboard", label: "Panel", icon: "dashboard" },
  { id: "stock", label: "Sayım", icon: "stock" },
  { id: "orders", label: "Sipariş", icon: "orders", badge: true },
  { id: "reports", label: "Rapor", icon: "reports" },
  { id: "more", label: "Daha", icon: "more" },
];

function App() {
  const [user, setUser] = React.useState(null);
  const [route, setRoute] = React.useState("dashboard");
  const [stockDept, setStockDept] = React.useState(null);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  // Tweaks state
  const [tweaks, setTweaks] = React.useState({
    accent: "#c08a3e",
    brand: "#0d6e5e",
    density: "balanced", // compact | balanced | airy
    radius: "soft", // sharp | soft | round
    sidebar: "dark", // dark | light
  });

  React.useEffect(() => {
    // Edit mode protocol
    function onMsg(e) {
      if (e.data?.type === "__activate_edit_mode") setTweaksOpen(true);
      if (e.data?.type === "__deactivate_edit_mode") setTweaksOpen(false);
    }
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Apply tweaks to root
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--brand", tweaks.brand);
    root.style.setProperty("--accent", tweaks.accent);
    // Density
    if (tweaks.density === "compact") {
      root.style.setProperty("--r-md", "8px");
      root.style.setProperty("--r-lg", "10px");
    } else if (tweaks.density === "airy") {
      root.style.setProperty("--r-md", "14px");
      root.style.setProperty("--r-lg", "18px");
    } else {
      root.style.setProperty("--r-md", "12px");
      root.style.setProperty("--r-lg", "16px");
    }
    // Radius
    const rmap = {
      sharp: { sm: "4px", md: "6px", lg: "8px" },
      soft: { sm: "8px", md: "12px", lg: "16px" },
      round: { sm: "12px", md: "18px", lg: "24px" },
    }[tweaks.radius];
    root.style.setProperty("--r-sm", rmap.sm);
    root.style.setProperty("--r-md", rmap.md);
    root.style.setProperty("--r-lg", rmap.lg);
    // Sidebar mode
    if (tweaks.sidebar === "light") {
      root.style.setProperty("--rail-bg", "#ffffff");
      root.style.setProperty("--rail-bg-2", "#f4f6f4");
      root.style.setProperty("--rail-text", "#2f3d3a");
      root.style.setProperty("--rail-text-strong", "#0d1815");
      root.style.setProperty("--rail-muted", "#6b7975");
      root.style.setProperty("--rail-line", "#e7eae8");
      root.style.setProperty("--rail-hover", "#f0f3f1");
      root.style.setProperty("--rail-active", "#e6f0ed");
    } else {
      root.style.setProperty("--rail-bg", "#0f221e");
      root.style.setProperty("--rail-bg-2", "#0a1916");
      root.style.setProperty("--rail-text", "#d8e3df");
      root.style.setProperty("--rail-text-strong", "#ffffff");
      root.style.setProperty("--rail-muted", "#94a59f");
      root.style.setProperty("--rail-line", "rgba(255,255,255,0.08)");
      root.style.setProperty("--rail-hover", "rgba(255,255,255,0.06)");
      root.style.setProperty("--rail-active", "rgba(255,255,255,0.12)");
    }
  }, [tweaks]);

  if (!user) {
    return <LoginScreen onLogin={u => { setUser(u); setRoute("dashboard"); }} />;
  }

  function navigate(target, payload) {
    if (target === "stock" && payload) setStockDept(payload);
    setRoute(target);
    setMoreOpen(false);
  }

  let currentScreen;
  switch (route) {
    case "dashboard": currentScreen = <Dashboard currentUser={user} onNavigate={navigate} />; break;
    case "stock": currentScreen = <StockCount currentUser={user} selectedDept={stockDept} onNavigate={navigate} />; break;
    case "orders": currentScreen = <Orders currentUser={user} onNavigate={navigate} />; break;
    case "reports": currentScreen = <Reports onNavigate={navigate} />; break;
    case "products": currentScreen = <AdminProducts onNavigate={navigate} />; break;
    case "users": currentScreen = <AdminUsers />; break;
    case "mail": currentScreen = <MailSettings />; break;
    default: currentScreen = <Dashboard currentUser={user} onNavigate={navigate} />;
  }

  const allNav = [...NAV_ITEMS, ...ADMIN_NAV].filter(n => n.roles.includes(user.role));
  const pendingOrdersCount = ORDER_REQUESTS.filter(o => o.status === "pending").length;

  return (
    <div className="app-shell">
      {/* Desktop Sidebar */}
      <aside className="rail">
        <div className="rail-brand">
          <div className="rail-mark">OY</div>
          <div className="rail-brand-text">
            <strong>Otel Yönetim</strong>
            <small>Gülplaj Resort</small>
          </div>
        </div>

        <nav className="rail-nav">
          <div className="rail-section-label">Operasyon</div>
          {NAV_ITEMS.filter(n => n.roles.includes(user.role)).map(n => (
            <button
              key={n.id}
              className={`rail-link ${route === n.id ? "active" : ""}`}
              onClick={() => navigate(n.id)}
            >
              <Icon name={n.icon} size={17} />
              {n.label}
              {n.id === "orders" && pendingOrdersCount > 0 && (
                <span className="rail-badge">{pendingOrdersCount}</span>
              )}
            </button>
          ))}
        </nav>

        {user.role === "admin" && (
          <nav className="rail-nav">
            <div className="rail-section-label">Yönetici</div>
            {ADMIN_NAV.map(n => (
              <button
                key={n.id}
                className={`rail-link ${route === n.id ? "active" : ""}`}
                onClick={() => navigate(n.id)}
              >
                <Icon name={n.icon} size={17} />
                {n.label}
              </button>
            ))}
          </nav>
        )}

        <div className="rail-user">
          <div className="rail-avatar">{initials(user.name)}</div>
          <div className="rail-user-info">
            <strong>{user.name}</strong>
            <small>{user.role === "admin" ? "Yönetici" : deptById(user.department)?.name}</small>
          </div>
          <button onClick={() => setUser(null)} title="Çıkış"><Icon name="logout" size={14} /></button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <div className="mobile-brand">
          <div className="rail-mark">OY</div>
          <strong>Otel Yönetim</strong>
        </div>
        <div className="mobile-topbar-actions">
          <button className="mobile-icon-btn">
            <Icon name="bell" />
            <span className="dot" />
          </button>
          <button className="mobile-icon-btn" onClick={() => setUser(null)} title="Çıkış">
            <Icon name="logout" />
          </button>
        </div>
      </div>

      <main className="main">
        {currentScreen}
      </main>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav">
        {MOBILE_NAV.map(n => {
          if (n.id === "more") {
            return (
              <button key={n.id} className={moreOpen ? "on" : ""} onClick={() => setMoreOpen(o => !o)}>
                <Icon name="menu" />
                <span>{n.label}</span>
              </button>
            );
          }
          return (
            <button
              key={n.id}
              className={route === n.id ? "on" : ""}
              onClick={() => navigate(n.id)}
              style={{position: "relative"}}
            >
              <Icon name={n.icon} />
              {n.badge && pendingOrdersCount > 0 && (
                <span style={{position: "absolute", top: 4, right: 22, width: 8, height: 8, borderRadius: 4, background: "var(--danger)"}} />
              )}
              <span>{n.label}</span>
            </button>
          );
        })}
      </nav>

      {/* More menu sheet (mobile admin links) */}
      {moreOpen && (
        <div className="more-sheet" onClick={() => setMoreOpen(false)}>
          <div className="more-sheet-content" onClick={e => e.stopPropagation()}>
            <div className="more-sheet-handle" />
            <div className="more-sheet-title">Daha fazla</div>
            {user.role === "admin" && ADMIN_NAV.map(n => (
              <button key={n.id} className="more-sheet-item" onClick={() => navigate(n.id)}>
                <div className="more-sheet-icon"><Icon name={n.icon} /></div>
                <span>{n.label}</span>
                <Icon name="arrow_right" size={14} />
              </button>
            ))}
            <button className="more-sheet-item danger" onClick={() => setUser(null)}>
              <div className="more-sheet-icon"><Icon name="logout" /></div>
              <span>Çıkış yap</span>
            </button>
          </div>
        </div>
      )}

      {/* Tweaks panel */}
      {tweaksOpen && (
        <TweaksPanel
          tweaks={tweaks}
          setTweaks={setTweaks}
          onClose={() => {
            setTweaksOpen(false);
            window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
          }}
        />
      )}
    </div>
  );
}

// Tweaks panel
function TweaksPanel({ tweaks, setTweaks, onClose }) {
  function update(key, value) {
    setTweaks(t => ({ ...t, [key]: value }));
  }

  const brandSwatches = [
    { name: "Zümrüt", value: "#0d6e5e" },
    { name: "Lacivert", value: "#1c3d6e" },
    { name: "Bordo", value: "#7a2e3e" },
    { name: "Kömür", value: "#2a2e2e" },
  ];
  const accentSwatches = [
    { name: "Altın", value: "#c08a3e" },
    { name: "Bakır", value: "#b06030" },
    { name: "Şampanya", value: "#a89060" },
    { name: "Hardal", value: "#a18030" },
  ];

  return (
    <div className="tweaks-panel">
      <div className="tweaks-head">
        <strong>Tweaks</strong>
        <button onClick={onClose}><Icon name="x" size={16} /></button>
      </div>
      <div className="tweaks-body">
        <div className="tweak-section">
          <label>Marka rengi</label>
          <div className="swatch-row">
            {brandSwatches.map(s => (
              <button
                key={s.value}
                className={`swatch ${tweaks.brand === s.value ? "on" : ""}`}
                style={{background: s.value}}
                onClick={() => update("brand", s.value)}
                title={s.name}
              />
            ))}
          </div>
        </div>
        <div className="tweak-section">
          <label>Aksan rengi</label>
          <div className="swatch-row">
            {accentSwatches.map(s => (
              <button
                key={s.value}
                className={`swatch ${tweaks.accent === s.value ? "on" : ""}`}
                style={{background: s.value}}
                onClick={() => update("accent", s.value)}
                title={s.name}
              />
            ))}
          </div>
        </div>
        <div className="tweak-section">
          <label>Yoğunluk</label>
          <div className="segmented" style={{width: "100%"}}>
            {[
              { id: "compact", label: "Kompakt" },
              { id: "balanced", label: "Dengeli" },
              { id: "airy", label: "Ferah" },
            ].map(o => (
              <button key={o.id} className={tweaks.density === o.id ? "on" : ""} onClick={() => update("density", o.id)} style={{flex: 1}}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <div className="tweak-section">
          <label>Köşe yuvarlaklığı</label>
          <div className="segmented" style={{width: "100%"}}>
            {[
              { id: "sharp", label: "Keskin" },
              { id: "soft", label: "Yumuşak" },
              { id: "round", label: "Yuvarlak" },
            ].map(o => (
              <button key={o.id} className={tweaks.radius === o.id ? "on" : ""} onClick={() => update("radius", o.id)} style={{flex: 1}}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <div className="tweak-section">
          <label>Sidebar</label>
          <div className="segmented" style={{width: "100%"}}>
            <button className={tweaks.sidebar === "dark" ? "on" : ""} onClick={() => update("sidebar", "dark")} style={{flex: 1}}>Koyu</button>
            <button className={tweaks.sidebar === "light" ? "on" : ""} onClick={() => update("sidebar", "light")} style={{flex: 1}}>Açık</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const shellExtraStyles = `
/* More sheet (mobile) */
.more-sheet {
  position: fixed;
  inset: 0;
  background: rgba(13, 24, 21, 0.5);
  z-index: 60;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.more-sheet-content {
  width: 100%;
  max-width: 480px;
  background: var(--surface);
  border-radius: var(--r-lg) var(--r-lg) 0 0;
  padding: 18px 0;
  margin-bottom: 70px;
  box-shadow: var(--shadow-lg);
}
.more-sheet-handle {
  width: 40px;
  height: 4px;
  background: var(--line-strong);
  border-radius: 4px;
  margin: 0 auto 14px;
}
.more-sheet-title {
  padding: 0 18px 12px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-500);
}
.more-sheet-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 18px;
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-800);
}
.more-sheet-item:hover { background: var(--surface-soft); }
.more-sheet-item.danger { color: var(--danger); border-top: 1px solid var(--line-soft); margin-top: 8px; padding-top: 16px; }
.more-sheet-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--surface-soft); color: var(--ink-700);
  display: grid; place-items: center;
}
.more-sheet-item.danger .more-sheet-icon { background: var(--danger-soft); color: var(--danger); }
.more-sheet-item span { flex: 1; }

/* Tweaks panel */
.tweaks-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-lg);
  z-index: 100;
  overflow: hidden;
}
.tweaks-head {
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--line-soft);
  background: var(--surface-soft);
}
.tweaks-head strong { font-size: 13px; font-weight: 600; color: var(--ink-900); letter-spacing: 0.04em; text-transform: uppercase; }
.tweaks-head button { color: var(--ink-600); padding: 4px; }
.tweaks-body { padding: 14px; display: flex; flex-direction: column; gap: 14px; }
.tweak-section { display: flex; flex-direction: column; gap: 7px; }
.tweak-section > label {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--ink-700);
}
.swatch-row { display: flex; gap: 6px; }
.swatch {
  width: 32px; height: 32px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
  transition: transform 0.12s;
}
.swatch:hover { transform: scale(1.06); }
.swatch.on {
  border-color: var(--ink-900);
  box-shadow: 0 0 0 2px #fff inset;
}

@media (max-width: 600px) {
  .tweaks-panel {
    bottom: 78px;
    right: 12px;
    left: 12px;
    width: auto;
  }
}
`;

Object.assign(window, { App, TweaksPanel, SHELL_STYLES: shellExtraStyles });
