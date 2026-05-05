# GitHub'a Yükleme

Bu proje GitHub'a bir repository olarak yüklenmelidir. Verilen Project linki görev panosudur; kod dosyaları Project içine yüklenmez.

## Manuel yükleme

Git kuruluysa proje klasöründe:

```powershell
git init
git add .
git commit -m "otel yonetim uygulamasi"
git branch -M main
git remote add origin https://github.com/BatuhanIlhan99/Otel-Y-netim-.git
git push -u origin main
```

Bu projede `DEPLOY_GITHUB.cmd` dosyası da hazırdır. Git kuruluysa dosyaya çift tıklamak aynı işlemleri yapar.

GitHub Pages yayını başarılı olduğunda site adresi:

```text
https://batuhanilhan99.github.io/Otel-Y-netim-/
```

Not: `data/*.json` dosyaları public repository'ye yüklenmez. Backend ilk açılışta varsayılan kullanıcıları ve ürün kataloglarını otomatik oluşturur.

## Codex üzerinden yükleme için gerekenler

- GitHub'da `Otel-Y-netim-` adlı repository oluşturulmalı.
- GitHub app bu repository'ye içerik yazma erişimiyle açılmalı.
- Yerel ortamda `git` ve tercihen `gh` komutları kullanılabilir olmalı.

Bu koşullar sağlandığında Codex commit, push ve PR akışını tamamlayabilir.

## GitHub app erişimini açma

GitHub'da:

1. Profile photo > Settings
2. Applications
3. Installed GitHub Apps
4. Codex / OpenAI GitHub app ayarları
5. Repository access bölümünden `BatuhanIlhan99/Otel-Y-netim-` repository'sini seç
6. Kaydet

Bu işlemden sonra Codex dosyaları doğrudan repository'ye yazabilir.
