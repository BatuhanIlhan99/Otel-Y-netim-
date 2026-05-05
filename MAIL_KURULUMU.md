# Mail Kurulumu

Otel Yönetim iki farklı mail otomasyonu kullanır:

- Personel hatırlatma maili: personele stok sayımı girmesini hatırlatır.
- Yönetici sipariş raporu: minimum stok altındaki ürünleri yönetime gönderir.

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
SMTP_SECURE=false
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

## Önemli

Gmail, Outlook ve kurumsal mail sunucuları genellikle uygulama şifresi veya özel SMTP izni ister. Normal kullanıcı şifresiyle SMTP bağlantısı reddedilebilir.
