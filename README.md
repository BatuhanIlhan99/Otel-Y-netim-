# Otel Yönetim

Bu klasör, otel içinde günlük stok sayımı, kritik stok raporu, personel hatırlatma maili ve yönetici sipariş raporu için başlatılan web tabanlı yönetim uygulamasıdır.

## İlk sürüm kapsamı

- Kullanıcı adı ve şifre ile giriş
- Admin için operasyon kontrol paneli
- Departman bazlı ürün listesi
- Temizlik departmanı için 170+ kalem profesyonel otel kat hizmetleri ve hijyen kataloğu
- Gülplaj Restorant mutfağı için 220+ kalem profesyonel otel gıda kataloğu
- Günlük stok sayımı
- Kritik stok uyarısı
- Stok yeterli olsa bile manuel sipariş talebi oluşturma
- Günlük rapor ekranı
- Mail metni ön izlemesi ve kopyalama
- Admin için ürün ve kullanıcı listesi
- Admin için ürün ekleme, düzenleme ve pasifleştirme
- Her departman için ayrı manuel stok ekleme bölümü
- Hazır birim seçenekleriyle hızlı stok ekleme
- Sayım satırlarına not girme
- Günlük raporu CSV olarak indirme
- Günlük raporda tarih seçerek geçmiş sayımları görüntüleme
- Personel stok giriş hatırlatma maili ayarı
- Yöneticiye sipariş verilmesi gereken stok raporu maili ayarı
- Yönetici raporunda kritik siparişler ve manuel sipariş taleplerini ayrı gösterme
- Masaüstü yönetim paneli ve mobil personel kullanımı için responsive arayüz
- Token bazlı backend oturumu ve rol bazlı API yetkisi
- SMTP doğrulama, mail loglama ve otomatik zamanlayıcı

## Departmanlar

- Temizlik
- Gülplaj Restorant
- Gülplaj Büfe
- Smile Food House
- Resepsiyon

## Demo girişleri

- `admin` / `admin123`
- `temizlik` / `Temizlik2026`
- `mutfak` / `Mutfak2026`
- `bufe` / `Bufe2026`
- `smile` / `1234`
- `resepsiyon` / `Resepsiyon2026`

## Çalıştırma

`index.html` dosyası doğrudan tarayıcıda açılabilir.

## Backend ile çalıştırma

Önerilen backend Node.js sürümüdür:

```text
START_NODE_BACKEND.cmd dosyasına çift tıkla.
```

Bu komut ilk açılışta `npm install` çalıştırır, sonra siteyi başlatır.

PowerShell yedek backend ile çalıştırmak için:

```powershell
.\START_BACKEND.ps1
```

Windows'ta en kolay yöntem:

```text
START_BACKEND.cmd dosyasına çift tıkla ve açılan pencereyi kapatma.
```

Sonra uygulamayı şu adresten aç:

```text
http://localhost:8787/
```

Backend açıldığında kullanıcı girişi, ürünler, stok sayımları ve mail ayarları `data/app-data.json` dosyasında tutulur.

Gerçek otomatik mail için `.env` dosyası oluşturup SMTP bilgileri girilmelidir. SMTP kapalıyken otomasyon mail kayıtları `data/mail-log.json` dosyasına yazılır.

Örnek SMTP ayarları için `.env.example` dosyasına bak.

Detaylı mail kurulumu için `MAIL_KURULUMU.md`, canlıya alma kontrolü için `PRODUCTION_CHECKLIST.md` dosyasına bak.

## GitHub notu

Kod bir GitHub repository içine yüklenmelidir. GitHub Project panosu dosya barındırmaz; Project sadece issue ve görev takibi içindir.
