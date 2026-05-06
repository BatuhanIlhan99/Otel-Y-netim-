# Hizli Deploy

Bu proje artik tek komut deploy akisi kullanir.

## Ilk kurulum

1. GitHub tokenini panoya kopyala.
2. `TOKEN_KAYDET.cmd` dosyasini bir kez calistir.

Token `.deploy-secrets/github-token.sec` dosyasina Windows kullanicina ozel sifreli olarak kaydedilir. Bu klasor `.gitignore` icindedir ve GitHub'a yuklenmez.

## Sonraki deploylar

`DEPLOY_ET.cmd` dosyasini calistir.

Script otomatik olarak:

- GitHub'daki guncel `main` dalini klonlar.
- Proje dosyalarini guvenli listeyle kopyalar.
- Sadece degisiklik varsa commit olusturur.
- Git Credential Manager'i devre disi birakarak tokenla push yapar.
- Uzak commit dogrulamasi yapar.
- GitHub Pages linkini verir.

Yayin linki:

https://batuhanilhan99.github.io/Otel-Y-netim-/
