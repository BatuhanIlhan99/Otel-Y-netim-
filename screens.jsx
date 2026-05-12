// ============================================================
// Orders / Sipariş Talepleri & Kritik Stok
// ============================================================

function Orders({ currentUser, onNavigate }) {
  const [filter, setFilter] = React.useState("all");
  const [orderList, setOrderList] = React.useState(ORDER_REQUESTS);

  const criticalProducts = PRODUCTS.filter(p => p.stock < p.min);

  function setStatus(id, status) {
    setOrderList(list => list.map(o => o.id === id ? { ...o, status } : o));
  }

  const filtered = filter === "all"
    ? orderList
    : orderList.filter(o => o.status === filter);

  const pending = orderList.filter(o => o.status === "pending");
  const approved = orderList.filter(o => o.status === "approved");
  const totalValue = orderList.reduce((s,o) => s + (productById(o.productId)?.price ?? 0) * o.qty, 0);

  return (
    <div className="col gap-lg" data-screen-label="04 Sipariş & Kritik Stok">
      <header className="page-head">
        <div className="page-head-titles">
          <span className="eyebrow">Sipariş Merkezi</span>
          <h1 className="page-title">Kritik Stok & Sipariş Talepleri</h1>
          <span className="page-sub">Onay bekleyen siparişleri yönetin ve kritik stokları izleyin</span>
        </div>
        <div className="page-head-meta">
          <button className="btn btn-ghost"><Icon name="download" size={14} />Excel'e aktar</button>
          <button className="btn"><Icon name="send" size={15} />Tedarikçilere gönder</button>
        </div>
      </header>

      <div className="kpi-grid">
        <Kpi icon="alert" iconCls="danger" label="Kritik stok" value={criticalProducts.length} suffix="kalem" foot={`${criticalProducts.filter(p=>p.stock<=p.min*0.5).length} adet acil`} />
        <Kpi icon="package" iconCls="warn" label="Bekleyen sipariş" value={pending.length} suffix="talep" foot={`${pending.reduce((s,o)=>s+o.qty,0)} kalem`} />
        <Kpi icon="check" iconCls="ok" label="Onaylanmış" value={approved.length} suffix="talep" foot="Bugün tedarikçiye gidecek" />
        <Kpi icon="trend_up" iconCls="brand" label="Toplam tutar" value={fmtMoney(totalValue)} foot="Tahmini sipariş değeri" />
      </div>

      <div className="grid-2-1">
        {/* Pending orders */}
        <div className="card card-elev">
          <div className="card-head">
            <div className="card-head-titles">
              <div className="card-title">Sipariş Talepleri</div>
              <div className="card-sub">Personel tarafından açılan manuel ve otomatik talepler</div>
            </div>
            <div className="filter-chips">
              <button className={`chip ${filter==="all"?"on":""}`} onClick={()=>setFilter("all")}>Tümü <strong>{orderList.length}</strong></button>
              <button className={`chip warn ${filter==="pending"?"on":""}`} onClick={()=>setFilter("pending")}>Bekleyen <strong>{pending.length}</strong></button>
              <button className={`chip ${filter==="approved"?"on":""}`} onClick={()=>setFilter("approved")}>Onaylı <strong>{approved.length}</strong></button>
            </div>
          </div>

          <div className="order-list">
            {filtered.map(o => {
              const p = productById(o.productId);
              const d = deptById(p.dept);
              return (
                <div key={o.id} className="order-card">
                  <div className="order-card-head">
                    <div className={`product-tile ${d.color}`}>{p.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
                    <div className="order-card-info">
                      <strong>{p.name}</strong>
                      <small>{p.spec} · <span style={{color: "var(--brand)"}}>{d.name}</span></small>
                    </div>
                    <div className="order-card-status">
                      {o.status === "pending" && <span className="badge badge-warn">Onay bekliyor</span>}
                      {o.status === "approved" && <span className="badge badge-ok">Onaylandı</span>}
                      {o.status === "rejected" && <span className="badge badge-danger">Reddedildi</span>}
                    </div>
                  </div>

                  <div className="order-card-grid">
                    <div className="order-meta">
                      <small>Talep edilen miktar</small>
                      <strong className="tnum">{o.qty} {p.unit}</strong>
                    </div>
                    <div className="order-meta">
                      <small>Mevcut stok</small>
                      <strong className={`tnum ${p.stock < p.min ? "danger" : ""}`}>{p.stock} / min {p.min}</strong>
                    </div>
                    <div className="order-meta">
                      <small>Tahmini tutar</small>
                      <strong className="tnum">{fmtMoney(o.qty * p.price)}</strong>
                    </div>
                    <div className="order-meta">
                      <small>Tedarikçi</small>
                      <strong>{p.supplier}</strong>
                    </div>
                  </div>

                  <div className="order-card-reason">
                    <Icon name="info" size={13} />
                    <span><strong>Gerekçe:</strong> {o.reason}</span>
                  </div>

                  <div className="order-card-foot">
                    <span className="muted" style={{fontSize: 12}}>
                      <Icon name="user" size={12} style={{verticalAlign: "middle", marginRight: 4}} />
                      {o.requestedBy} · {o.requestedAt}
                    </span>
                    <div className="row gap-sm">
                      {o.status === "pending" ? (
                        <>
                          <button className="btn btn-ghost btn-sm" onClick={() => setStatus(o.id, "rejected")}>
                            <Icon name="x" size={13} />Reddet
                          </button>
                          <button className="btn btn-sm" onClick={() => setStatus(o.id, "approved")}>
                            <Icon name="check" size={13} />Onayla
                          </button>
                        </>
                      ) : (
                        <button className="btn btn-ghost btn-sm" onClick={() => setStatus(o.id, "pending")}>
                          Geri al
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Critical stock side panel */}
        <div className="card card-elev">
          <div className="card-head">
            <div className="card-head-titles">
              <div className="card-title">Kritik Stok ({criticalProducts.length})</div>
              <div className="card-sub">Otomatik sipariş önerisi</div>
            </div>
          </div>
          <div className="critical-list">
            {criticalProducts.map(p => {
              const need = Math.ceil(p.min - p.stock);
              const d = deptById(p.dept);
              return (
                <div key={p.id} className="critical-row">
                  <div className="critical-row-info">
                    <strong>{p.name}</strong>
                    <small>{d.name}</small>
                  </div>
                  <div className="critical-row-stat">
                    <div className="cr-bar">
                      <div className="cr-bar-fill" style={{ width: `${Math.min(100, (p.stock/p.min)*100)}%` }} />
                    </div>
                    <div className="cr-nums">
                      <strong className="tnum">{p.stock}</strong>
                      <span className="tnum muted">/ {p.min} {p.unit}</span>
                    </div>
                  </div>
                  <button className="btn btn-soft btn-sm">+{need} sipariş</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Reports / Günlük Rapor
// ============================================================

function Reports({ onNavigate }) {
  const [date, setDate] = React.useState("today");
  const [tab, setTab] = React.useState("daily");

  const allUsed = PRODUCTS.reduce((s,p) => s + p.usedToday * p.price, 0);
  const criticalProducts = PRODUCTS.filter(p => p.stock < p.min);

  return (
    <div className="col gap-lg" data-screen-label="05 Günlük Rapor">
      <header className="page-head">
        <div className="page-head-titles">
          <span className="eyebrow">Rapor Merkezi</span>
          <h1 className="page-title">Günlük Operasyon Raporu</h1>
          <span className="page-sub">{todayStr()}</span>
        </div>
        <div className="page-head-meta">
          <div className="segmented">
            <button className={date==="today"?"on":""} onClick={()=>setDate("today")}>Bugün</button>
            <button className={date==="yesterday"?"on":""} onClick={()=>setDate("yesterday")}>Dün</button>
            <button className={date==="week"?"on":""} onClick={()=>setDate("week")}>Bu hafta</button>
          </div>
          <button className="btn btn-ghost"><Icon name="calendar" size={14} />Tarih seç</button>
          <button className="btn btn-ghost"><Icon name="download" size={14} />CSV indir</button>
          <button className="btn"><Icon name="send" size={15} />E-posta gönder</button>
        </div>
      </header>

      {/* Executive summary */}
      <div className="report-hero">
        <div className="report-hero-titles">
          <span className="eyebrow">Yönetici Özet</span>
          <h2 style={{fontSize: 22, marginTop: 4, color: "#fff"}}>Gülplaj Resort · {todayStr()}</h2>
          <p style={{color: "#cad7d2", fontSize: 13.5, marginTop: 6}}>
            5 departmanın 4'ü sayımını tamamladı. {criticalProducts.length} kalem acil sipariş bekliyor.
          </p>
        </div>
        <div className="report-hero-stats">
          <div>
            <small>Sayım kapsamı</small>
            <strong className="tnum">132 ürün</strong>
          </div>
          <div>
            <small>Bugünkü tüketim</small>
            <strong className="tnum">{fmtMoney(allUsed)}</strong>
          </div>
          <div>
            <small>Sipariş açılması gereken</small>
            <strong className="tnum">{criticalProducts.length} kalem</strong>
          </div>
        </div>
      </div>

      <div className="report-tabs">
        <button className={tab==="daily"?"on":""} onClick={()=>setTab("daily")}>Günlük sayım</button>
        <button className={tab==="critical"?"on":""} onClick={()=>setTab("critical")}>Sipariş listesi</button>
        <button className={tab==="usage"?"on":""} onClick={()=>setTab("usage")}>Tüketim analizi</button>
        <button className={tab==="mail"?"on":""} onClick={()=>setTab("mail")}>E-posta önizleme</button>
      </div>

      {tab === "daily" && <ReportDaily />}
      {tab === "critical" && <ReportCritical products={criticalProducts} />}
      {tab === "usage" && <ReportUsage />}
      {tab === "mail" && <ReportMail criticalCount={criticalProducts.length} totalSpend={allUsed} />}
    </div>
  );
}

function ReportDaily() {
  return (
    <div className="card card-elev">
      <div className="card-head">
        <div className="card-head-titles">
          <div className="card-title">Sayım Detayı · 132 ürün</div>
          <div className="card-sub">Tüm departman sayım kayıtları</div>
        </div>
        <div className="card-actions">
          <div className="input-with-icon" style={{ width: 220 }}>
            <span className="input-icon"><Icon name="search" size={15} /></span>
            <input className="input input-sm" placeholder="Ürün ara..." />
          </div>
          <button className="btn btn-ghost btn-sm"><Icon name="filter" size={13} />Filtre</button>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Ürün</th>
              <th>Departman</th>
              <th className="cell-num">Stok</th>
              <th className="cell-num">Min</th>
              <th className="cell-num">Bugün kullanılan</th>
              <th>Durum</th>
              <th>Sayım yapan</th>
              <th>Saat</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.slice(0, 12).map(p => {
              const d = deptById(p.dept);
              const s = stockStatus(p);
              return (
                <tr key={p.id}>
                  <td>
                    <div className="product-cell">
                      <div className={`product-tile ${d.color}`}>{p.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
                      <div className="product-cell-text">
                        <strong>{p.name}</strong>
                        <small>{p.spec}</small>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-ghost no-dot">{d.name}</span></td>
                  <td className="cell-num"><strong>{p.stock}</strong> <span className="cell-meta">{p.unit}</span></td>
                  <td className="cell-num cell-meta">{p.min}</td>
                  <td className="cell-num"><strong>{p.usedToday}</strong></td>
                  <td><span className={`badge ${s.cls}`}>{s.label}</span></td>
                  <td><span className="cell-meta">Ayşe Demir</span></td>
                  <td><span className="cell-meta tnum">10:{14 + Math.floor(Math.random()*30)}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportCritical({ products }) {
  return (
    <div className="card card-elev">
      <div className="card-head">
        <div className="card-head-titles">
          <div className="card-title">Sipariş açılması gereken kalemler ({products.length})</div>
          <div className="card-sub">Otomatik öneri · yönetici onayıyla tedarikçilere gidecek</div>
        </div>
        <button className="btn btn-sm"><Icon name="send" size={13} />Hepsini onaya gönder</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Ürün</th>
              <th>Departman</th>
              <th className="cell-num">Mevcut</th>
              <th className="cell-num">Minimum</th>
              <th className="cell-num">Önerilen</th>
              <th>Tedarikçi</th>
              <th className="cell-num">Tahmini tutar</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const d = deptById(p.dept);
              const need = Math.ceil(p.min - p.stock + p.min*0.5);
              return (
                <tr key={p.id}>
                  <td>
                    <div className="product-cell">
                      <div className="product-tile">{p.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
                      <div className="product-cell-text">
                        <strong>{p.name}</strong>
                        <small>{p.spec}</small>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-ghost no-dot">{d.name}</span></td>
                  <td className="cell-num"><strong style={{color: "var(--danger)"}}>{p.stock}</strong> <span className="cell-meta">{p.unit}</span></td>
                  <td className="cell-num cell-meta">{p.min}</td>
                  <td className="cell-num"><strong>+{need}</strong></td>
                  <td>{p.supplier}</td>
                  <td className="cell-num"><strong>{fmtMoney(need * p.price)}</strong></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportUsage() {
  const usageByDept = DEPARTMENTS.map(d => {
    const items = PRODUCTS.filter(p => p.dept === d.id);
    const value = items.reduce((s,p) => s + p.usedToday * p.price, 0);
    const count = items.reduce((s,p) => s + p.usedToday, 0);
    return { ...d, value, count, items: items.length };
  }).sort((a,b) => b.value - a.value);

  const max = Math.max(...usageByDept.map(d => d.value));

  return (
    <div className="card card-elev">
      <div className="card-head">
        <div className="card-head-titles">
          <div className="card-title">Departman bazlı tüketim · {todayStr()}</div>
          <div className="card-sub">Bugünkü stok hareketleri parasal değer üzerinden</div>
        </div>
      </div>
      <div className="card-body">
        <div className="usage-bars">
          {usageByDept.map(d => (
            <div key={d.id} className="usage-bar-row">
              <div className="usage-bar-label">
                <div className={`product-tile ${d.color}`}>{d.short}</div>
                <div>
                  <strong>{d.name}</strong>
                  <small>{d.count} adet · {d.items} ürün takipte</small>
                </div>
              </div>
              <div className="usage-bar-wrap">
                <div className="usage-bar-track">
                  <div className="usage-bar-fill" style={{ width: max > 0 ? `${(d.value/max)*100}%` : "0%" }} />
                </div>
                <strong className="tnum">{fmtMoney(d.value)}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportMail({ criticalCount, totalSpend }) {
  return (
    <div className="card card-elev">
      <div className="card-head">
        <div className="card-head-titles">
          <div className="card-title">Otomatik e-posta önizleme</div>
          <div className="card-sub">Bugün 18:00'da mehmet@otel.com adresine gönderilecek</div>
        </div>
        <div className="card-actions">
          <button className="btn btn-ghost btn-sm"><Icon name="copy" size={13} />Metni kopyala</button>
          <button className="btn btn-sm"><Icon name="send" size={13} />Şimdi gönder</button>
        </div>
      </div>
      <div className="mail-preview-body">
        <div className="mail-head-row"><strong>Kime:</strong> mehmet@otel.com</div>
        <div className="mail-head-row"><strong>Konu:</strong> Gülplaj Resort — Günlük Stok ve Sipariş Raporu · {todayStr()}</div>
        <hr />
        <div className="mail-body">
          <p>Sayın Mehmet Bey,</p>
          <p>Bugüne ait operasyon özeti aşağıda yer almaktadır:</p>
          <ul>
            <li><strong>{criticalCount} kalem</strong> kritik stok seviyesinde — sipariş açılması öneriliyor.</li>
            <li>Bugünkü toplam tüketim değeri: <strong>{fmtMoney(totalSpend)}</strong></li>
            <li>5 departmandan 4'ü günlük sayımını tamamladı (Smile Food House bekliyor).</li>
          </ul>
          <p><strong>Öncelikli sipariş listesi:</strong></p>
          <ul>
            <li>Tuvalet Kağıdı Jumbo × 6 koli — Tezel Kağıt</li>
            <li>Çamaşır Deterjanı × 4 torba — Hijyenex</li>
            <li>Sıvı Sabun Refill × 4 adet — Hijyenex</li>
            <li>Domates × 30 kg — Hal Toptan</li>
          </ul>
          <p>Detaylı rapor ekte CSV olarak gönderilmiştir.</p>
          <p>Saygılarımla,<br/><strong>Otel Yönetim Otomasyonu</strong></p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Admin: Products & Users
// ============================================================

function AdminProducts({ onNavigate }) {
  const [dept, setDept] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [showAdd, setShowAdd] = React.useState(false);

  const filtered = PRODUCTS.filter(p => {
    if (dept !== "all" && p.dept !== dept) return false;
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="col gap-lg" data-screen-label="06 Ürün Yönetimi">
      <header className="page-head">
        <div className="page-head-titles">
          <span className="eyebrow">Yönetici</span>
          <h1 className="page-title">Ürün Kataloğu</h1>
          <span className="page-sub">{PRODUCTS.length} aktif ürün · 5 departman</span>
        </div>
        <div className="page-head-meta">
          <button className="btn btn-ghost"><Icon name="download" size={14} />Dışa aktar</button>
          <button className="btn" onClick={() => setShowAdd(s => !s)}>
            <Icon name={showAdd ? "x" : "plus"} size={15} />
            {showAdd ? "Kapat" : "Yeni ürün"}
          </button>
        </div>
      </header>

      {showAdd && <NewProductForm onClose={() => setShowAdd(false)} />}

      <div className="stock-toolbar">
        <div className="input-with-icon grow" style={{ maxWidth: 360 }}>
          <span className="input-icon"><Icon name="search" size={16} /></span>
          <input className="input" placeholder="Ürün adı veya tedarikçi..." value={query} onChange={e=>setQuery(e.target.value)} />
        </div>
        <div className="filter-chips">
          <button className={`chip ${dept==="all"?"on":""}`} onClick={()=>setDept("all")}>Tümü <strong>{PRODUCTS.length}</strong></button>
          {DEPARTMENTS.map(d => (
            <button key={d.id} className={`chip ${dept===d.id?"on":""}`} onClick={()=>setDept(d.id)}>
              {d.name} <strong>{PRODUCTS.filter(p=>p.dept===d.id).length}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="card card-elev">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Departman</th>
                <th>Kategori</th>
                <th className="cell-num">Stok</th>
                <th className="cell-num">Min</th>
                <th>Birim</th>
                <th>Tedarikçi</th>
                <th className="cell-num">Birim fiyat</th>
                <th>Durum</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const d = deptById(p.dept);
                const s = stockStatus(p);
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="product-cell">
                        <div className={`product-tile ${d.color}`}>{p.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
                        <div className="product-cell-text">
                          <strong>{p.name}</strong>
                          <small>{p.spec}</small>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge badge-ghost no-dot">{d.name}</span></td>
                    <td><span className="cell-meta">{p.cat}</span></td>
                    <td className="cell-num"><strong>{p.stock}</strong></td>
                    <td className="cell-num cell-meta">{p.min}</td>
                    <td><span className="cell-meta">{p.unit}</span></td>
                    <td>{p.supplier}</td>
                    <td className="cell-num"><strong>{fmtMoney(p.price)}</strong></td>
                    <td><span className={`badge ${s.cls}`}>{s.label}</span></td>
                    <td>
                      <div className="row gap-sm">
                        <button className="btn-icon btn btn-ghost btn-sm" style={{width: 32, height: 32}} title="Düzenle"><Icon name="edit" size={14} /></button>
                        <button className="btn-icon btn btn-ghost btn-sm" style={{width: 32, height: 32}} title="Sil"><Icon name="trash" size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function NewProductForm({ onClose }) {
  return (
    <div className="card card-elev new-product">
      <div className="card-head">
        <div className="card-head-titles">
          <div className="card-title">Yeni ürün ekle</div>
          <div className="card-sub">Departman kataloğuna yeni bir kalem ekleyin</div>
        </div>
      </div>
      <div className="card-body">
        <div className="np-grid">
          <div className="field"><label className="field-label">Ürün adı <span className="req">*</span></label><input className="input" placeholder="örn. El sabunu sıvı" /></div>
          <div className="field"><label className="field-label">Departman <span className="req">*</span></label>
            <select className="select">{DEPARTMENTS.map(d => <option key={d.id}>{d.name}</option>)}</select>
          </div>
          <div className="field"><label className="field-label">Kategori</label>
            <select className="select"><option>Hijyen & Sabun</option><option>Kağıt Ürünleri</option></select>
          </div>
          <div className="field"><label className="field-label">Birim</label>
            <select className="select"><option>adet</option><option>koli</option><option>kg</option><option>L</option></select>
          </div>
          <div className="field"><label className="field-label">Minimum stok</label><input className="input input-num" placeholder="6" /></div>
          <div className="field"><label className="field-label">Birim fiyat (₺)</label><input className="input input-num" placeholder="145" /></div>
          <div className="field" style={{gridColumn: "span 2"}}><label className="field-label">Spesifikasyon</label><input className="input" placeholder="örn. 5L bidon" /></div>
          <div className="field" style={{gridColumn: "span 2"}}><label className="field-label">Tedarikçi</label><input className="input" placeholder="örn. Hijyenex" /></div>
        </div>
        <div className="row end gap-md" style={{marginTop: 16}}>
          <button className="btn btn-ghost" onClick={onClose}>İptal</button>
          <button className="btn"><Icon name="check" size={14} />Ürün ekle</button>
        </div>
      </div>
    </div>
  );
}

function AdminUsers() {
  return (
    <div className="col gap-lg" data-screen-label="07 Kullanıcı Yönetimi">
      <header className="page-head">
        <div className="page-head-titles">
          <span className="eyebrow">Yönetici</span>
          <h1 className="page-title">Kullanıcı Yönetimi</h1>
          <span className="page-sub">{USERS.length} aktif kullanıcı</span>
        </div>
        <div className="page-head-meta">
          <button className="btn"><Icon name="plus" size={15} />Yeni kullanıcı</button>
        </div>
      </header>

      <div className="card card-elev">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Kullanıcı</th>
                <th>Rol</th>
                <th>Departman</th>
                <th>E-posta</th>
                <th>Son giriş</th>
                <th>Durum</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {USERS.map(u => {
                const d = u.department ? deptById(u.department) : null;
                return (
                  <tr key={u.id}>
                    <td>
                      <div className="product-cell">
                        <div className="rail-avatar" style={{borderRadius: 10}}>{initials(u.name)}</div>
                        <div className="product-cell-text">
                          <strong>{u.name}</strong>
                          <small className="mono">{u.username}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      {u.role === "admin"
                        ? <span className="badge badge-accent">Yönetici</span>
                        : <span className="badge badge-brand">Departman</span>}
                    </td>
                    <td>{d ? <span className="badge badge-ghost no-dot">{d.name}</span> : <span className="cell-meta">—</span>}</td>
                    <td><span className="cell-meta">{u.email}</span></td>
                    <td><span className="cell-meta tnum">Bugün, 09:14</span></td>
                    <td><span className="badge badge-ok">Aktif</span></td>
                    <td>
                      <div className="row gap-sm">
                        <button className="btn-icon btn btn-ghost btn-sm" style={{width: 32, height: 32}}><Icon name="edit" size={14} /></button>
                        <button className="btn-icon btn btn-ghost btn-sm" style={{width: 32, height: 32}}><Icon name="more" size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Mail Settings
// ============================================================

function MailSettings() {
  const [staffTime, setStaffTime] = React.useState("08:30");
  const [adminTime, setAdminTime] = React.useState("18:00");
  const [smtpOn, setSmtpOn] = React.useState(true);
  const [staffOn, setStaffOn] = React.useState(true);
  const [adminOn, setAdminOn] = React.useState(true);

  return (
    <div className="col gap-lg" data-screen-label="08 Mail Ayarları">
      <header className="page-head">
        <div className="page-head-titles">
          <span className="eyebrow">Otomasyon</span>
          <h1 className="page-title">Mail &amp; Bildirim Ayarları</h1>
          <span className="page-sub">SMTP, hatırlatma ve yönetici raporu zamanlaması</span>
        </div>
        <div className="page-head-meta">
          <button className="btn btn-ghost"><Icon name="history" size={14} />Mail logu</button>
          <button className="btn"><Icon name="check" size={15} />Tüm ayarları kaydet</button>
        </div>
      </header>

      <div className="grid-2-1">
        <div className="col gap-md">
          {/* SMTP */}
          <div className="card card-elev">
            <div className="card-head">
              <div className="card-head-titles">
                <div className="card-title">
                  SMTP Yapılandırması
                  <span className={`badge ${smtpOn ? "badge-ok" : "badge-ghost"}`}>{smtpOn ? "Bağlı" : "Pasif"}</span>
                </div>
                <div className="card-sub">Otomatik e-postaların gönderileceği sunucu</div>
              </div>
              <label className="toggle"><input type="checkbox" checked={smtpOn} onChange={e=>setSmtpOn(e.target.checked)} /><span className="toggle-track"></span></label>
            </div>
            <div className="card-body">
              <div className="np-grid">
                <div className="field"><label className="field-label">SMTP sunucu</label><input className="input" defaultValue="smtp.office365.com" /></div>
                <div className="field"><label className="field-label">Port</label><input className="input input-num" defaultValue="587" /></div>
                <div className="field"><label className="field-label">Kullanıcı adı</label><input className="input" defaultValue="otomasyon@gulplaj.com" /></div>
                <div className="field"><label className="field-label">Şifre</label><input type="password" className="input" defaultValue="••••••••••••" /></div>
                <div className="field" style={{gridColumn: "span 2"}}>
                  <label className="field-label">Gönderen adı</label>
                  <input className="input" defaultValue="Gülplaj Resort Otomasyonu" />
                </div>
              </div>
              <div className="row end gap-sm" style={{marginTop: 14}}>
                <button className="btn btn-ghost btn-sm">Test e-postası gönder</button>
                <button className="btn btn-sm">Kaydet</button>
              </div>
            </div>
          </div>

          {/* Staff reminder */}
          <div className="card card-elev">
            <div className="card-head">
              <div className="card-head-titles">
                <div className="card-title">Personel sayım hatırlatması</div>
                <div className="card-sub">Departman kullanıcılarına stok girişi hatırlatması</div>
              </div>
              <label className="toggle"><input type="checkbox" checked={staffOn} onChange={e=>setStaffOn(e.target.checked)} /><span className="toggle-track"></span></label>
            </div>
            <div className="card-body">
              <div className="np-grid">
                <div className="field"><label className="field-label">Gönderim saati</label><input className="input" type="time" value={staffTime} onChange={e=>setStaffTime(e.target.value)} /></div>
                <div className="field"><label className="field-label">Hatırlatma sıklığı</label>
                  <select className="select"><option>Her gün</option><option>Hafta içi</option><option>Pazartesi-Çarşamba-Cuma</option></select>
                </div>
                <div className="field" style={{gridColumn: "span 2"}}>
                  <label className="field-label">Mail metni</label>
                  <textarea className="textarea" defaultValue="Günaydın, lütfen bugüne ait stok sayımınızı 11:00'a kadar sisteme girin. Sayım yapılmayan departmanlar otomatik olarak yöneticiye bildirilir." />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col gap-md">
          {/* Manager report */}
          <div className="card card-elev">
            <div className="card-head">
              <div className="card-head-titles">
                <div className="card-title">Yönetici sipariş raporu</div>
                <div className="card-sub">Günlük kritik stok ve sipariş özeti</div>
              </div>
              <label className="toggle"><input type="checkbox" checked={adminOn} onChange={e=>setAdminOn(e.target.checked)} /><span className="toggle-track"></span></label>
            </div>
            <div className="card-body">
              <div className="np-grid">
                <div className="field"><label className="field-label">Gönderim saati</label><input className="input" type="time" value={adminTime} onChange={e=>setAdminTime(e.target.value)} /></div>
                <div className="field"><label className="field-label">Alıcı</label><input className="input" defaultValue="mehmet@otel.com" /></div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="card card-elev">
            <div className="card-head">
              <div className="card-head-titles">
                <div className="card-title">Mail durumu</div>
              </div>
            </div>
            <div className="status-list">
              <div className="status-row">
                <Icon name="check" size={16} style={{color: "var(--ok)"}} />
                <div>
                  <strong>SMTP doğrulaması başarılı</strong>
                  <small>Son test: Bugün 08:00</small>
                </div>
              </div>
              <div className="status-row">
                <Icon name="check" size={16} style={{color: "var(--ok)"}} />
                <div>
                  <strong>Personel hatırlatması gönderildi</strong>
                  <small>5 departman · {staffTime}</small>
                </div>
              </div>
              <div className="status-row">
                <Icon name="clock" size={16} style={{color: "var(--accent-strong)"}} />
                <div>
                  <strong>Yönetici raporu beklemede</strong>
                  <small>Sonraki gönderim: {adminTime}</small>
                </div>
              </div>
              <div className="status-row">
                <Icon name="info" size={16} style={{color: "var(--info)"}} />
                <div>
                  <strong>Mail logu</strong>
                  <small>Son 30 günde 87 e-posta gönderildi</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles for orders/reports/admin/mail
const screenStyles = `
.danger { color: var(--danger); }

/* Order cards */
.order-list { display: flex; flex-direction: column; }
.order-card {
  padding: 16px 18px;
  border-bottom: 1px solid var(--line-soft);
}
.order-card:last-child { border-bottom: 0; }
.order-card-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.order-card-info { flex: 1; min-width: 0; display: flex; flex-direction: column; line-height: 1.3; }
.order-card-info strong { font-size: 14.5px; font-weight: 600; color: var(--ink-900); }
.order-card-info small { font-size: 12.5px; color: var(--ink-500); }
.order-card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  padding: 12px 14px;
  background: var(--surface-soft);
  border-radius: var(--r-sm);
  margin-bottom: 10px;
}
.order-meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.order-meta small { font-size: 11px; color: var(--ink-500); font-weight: 500; letter-spacing: 0.02em; text-transform: uppercase; }
.order-meta strong { font-size: 14.5px; font-weight: 600; color: var(--ink-900); }
.order-meta strong.danger { color: var(--danger); }
.order-card-reason {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 9px 12px;
  background: var(--brand-tint);
  border-radius: var(--r-sm);
  font-size: 13px;
  color: var(--ink-700);
  margin-bottom: 10px;
}
.order-card-reason svg { color: var(--brand); margin-top: 2px; flex-shrink: 0; }
.order-card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

@media (max-width: 700px) {
  .order-card-grid { grid-template-columns: 1fr 1fr; }
  .order-card-foot { flex-direction: column; align-items: stretch; }
}

/* Critical list (right panel) */
.critical-list { padding: 4px 0; }
.critical-row {
  display: grid;
  grid-template-columns: minmax(0,1fr) minmax(100px, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 11px 18px;
  border-bottom: 1px solid var(--line-soft);
}
.critical-row:last-child { border-bottom: 0; }
.critical-row-info { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.critical-row-info strong { font-size: 13.5px; font-weight: 600; color: var(--ink-900); }
.critical-row-info small { font-size: 11.5px; color: var(--ink-500); }
.critical-row-stat { display: flex; flex-direction: column; gap: 4px; }
.cr-bar { height: 4px; background: var(--surface-sunken); border-radius: var(--r-pill); overflow: hidden; }
.cr-bar-fill { height: 100%; background: var(--danger); border-radius: var(--r-pill); }
.cr-nums { font-size: 11.5px; display: flex; gap: 4px; }
.cr-nums strong { font-weight: 600; color: var(--danger); }

@media (max-width: 700px) {
  .critical-row { grid-template-columns: 1fr; gap: 6px; padding: 12px 14px; }
}

/* Report hero */
.report-hero {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px 26px;
  border-radius: var(--r-lg);
  background:
    radial-gradient(600px 300px at 80% 50%, rgba(192,138,62,0.18), transparent 60%),
    linear-gradient(135deg, #0f2823 0%, #0d3833 100%);
  color: #fff;
}
.report-hero-titles { flex: 1; min-width: 0; }
.report-hero-titles .eyebrow { color: var(--accent); }
.report-hero-stats { display: flex; gap: 18px; }
.report-hero-stats > div {
  border: 1px solid rgba(255,255,255,0.12);
  padding: 12px 16px;
  border-radius: var(--r-md);
  background: rgba(255,255,255,0.04);
  min-width: 130px;
}
.report-hero-stats small { color: #9eb6b0; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 500; display: block; margin-bottom: 4px; }
.report-hero-stats strong { color: #fff; font-size: 18px; font-weight: 600; display: block; font-variant-numeric: tabular-nums; }

@media (max-width: 760px) {
  .report-hero { flex-direction: column; align-items: stretch; padding: 18px; }
  .report-hero-stats { flex-wrap: wrap; }
  .report-hero-stats > div { flex: 1; min-width: 130px; }
}

/* Report tabs */
.report-tabs {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  overflow-x: auto;
}
.report-tabs button {
  padding: 8px 14px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-600);
  white-space: nowrap;
  transition: all 0.12s;
}
.report-tabs button:hover { color: var(--ink-900); }
.report-tabs button.on {
  background: var(--brand);
  color: #fff;
  font-weight: 600;
}

/* Usage bars */
.usage-bars { display: flex; flex-direction: column; gap: 14px; }
.usage-bar-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.5fr);
  gap: 16px;
  align-items: center;
}
.usage-bar-label { display: flex; gap: 10px; align-items: center; min-width: 0; }
.usage-bar-label strong { font-size: 13.5px; font-weight: 600; color: var(--ink-900); display: block; line-height: 1.25; }
.usage-bar-label small { font-size: 12px; color: var(--ink-500); line-height: 1.25; }
.usage-bar-wrap { display: flex; align-items: center; gap: 14px; min-width: 0; }
.usage-bar-track {
  flex: 1;
  height: 10px;
  background: var(--surface-soft);
  border-radius: var(--r-pill);
  overflow: hidden;
}
.usage-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--brand), var(--accent));
  border-radius: var(--r-pill);
}
.usage-bar-wrap strong {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-900);
  font-variant-numeric: tabular-nums;
  min-width: 90px;
  text-align: right;
}

@media (max-width: 700px) {
  .usage-bar-row { grid-template-columns: 1fr; gap: 6px; }
}

/* Mail preview body */
.mail-preview-body {
  padding: 20px 24px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-700);
  background: #fafbfa;
}
.mail-head-row { font-size: 13px; color: var(--ink-600); margin-bottom: 4px; }
.mail-head-row strong { color: var(--ink-800); font-weight: 600; margin-right: 6px; }
.mail-preview-body hr { border: 0; border-top: 1px solid var(--line); margin: 14px 0; }
.mail-body p { margin: 10px 0; }
.mail-body ul { margin: 10px 0; padding-left: 22px; }
.mail-body li { margin: 4px 0; }

/* New product form grid */
.np-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
@media (max-width: 600px) {
  .np-grid { grid-template-columns: 1fr; }
}

/* Status list (mail) */
.status-list { padding: 4px 0; }
.status-row {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--line-soft);
}
.status-row:last-child { border-bottom: 0; }
.status-row svg { flex-shrink: 0; margin-top: 2px; }
.status-row strong { display: block; font-size: 13.5px; font-weight: 600; color: var(--ink-900); }
.status-row small { display: block; font-size: 12px; color: var(--ink-500); margin-top: 1px; }
`;

Object.assign(window, { Orders, Reports, AdminProducts, AdminUsers, MailSettings, SCREEN_STYLES: screenStyles });
