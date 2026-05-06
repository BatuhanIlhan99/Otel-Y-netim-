# Web Tabanli Kurulum

GitHub Pages sadece statik arayuz yayinlar. Mail gonderimi, otomasyon ve 10 farkli cihazda ortak stok verisi icin Node backend internette calisan bir web servisi olmalidir.

## Dogru calisma sekli

En temiz kullanim tek adrestir:

- Backend servisi `server.js` ile calisir.
- Ayni servis `index.html`, `app.js`, `styles.css` dosyalarini da yayinlar.
- Tum telefonlar ve PC'ler backend servisinin web adresinden girer.
- Stok sayimlari `DATA_DIR` altindaki ortak veriye yazilir.
- Mail gonderimi SMTP bilgileriyle backend uzerinden yapilir.

## Render ile yayin

Repo kokunde `render.yaml` hazirlandi.

Render Blueprint acarken gizli alanlara su degerler girilir:

- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

Uretim icin `render.yaml` su kritik degerleri de hazirlar:

- `PORT=10000`
- `HOST=0.0.0.0`
- `DATA_DIR=/var/data`
- `ALLOWED_ORIGINS=https://batuhanilhan99.github.io`
- Kalici disk: `/var/data`, 1 GB

Servis yayina girdikten sonra kullanilacak adres su formatta olur:

`https://otel-yonetim.onrender.com`

Bu adres tum cihazlarda acilirsa uygulama tamamen web tabanli calisir.

Yayindan sonra `BULUT_BACKEND_TEST.cmd` calistirilir. Test; `/api/health`, admin login, ortak veri ve mail durumunu kontrol eder.

## GitHub Pages kullanilacaksa

GitHub Pages arayuz olarak kalabilir ama API adresi gerekir. `config.js` icindeki `apiBaseUrl` alanina bulut backend adresi yazilir:

```js
window.OTEL_CONFIG = {
  apiBaseUrl: "https://otel-yonetim.onrender.com",
};
```

Bu yapilmadan GitHub Pages uzerinden mail gonderimi ve ortak stok verisi calismaz.

Backend adresi hazir olduktan sonra `BULUT_API_ADRESI_KAYDET.cmd` calistirilir. Bu dosya `config.js` icine bulut API adresini yazar ve istenirse GitHub Pages'i hemen deploy eder.
