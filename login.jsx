// ============================================================
// Login Screen
// ============================================================

function LoginScreen({ onLogin }) {
  const [username, setUsername] = React.useState("admin");
  const [password, setPassword] = React.useState("admin123");
  const [showPass, setShowPass] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const demoUsers = [
    { user: "admin",      pass: "admin123",        role: "Yönetici" },
    { user: "satinalma",  pass: "SatinAlma2026",   role: "Satın Alma" },
    { user: "operasyon",  pass: "Operasyon2026",   role: "Operasyon" },
    { user: "temizlik",   pass: "Temizlik2026",    role: "Temizlik" },
    { user: "mutfak",     pass: "Mutfak2026",      role: "Restorant" },
    { user: "bufe",       pass: "Bufe2026",        role: "Büfe" },
    { user: "smile",      pass: "1234",            role: "Smile" },
    { user: "resepsiyon", pass: "Resepsiyon2026",  role: "Resepsiyon" },
  ];

  function submit(e) {
    e?.preventDefault();
    setErr("");
    setLoading(true);
    setTimeout(() => {
      const result = authenticate(username, password);
      if (!result.ok) {
        setErr(result.error || "Giriş başarısız.");
        setLoading(false);
        return;
      }
      onLogin(result.user);
    }, 380);
  }

  function quickFill(user, pass) {
    setUsername(user);
    setPassword(pass);
    setErr("");
  }

  return (
    <div className="login-page" data-screen-label="01 Login">
      <div className="login-card">
        <aside className="login-aside">
          <div className="login-brand">
            <div className="rail-mark" style={{ width: 44, height: 44, fontSize: 14 }}>OY</div>
            <div>
              <div className="login-brand-name">Otel Yönetim</div>
              <div className="login-brand-org">Gülplaj Resort & Hotel</div>
            </div>
          </div>

          <div className="login-aside-body">
            <div className="login-eyebrow">Operasyon Yönetim Sistemi</div>
            <h1 className="login-headline">
              Stok, sipariş ve departman akışını <em>tek panelden</em> yönetin.
            </h1>
            <p className="login-lede">
              Her departmanın günlük sayım ve sipariş süreçlerini tek noktada görün. Kritik stok durumlarını anında izleyin, raporları otomatik yöneticiye iletin.
            </p>

            <div className="login-features">
              <div className="login-feat">
                <Icon name="package" size={16} />
                <span>5 departman · 600+ ürün kataloğu</span>
              </div>
              <div className="login-feat">
                <Icon name="alert" size={16} />
                <span>Anlık kritik stok uyarıları</span>
              </div>
              <div className="login-feat">
                <Icon name="mail" size={16} />
                <span>Otomatik yönetici raporu &amp; SMTP</span>
              </div>
            </div>
          </div>

          <div className="login-aside-foot">
            <div>
              <strong className="tnum">v2.0</strong>
              <small>Sürüm</small>
            </div>
            <div>
              <strong>
                <span className="meta-chip-live-dot" />
                Çevrimiçi
              </strong>
              <small>Bulut backend</small>
            </div>
          </div>
        </aside>

        <form className="login-form-wrap" onSubmit={submit}>
          <div className="login-form-head">
            <h2>Oturum aç</h2>
            <p>Kullanıcı bilgilerinizle giriş yapın.</p>
          </div>

          <div className="field">
            <label className="field-label">Kullanıcı adı</label>
            <div className="input-with-icon">
              <span className="input-icon"><Icon name="user" size={16} /></span>
              <input
                className="input"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="örn. admin"
                autoFocus
              />
            </div>
          </div>

          <div className="field">
            <label className="field-label">
              Parola
              <span className="spacer" />
              <button type="button" className="link-mini" onClick={() => alert("Yöneticiye danışın.")}>Unuttum</button>
            </label>
            <div className="input-with-icon" style={{ position: "relative" }}>
              <span className="input-icon"><Icon name="shield" size={16} /></span>
              <input
                className="input"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingRight: 40 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={{
                  position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                  width: 28, height: 28, borderRadius: 6, color: "var(--ink-500)",
                  display: "grid", placeItems: "center",
                }}
              >
                <Icon name="eye" size={15} />
              </button>
            </div>
          </div>

          <label className="toggle" style={{ marginTop: 2 }}>
            <input type="checkbox" defaultChecked />
            <span className="toggle-track"></span>
            <span className="toggle-label">Bu cihazda beni hatırla</span>
          </label>

          {err && (
            <div className="notice danger" style={{ marginTop: 4 }}>
              <Icon name="alert" />
              <div className="notice-body">{err}</div>
            </div>
          )}

          <button className="btn btn-lg btn-block" type="submit" disabled={loading}>
            {loading ? "Giriş yapılıyor..." : "Giriş yap"}
            {!loading && <Icon name="arrow_right" size={16} />}
          </button>

          <div className="login-divider"><span>Demo girişleri</span></div>

          <div className="login-demo">
            {demoUsers.map(d => (
              <button
                key={d.user}
                type="button"
                className="login-demo-chip"
                onClick={() => quickFill(d.user, d.pass)}
              >
                <div className="login-demo-tag">{d.role}</div>
                <div className="login-demo-user">{d.user}</div>
              </button>
            ))}
          </div>

          <div className="login-form-foot">
            Sorun yaşıyorsanız <a href="#">yönetici@otel.com</a> adresine yazın.
          </div>
        </form>
      </div>
    </div>
  );
}

// Login-specific styles injected via <style> tag — kept here to keep login self-contained
const loginStyles = `
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 18px;
  background:
    radial-gradient(1200px 600px at 80% -10%, rgba(13, 110, 94, 0.08), transparent 60%),
    radial-gradient(900px 500px at -10% 110%, rgba(192, 138, 62, 0.08), transparent 60%),
    var(--bg-warm);
}
.login-card {
  width: min(1080px, 100%);
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  background: var(--surface);
  border-radius: var(--r-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--line);
}
.login-aside {
  background:
    radial-gradient(800px 500px at 10% 10%, rgba(192, 138, 62, 0.2), transparent 55%),
    linear-gradient(160deg, #0e2823 0%, #0f3833 55%, #0c2520 100%);
  color: #e6efec;
  padding: 38px 38px 32px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  position: relative;
  overflow: hidden;
}
.login-aside::after {
  content: "";
  position: absolute;
  inset: auto -40px -160px auto;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(192,138,62,0.16), transparent);
  pointer-events: none;
}
.login-aside > * { position: relative; z-index: 1; }

.login-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.login-brand-name { color: #fff; font-weight: 600; font-size: 16px; letter-spacing: -0.005em; }
.login-brand-org { color: #9eb6b0; font-size: 12.5px; margin-top: 1px; }

.login-aside-body { flex: 1; display: flex; flex-direction: column; gap: 16px; justify-content: center; }
.login-eyebrow {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}
.login-headline {
  color: #fff;
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.025em;
  margin: 4px 0 0;
  max-width: 460px;
  text-wrap: pretty;
}
.login-headline em {
  font-style: normal;
  background: linear-gradient(90deg, var(--accent), #e2b56b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.login-lede {
  color: #b8c8c3;
  font-size: 14px;
  line-height: 1.55;
  max-width: 440px;
}
.login-features { display: flex; flex-direction: column; gap: 10px; margin-top: 12px; }
.login-feat {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #cad7d2;
}
.login-feat svg {
  width: 28px;
  height: 28px;
  padding: 6px;
  border-radius: 8px;
  background: rgba(255,255,255,0.06);
  color: var(--accent);
}

.login-aside-foot {
  display: flex;
  gap: 14px;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 18px;
}
.login-aside-foot > div { display: flex; flex-direction: column; gap: 2px; }
.login-aside-foot strong { color: #fff; font-size: 14px; font-weight: 600; display: flex; align-items: center; }
.login-aside-foot small { color: #94a59f; font-size: 11.5px; }

.login-form-wrap {
  padding: 44px 42px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-content: center;
  justify-content: center;
}
.login-form-head { margin-bottom: 6px; }
.login-form-head h2 { font-size: 24px; font-weight: 600; letter-spacing: -0.018em; margin: 0; color: var(--ink-900); }
.login-form-head p { color: var(--ink-500); font-size: 13.5px; margin-top: 4px; }

.link-mini { color: var(--brand); font-size: 12px; font-weight: 600; cursor: pointer; }
.link-mini:hover { color: var(--brand-strong); text-decoration: underline; }

.login-divider {
  display: flex; align-items: center; gap: 12px;
  color: var(--ink-400);
  font-size: 11.5px;
  font-weight: 500;
  margin: 4px 0;
  letter-spacing: 0.02em;
}
.login-divider::before, .login-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--line);
}

.login-demo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}
.login-demo-chip {
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 8px 10px;
  background: var(--surface);
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: all 0.12s;
  cursor: pointer;
}
.login-demo-chip:hover {
  border-color: var(--brand);
  background: var(--brand-tint);
}
.login-demo-tag {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-500);
}
.login-demo-user {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink-900);
  font-family: var(--font-mono);
}

.login-form-foot {
  text-align: center;
  font-size: 12px;
  color: var(--ink-500);
  margin-top: 6px;
}
.login-form-foot a { color: var(--brand); font-weight: 600; }

@media (max-width: 880px) {
  .login-card { grid-template-columns: 1fr; }
  .login-aside { padding: 28px 24px; }
  .login-headline { font-size: 26px; }
  .login-aside-body { gap: 12px; }
  .login-features { display: none; }
  .login-aside-foot { display: none; }
  .login-form-wrap { padding: 28px 22px; }
}
`;

window.LoginScreen = LoginScreen;
window.LOGIN_STYLES = loginStyles;
