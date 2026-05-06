# Otel Yönetim Backend

Bu backend ek kurulum gerektirmeyen PowerShell/.NET tabanlı yerel API sunucusudur.

## Çalıştırma

Proje klasöründe:

```powershell
.\START_BACKEND.ps1
```

Sonra uygulamayı şu adresten aç:

```text
http://localhost:8787/
```

## API özet

- `GET /api/health`
- `GET /api/bootstrap`
- `POST /api/login`
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/{id}`
- `PATCH /api/products/{id}/active`
- `POST /api/counts`
- `GET /api/report?date=YYYY-MM-DD&departmentId=all`
- `GET /api/mail-settings`
- `PUT /api/mail-settings`
- `POST /api/mail/send-reminder`
- `POST /api/mail/send-report`
- `GET /api/mail-log`

## Veri dosyaları

- `data/app-data.json`: departmanlar, kullanıcılar, ürünler, sayımlar, mail ayarları
- `data/mail-log.json`: SMTP kapalıyken gönderilecek mail kayıtları

## Mail

`backend/config.json` içindeki `smtp.enabled` şu an `false`.

Bu durumda otomasyon mail göndermek yerine `data/mail-log.json` içine kayıt atar. Gerçek mail için otelin SMTP bilgileri girilip `smtp.enabled` değeri `true` yapılmalıdır.
