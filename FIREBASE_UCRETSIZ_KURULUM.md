# Firebase Ucretsiz Kurulum

Bu yol Firebase Spark plan ile kart girmeden ortak stok verisi kullanmak icindir. GitHub Pages arayuzu yayinda kalir; stoklar ve sayimlar Firestore'da ortak tutulur.

## Ucretsiz planda calisan kisimlar

- Telefon ve PC'lerde ayni stok verisi
- Ortak urun listesi
- Gunluk sayim kayitlari
- Departman bazli giris ekrani
- Rapor metni ve CSV cikti
- Mail ayar metinlerinin ortak saklanmasi

## Ucretsiz planda sinirli kalan kisim

Gercek otomatik mail ve zamanlanmis isler Firebase Cloud Functions ister. Cloud Functions icin Firebase Blaze plan gerekir. Spark plan kullanirken uygulama mail metnini hazirlar; gonderim manuel yapilir.

## Firebase Console adimlari

1. `https://console.firebase.google.com/` adresine gir.
2. `Add project` ile yeni proje olustur.
3. Plan olarak Spark/no-cost kalabilir; kart gerekmez.
4. Sol menude `Build > Authentication` alanina gir.
5. `Sign-in method` sekmesinde `Anonymous` saglayicisini etkinlestir.
6. Sol menude `Build > Firestore Database` alanina gir.
7. `Create database` sec.
8. Baslangic modu olarak `Production mode` sec.
9. Bolge secimini tamamla.
10. Firestore `Rules` sekmesine gir ve projedeki `firestore.rules` icerigini yapistir.
11. `Publish` butonuna bas.
12. Project settings > General > Your apps alaninda Web app ekle.
13. Firebase'in verdigi `firebaseConfig` kod blogunu kopyala.
14. Bu klasorde `FIREBASE_CONFIG_KAYDET.cmd` dosyasini calistir.
15. Script config'i `config.js` icine yazar ve istersen GitHub Pages'e deploy eder.

## Hazir Firestore kurali

`firestore.rules` dosyasi:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /otelApps/{appId}/{document=**} {
      allow read, write: if request.auth != null;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Bu kural, sadece Firebase Authentication uzerinden anonim oturum acan uygulama kullanicilarina veri izni verir.

## Kullanilacak dosyalar

- `FIREBASE_CONFIG_KAYDET.cmd`: Firebase config'i kaydeder.
- `firestore.rules`: Firestore kurallari.
- `config.js`: Firebase proje bilgilerini tutar.
- `app.js`: Firebase config varsa Firestore ortak veri modunda calisir.

## Test

1. GitHub Pages linkini ac.
2. `admin / admin123` ile gir.
3. Ustte `Firebase Spark bağlı` yazisini gor.
4. Bir stok sayimi gir.
5. Baska cihazda ayni siteyi acip ayni kullanici veya departman kullanicisiyla gir.
6. Veri ayni Firestore projesinden gelecektir.
