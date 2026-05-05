const departments = [
  { id: "temizlik", name: "Temizlik" },
  { id: "gulplaj-restorant", name: "Gülplaj Restorant" },
  { id: "gulplaj-bufe", name: "Gülplaj Büfe" },
  { id: "smile-food-house", name: "Smile Food House" },
  { id: "resepsiyon", name: "Resepsiyon" },
];

const users = [
  { username: "admin", password: "admin123", name: "Yönetici", role: "admin", departmentId: "all" },
  { username: "temizlik", password: "Temizlik2026", name: "Temizlik Kullanıcısı", role: "staff", departmentId: "temizlik" },
  { username: "mutfak", password: "Mutfak2026", name: "Mutfak Kullanıcısı", role: "staff", departmentId: "gulplaj-restorant" },
  { username: "bufe", password: "Bufe2026", name: "Büfe Kullanıcısı", role: "staff", departmentId: "gulplaj-bufe" },
  { username: "smile", password: "1234", name: "Smile Food House", role: "staff", departmentId: "smile-food-house" },
  { username: "resepsiyon", password: "Resepsiyon2026", name: "Resepsiyon Kullanıcısı", role: "staff", departmentId: "resepsiyon" },
];

const professionalCleaningCatalog = [
  ["Çok Amaçlı Temizleyici", "temizlik", "lt", 48, 16],
  ["Yüzey Temizleyici Konsantre", "temizlik", "lt", 36, 12],
  ["Alkol Bazlı Yüzey Dezenfektanı", "temizlik", "lt", 42, 14],
  ["Klor Bazlı Dezenfektan", "temizlik", "lt", 30, 10],
  ["Hidrojen Peroksit Dezenfektan", "temizlik", "lt", 24, 8],
  ["Çamaşır Suyu", "temizlik", "lt", 60, 20],
  ["Kokulu Çamaşır Suyu", "temizlik", "lt", 36, 12],
  ["Kireç Çözücü", "temizlik", "lt", 42, 14],
  ["Yağ Çözücü", "temizlik", "lt", 42, 14],
  ["Ağır Kir ve Yağ Sökücü", "temizlik", "lt", 24, 8],
  ["Fırın ve Izgara Temizleyici", "temizlik", "lt", 18, 6],
  ["Bulaşık Deterjanı Endüstriyel", "temizlik", "lt", 50, 16],
  ["Bulaşık Makinesi Deterjanı", "temizlik", "lt", 40, 14],
  ["Bulaşık Makinesi Parlatıcısı", "temizlik", "lt", 30, 10],
  ["Bulaşık Makinesi Tuzu", "temizlik", "kg", 50, 16],
  ["Elde Bulaşık Deterjanı", "temizlik", "lt", 36, 12],
  ["Cam Temizleyici", "temizlik", "lt", 36, 12],
  ["Ayna Temizleyici", "temizlik", "lt", 24, 8],
  ["Paslanmaz Çelik Temizleyici", "temizlik", "lt", 18, 6],
  ["Paslanmaz Çelik Parlatıcı", "temizlik", "lt", 18, 6],
  ["Ahşap Temizleyici", "temizlik", "lt", 18, 6],
  ["Ahşap Bakım Yağı", "temizlik", "lt", 12, 4],
  ["Mermer Temizleyici", "temizlik", "lt", 18, 6],
  ["Granit Temizleyici", "temizlik", "lt", 18, 6],
  ["Fayans Temizleyici", "temizlik", "lt", 30, 10],
  ["Derz Temizleyici", "temizlik", "lt", 18, 6],
  ["Zemin Temizleyici", "temizlik", "lt", 60, 20],
  ["Kaymaz Zemin Temizleyici", "temizlik", "lt", 30, 10],
  ["Zemin Cila", "temizlik", "lt", 24, 8],
  ["Zemin Cila Sökücü", "temizlik", "lt", 18, 6],
  ["Halı Şampuanı", "temizlik", "lt", 24, 8],
  ["Koltuk Şampuanı", "temizlik", "lt", 18, 6],
  ["Leke Çıkarıcı Sprey", "temizlik", "adet", 36, 12],
  ["Tekstil Leke Çıkarıcı", "temizlik", "lt", 18, 6],
  ["Koku Giderici", "temizlik", "lt", 24, 8],
  ["Oda Parfümü", "temizlik", "adet", 48, 16],
  ["Ortam Kokusu Refill", "temizlik", "adet", 60, 20],
  ["Banyo Temizleyici", "temizlik", "lt", 42, 14],
  ["Tuvalet Temizleyici Jel", "temizlik", "lt", 36, 12],
  ["Klozet Dezenfektanı", "temizlik", "lt", 30, 10],
  ["Pisuar Tableti", "temizlik", "adet", 120, 40],
  ["Duşakabin Kireç Sökücü", "temizlik", "lt", 24, 8],
  ["Küf Sökücü", "temizlik", "lt", 18, 6],
  ["Lavabo Açıcı Granül", "temizlik", "kg", 12, 4],
  ["Gider Açıcı Jel", "temizlik", "lt", 18, 6],
  ["Kanal Koku Önleyici", "temizlik", "lt", 18, 6],
  ["Sıvı Sabun", "temizlik", "lt", 60, 20],
  ["Köpük Sabun", "temizlik", "lt", 40, 14],
  ["El Dezenfektanı", "temizlik", "lt", 48, 16],
  ["Dispenser Sıvı Sabun Kartuşu", "temizlik", "adet", 48, 16],
  ["Dispenser El Dezenfektanı Kartuşu", "temizlik", "adet", 48, 16],
  ["Çamaşır Deterjanı Sıvı", "temizlik", "lt", 50, 16],
  ["Çamaşır Deterjanı Toz", "temizlik", "kg", 80, 26],
  ["Çamaşır Yumuşatıcı", "temizlik", "lt", 50, 16],
  ["Oksijenli Ağartıcı", "temizlik", "kg", 30, 10],
  ["Beyazlatıcı Toz", "temizlik", "kg", 30, 10],
  ["Renk Koruyucu Çamaşır Katkısı", "temizlik", "lt", 18, 6],
  ["Çamaşır Leke Çıkarıcı", "temizlik", "lt", 24, 8],
  ["Yaka ve Kol Leke Çıkarıcı", "temizlik", "adet", 36, 12],
  ["Kumaş Dezenfektanı", "temizlik", "lt", 24, 8],
  ["Ütü Suyu", "temizlik", "lt", 24, 8],
  ["Kolalama Spreyi", "temizlik", "adet", 24, 8],
  ["Çamaşır Filesi", "temizlik", "adet", 80, 25],
  ["Çamaşır Toplama Torbası", "temizlik", "adet", 120, 40],
  ["Kuru Temizleme Poşeti", "temizlik", "adet", 300, 100],
  ["Kirli Havlu Torbası", "temizlik", "adet", 120, 40],
  ["Tekstil Taşıma Çuvalı", "temizlik", "adet", 60, 20],
  ["Jumbo Tuvalet Kağıdı", "temizlik", "rulo", 160, 50],
  ["Mini Jumbo Tuvalet Kağıdı", "temizlik", "rulo", 160, 50],
  ["Z Katlı Kağıt Havlu", "temizlik", "paket", 140, 45],
  ["Dispenser Kağıt Havlu", "temizlik", "paket", 120, 40],
  ["Fotoselli Havlu Kağıt", "temizlik", "rulo", 90, 30],
  ["Peçete", "temizlik", "paket", 140, 45],
  ["Kutu Mendil", "temizlik", "adet", 160, 50],
  ["Islak Mendil", "temizlik", "paket", 100, 35],
  ["Hijyen Poşeti", "temizlik", "adet", 500, 150],
  ["Klozet Kapak Örtüsü", "temizlik", "paket", 80, 25],
  ["Çöp Poşeti Küçük", "temizlik", "rulo", 100, 35],
  ["Çöp Poşeti Orta", "temizlik", "rulo", 100, 35],
  ["Çöp Poşeti Battal", "temizlik", "rulo", 80, 25],
  ["Endüstriyel Çöp Poşeti", "temizlik", "rulo", 70, 24],
  ["Şeffaf Çöp Poşeti", "temizlik", "rulo", 70, 24],
  ["Geri Dönüşüm Poşeti", "temizlik", "rulo", 70, 24],
  ["Tıbbi Atık Torbası", "temizlik", "rulo", 24, 8],
  ["Koku Bariyerli Atık Poşeti", "temizlik", "rulo", 36, 12],
  ["Mikrofiber Bez Renkli Set", "temizlik", "adet", 160, 50],
  ["Cam Bezi", "temizlik", "adet", 80, 25],
  ["Toz Bezi", "temizlik", "adet", 120, 40],
  ["Yer Bezi", "temizlik", "adet", 90, 30],
  ["Mop Ucu Pamuk", "temizlik", "adet", 80, 25],
  ["Mop Ucu Mikrofiber", "temizlik", "adet", 80, 25],
  ["Mop Sapı", "temizlik", "adet", 35, 12],
  ["Mop Aparatı", "temizlik", "adet", 35, 12],
  ["Mop Kovası", "temizlik", "adet", 18, 6],
  ["Presli Temizlik Kovası", "temizlik", "adet", 14, 5],
  ["Çift Kovalı Temizlik Arabası", "temizlik", "adet", 8, 3],
  ["Kat Hizmetleri Arabası", "temizlik", "adet", 8, 3],
  ["Temizlik Arabası Çöp Torbası", "temizlik", "adet", 80, 25],
  ["Faraş", "temizlik", "adet", 24, 8],
  ["Süpürge", "temizlik", "adet", 30, 10],
  ["Yer Fırçası", "temizlik", "adet", 24, 8],
  ["Tuvalet Fırçası", "temizlik", "adet", 60, 20],
  ["Derz Fırçası", "temizlik", "adet", 36, 12],
  ["El Fırçası", "temizlik", "adet", 36, 12],
  ["Cam Çekçek", "temizlik", "adet", 24, 8],
  ["Yer Çekçek", "temizlik", "adet", 24, 8],
  ["Teleskopik Cam Aparatı", "temizlik", "adet", 16, 5],
  ["Cam Peluşu", "temizlik", "adet", 30, 10],
  ["Bulaşık Süngeri", "temizlik", "paket", 80, 25],
  ["Ovma Teli", "temizlik", "paket", 60, 20],
  ["Bulaşık Fırçası", "temizlik", "adet", 30, 10],
  ["Sihirli Sünger", "temizlik", "paket", 40, 14],
  ["Temizlik Kazıyıcı", "temizlik", "adet", 20, 7],
  ["Kazıyıcı Yedek Bıçak", "temizlik", "paket", 24, 8],
  ["Sprey Şişe", "temizlik", "adet", 60, 20],
  ["Kimyasal Ölçü Pompası", "temizlik", "adet", 24, 8],
  ["Kimyasal Ölçü Kabı", "temizlik", "adet", 24, 8],
  ["Temizlik Uyarı Levhası", "temizlik", "adet", 18, 6],
  ["Nitril Eldiven", "temizlik", "kutu", 90, 30],
  ["Lateks Eldiven", "temizlik", "kutu", 70, 24],
  ["Vinil Eldiven", "temizlik", "kutu", 70, 24],
  ["Endüstriyel Temizlik Eldiveni", "temizlik", "çift", 80, 25],
  ["Maske", "temizlik", "kutu", 50, 16],
  ["Bone", "temizlik", "paket", 50, 16],
  ["Galoş", "temizlik", "paket", 50, 16],
  ["Koruyucu Gözlük", "temizlik", "adet", 20, 7],
  ["Tek Kullanımlık Önlük", "temizlik", "paket", 30, 10],
  ["Dezenfektan Paspası Solüsyonu", "temizlik", "lt", 18, 6],
  ["Elektrikli Süpürge Toz Torbası", "temizlik", "adet", 50, 16],
  ["Elektrikli Süpürge HEPA Filtresi", "temizlik", "adet", 24, 8],
  ["Yer Yıkama Makinesi Deterjanı", "temizlik", "lt", 30, 10],
  ["Temizlik Makinesi Pedi Beyaz", "temizlik", "adet", 20, 7],
  ["Temizlik Makinesi Pedi Kırmızı", "temizlik", "adet", 20, 7],
  ["Temizlik Makinesi Pedi Siyah", "temizlik", "adet", 20, 7],
  ["Cila Pedi", "temizlik", "adet", 20, 7],
  ["Halı Yıkama Makinesi Deterjanı", "temizlik", "lt", 18, 6],
  ["Halı Kurutma Fan Filtresi", "temizlik", "adet", 12, 4],
  ["Yatak Koruyucu Alezi", "temizlik", "adet", 80, 25],
  ["Yastık Koruyucu Kılıf", "temizlik", "adet", 120, 40],
  ["Nevresim Poşeti", "temizlik", "adet", 200, 70],
  ["Oda Buklet Şampuan", "temizlik", "adet", 400, 130],
  ["Oda Buklet Duş Jeli", "temizlik", "adet", 400, 130],
  ["Oda Buklet Saç Kremi", "temizlik", "adet", 300, 100],
  ["Oda Buklet Vücut Losyonu", "temizlik", "adet", 300, 100],
  ["Otel Sabunu", "temizlik", "adet", 500, 160],
  ["Diş Seti", "temizlik", "adet", 260, 85],
  ["Tıraş Seti", "temizlik", "adet", 180, 60],
  ["Tarak", "temizlik", "adet", 180, 60],
  ["Dikiş Seti", "temizlik", "adet", 120, 40],
  ["Duş Bonesi", "temizlik", "adet", 220, 75],
  ["Makyaj Temizleme Pamuğu", "temizlik", "paket", 80, 25],
  ["Kulak Çubuğu", "temizlik", "paket", 80, 25],
  ["Otel Terliği", "temizlik", "çift", 300, 100],
  ["Ayakkabı Süngeri", "temizlik", "adet", 160, 50],
  ["Ayakkabı Çekeceği", "temizlik", "adet", 80, 25],
  ["Oda Çamaşır Torbası", "temizlik", "adet", 240, 80],
  ["Oda Koku Kartuşu", "temizlik", "adet", 90, 30],
  ["Mini Bar Temizlik Bezi", "temizlik", "adet", 80, 25],
  ["Sinek İlacı", "temizlik", "adet", 36, 12],
  ["Böcek İlacı Jel", "temizlik", "adet", 24, 8],
  ["Haşere Yapışkan Tuzak", "temizlik", "adet", 60, 20],
  ["Fare Yem İstasyonu", "temizlik", "adet", 24, 8],
  ["Havuz Klor Tableti", "temizlik", "kg", 50, 16],
  ["Havuz Sıvı Klor", "temizlik", "lt", 80, 26],
  ["Havuz pH Düşürücü", "temizlik", "kg", 30, 10],
  ["Havuz pH Yükseltici", "temizlik", "kg", 30, 10],
  ["Havuz Yosun Önleyici", "temizlik", "lt", 24, 8],
  ["Havuz Çöktürücü", "temizlik", "lt", 24, 8],
  ["Atık Konteyner Dezenfektanı", "temizlik", "lt", 24, 8],
  ["Konteyner Koku Giderici", "temizlik", "lt", 18, 6],
  ["Çöp Kovası Pedallı İç Mekan", "temizlik", "adet", 24, 8],
  ["Geri Dönüşüm Kutusu Etiketi", "temizlik", "adet", 80, 25],
];

const professionalKitchenCatalog = [
  ["Dana Bonfile", "gulplaj-restorant", "kg", 18, 6],
  ["Dana Kontrfile", "gulplaj-restorant", "kg", 16, 5],
  ["Dana Tranç", "gulplaj-restorant", "kg", 20, 7],
  ["Dana Nuar", "gulplaj-restorant", "kg", 14, 5],
  ["Dana Kuşbaşı", "gulplaj-restorant", "kg", 28, 10],
  ["Dana Kıyma", "gulplaj-restorant", "kg", 24, 9],
  ["Dana Kaburga", "gulplaj-restorant", "kg", 14, 5],
  ["Kuzu Pirzola", "gulplaj-restorant", "kg", 16, 6],
  ["Kuzu Kol", "gulplaj-restorant", "kg", 15, 5],
  ["Kuzu But", "gulplaj-restorant", "kg", 18, 6],
  ["Kuzu Kuşbaşı", "gulplaj-restorant", "kg", 20, 7],
  ["Köfte Harcı", "gulplaj-restorant", "kg", 26, 9],
  ["Sucuk", "gulplaj-restorant", "kg", 10, 4],
  ["Pastırma", "gulplaj-restorant", "kg", 6, 2],
  ["Salam", "gulplaj-restorant", "kg", 8, 3],
  ["Sosis", "gulplaj-restorant", "kg", 12, 4],
  ["Füme Et", "gulplaj-restorant", "kg", 5, 2],
  ["Tavuk But", "gulplaj-restorant", "kg", 30, 10],
  ["Tavuk Kanat", "gulplaj-restorant", "kg", 26, 9],
  ["Tavuk Pirzola", "gulplaj-restorant", "kg", 24, 8],
  ["Tavuk Şiş", "gulplaj-restorant", "kg", 20, 7],
  ["Tavuk Ciğeri", "gulplaj-restorant", "kg", 10, 3],
  ["Hindi Göğüs", "gulplaj-restorant", "kg", 12, 4],
  ["Hindi Füme", "gulplaj-restorant", "kg", 6, 2],
  ["Levrek", "gulplaj-restorant", "kg", 22, 8],
  ["Çipura", "gulplaj-restorant", "kg", 22, 8],
  ["Somon Fileto", "gulplaj-restorant", "kg", 18, 6],
  ["Palamut", "gulplaj-restorant", "kg", 14, 5],
  ["Dil Balığı", "gulplaj-restorant", "kg", 10, 4],
  ["Lagos", "gulplaj-restorant", "kg", 8, 3],
  ["Karides", "gulplaj-restorant", "kg", 14, 5],
  ["Kalamar", "gulplaj-restorant", "kg", 12, 4],
  ["Ahtapot", "gulplaj-restorant", "kg", 8, 3],
  ["Midye", "gulplaj-restorant", "kg", 10, 4],
  ["Ton Balığı Konservesi", "gulplaj-restorant", "adet", 48, 18],
  ["Füme Somon", "gulplaj-restorant", "kg", 5, 2],
  ["Yumurta", "gulplaj-restorant", "adet", 360, 120],
  ["Süt", "gulplaj-restorant", "lt", 90, 30],
  ["Tereyağı", "gulplaj-restorant", "kg", 18, 6],
  ["Krema", "gulplaj-restorant", "lt", 36, 12],
  ["Yoğurt", "gulplaj-restorant", "kg", 70, 24],
  ["Süzme Yoğurt", "gulplaj-restorant", "kg", 28, 10],
  ["Beyaz Peynir", "gulplaj-restorant", "kg", 32, 12],
  ["Kaşar Peyniri", "gulplaj-restorant", "kg", 24, 9],
  ["Tulum Peyniri", "gulplaj-restorant", "kg", 12, 4],
  ["Parmesan", "gulplaj-restorant", "kg", 8, 3],
  ["Mozzarella", "gulplaj-restorant", "kg", 16, 6],
  ["Labne", "gulplaj-restorant", "kg", 14, 5],
  ["Lor Peyniri", "gulplaj-restorant", "kg", 10, 4],
  ["Cheddar Peyniri", "gulplaj-restorant", "kg", 10, 4],
  ["Dil Peyniri", "gulplaj-restorant", "kg", 8, 3],
  ["Domates", "gulplaj-restorant", "kg", 90, 30],
  ["Cherry Domates", "gulplaj-restorant", "kg", 24, 8],
  ["Salatalık", "gulplaj-restorant", "kg", 70, 24],
  ["Sivri Biber", "gulplaj-restorant", "kg", 26, 9],
  ["Kapya Biber", "gulplaj-restorant", "kg", 28, 10],
  ["Çarliston Biber", "gulplaj-restorant", "kg", 24, 8],
  ["Jalapeno Biber", "gulplaj-restorant", "kg", 8, 3],
  ["Soğan", "gulplaj-restorant", "kg", 80, 26],
  ["Kırmızı Soğan", "gulplaj-restorant", "kg", 26, 9],
  ["Taze Soğan", "gulplaj-restorant", "bağ", 40, 14],
  ["Sarımsak", "gulplaj-restorant", "kg", 18, 6],
  ["Patates", "gulplaj-restorant", "kg", 120, 40],
  ["Tatlı Patates", "gulplaj-restorant", "kg", 20, 7],
  ["Havuç", "gulplaj-restorant", "kg", 55, 18],
  ["Kabak", "gulplaj-restorant", "kg", 34, 12],
  ["Patlıcan", "gulplaj-restorant", "kg", 34, 12],
  ["Mantar", "gulplaj-restorant", "kg", 22, 8],
  ["Brokoli", "gulplaj-restorant", "kg", 18, 6],
  ["Karnabahar", "gulplaj-restorant", "kg", 18, 6],
  ["Ispanak", "gulplaj-restorant", "kg", 18, 6],
  ["Pazı", "gulplaj-restorant", "kg", 12, 4],
  ["Pırasa", "gulplaj-restorant", "kg", 18, 6],
  ["Kereviz", "gulplaj-restorant", "kg", 14, 5],
  ["Enginar", "gulplaj-restorant", "adet", 36, 12],
  ["Kuşkonmaz", "gulplaj-restorant", "kg", 8, 3],
  ["Roka", "gulplaj-restorant", "bağ", 45, 15],
  ["Marul", "gulplaj-restorant", "adet", 55, 18],
  ["Göbek Marul", "gulplaj-restorant", "adet", 36, 12],
  ["Akdeniz Yeşilliği", "gulplaj-restorant", "kg", 18, 6],
  ["Maydanoz", "gulplaj-restorant", "bağ", 60, 20],
  ["Dereotu", "gulplaj-restorant", "bağ", 35, 12],
  ["Taze Nane", "gulplaj-restorant", "bağ", 35, 12],
  ["Fesleğen", "gulplaj-restorant", "bağ", 24, 8],
  ["Kişniş", "gulplaj-restorant", "bağ", 20, 7],
  ["Limon", "gulplaj-restorant", "kg", 60, 20],
  ["Elma", "gulplaj-restorant", "kg", 45, 15],
  ["Muz", "gulplaj-restorant", "kg", 45, 15],
  ["Portakal", "gulplaj-restorant", "kg", 55, 18],
  ["Greyfurt", "gulplaj-restorant", "kg", 22, 8],
  ["Mandalina", "gulplaj-restorant", "kg", 32, 10],
  ["Çilek", "gulplaj-restorant", "kg", 18, 6],
  ["Karpuz", "gulplaj-restorant", "adet", 18, 6],
  ["Kavun", "gulplaj-restorant", "adet", 18, 6],
  ["Üzüm", "gulplaj-restorant", "kg", 24, 8],
  ["Armut", "gulplaj-restorant", "kg", 24, 8],
  ["Şeftali", "gulplaj-restorant", "kg", 24, 8],
  ["Ananas", "gulplaj-restorant", "adet", 18, 6],
  ["Avokado", "gulplaj-restorant", "adet", 36, 12],
  ["Pirinç", "gulplaj-restorant", "kg", 80, 25],
  ["Baldo Pirinç", "gulplaj-restorant", "kg", 50, 16],
  ["Bulgur", "gulplaj-restorant", "kg", 50, 16],
  ["Kuskus", "gulplaj-restorant", "kg", 24, 8],
  ["Nohut", "gulplaj-restorant", "kg", 42, 14],
  ["Kuru Fasulye", "gulplaj-restorant", "kg", 42, 14],
  ["Kırmızı Mercimek", "gulplaj-restorant", "kg", 42, 14],
  ["Yeşil Mercimek", "gulplaj-restorant", "kg", 28, 10],
  ["Barbunya", "gulplaj-restorant", "kg", 24, 8],
  ["Un", "gulplaj-restorant", "kg", 100, 35],
  ["Tam Buğday Unu", "gulplaj-restorant", "kg", 36, 12],
  ["Mısır Unu", "gulplaj-restorant", "kg", 24, 8],
  ["Galeta Unu", "gulplaj-restorant", "kg", 20, 7],
  ["Nişasta", "gulplaj-restorant", "kg", 18, 6],
  ["Toz Şeker", "gulplaj-restorant", "kg", 80, 26],
  ["Pudra Şekeri", "gulplaj-restorant", "kg", 20, 7],
  ["Esmer Şeker", "gulplaj-restorant", "kg", 18, 6],
  ["İrmik", "gulplaj-restorant", "kg", 22, 8],
  ["Yulaf", "gulplaj-restorant", "kg", 24, 8],
  ["Mısır Gevreği", "gulplaj-restorant", "kg", 18, 6],
  ["Spagetti", "gulplaj-restorant", "paket", 50, 16],
  ["Penne", "gulplaj-restorant", "paket", 50, 16],
  ["Fettucine", "gulplaj-restorant", "paket", 30, 10],
  ["Lazanya", "gulplaj-restorant", "paket", 24, 8],
  ["Erişte", "gulplaj-restorant", "kg", 24, 8],
  ["Noodle", "gulplaj-restorant", "paket", 36, 12],
  ["Ayçiçek Yağı", "gulplaj-restorant", "lt", 90, 30],
  ["Riviera Zeytinyağı", "gulplaj-restorant", "lt", 45, 15],
  ["Sızma Zeytinyağı", "gulplaj-restorant", "lt", 45, 15],
  ["Margarin", "gulplaj-restorant", "kg", 18, 6],
  ["Üzüm Sirkesi", "gulplaj-restorant", "lt", 24, 8],
  ["Elma Sirkesi", "gulplaj-restorant", "lt", 18, 6],
  ["Balzamik Sirke", "gulplaj-restorant", "lt", 12, 4],
  ["Nar Ekşisi", "gulplaj-restorant", "lt", 12, 4],
  ["Tuz", "gulplaj-restorant", "kg", 45, 15],
  ["Deniz Tuzu", "gulplaj-restorant", "kg", 18, 6],
  ["Karabiber", "gulplaj-restorant", "kg", 10, 3],
  ["Beyaz Biber", "gulplaj-restorant", "kg", 6, 2],
  ["Pul Biber", "gulplaj-restorant", "kg", 10, 3],
  ["Toz Kırmızı Biber", "gulplaj-restorant", "kg", 10, 3],
  ["Kimyon", "gulplaj-restorant", "kg", 8, 3],
  ["Kekik", "gulplaj-restorant", "kg", 8, 3],
  ["Kuru Nane", "gulplaj-restorant", "kg", 8, 3],
  ["Tarçın", "gulplaj-restorant", "kg", 6, 2],
  ["Köri", "gulplaj-restorant", "kg", 6, 2],
  ["Zerdeçal", "gulplaj-restorant", "kg", 6, 2],
  ["Zencefil Tozu", "gulplaj-restorant", "kg", 6, 2],
  ["Muskat", "gulplaj-restorant", "kg", 3, 1],
  ["Defne Yaprağı", "gulplaj-restorant", "kg", 3, 1],
  ["Susam", "gulplaj-restorant", "kg", 10, 3],
  ["Çörek Otu", "gulplaj-restorant", "kg", 6, 2],
  ["Sumak", "gulplaj-restorant", "kg", 8, 3],
  ["Safran", "gulplaj-restorant", "gr", 150, 50],
  ["Domates Salçası", "gulplaj-restorant", "kg", 35, 12],
  ["Biber Salçası", "gulplaj-restorant", "kg", 24, 8],
  ["Ketçap", "gulplaj-restorant", "adet", 36, 12],
  ["Mayonez", "gulplaj-restorant", "adet", 36, 12],
  ["Hardal", "gulplaj-restorant", "adet", 24, 8],
  ["Barbekü Sos", "gulplaj-restorant", "adet", 18, 6],
  ["Soya Sosu", "gulplaj-restorant", "lt", 18, 6],
  ["Worcestershire Sos", "gulplaj-restorant", "lt", 8, 3],
  ["Acı Sos", "gulplaj-restorant", "adet", 18, 6],
  ["Pesto Sos", "gulplaj-restorant", "kg", 10, 3],
  ["Tahin", "gulplaj-restorant", "kg", 18, 6],
  ["Bal", "gulplaj-restorant", "kg", 24, 8],
  ["Reçel", "gulplaj-restorant", "kg", 24, 8],
  ["Fıstık Ezmesi", "gulplaj-restorant", "kg", 10, 3],
  ["Demi Glace Sos", "gulplaj-restorant", "kg", 12, 4],
  ["Sebze Bulyon", "gulplaj-restorant", "kg", 10, 3],
  ["Tavuk Bulyon", "gulplaj-restorant", "kg", 10, 3],
  ["Et Bulyon", "gulplaj-restorant", "kg", 10, 3],
  ["Siyah Zeytin", "gulplaj-restorant", "kg", 32, 10],
  ["Yeşil Zeytin", "gulplaj-restorant", "kg", 28, 9],
  ["Turşu", "gulplaj-restorant", "kg", 24, 8],
  ["Kapari", "gulplaj-restorant", "kg", 8, 3],
  ["Mısır Konservesi", "gulplaj-restorant", "adet", 48, 16],
  ["Bezelye Konservesi", "gulplaj-restorant", "adet", 36, 12],
  ["Domates Konservesi", "gulplaj-restorant", "adet", 48, 16],
  ["Közlenmiş Biber", "gulplaj-restorant", "kg", 18, 6],
  ["Kuru Domates", "gulplaj-restorant", "kg", 10, 3],
  ["Kornişon Turşu", "gulplaj-restorant", "kg", 18, 6],
  ["Hamburger Ekmeği", "gulplaj-restorant", "adet", 120, 40],
  ["Tost Ekmeği", "gulplaj-restorant", "adet", 80, 25],
  ["Baget Ekmek", "gulplaj-restorant", "adet", 70, 24],
  ["Lavaş", "gulplaj-restorant", "adet", 120, 40],
  ["Tortilla", "gulplaj-restorant", "adet", 100, 35],
  ["Yufka", "gulplaj-restorant", "adet", 70, 24],
  ["Baklava Yufkası", "gulplaj-restorant", "paket", 18, 6],
  ["Ekmek Kırıntısı", "gulplaj-restorant", "kg", 16, 5],
  ["Kruvasan", "gulplaj-restorant", "adet", 90, 30],
  ["Simit", "gulplaj-restorant", "adet", 90, 30],
  ["Çikolata Kuvertür", "gulplaj-restorant", "kg", 18, 6],
  ["Kakao", "gulplaj-restorant", "kg", 10, 3],
  ["Vanilya", "gulplaj-restorant", "kg", 5, 2],
  ["Kabartma Tozu", "gulplaj-restorant", "kg", 6, 2],
  ["Kuru Maya", "gulplaj-restorant", "kg", 8, 3],
  ["Toz Jelatin", "gulplaj-restorant", "kg", 5, 2],
  ["Sütlü Çikolata", "gulplaj-restorant", "kg", 14, 5],
  ["Bitter Çikolata", "gulplaj-restorant", "kg", 14, 5],
  ["Krema Şanti", "gulplaj-restorant", "kg", 10, 3],
  ["Dondurma Bazı", "gulplaj-restorant", "kg", 12, 4],
  ["Hindistan Cevizi", "gulplaj-restorant", "kg", 8, 3],
  ["Ceviz", "gulplaj-restorant", "kg", 16, 5],
  ["Badem", "gulplaj-restorant", "kg", 16, 5],
  ["Fındık", "gulplaj-restorant", "kg", 16, 5],
  ["Antep Fıstığı", "gulplaj-restorant", "kg", 10, 3],
  ["Çam Fıstığı", "gulplaj-restorant", "kg", 6, 2],
  ["Kuru Üzüm", "gulplaj-restorant", "kg", 12, 4],
  ["Kuru Kayısı", "gulplaj-restorant", "kg", 12, 4],
  ["Kuru İncir", "gulplaj-restorant", "kg", 12, 4],
  ["Dondurulmuş Patates", "gulplaj-restorant", "kg", 60, 20],
  ["Dondurulmuş Bezelye", "gulplaj-restorant", "kg", 30, 10],
  ["Dondurulmuş Sebze Karışımı", "gulplaj-restorant", "kg", 30, 10],
  ["Dondurulmuş Mısır", "gulplaj-restorant", "kg", 24, 8],
  ["Dondurulmuş Meyve", "gulplaj-restorant", "kg", 24, 8],
  ["Dondurulmuş Kruvasan", "gulplaj-restorant", "adet", 100, 35],
  ["Türk Kahvesi", "gulplaj-restorant", "kg", 14, 5],
  ["Filtre Kahve", "gulplaj-restorant", "kg", 14, 5],
  ["Espresso Çekirdeği", "gulplaj-restorant", "kg", 18, 6],
  ["Çay", "gulplaj-restorant", "kg", 24, 8],
  ["Bitki Çayı", "gulplaj-restorant", "kutu", 36, 12],
  ["Kakao İçecek Tozu", "gulplaj-restorant", "kg", 12, 4],
  ["Portakal Suyu", "gulplaj-restorant", "lt", 60, 20],
  ["Limonata Konsantresi", "gulplaj-restorant", "lt", 24, 8],
];

const seedProducts = [
  ["Çamaşır Deterjanı", "temizlik", "kg", 35, 12],
  ["Yüzey Temizleyici", "temizlik", "lt", 24, 10],
  ["Çöp Poşeti Büyük", "temizlik", "rulo", 80, 20],
  ["Tuvalet Kağıdı", "temizlik", "paket", 120, 35],
  ["Kağıt Havlu", "temizlik", "paket", 90, 30],
  ["Dana Antrikot", "gulplaj-restorant", "kg", 18, 8],
  ["Tavuk Göğüs", "gulplaj-restorant", "kg", 32, 12],
  ["Zeytinyağı", "gulplaj-restorant", "lt", 16, 6],
  ["Makarna", "gulplaj-restorant", "paket", 60, 18],
  ["Kola 330 ml", "gulplaj-bufe", "adet", 180, 60],
  ["Su 500 ml", "gulplaj-bufe", "adet", 260, 100],
  ["Dondurma", "gulplaj-bufe", "adet", 95, 35],
  ["Sandviç Ekmeği", "smile-food-house", "adet", 70, 25],
  ["Patates", "smile-food-house", "kg", 45, 18],
  ["Ketçap", "smile-food-house", "adet", 24, 8],
  ["Oda Kartı", "resepsiyon", "adet", 220, 80],
  ["Kayıt Formu", "resepsiyon", "adet", 140, 50],
  ["Kalem", "resepsiyon", "adet", 65, 25],
].map((item, index) => ({
  id: `p-${index + 1}`,
  name: item[0],
  departmentId: item[1],
  unit: item[2],
  lastQty: item[3],
  minQty: item[4],
  active: true,
}));

const defaultMailSettings = {
  reminder: {
    recipients: "temizlik@otel.com, mutfak@otel.com, bufe@otel.com, resepsiyon@otel.com",
    sendTime: "18:00",
    subject: "Stok sayım hatırlatma",
    message: "Lütfen gün sonu stok sayımınızı sisteme giriniz.",
  },
  report: {
    recipients: "yonetim@otel.com, muhasebe@otel.com",
    sendTime: "23:00",
    subject: "Sipariş verilmesi gereken stok raporu",
  },
};

const state = {
  user: null,
  view: "sayim",
  selectedDepartment: "all",
  reportDate: new Date().toISOString().slice(0, 10),
  search: "",
  editingProductId: null,
  openStockDepartmentId: "temizlik",
  sessionToken: sessionStorage.getItem("otel-yonetim-token") || "",
  products: load("hotel-stock-products", seedProducts),
  counts: load("hotel-stock-counts", {}),
  mailSettings: normalizeMailSettings(load("hotel-stock-mail-settings", defaultMailSettings)),
};

state.products = ensureProfessionalProductCatalogs(state.products);
save("hotel-stock-products", state.products);

const todayKey = () => new Date().toISOString().slice(0, 10);
const app = document.querySelector("#app");
const backendEnabled = location.protocol === "http:" || location.protocol === "https:";

async function apiRequest(path, options = {}) {
  if (!backendEnabled) return null;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (state.sessionToken) {
    headers.Authorization = `Bearer ${state.sessionToken}`;
  }
  const response = await fetch(path, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `API error ${response.status}`);
  }
  return response.json();
}

async function syncFromBackend() {
  try {
    const data = await apiRequest("/api/bootstrap");
    if (!data) return;
    state.products = ensureProfessionalProductCatalogs(data.products || state.products);
    state.counts = data.counts || state.counts;
    state.mailSettings = normalizeMailSettings(data.mailSettings || state.mailSettings);
    save("hotel-stock-products", state.products);
    save("hotel-stock-counts", state.counts);
    save("hotel-stock-mail-settings", state.mailSettings);
    render();
  } catch (error) {
    console.warn("Backend bağlantısı kurulamadı, yerel demo modu kullanılacak.", error);
  }
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(fallback));
  } catch {
    return JSON.parse(JSON.stringify(fallback));
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function productCatalogKey(product) {
  return `${product.departmentId}::${String(product.name || "").trim().toLocaleLowerCase("tr-TR")}`;
}

function ensureProfessionalProductCatalogs(products) {
  const next = Array.isArray(products) ? products.map((product) => ({ ...product })) : [];
  const existing = new Set(next.map(productCatalogKey));
  const ids = new Set(next.map((product) => product.id).filter(Boolean));
  const catalogs = [
    { prefix: "temizlik", items: professionalCleaningCatalog },
    { prefix: "mutfak", items: professionalKitchenCatalog },
  ];

  catalogs.forEach(({ prefix, items }) => {
    items.forEach((item, index) => {
      const candidate = {
        id: `${prefix}-${index + 1}`,
        name: item[0],
        departmentId: item[1],
        unit: item[2],
        lastQty: item[3],
        minQty: item[4],
        active: true,
      };
      const key = productCatalogKey(candidate);
      if (existing.has(key)) return;

      let suffix = 2;
      while (ids.has(candidate.id)) {
        candidate.id = `${prefix}-${index + 1}-${suffix}`;
        suffix += 1;
      }

      next.push(candidate);
      existing.add(key);
      ids.add(candidate.id);
    });
  });

  return next;
}

function normalizeMailSettings(settings) {
  if (settings?.reminder && settings?.report) {
    return settings;
  }

  return {
    reminder: { ...defaultMailSettings.reminder },
    report: {
      recipients: settings?.recipients || defaultMailSettings.report.recipients,
      sendTime: settings?.sendTime || defaultMailSettings.report.sendTime,
      subject: settings?.subject || defaultMailSettings.report.subject,
    },
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function departmentName(id) {
  if (id === "all") return "Tüm Departmanlar";
  return departments.find((department) => department.id === id)?.name || id;
}

function visibleDepartments() {
  return state.user?.role === "admin"
    ? departments
    : departments.filter((department) => department.id === state.user.departmentId);
}

function visibleProducts({ includeInactive = false } = {}) {
  const allowedIds = visibleDepartments().map((department) => department.id);
  return state.products.filter((product) => {
    const inDepartment =
      state.selectedDepartment === "all"
        ? allowedIds.includes(product.departmentId)
        : product.departmentId === state.selectedDepartment;
    const inSearch = product.name.toLocaleLowerCase("tr").includes(state.search.toLocaleLowerCase("tr"));
    const activeMatch = includeInactive || product.active;
    return activeMatch && inDepartment && inSearch;
  });
}

function getTodayCount(productId) {
  return getCount(productId, todayKey());
}

function getCount(productId, date = todayKey()) {
  return state.counts[date]?.[productId] || null;
}

function setTodayCount(productId, qty, note = "", orderRequest = null) {
  const product = state.products.find((item) => item.id === productId);
  const date = todayKey();
  const entry = {
    qty: Number(qty),
    note,
    orderRequest,
    user: state.user.name,
    username: state.user.username,
    departmentId: product?.departmentId || state.user.departmentId,
    time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
  };
  state.counts[date] ||= {};
  state.counts[date][productId] = entry;
  save("hotel-stock-counts", state.counts);
  apiRequest("/api/counts", {
    method: "POST",
    body: JSON.stringify({ date, productId, ...entry }),
  }).catch((error) => console.warn("Sayım backend'e yazılamadı.", error));
}

function render() {
  if (!state.user) {
    renderLogin();
    return;
  }

  app.innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <h1>Otel Yönetim</h1>
          <span>Stok, rapor ve operasyon kontrolü</span>
        </div>
        <div class="user-panel">
          <div class="user-name">${escapeHtml(state.user.name)}</div>
          <div class="user-meta">${state.user.role === "admin" ? "Admin" : departmentName(state.user.departmentId)}</div>
        </div>
        <nav class="nav">
          ${state.user.role === "admin" ? navButton("dashboard", "Kontrol Paneli") : ""}
          ${navButton("sayim", "Günlük Sayım")}
          ${navButton("rapor", "Günlük Rapor")}
          ${state.user.role === "admin" ? navButton("urunler", "Ürünler") : ""}
          ${state.user.role === "admin" ? navButton("ayarlar", "Mail Ayarları") : ""}
          ${state.user.role === "admin" ? navButton("kullanicilar", "Kullanıcılar") : ""}
        </nav>
        <button class="logout" data-action="logout">Çıkış yap</button>
      </aside>
      <section class="content">
        ${renderTopbar()}
        ${renderView()}
      </section>
    </div>
  `;
}

function navButton(view, label) {
  return `<button class="${state.view === view ? "active" : ""}" data-view="${view}">${label}</button>`;
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">${departmentName(state.selectedDepartment)}</p>
        <h2>${viewTitle()}</h2>
      </div>
      <div class="date-pill">${new Date().toLocaleDateString("tr-TR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}</div>
    </header>
  `;
}

function viewTitle() {
  const titles = {
    sayim: "Bugünkü stok sayım ekranı",
    dashboard: "Otel operasyon kontrol paneli",
    rapor: "Günlük rapor ve mail özeti",
    urunler: "Ürün ve minimum stok yönetimi",
    ayarlar: "Otomatik mail ayarları",
    kullanicilar: "Kullanıcı ve departman listesi",
  };
  return titles[state.view];
}

function renderView() {
  if (state.view === "dashboard") return renderDashboard();
  if (state.view === "rapor") return renderReport();
  if (state.view === "urunler") return renderProductsAdmin();
  if (state.view === "ayarlar") return renderMailSettings();
  if (state.view === "kullanicilar") return renderUsers();
  return renderCounting();
}

function renderDashboard() {
  const activeProducts = state.products.filter((product) => product.active);
  const criticalItems = activeProducts
    .map((product) => {
      const count = getTodayCount(product.id);
      const qty = count ? count.qty : product.lastQty;
      return { product, count, qty };
    })
    .filter((item) => item.qty <= item.product.minQty);
  const departmentSummaries = departments.map((department) => {
    const products = activeProducts.filter((product) => product.departmentId === department.id);
    const counted = products.filter((product) => getTodayCount(product.id)).length;
    const complete = products.length > 0 && counted === products.length;
    return { department, products: products.length, counted, complete };
  });
  const incompleteDepartments = departmentSummaries.filter((item) => !item.complete).length;

  const criticalRows = criticalItems.slice(0, 8).map(({ product, qty }) => `
    <tr>
      <td data-label="Ürün"><strong>${escapeHtml(product.name)}</strong><br><span class="hint">${departmentName(product.departmentId)}</span></td>
      <td data-label="Mevcut">${qty} ${escapeHtml(product.unit)}</td>
      <td data-label="Minimum">${product.minQty}</td>
      <td data-label="Durum"><span class="badge danger">Sipariş gerekli</span></td>
    </tr>
  `).join("");

  const departmentRows = departmentSummaries.map(({ department, products, counted, complete }) => `
    <tr>
      <td data-label="Departman"><strong>${departmentStockTitle(department)}</strong></td>
      <td data-label="Ürün">${products}</td>
      <td data-label="Sayılan">${counted}</td>
      <td data-label="Durum"><span class="badge ${complete ? "ok" : "danger"}">${complete ? "Tamamlandı" : "Bekliyor"}</span></td>
    </tr>
  `).join("");

  return `
    <div class="grid stats">
      <div class="stat"><strong>${activeProducts.length}</strong><span>Aktif stok kalemi</span></div>
      <div class="stat"><strong>${criticalItems.length}</strong><span>Sipariş gerektiren</span></div>
      <div class="stat"><strong>${incompleteDepartments}</strong><span>Eksik departman</span></div>
      <div class="stat"><strong>${state.mailSettings.report.sendTime}</strong><span>Yönetici raporu</span></div>
    </div>
    <div class="grid executive-layout">
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Bugünün kritik siparişleri</h3>
          <button class="btn secondary" data-view="rapor">Raporu aç</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Ürün</th><th>Mevcut</th><th>Minimum</th><th>Durum</th></tr></thead>
            <tbody>${criticalRows || `<tr><td data-label="Durum" colspan="4" class="empty">Bugün sipariş gerektiren ürün yok.</td></tr>`}</tbody>
          </table>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Departman sayım durumu</h3>
          <button class="btn secondary" data-view="sayim">Sayım ekranı</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Departman</th><th>Ürün</th><th>Sayılan</th><th>Durum</th></tr></thead>
            <tbody>${departmentRows}</tbody>
          </table>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Mail otomasyonları</h3>
          <button class="btn secondary" data-view="ayarlar">Ayarlar</button>
        </div>
        <div class="settings-list">
          <div><strong>Personel hatırlatma</strong><span>${escapeHtml(state.mailSettings.reminder.sendTime)} - ${escapeHtml(state.mailSettings.reminder.recipients)}</span></div>
          <div><strong>Yönetici sipariş raporu</strong><span>${escapeHtml(state.mailSettings.report.sendTime)} - ${escapeHtml(state.mailSettings.report.recipients)}</span></div>
          <div><strong>Mail durumu</strong><span>SMTP kapalıysa gönderimler log dosyasına yazılır; SMTP açıldığında aynı akış gerçek mail atar.</span></div>
        </div>
      </section>
    </div>
  `;
}

function renderStats(date = todayKey()) {
  const products = visibleProducts();
  const counted = products.filter((product) => getCount(product.id, date)).length;
  const critical = products.filter((product) => {
    const count = getCount(product.id, date);
    const qty = count ? count.qty : product.lastQty;
    return qty <= product.minQty;
  }).length;
  const completion = products.length ? Math.round((counted / products.length) * 100) : 0;

  return `
    <div class="grid stats">
      <div class="stat"><strong>${products.length}</strong><span>Aktif ürün</span></div>
      <div class="stat"><strong>${counted}</strong><span>Bugün sayılan</span></div>
      <div class="stat"><strong>${critical}</strong><span>Kritik stok</span></div>
      <div class="stat"><strong>%${completion}</strong><span>Tamamlanma</span></div>
    </div>
  `;
}

function renderDepartmentFilter() {
  const options = visibleDepartments()
    .map((department) => `<option value="${department.id}" ${state.selectedDepartment === department.id ? "selected" : ""}>${department.name}</option>`)
    .join("");
  const all = state.user.role === "admin" ? `<option value="all" ${state.selectedDepartment === "all" ? "selected" : ""}>Tüm departmanlar</option>` : "";
  return `<select class="field" data-action="department">${all}${options}</select>`;
}

function renderCounting() {
  const rows = visibleProducts()
    .map((product) => {
      const count = getTodayCount(product.id);
      const qty = count?.qty ?? "";
      const note = count?.note ?? "";
      const requested = Boolean(count?.orderRequest?.requested);
      const requestQty = count?.orderRequest?.qty ?? "";
      const requestReason = count?.orderRequest?.reason ?? "";
      const isCritical = Number(qty || product.lastQty) <= product.minQty;
      return `
        <tr>
          <td data-label="Ürün"><strong>${escapeHtml(product.name)}</strong><br><span class="hint">${departmentName(product.departmentId)}</span></td>
          <td data-label="Birim">${escapeHtml(product.unit)}</td>
          <td data-label="Önceki">${product.lastQty}</td>
          <td data-label="Minimum">${product.minQty}</td>
          <td data-label="Bugünkü Sayım"><input class="qty-input" type="number" min="0" step="0.01" value="${qty}" data-count="${product.id}" /></td>
          <td data-label="Not"><input class="note-input" value="${escapeHtml(note)}" placeholder="Not" data-note="${product.id}" /></td>
          <td data-label="Sipariş Talebi">
            <div class="order-request-cell">
              <label class="checkline"><input type="checkbox" data-order-request="${product.id}" ${requested ? "checked" : ""} /> Sipariş iste</label>
              <input class="small-input" type="number" min="0" step="0.01" value="${requestQty}" placeholder="Miktar" data-order-qty="${product.id}" />
              <input class="reason-input" value="${escapeHtml(requestReason)}" placeholder="Gerekçe" data-order-reason="${product.id}" />
            </div>
          </td>
          <td data-label="Kaydeden">${count ? `${escapeHtml(count.user)}<br><span class="hint">${count.time}</span>` : "<span class=\"hint\">Bekliyor</span>"}</td>
          <td data-label="Durum"><span class="badge ${isCritical ? "danger" : "ok"}">${isCritical ? "Kritik" : "Yeterli"}</span></td>
        </tr>
      `;
    })
    .join("");

  return `
    ${renderStats()}
    <section class="panel">
      <div class="panel-head">
        <h3 class="panel-title">Sayım listesi</h3>
        <div class="toolbar">
          ${renderDepartmentFilter()}
          <input class="search" value="${escapeHtml(state.search)}" placeholder="Ürün ara" data-action="search" />
          <button class="btn" data-action="save-counts">Kaydet</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Ürün</th>
              <th>Birim</th>
              <th>Önceki</th>
              <th>Minimum</th>
              <th>Bugünkü Sayım</th>
              <th>Not</th>
              <th>Sipariş Talebi</th>
              <th>Kaydeden</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>${rows || `<tr><td data-label="Durum" colspan="9" class="empty">Bu filtrede ürün yok.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderReport() {
  return `
    ${renderStats(state.reportDate)}
    <div class="grid two-col">
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Departman özeti</h3>
          <div class="toolbar">
            ${renderDepartmentFilter()}
            <input class="field" type="date" value="${state.reportDate}" data-action="report-date" />
            <button class="btn secondary" data-action="copy-report">Mail metnini kopyala</button>
            <button class="btn" data-action="download-csv">CSV indir</button>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Departman</th>
                <th>Ürün</th>
                <th>Sayılan</th>
                <th>Kritik</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>${reportRows(state.reportDate)}</tbody>
          </table>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Mail ön izlemesi</h3>
          <span class="badge">${escapeHtml(state.mailSettings.report.sendTime)} yönetici raporu</span>
        </div>
        <div class="mail-preview">${escapeHtml(buildMailReport())}</div>
      </section>
    </div>
  `;
}

function reportRows(date = state.reportDate) {
  return visibleDepartments()
    .filter((department) => state.selectedDepartment === "all" || department.id === state.selectedDepartment)
    .map((department) => {
      const products = state.products.filter((product) => product.departmentId === department.id && product.active);
      const counted = products.filter((product) => getCount(product.id, date)).length;
      const critical = products.filter((product) => {
        const count = getCount(product.id, date);
        return (count ? count.qty : product.lastQty) <= product.minQty;
      }).length;
      const complete = counted === products.length && products.length > 0;
      return `
        <tr>
          <td data-label="Departman"><strong>${department.name}</strong></td>
          <td data-label="Ürün">${products.length}</td>
          <td data-label="Sayılan">${counted}</td>
          <td data-label="Kritik">${critical}</td>
          <td data-label="Durum"><span class="badge ${complete ? "ok" : "danger"}">${complete ? "Tamamlandı" : "Eksik"}</span></td>
        </tr>
      `;
    })
    .join("");
}

function buildMailReport() {
  const date = state.reportDate;
  const lines = [
    state.mailSettings.report.subject,
    `Tarih: ${date}`,
    `Alıcılar: ${state.mailSettings.report.recipients}`,
    `Gönderim saati: ${state.mailSettings.report.sendTime}`,
    "",
    "Sipariş verilmesi gereken ürünler:",
    "",
  ];
  let orderCount = 0;
  const manualRequests = [];

  visibleDepartments()
    .filter((department) => state.selectedDepartment === "all" || department.id === state.selectedDepartment)
    .forEach((department) => {
      const activeProducts = state.products
        .filter((product) => product.departmentId === department.id && product.active)
        .map((product) => {
          const count = getCount(product.id, state.reportDate);
          const qty = count ? count.qty : product.lastQty;
          return { product, count, qty };
        });
      const criticalProducts = activeProducts.filter((item) => item.qty <= item.product.minQty);
      activeProducts
        .filter((item) => item.count?.orderRequest?.requested)
        .forEach((item) => manualRequests.push({ ...item, department }));

      if (criticalProducts.length > 0) {
        lines.push(department.name);
        criticalProducts.forEach(({ product, count, qty }) => {
          const note = count?.note ? ` | Not: ${count.note}` : "";
          lines.push(`- ${product.name}: ${qty} ${product.unit} | Minimum: ${product.minQty} | Sipariş gerekli${note}`);
          orderCount += 1;
        });
        lines.push("");
      }
    });

  if (orderCount === 0) {
    lines.push("Bugün minimum stok seviyesinin altında ürün bulunmuyor.");
    lines.push("");
  }

  lines.push("Manuel sipariş talepleri:");
  lines.push("");

  if (manualRequests.length === 0) {
    lines.push("Yeterli stokta olup ayrıca sipariş talep edilen ürün yok.");
  } else {
    manualRequests.forEach(({ product, count, qty, department }) => {
      const request = count.orderRequest;
      const requestedQty = request.qty ? ` | Talep miktarı: ${request.qty} ${product.unit}` : "";
      const reason = request.reason ? ` | Gerekçe: ${request.reason}` : "";
      lines.push(`- ${departmentStockTitle(department)} / ${product.name}: mevcut ${qty} ${product.unit}${requestedQty}${reason}`);
    });
  }

  return lines.join("\n");
}

function buildReminderMail() {
  return [
    state.mailSettings.reminder.subject,
    `Alıcılar: ${state.mailSettings.reminder.recipients}`,
    `Gönderim saati: ${state.mailSettings.reminder.sendTime}`,
    "",
    state.mailSettings.reminder.message,
    "",
    "Departmanlar: Temizlik, Mutfak, Büfe, Smile Food House, Resepsiyon",
  ].join("\n");
}

function renderProductsAdmin() {
  const editingProduct = state.products.find((product) => product.id === state.editingProductId);
  const rows = visibleProducts({ includeInactive: true })
    .map((product) => `
      <tr>
        <td data-label="Ürün"><strong>${escapeHtml(product.name)}</strong></td>
        <td data-label="Departman">${departmentName(product.departmentId)}</td>
        <td data-label="Birim">${escapeHtml(product.unit)}</td>
        <td data-label="Mevcut">${product.lastQty}</td>
        <td data-label="Minimum">${product.minQty}</td>
        <td data-label="Durum"><span class="badge ${product.active ? "ok" : "danger"}">${product.active ? "Aktif" : "Pasif"}</span></td>
        <td data-label="İşlem">
          <div class="inline-actions">
            <button class="mini-btn" data-action="edit-product" data-id="${product.id}">Düzenle</button>
            <button class="mini-btn" data-action="toggle-product" data-id="${product.id}">${product.active ? "Pasifleştir" : "Aktifleştir"}</button>
          </div>
        </td>
      </tr>
    `)
    .join("");

  return `
    <div class="grid admin-products-layout">
      ${renderDepartmentStockForms(editingProduct)}
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Ürün kartları</h3>
          <div class="toolbar">
            ${renderDepartmentFilter()}
            <input class="search" value="${escapeHtml(state.search)}" placeholder="Ürün ara" data-action="search" />
            <button class="btn warn" data-action="reset-demo">Demo verisini sıfırla</button>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Ürün</th><th>Departman</th><th>Birim</th><th>Başlangıç</th><th>Minimum</th><th>Durum</th><th>İşlem</th></tr></thead>
            <tbody>${rows || `<tr><td data-label="Durum" colspan="7" class="empty">Ürün bulunamadı.</td></tr>`}</tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderDepartmentStockForms(editingProduct) {
  if (editingProduct) {
    return `
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Ürün düzenle</h3>
          <button class="btn secondary" data-action="cancel-edit">Vazgeç</button>
        </div>
        ${renderProductForm(editingProduct.departmentId, editingProduct)}
      </section>
    `;
  }

  return `
    <section class="panel">
      <div class="panel-head">
        <h3 class="panel-title">Departmana stok ekle</h3>
        <span class="badge">Manuel giriş</span>
      </div>
      <div class="department-stock-sections">
        ${departments.map((department) => renderDepartmentStockSection(department, department.id === state.openStockDepartmentId)).join("")}
      </div>
    </section>
  `;
}

function renderDepartmentStockSection(department, open) {
  const productCount = state.products.filter((product) => product.departmentId === department.id && product.active).length;
  return `
    <details class="stock-section" ${open ? "open" : ""}>
      <summary>
        <span>
          <strong>${departmentStockTitle(department)}</strong>
          <small>${productCount} aktif stok kalemi - ürün adı, birim ve miktar girip ekle</small>
        </span>
        <span class="badge">Yeni stok</span>
      </summary>
      ${renderProductForm(department.id)}
    </details>
  `;
}

function departmentStockTitle(department) {
  if (department.id === "gulplaj-restorant") return "Mutfak / Gülplaj Restorant";
  if (department.id === "gulplaj-bufe") return "Büfe / Gülplaj Büfe";
  return department.name;
}

function renderProductForm(departmentId, product = null) {
  return `
    <form class="form-body compact-product-form" data-action="product-form">
      <input type="hidden" name="id" value="${product?.id || ""}" />
      <input type="hidden" name="departmentId" value="${departmentId}" />
      <div class="quick-product-grid">
        <div class="form-row">
          <label>Ürün adı</label>
          <input name="name" required value="${escapeHtml(product?.name || "")}" placeholder="Örn. Çöp poşeti, su, kalem" />
        </div>
        <div class="form-row">
          <label>Departman</label>
          <input value="${escapeHtml(departmentStockTitle(departments.find((department) => department.id === departmentId) || { id: departmentId, name: departmentName(departmentId) }))}" disabled />
        </div>
        <div class="form-row">
          <label>Birim</label>
          <select name="unit" required>
            ${renderUnitOptions(product?.unit)}
          </select>
        </div>
        <div class="form-row">
          <label>Mevcut stok</label>
          <input name="lastQty" type="number" min="0" step="0.01" required value="${product?.lastQty ?? ""}" />
        </div>
        <div class="form-row">
          <label>Minimum stok</label>
          <input name="minQty" type="number" min="0" step="0.01" required value="${product?.minQty ?? ""}" />
        </div>
      </div>
      <button class="btn" type="submit">${product ? "Ürünü güncelle" : `${departmentStockTitle(departments.find((department) => department.id === departmentId) || { id: departmentId, name: departmentName(departmentId) })} stoğu ekle`}</button>
    </form>
  `;
}

function renderUnitOptions(selectedUnit = "") {
  const units = ["adet", "kg", "gr", "lt", "ml", "paket", "koli", "rulo", "şişe", "kutu", "çuval"];
  const normalizedSelected = String(selectedUnit || "");
  const options = units
    .map((unit) => `<option value="${unit}" ${normalizedSelected === unit ? "selected" : ""}>${unit}</option>`)
    .join("");
  const custom = normalizedSelected && !units.includes(normalizedSelected)
    ? `<option value="${escapeHtml(normalizedSelected)}" selected>${escapeHtml(normalizedSelected)}</option>`
    : "";
  return `<option value="" ${normalizedSelected ? "" : "selected"}>Birim seç</option>${options}${custom}`;
}

function renderMailSettings() {
  return `
    <div class="grid mail-settings-layout">
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Personel hatırlatma maili</h3>
          <span class="badge">${escapeHtml(state.mailSettings.reminder.sendTime)} hatırlatma</span>
        </div>
        <form class="form-body" data-action="mail-settings">
          <div class="form-row">
            <label>Personel alıcı mail adresleri</label>
            <textarea name="reminderRecipients" required>${escapeHtml(state.mailSettings.reminder.recipients)}</textarea>
            <span class="hint">Stok girmesi gereken personele gönderilir. Birden fazla alıcıyı virgül ile ayır.</span>
          </div>
          <div class="form-grid">
            <div class="form-row">
              <label>Hatırlatma saati</label>
              <input name="reminderTime" type="time" required value="${escapeHtml(state.mailSettings.reminder.sendTime)}" />
            </div>
            <div class="form-row">
              <label>Hatırlatma konusu</label>
              <input name="reminderSubject" required value="${escapeHtml(state.mailSettings.reminder.subject)}" />
            </div>
          </div>
          <div class="form-row">
            <label>Hatırlatma mesajı</label>
            <textarea name="reminderMessage" required>${escapeHtml(state.mailSettings.reminder.message)}</textarea>
          </div>
          <button class="btn" type="submit">Mail otomasyonlarını kaydet</button>
        </form>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Yönetici sipariş raporu maili</h3>
          <span class="badge">${escapeHtml(state.mailSettings.report.sendTime)} rapor</span>
        </div>
        <form class="form-body" data-action="mail-settings">
          <div class="form-row">
            <label>Yönetici alıcı mail adresleri</label>
            <textarea name="reportRecipients" required>${escapeHtml(state.mailSettings.report.recipients)}</textarea>
            <span class="hint">Minimum stok altındaki ürünler sipariş raporu olarak gönderilir.</span>
          </div>
          <div class="form-grid">
            <div class="form-row">
              <label>Rapor gönderim saati</label>
              <input name="reportTime" type="time" required value="${escapeHtml(state.mailSettings.report.sendTime)}" />
            </div>
            <div class="form-row">
              <label>Rapor konusu</label>
              <input name="reportSubject" required value="${escapeHtml(state.mailSettings.report.subject)}" />
            </div>
          </div>
          <div class="toolbar">
            <button class="btn" type="submit">Mail otomasyonlarını kaydet</button>
            <button class="btn secondary" type="button" data-action="verify-smtp">SMTP kontrol et</button>
          </div>
        </form>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Hatırlatma maili ön izlemesi</h3>
          <div class="toolbar">
            <span class="badge">Personel</span>
            <button class="btn secondary" data-action="send-reminder-mail">Hatırlatma gönder</button>
          </div>
        </div>
        <div class="mail-preview">${escapeHtml(buildReminderMail())}</div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Yönetici raporu ön izlemesi</h3>
          <div class="toolbar">
            <span class="badge">Sipariş gerekli</span>
            <button class="btn secondary" data-action="send-report-mail">Rapor gönder</button>
          </div>
        </div>
        <div class="mail-preview">${escapeHtml(buildMailReport())}</div>
      </section>
    </div>
  `;
}

function renderUsers() {
  const rows = users
    .map((user) => `
      <tr>
        <td data-label="Kullanıcı"><strong>${escapeHtml(user.name)}</strong><br><span class="hint">${escapeHtml(user.username)}</span></td>
        <td data-label="Rol">${user.role === "admin" ? "Admin" : "Personel"}</td>
        <td data-label="Departman">${departmentName(user.departmentId)}</td>
        <td data-label="Durum"><span class="badge ok">Aktif</span></td>
      </tr>
    `)
    .join("");
  return `
    <section class="panel">
      <div class="panel-head"><h3 class="panel-title">Giriş bilgileri ve yetkiler</h3></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Kullanıcı</th><th>Rol</th><th>Departman</th><th>Durum</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderLogin() {
  app.innerHTML = `
    <section class="login-page">
      <div class="login-card">
        <div class="login-intro">
          <div>
            <p class="eyebrow">Günlük operasyon</p>
            <h1>Otel yönetimi tek ekranda.</h1>
          </div>
          <p>Personel kendi departmanına girer, sayımı tamamlar; yönetici stok, sipariş ve mail raporlarını tek yerden takip eder.</p>
        </div>
        <form class="login-form" data-action="login">
          <div>
            <p class="eyebrow">Giriş</p>
            <h2>Kullanıcı hesabı</h2>
          </div>
          <div class="form-row">
            <label for="username">Kullanıcı adı</label>
            <input id="username" name="username" autocomplete="username" value="admin" />
          </div>
          <div class="form-row">
            <label for="password">Şifre</label>
            <input id="password" name="password" type="password" autocomplete="current-password" value="admin123" />
          </div>
          <div class="hint">Demo kullanıcıları: admin/admin123, temizlik/Temizlik2026, mutfak/Mutfak2026, bufe/Bufe2026, resepsiyon/Resepsiyon2026</div>
          <div class="error" data-error></div>
          <button class="btn" type="submit">Giriş yap</button>
        </form>
      </div>
    </section>
  `;
}

function exportCsv() {
  const header = ["Tarih", "Departman", "Ürün", "Birim", "Önceki", "Minimum", "Sayım", "Durum", "Kaydeden", "Saat", "Not", "Manuel Sipariş", "Talep Miktarı", "Talep Gerekçesi"];
  const rows = visibleProducts().map((product) => {
    const count = getCount(product.id, state.reportDate);
    const qty = count?.qty ?? "";
    const status = count ? (count.qty <= product.minQty ? "Kritik" : "Yeterli") : "Bekliyor";
    return [
      state.reportDate,
      departmentName(product.departmentId),
      product.name,
      product.unit,
      product.lastQty,
      product.minQty,
      qty,
      status,
      count?.user || "",
      count?.time || "",
      count?.note || "",
      count?.orderRequest?.requested ? "Evet" : "Hayır",
      count?.orderRequest?.qty || "",
      count?.orderRequest?.reason || "",
    ];
  });

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(";"))
    .join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `stok-raporu-${state.reportDate}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function upsertProduct(form) {
  const formData = new FormData(form);
  const id = String(formData.get("id") || "");
  const isUpdate = Boolean(id);
  const product = {
    id: id || `p-${Date.now()}`,
    name: String(formData.get("name") || "").trim(),
    departmentId: String(formData.get("departmentId") || ""),
    unit: String(formData.get("unit") || "").trim(),
    lastQty: Number(formData.get("lastQty") || 0),
    minQty: Number(formData.get("minQty") || 0),
    active: true,
  };

  if (isUpdate) {
    const index = state.products.findIndex((item) => item.id === id);
    product.active = state.products[index]?.active ?? true;
    state.products[index] = product;
  } else {
    state.products.push(product);
  }

  state.editingProductId = null;
  state.openStockDepartmentId = product.departmentId;
  save("hotel-stock-products", state.products);
  apiRequest(isUpdate ? `/api/products/${encodeURIComponent(product.id)}` : "/api/products", {
    method: isUpdate ? "PUT" : "POST",
    body: JSON.stringify(product),
  }).catch((error) => console.warn("Ürün backend'e yazılamadı.", error));
}

app.addEventListener("click", async (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  const action = target.dataset.action;
  const view = target.dataset.view;

  if (view) {
    state.view = view;
    render();
  }

  if (action === "logout") {
    apiRequest("/api/logout", { method: "POST" }).catch(() => {});
    sessionStorage.removeItem("otel-yonetim-token");
    state.user = null;
    state.sessionToken = "";
    state.view = "sayim";
    state.selectedDepartment = "all";
    state.editingProductId = null;
    state.openStockDepartmentId = "temizlik";
    render();
  }

  if (action === "save-counts") {
    document.querySelectorAll("[data-count]").forEach((input) => {
      if (input.value !== "") {
        const note = document.querySelector(`[data-note="${input.dataset.count}"]`)?.value || "";
        const requested = document.querySelector(`[data-order-request="${input.dataset.count}"]`)?.checked || false;
        const orderQty = document.querySelector(`[data-order-qty="${input.dataset.count}"]`)?.value || "";
        const reason = document.querySelector(`[data-order-reason="${input.dataset.count}"]`)?.value || "";
        const orderRequest = requested
          ? { requested: true, qty: Number(orderQty || 0), reason }
          : { requested: false, qty: 0, reason: "" };
        setTodayCount(input.dataset.count, input.value, note, orderRequest);
      }
    });
    render();
  }

  if (action === "copy-report") {
    await copyText(buildMailReport());
    target.textContent = "Kopyalandı";
    setTimeout(render, 900);
  }

  if (action === "download-csv") {
    exportCsv();
  }

  if (action === "send-reminder-mail") {
    try {
      const result = await apiRequest("/api/mail/send-reminder", { method: "POST" });
      window.alert(result?.message || "Hatırlatma maili işlendi.");
    } catch (error) {
      window.alert("Backend açık değil veya mail gönderimi başarısız.");
    }
  }

  if (action === "send-report-mail") {
    try {
      const result = await apiRequest(`/api/mail/send-report?date=${encodeURIComponent(state.reportDate)}`, { method: "POST" });
      window.alert(result?.message || "Yönetici raporu işlendi.");
    } catch (error) {
      window.alert("Backend açık değil veya mail gönderimi başarısız.");
    }
  }

  if (action === "verify-smtp") {
    try {
      const result = await apiRequest("/api/mail/verify-smtp", { method: "POST" });
      window.alert(result?.message || (result?.enabled ? "SMTP kontrol edildi." : "SMTP kapalı. .env içinde SMTP_ENABLED=true yapılmalı."));
    } catch (error) {
      window.alert("SMTP kontrolü başarısız. Backend açık mı ve SMTP bilgileri doğru mu kontrol et.");
    }
  }

  if (action === "edit-product") {
    state.editingProductId = target.dataset.id;
    const product = state.products.find((item) => item.id === target.dataset.id);
    if (product) state.openStockDepartmentId = product.departmentId;
    render();
  }

  if (action === "cancel-edit") {
    state.editingProductId = null;
    render();
  }

  if (action === "toggle-product") {
    const product = state.products.find((item) => item.id === target.dataset.id);
    if (product) product.active = !product.active;
    save("hotel-stock-products", state.products);
    if (product) {
      apiRequest(`/api/products/${encodeURIComponent(product.id)}/active`, {
        method: "PATCH",
        body: JSON.stringify({ active: product.active }),
      }).catch((error) => console.warn("Ürün durumu backend'e yazılamadı.", error));
    }
    render();
  }

  if (action === "reset-demo") {
    const approved = window.confirm("Demo ürünleri ve bugünkü sayım kayıtları sıfırlansın mı?");
    if (!approved) return;
    localStorage.removeItem("hotel-stock-products");
    localStorage.removeItem("hotel-stock-counts");
    state.products = ensureProfessionalProductCatalogs(seedProducts.map((product) => ({ ...product })));
    state.counts = {};
    state.editingProductId = null;
    state.openStockDepartmentId = "temizlik";
    render();
  }
});

app.addEventListener("input", (event) => {
  if (event.target.dataset.action === "search") {
    state.search = event.target.value;
    render();
  }
});

app.addEventListener("change", (event) => {
  if (event.target.dataset.action === "department") {
    state.selectedDepartment = event.target.value;
    render();
  }

  if (event.target.dataset.action === "report-date") {
    state.reportDate = event.target.value || todayKey();
    render();
  }
});

app.addEventListener("submit", async (event) => {
  event.preventDefault();
  const action = event.target.dataset.action;

  if (action === "login") {
    const formData = new FormData(event.target);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "");
    let user = users.find((item) => item.username === username && item.password === password);

    if (backendEnabled) {
      try {
        const result = await apiRequest("/api/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
        });
        user = result.user;
        state.sessionToken = result.token || "";
        if (state.sessionToken) {
          sessionStorage.setItem("otel-yonetim-token", state.sessionToken);
        }
      } catch {
        user = null;
      }
    }

    if (!user) {
      event.target.querySelector("[data-error]").textContent = "Kullanıcı adı veya şifre hatalı.";
      return;
    }

    state.user = user;
    state.selectedDepartment = user.role === "admin" ? "all" : user.departmentId;
    state.view = user.role === "admin" ? "dashboard" : "sayim";
    render();
  }

  if (action === "product-form") {
    upsertProduct(event.target);
    render();
  }

  if (action === "mail-settings") {
    const formData = new FormData(event.target);
    state.mailSettings = {
      reminder: {
        recipients: String(formData.get("reminderRecipients") || state.mailSettings.reminder.recipients).trim(),
        sendTime: String(formData.get("reminderTime") || state.mailSettings.reminder.sendTime),
        subject: String(formData.get("reminderSubject") || state.mailSettings.reminder.subject).trim(),
        message: String(formData.get("reminderMessage") || state.mailSettings.reminder.message).trim(),
      },
      report: {
        recipients: String(formData.get("reportRecipients") || state.mailSettings.report.recipients).trim(),
        sendTime: String(formData.get("reportTime") || state.mailSettings.report.sendTime),
        subject: String(formData.get("reportSubject") || state.mailSettings.report.subject).trim(),
      },
    };
    save("hotel-stock-mail-settings", state.mailSettings);
    apiRequest("/api/mail-settings", {
      method: "PUT",
      body: JSON.stringify(state.mailSettings),
    }).catch((error) => console.warn("Mail ayarları backend'e yazılamadı.", error));
    render();
  }
});

render();
syncFromBackend();
