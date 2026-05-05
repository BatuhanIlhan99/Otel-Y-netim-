# Üretim Kontrol Listesi

## Güvenlik

- Varsayılan demo şifreleri değiştirilecek.
- `.env` dosyası GitHub'a yüklenmeyecek.
- SMTP şifresi yalnızca `.env` içinde tutulacak.
- Yönetici kullanıcıları sınırlı tutulacak.
- Sunucu dışarı açılacaksa HTTPS arkasında çalıştırılacak.

## Operasyon

- Departman ürün listeleri gerçek stok kalemleriyle doldurulacak.
- Minimum stok seviyeleri satın alma ekibiyle netleştirilecek.
- Stok yeterli olsa bile manuel sipariş talebi açma yetkisinin kimlerde olacağı netleştirilecek.
- Mail alıcıları gerçek personel ve yönetici adresleriyle değiştirilecek.
- Hatırlatma ve rapor saatleri operasyon saatlerine göre ayarlanacak.

## Yedekleme

- `data/app-data.json` düzenli yedeklenecek.
- Backend her yazma işleminden önce `data/backups` klasörüne kopya alır.
- Kritik kullanımda JSON yerine PostgreSQL/MySQL'e geçiş planlanmalı.

## Canlıya Alma

- Backend Node.js ile başlatılacak.
- `http://localhost:8787/` yerine gerçek alan adı veya otel içi sunucu adresi kullanılacak.
- SMTP kontrolü başarıyla geçmeden otomasyon canlıya alınmayacak.
