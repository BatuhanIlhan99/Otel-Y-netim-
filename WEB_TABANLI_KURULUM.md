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

Servis yayina girdikten sonra kullanilacak adres su formatta olur:

`https://otel-yonetim.onrender.com`

Bu adres tum cihazlarda acilirsa uygulama tamamen web tabanli calisir.

## GitHub Pages kullanilacaksa

GitHub Pages arayuz olarak kalabilir ama API adresi gerekir. `config.js` icindeki `apiBaseUrl` alanina bulut backend adresi yazilir:

```js
window.OTEL_CONFIG = {
  apiBaseUrl: "https://otel-yonetim.onrender.com",
};
```

Bu yapilmadan GitHub Pages uzerinden mail gonderimi ve ortak stok verisi calismaz.
