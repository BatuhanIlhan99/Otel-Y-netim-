# Bulut Backend Kurulumu

Bu uygulamada GitHub Pages sadece arayuzu yayinlar. Ortak stok verisi, 10 cihazdan ayni veriyle giris, otomatik hatirlatma maili ve yonetici rapor maili icin `server.js` dosyasinin bulutta calisan bir web servisi olmasi gerekir.

## Hazir altyapi

Projede bulut icin hazirlanan dosyalar:

- `server.js`: Node backend, API, ortak veri, mail ve otomasyon motoru
- `render.yaml`: Render Blueprint tanimi
- `.env.example`: Ortam degiskeni sablonu
- `BULUT_BACKEND_TEST.cmd`: Yayindaki backend'i test eder
- `BULUT_API_ADRESI_KAYDET.cmd`: Bulut API adresini `config.js` icine yazar ve isterse GitHub Pages'e deploy eder

## Render uzerinde kurulum

Tek tik kurulum linki:

```text
https://render.com/deploy?repo=https%3A%2F%2Fgithub.com%2FBatuhanIlhan99%2FOtel-Y-netim-
```

1. Render hesabina gir: `https://dashboard.render.com/`
2. GitHub hesabi bagli degilse bagla.
3. `New` menusu altindan `Blueprint` sec.
4. Repo olarak `BatuhanIlhan99/Otel-Y-netim-` reposunu sec.
5. Render `render.yaml` dosyasini okuyacak ve `otel-yonetim` web servisini olusturacak.
6. Gizli SMTP alanlarini doldur:

```env
SMTP_HOST=smtp sunucun
SMTP_PORT=587
SMTP_USER=mail kullanici adin
SMTP_PASS=mail sifren veya uygulama sifren
SMTP_FROM=gonderici mail adresi
```

## Kalici veri

`render.yaml` icinde kalici disk hazir:

```yaml
disk:
  name: otel-data
  mountPath: /var/data
  sizeGB: 1
```

Backend stoklari, sayimlari, mail ayarlarini ve mail loglarini `/var/data` altina yazar. Disk olmadan bulut dosya sistemi gecicidir; restart/deploy sonrasi veri kaybi yasanabilir. Gercek otel kullanimi icin diskli plan zorunludur.

## Ortam degiskenleri

Render servisinde bu degerler bulunmali:

```env
NODE_ENV=production
PORT=10000
HOST=0.0.0.0
DATA_DIR=/var/data
ALLOWED_ORIGINS=https://batuhanilhan99.github.io
SMTP_ENABLED=true
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=...
SMTP_FROM_NAME=Otel Yonetim Stok
SMTP_SECURE=false
SMTP_TIMEOUT_MS=15000
MAIL_CATCH_UP_MINUTES=120
```

## Yayindan sonra test

Render servis adresi ornek:

```text
https://otel-yonetim.onrender.com
```

Test icin:

1. Bu adresi kopyala.
2. `BULUT_BACKEND_TEST.cmd` dosyasini calistir.
3. Storage OK, admin login ve mail status kontrollerinin gectigini gor.

## GitHub Pages'i bulut backend'e baglama

Backend adresi hazir olduktan sonra:

1. Render adresini kopyala.
2. `BULUT_API_ADRESI_KAYDET.cmd` dosyasini calistir.
3. Script `config.js` icine adresi yazar.
4. Istersen ayni anda GitHub Pages'e deploy eder.

Not: En temiz kullanim, herkesin dogrudan Render adresinden girmesidir. Bu durumda frontend ve backend ayni adreste calisir.
