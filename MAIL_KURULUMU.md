# Mail Kurulumu

Otel Yönetim iki farklı mail otomasyonu kullanır:

- Personel hatırlatma maili: personele stok sayımı girmesini hatırlatır.
- Yönetici sipariş raporu: minimum stok altındaki ürünleri, manuel sipariş taleplerini ve departman sayım durumunu yönetime gönderir.

Backend her gönderimi `data/mail-log.json` içine kaydeder. Günlük otomasyon tekrar eden mail göndermesin diye son gönderim durumunu `data/mail-state.json` içinde tutar.

## SMTP aktif etme

1. `.env.example` dosyasını kopyala.
2. Kopyanın adını `.env` yap.
3. SMTP bilgilerini doldur.

```text
SMTP_ENABLED=true
SMTP_HOST=smtp.domain.com
SMTP_PORT=587
SMTP_USER=kullanici@domain.com
SMTP_PASS=sifre
SMTP_FROM=stok@domain.com
SMTP_FROM_NAME=Otel Yönetim Stok
SMTP_SECURE=false
SMTP_TIMEOUT_MS=15000
MAIL_CATCH_UP_MINUTES=120
```

## Test

1. Backend'i başlat:

```text
START_NODE_BACKEND.cmd
```

2. Admin ile giriş yap:

```text
admin / admin123
```

3. `Mail Ayarları` ekranında `SMTP kontrol et` butonuna bas.
4. Sonra `Hatırlatma gönder` veya `Rapor gönder` butonuyla test et.

SMTP kapalıysa mail gerçek gönderilmez, `data/mail-log.json` dosyasına kaydedilir.

## Otomasyon davranışı

- Hatırlatma ve rapor saatleri `Mail Ayarları` ekranından değiştirilir.
- Backend açık kaldığı sürece zamanlayıcı dakikada bir kontrol eder.
- Belirlenen saat kaçırılırsa `MAIL_CATCH_UP_MINUTES` süresi içinde aynı gün yakalama gönderimi yapılır.
- Aynı gün aynı otomasyon ikinci kez otomatik gönderilmez; manuel gönderim butonları her zaman test için kullanılabilir.

## Yönetici rapor içeriği

Yönetici raporu şu bölümlerle gider:

- Aktif ürün, sayılan ürün, eksik sayım, kritik stok ve manuel sipariş talebi özeti
- Departman bazlı tamamlanma yüzdesi
- Minimum stok altındaki ürünler
- Stok yeterli olsa bile manuel sipariş istenen ürünler
- Sayımı henüz girilmemiş ilk ürünler

## Önemli

Gmail, Outlook ve kurumsal mail sunucuları genellikle uygulama şifresi veya özel SMTP izni ister. Normal kullanıcı şifresiyle SMTP bağlantısı reddedilebilir.
