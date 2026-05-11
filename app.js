const departments = [
  { id: "temizlik", name: "Temizlik" },
  { id: "gulplaj-restorant", name: "Gülplaj Restorant" },
  { id: "gulplaj-bufe", name: "Gülplaj Büfe" },
  { id: "smile-food-house", name: "Smile Food House" },
  { id: "resepsiyon", name: "Resepsiyon" },
];

const users = [
  { username: "admin", password: "admin123", name: "Yönetici", role: "admin", departmentId: "all" },
  { username: "satinalma", password: "SatinAlma2026", name: "Satın Alma Sorumlusu", role: "admin", departmentId: "all" },
  { username: "operasyon", password: "Operasyon2026", name: "Operasyon Müdürü", role: "admin", departmentId: "all" },
  { username: "temizlik", password: "Temizlik2026", name: "Temizlik Kullanıcısı", role: "staff", departmentId: "temizlik" },
  { username: "mutfak", password: "Mutfak2026", name: "Mutfak Kullanıcısı", role: "staff", departmentId: "gulplaj-restorant" },
  { username: "bufe", password: "Bufe2026", name: "Büfe Kullanıcısı", role: "staff", departmentId: "gulplaj-bufe" },
  { username: "smile", password: "1234", name: "Smile Food House", role: "staff", departmentId: "smile-food-house" },
  { username: "resepsiyon", password: "Resepsiyon2026", name: "Resepsiyon Kullanıcısı", role: "staff", departmentId: "resepsiyon" },
];

const foodDepartmentIds = ["gulplaj-restorant", "gulplaj-bufe", "smile-food-house"];

const portionProfiles = {
  "hotel-buffet": {
    label: "Otel açık büfe",
    multiplier: 1.1,
    beverageMultiplier: 1.2,
    serviceMultiplier: 0.75,
    defaultBuffer: 14,
    description: "Ana öğün, açık servis ve ikinci tabak ihtimalini hesaba katar.",
  },
  "plated-service": {
    label: "Tabak servis / alakart",
    multiplier: 0.92,
    beverageMultiplier: 0.9,
    serviceMultiplier: 0.45,
    defaultBuffer: 10,
    description: "Standart reçete ve kontrollü porsiyon servisi için daha düşük fire kullanır.",
  },
  "beach-cafe": {
    label: "Plaj kafe / büfe",
    multiplier: 0.82,
    beverageMultiplier: 1.45,
    serviceMultiplier: 1.15,
    defaultBuffer: 16,
    description: "İçecek, paket ürün ve tek kullanımlık servis malzemesi ağırlıklıdır.",
  },
  "fast-food": {
    label: "Fast food yoğun servis",
    multiplier: 1.0,
    beverageMultiplier: 1.05,
    serviceMultiplier: 1.35,
    defaultBuffer: 12,
    description: "Burger, makarna, patates, sos ve paketleme akışına göre hesaplar.",
  },
};

const portionRules = [
  { id: "burger-box", label: "Burger paket kutusu", keywords: ["burger kutusu"], unit: "adet", perGuest: 1, demand: 0.36, kind: "service" },
  { id: "fries-box", label: "Patates servis kutusu", keywords: ["patates kutusu"], unit: "adet", perGuest: 1, demand: 0.42, kind: "service" },
  { id: "pasta-box", label: "Makarna servis kutusu", keywords: ["makarna kutusu"], unit: "adet", perGuest: 1, demand: 0.24, kind: "service" },
  { id: "salad-bowl", label: "Salata / kase ambalajı", keywords: ["salata kasesi", "karton kase", "dondurma kabi"], unit: "adet", perGuest: 1, demand: 0.28, kind: "service" },
  { id: "cup-service", label: "Bardak ve kapak", keywords: ["karton bardak", "icecek bardagi", "bardak kapagi", "sicak bardak", "soguk bardak", "dome kapak", "bardak sleeve"], unit: "adet", perGuest: 1, demand: 0.62, kind: "service" },
  { id: "cutlery-service", label: "Tek kullanımlık servis seti", keywords: ["plastik catal", "plastik kasik", "plastik bicak", "tek kullanimlik catal", "tek kullanimlik kasik", "tek kullanimlik bicak", "dondurma kasigi", "pipet", "karistirici cubuk", "servis tabagi", "sos kabi"], unit: "adet", perGuest: 1, demand: 0.55, kind: "service" },
  { id: "napkin-service", label: "Peçete / ıslak mendil", keywords: ["pecete", "islak mendil"], unit: "adet", perGuest: 2, demand: 0.7, kind: "service" },
  { id: "takeaway-bag", label: "Paket servis poşeti", keywords: ["paket servis poseti", "kraft kese", "sandvic kutusu", "tost kutusu"], unit: "adet", perGuest: 1, demand: 0.26, kind: "service" },
  { id: "water", label: "Kişi başı su", keywords: ["su 500", "su 330", "su 1.5", "vitaminli su", "hindistan cevizi suyu"], unit: "adet", perGuest: 1, demand: 0.82, kind: "beverage" },
  { id: "cold-drink", label: "Soğuk içecek", keywords: ["kola", "gazoz", "ice tea", "enerji icecegi", "sporcu icecegi", "meyve suyu", "visne suyu", "elma suyu", "portakal suyu", "ayran", "kefir", "soda", "maden suyu", "soguk kahve", "protein icecegi"], unit: "adet", perGuest: 1, demand: 0.36, kind: "beverage" },
  { id: "lemonade", label: "Limonata / konsantre", keywords: ["limonata"], unit: "lt", perGuest: 0.22, demand: 0.34, kind: "beverage" },
  { id: "ice", label: "Servis buzu", keywords: ["soguk icecek buzu", "icecek buzu", "buz torbasi"], unit: "kg", perGuest: 0.18, demand: 0.55, kind: "beverage" },
  { id: "coffee-capsule", label: "Kapsül kahve", keywords: ["kapsul kahve"], unit: "adet", perGuest: 1, demand: 0.18, kind: "beverage" },
  { id: "coffee", label: "Kahve çekirdeği / toz kahve", keywords: ["espresso", "filtre kahve", "turk kahvesi", "nescafe", "kafeinsiz kahve", "cekirdek kahve"], unit: "kg", perGuest: 0.018, demand: 0.28, kind: "beverage" },
  { id: "milk", label: "Süt ve krema", keywords: ["sut", "krema", "laktozsuz sut", "yulaf sutu", "badem sutu"], unit: "lt", perGuest: 0.08, demand: 0.34, kind: "beverage" },
  { id: "syrup", label: "Kahve şurubu / tatlandırıcı", keywords: ["surup", "sicak cikolata", "kakao", "chai", "matcha", "cikolata sos", "karamel sos", "beyaz cikolata sos"], unit: "kg", perGuest: 0.025, demand: 0.24, kind: "food" },
  { id: "burger-bun", label: "Burger ekmeği", keywords: ["burger ekmegi", "brioche", "mini burger"], unit: "adet", perGuest: 1, demand: 0.36, kind: "food" },
  { id: "bread", label: "Ekmek / unlu servis", keywords: ["ekmek", "simit", "pogaca", "kruvasan", "sandvic ekmegi", "tost ekmegi", "tortilla", "lavas"], unit: "adet", perGuest: 1, demand: 0.32, kind: "food" },
  { id: "burger-patty", label: "Burger köftesi", keywords: ["burger koftesi", "hamburger koftesi"], unit: "kg", perGuest: 0.16, demand: 0.36, kind: "food" },
  { id: "vegan-patty", label: "Vegan burger köftesi", keywords: ["vegan burger"], unit: "adet", perGuest: 1, demand: 0.08, kind: "food" },
  { id: "beef", label: "Kırmızı et ana protein", keywords: ["dana", "antrikot", "bonfile", "kontrfile", "tranc", "nuar", "kusbasi", "kiyma", "kaburga", "fajita dana"], unit: "kg", perGuest: 0.18, demand: 0.32, kind: "food" },
  { id: "chicken", label: "Tavuk ana protein", keywords: ["tavuk", "nugget", "schnitzel", "fajita tavuk"], unit: "kg", perGuest: 0.17, demand: 0.34, kind: "food" },
  { id: "seafood", label: "Balık / deniz ürünü", keywords: ["balik", "somon", "levrek", "cupra", "karides", "kalamar", "ton baligi"], unit: "kg", perGuest: 0.16, demand: 0.18, kind: "food" },
  { id: "pasta", label: "Makarna / noodle", keywords: ["makarna", "penne", "spaghetti", "fettuccine", "noodle", "mac and cheese"], unit: "kg", perGuest: 0.09, demand: 0.34, kind: "food" },
  { id: "rice-bulgur", label: "Pirinç / bulgur", keywords: ["pirinc", "baldo", "bulgur"], unit: "kg", perGuest: 0.07, demand: 0.42, kind: "food" },
  { id: "potato", label: "Patates garnitür", keywords: ["dondurulmus patates", "patates kizartmasi", "elma dilim patates", "kajun baharatli patates", "tatli patates", "patates"], unit: "kg", perGuest: 0.16, demand: 0.48, kind: "food" },
  { id: "vegetable", label: "Sebze / salata hazırlık", keywords: ["domates", "salatalik", "biber", "sogan", "marul", "roka", "maydanoz", "dereotu", "nane", "limon", "portakal", "mantar", "kabak", "patlican", "havuç", "havuc", "misir"], unit: "kg", perGuest: 0.09, demand: 0.46, kind: "food" },
  { id: "cheese-deli", label: "Peynir / şarküteri", keywords: ["kasar", "peynir", "cheddar", "mozzarella", "parmesan", "hindi fume", "salam", "sucuk"], unit: "kg", perGuest: 0.045, demand: 0.34, kind: "food" },
  { id: "sauce-portion", label: "Porsiyon sos", keywords: ["ketcap kucuk", "mayonez kucuk", "hardal kucuk"], unit: "adet", perGuest: 1, demand: 0.3, kind: "food" },
  { id: "sauce-bulk", label: "Sos / çeşni", keywords: ["burger sos", "makarna sosu", "barbeku", "ranch", "acili sos", "salsa", "hardal", "ketcap", "mayonez", "pesto", "soya sos", "teriyaki"], unit: "kg", perGuest: 0.035, demand: 0.42, kind: "food" },
  { id: "breakfast-portion", label: "Porsiyon kahvaltılık", keywords: ["tereyagi porsiyon", "recel porsiyon", "bal porsiyon", "nutella porsiyon"], unit: "adet", perGuest: 1, demand: 0.22, kind: "food" },
  { id: "oil", label: "Yağ kullanımı", keywords: ["zeytinyagi", "aycicek yagi", "kizartma yagi", "tereyagi"], unit: "lt", perGuest: 0.018, demand: 0.72, kind: "food" },
  { id: "sugar-stick", label: "Stick şeker / tatlandırıcı", keywords: ["stick seker", "esmer seker stick", "tatlandirici stick"], unit: "adet", perGuest: 1, demand: 0.28, kind: "service" },
  { id: "flour-sugar", label: "Un / şeker / temel kuru gıda", keywords: ["un", "seker", "toz seker", "esmer seker", "misir gevregi"], unit: "kg", perGuest: 0.035, demand: 0.28, kind: "food" },
  { id: "spice", label: "Tuz / baharat", keywords: ["tuz", "karabiber", "pul biber", "kimyon", "kekik", "tarçın", "tarcin", "baharat", "bulyon"], unit: "kg", perGuest: 0.006, demand: 0.6, kind: "food" },
  { id: "dessert-piece", label: "Tatlı / paket atıştırmalık", keywords: ["dondurma", "cips", "kraker", "biskuvi", "gofret", "cikolata bar", "cikolata", "protein bar", "granola", "kek", "muffin", "jelibon", "lolipop", "sakiz", "nane sekeri", "sandvic paketli", "instant noodle", "corba hazir"], unit: "adet", perGuest: 1, demand: 0.25, kind: "food" },
  { id: "nuts", label: "Kuruyemiş / kuru meyve", keywords: ["kuruyemis", "findik", "badem", "kaju", "fistik", "cekirdegi", "kuru meyve"], unit: "kg", perGuest: 0.055, demand: 0.22, kind: "food" },
  { id: "fruit-puree", label: "Meyve / püre", keywords: ["cilek puresi", "mango puresi", "seftali puresi", "meyve"], unit: "kg", perGuest: 0.06, demand: 0.2, kind: "food" },
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

const professionalReceptionCatalog = [
  ["Oda Kartı", "resepsiyon", "adet", 220, 80],
  ["Kayıt Formu", "resepsiyon", "adet", 140, 50],
  ["Kalem", "resepsiyon", "adet", 65, 25],
  ["RFID Oda Kartı", "resepsiyon", "adet", 260, 90],
  ["Manyetik Yedek Oda Kartı", "resepsiyon", "adet", 180, 60],
  ["Oda Kartı Kılıfı", "resepsiyon", "adet", 300, 100],
  ["Oda Kartı Zarfı", "resepsiyon", "adet", 300, 100],
  ["Kart Kodlama Temizleme Kartı", "resepsiyon", "adet", 24, 8],
  ["Kart Yazıcı Ribbon", "resepsiyon", "adet", 8, 3],
  ["Kart Yazıcı Temizleme Seti", "resepsiyon", "set", 6, 2],
  ["Misafir Bilekliği", "resepsiyon", "adet", 400, 120],
  ["Ziyaretçi Kartı", "resepsiyon", "adet", 120, 40],
  ["Personel Geçici Kartı", "resepsiyon", "adet", 80, 25],
  ["Anahtar Etiketi", "resepsiyon", "adet", 250, 80],
  ["Emanet Anahtar Etiketi", "resepsiyon", "adet", 120, 40],
  ["Anahtar Dolabı Etiket Şeridi", "resepsiyon", "rulo", 12, 4],
  ["Check-in Kayıt Formu", "resepsiyon", "adet", 300, 100],
  ["Check-out Kontrol Formu", "resepsiyon", "adet", 200, 70],
  ["Konaklama Belgesi", "resepsiyon", "adet", 300, 100],
  ["Misafir Bilgi Formu", "resepsiyon", "adet", 300, 100],
  ["KVKK Aydınlatma Metni", "resepsiyon", "adet", 250, 80],
  ["Açık Rıza Formu", "resepsiyon", "adet", 180, 60],
  ["Kimlik Bildirim Formu", "resepsiyon", "adet", 250, 80],
  ["Çocuk Konaklama Onay Formu", "resepsiyon", "adet", 80, 25],
  ["Refakatçi Bilgi Formu", "resepsiyon", "adet", 80, 25],
  ["Oda Değişim Formu", "resepsiyon", "adet", 120, 40],
  ["Erken Giriş Formu", "resepsiyon", "adet", 100, 35],
  ["Geç Çıkış Formu", "resepsiyon", "adet", 100, 35],
  ["No Show Formu", "resepsiyon", "adet", 80, 25],
  ["Depozito Formu", "resepsiyon", "adet", 120, 40],
  ["Kasa Teslim Formu", "resepsiyon", "adet", 120, 40],
  ["Kasa Sayım Formu", "resepsiyon", "adet", 120, 40],
  ["Tahsilat Makbuzu", "resepsiyon", "koçan", 20, 6],
  ["İade Makbuzu", "resepsiyon", "koçan", 12, 4],
  ["Fatura Kağıdı", "resepsiyon", "paket", 20, 6],
  ["POS Rulosu", "resepsiyon", "rulo", 120, 40],
  ["Termal Fiş Rulosu", "resepsiyon", "rulo", 100, 35],
  ["Ön Provizyon Slip Dosyası", "resepsiyon", "adet", 24, 8],
  ["Kredi Kartı Slip Zarfı", "resepsiyon", "adet", 200, 70],
  ["Kasa Teslim Zarfı", "resepsiyon", "adet", 200, 70],
  ["Para Sayma Lastiği", "resepsiyon", "paket", 20, 6],
  ["Bozuk Para Rulosu", "resepsiyon", "paket", 20, 6],
  ["A4 Fotokopi Kağıdı", "resepsiyon", "top", 30, 10],
  ["A5 Kağıt", "resepsiyon", "top", 12, 4],
  ["Antetli Kağıt", "resepsiyon", "top", 12, 4],
  ["Not Kağıdı", "resepsiyon", "blok", 80, 25],
  ["Yapışkan Not", "resepsiyon", "paket", 50, 16],
  ["Telefon Not Fişi", "resepsiyon", "blok", 60, 20],
  ["Tükenmez Kalem Mavi", "resepsiyon", "kutu", 20, 6],
  ["Tükenmez Kalem Siyah", "resepsiyon", "kutu", 16, 5],
  ["Kurşun Kalem", "resepsiyon", "kutu", 12, 4],
  ["Fosforlu Kalem", "resepsiyon", "kutu", 10, 3],
  ["Permanent Marker", "resepsiyon", "kutu", 8, 3],
  ["Tahta Kalemi", "resepsiyon", "kutu", 8, 3],
  ["Silgi", "resepsiyon", "adet", 40, 12],
  ["Kalemtıraş", "resepsiyon", "adet", 20, 6],
  ["Makas", "resepsiyon", "adet", 12, 4],
  ["Falçata", "resepsiyon", "adet", 12, 4],
  ["Zımba Makinesi", "resepsiyon", "adet", 10, 3],
  ["Zımba Teli", "resepsiyon", "kutu", 40, 12],
  ["Delgeç", "resepsiyon", "adet", 8, 3],
  ["Ataş", "resepsiyon", "kutu", 40, 12],
  ["Kıskaç", "resepsiyon", "kutu", 30, 10],
  ["Lastik Bant", "resepsiyon", "paket", 20, 6],
  ["Şeffaf Bant", "resepsiyon", "adet", 40, 12],
  ["Koli Bandı", "resepsiyon", "adet", 24, 8],
  ["Çift Taraflı Bant", "resepsiyon", "adet", 20, 6],
  ["Yapıştırıcı Stick", "resepsiyon", "adet", 30, 10],
  ["Poşet Dosya", "resepsiyon", "paket", 30, 10],
  ["Telli Dosya", "resepsiyon", "adet", 120, 40],
  ["Klasör", "resepsiyon", "adet", 80, 25],
  ["Arşiv Kutusu", "resepsiyon", "adet", 40, 12],
  ["Evrak Zarfı Küçük", "resepsiyon", "adet", 300, 100],
  ["Evrak Zarfı Büyük", "resepsiyon", "adet", 200, 70],
  ["Balonlu Zarf", "resepsiyon", "adet", 80, 25],
  ["Kargo Poşeti", "resepsiyon", "adet", 120, 40],
  ["Kargo Etiketi", "resepsiyon", "rulo", 20, 6],
  ["Teslim Tesellüm Formu", "resepsiyon", "adet", 160, 50],
  ["Emanet Eşya Formu", "resepsiyon", "adet", 120, 40],
  ["Kayıp Eşya Formu", "resepsiyon", "adet", 120, 40],
  ["Kayıp Eşya Etiketi", "resepsiyon", "adet", 200, 70],
  ["Arıza Bildirim Formu", "resepsiyon", "adet", 180, 60],
  ["Misafir Şikayet Formu", "resepsiyon", "adet", 120, 40],
  ["Misafir Talep Formu", "resepsiyon", "adet", 160, 50],
  ["Housekeeping Talep Fişi", "resepsiyon", "adet", 160, 50],
  ["Teknik Servis Talep Fişi", "resepsiyon", "adet", 160, 50],
  ["Uyandırma Servisi Formu", "resepsiyon", "adet", 120, 40],
  ["Bagaj Etiketi", "resepsiyon", "adet", 300, 100],
  ["Bagaj Teslim Fişi", "resepsiyon", "adet", 250, 80],
  ["Vale Fişi", "resepsiyon", "adet", 250, 80],
  ["Otopark Kartı", "resepsiyon", "adet", 200, 70],
  ["Transfer Rezervasyon Formu", "resepsiyon", "adet", 120, 40],
  ["Taksi Çağrı Kartı", "resepsiyon", "adet", 150, 50],
  ["Şemsiye Teslim Fişi", "resepsiyon", "adet", 100, 35],
  ["Bebek Yatağı Talep Formu", "resepsiyon", "adet", 80, 25],
  ["Ek Yatak Talep Formu", "resepsiyon", "adet", 80, 25],
  ["Yastık Menü Kartı", "resepsiyon", "adet", 120, 40],
  ["Wi-Fi Bilgi Kartı", "resepsiyon", "adet", 300, 100],
  ["Otel Haritası", "resepsiyon", "adet", 250, 80],
  ["Şehir Haritası", "resepsiyon", "adet", 180, 60],
  ["Restoran Menü Kartı", "resepsiyon", "adet", 160, 50],
  ["Oda Servis Menü Kartı", "resepsiyon", "adet", 160, 50],
  ["Spa Broşürü", "resepsiyon", "adet", 160, 50],
  ["Plaj Bilgilendirme Kartı", "resepsiyon", "adet", 160, 50],
  ["Tur Broşürü", "resepsiyon", "adet", 180, 60],
  ["Misafir Yorum Kartı", "resepsiyon", "adet", 180, 60],
  ["Karşılama Mektubu", "resepsiyon", "adet", 180, 60],
  ["Doğum Günü Kartı", "resepsiyon", "adet", 80, 25],
  ["VIP Karşılama Kartı", "resepsiyon", "adet", 80, 25],
  ["Acil Durum Bilgi Kartı", "resepsiyon", "adet", 160, 50],
  ["Yangın Tahliye Planı Kopyası", "resepsiyon", "adet", 80, 25],
  ["İlk Yardım Seti", "resepsiyon", "set", 6, 2],
  ["Tek Kullanımlık Maske", "resepsiyon", "kutu", 20, 6],
  ["El Dezenfektanı Masa Tipi", "resepsiyon", "adet", 24, 8],
  ["Islak Mendil", "resepsiyon", "paket", 80, 25],
  ["Kutu Mendil", "resepsiyon", "adet", 80, 25],
  ["Lobi İkram Şekeri", "resepsiyon", "kg", 12, 4],
  ["Misafir Kalemi", "resepsiyon", "adet", 200, 70],
  ["Yaka Kartı", "resepsiyon", "adet", 40, 12],
  ["Yaka Kartı İpi", "resepsiyon", "adet", 80, 25],
  ["Resepsiyon Zili", "resepsiyon", "adet", 4, 1],
  ["Hesap Makinesi", "resepsiyon", "adet", 8, 3],
  ["AA Pil", "resepsiyon", "paket", 30, 10],
  ["AAA Pil", "resepsiyon", "paket", 30, 10],
  ["9V Pil", "resepsiyon", "adet", 12, 4],
  ["Yazıcı Toneri", "resepsiyon", "adet", 8, 3],
  ["Yedek Mürekkep Kartuşu", "resepsiyon", "adet", 8, 3],
  ["Etiket Yazıcı Rulosu", "resepsiyon", "rulo", 20, 6],
  ["Barkod Etiketi", "resepsiyon", "rulo", 20, 6],
  ["Telefon Kulaklığı Süngeri", "resepsiyon", "adet", 40, 12],
  ["Kablo Düzenleyici", "resepsiyon", "paket", 12, 4],
  ["USB Bellek", "resepsiyon", "adet", 8, 3],
  ["Masa Üstü Evrak Rafı", "resepsiyon", "adet", 10, 3],
  ["Gelen Evrak Kaşesi", "resepsiyon", "adet", 4, 1],
  ["Tarih Kaşesi", "resepsiyon", "adet", 4, 1],
  ["Kaşe Mürekkebi", "resepsiyon", "adet", 12, 4],
];

const professionalBufeCatalog = [
  ["Kola 330 ml", "gulplaj-bufe", "adet", 180, 60],
  ["Su 500 ml", "gulplaj-bufe", "adet", 260, 100],
  ["Dondurma", "gulplaj-bufe", "adet", 95, 35],
  ["Su 330 ml", "gulplaj-bufe", "adet", 240, 80],
  ["Su 1.5 lt", "gulplaj-bufe", "adet", 120, 40],
  ["Maden Suyu Sade", "gulplaj-bufe", "adet", 160, 50],
  ["Maden Suyu Limonlu", "gulplaj-bufe", "adet", 140, 45],
  ["Soda Meyveli", "gulplaj-bufe", "adet", 120, 40],
  ["Kola 1 lt", "gulplaj-bufe", "adet", 80, 25],
  ["Kola Zero 330 ml", "gulplaj-bufe", "adet", 140, 45],
  ["Gazoz 250 ml", "gulplaj-bufe", "adet", 120, 40],
  ["Portakallı Gazlı İçecek", "gulplaj-bufe", "adet", 100, 35],
  ["Limonlu Gazlı İçecek", "gulplaj-bufe", "adet", 100, 35],
  ["Ice Tea Şeftali", "gulplaj-bufe", "adet", 140, 45],
  ["Ice Tea Limon", "gulplaj-bufe", "adet", 140, 45],
  ["Ice Tea Mango", "gulplaj-bufe", "adet", 100, 35],
  ["Enerji İçeceği", "gulplaj-bufe", "adet", 100, 35],
  ["Sporcu İçeceği", "gulplaj-bufe", "adet", 80, 25],
  ["Vitaminli Su", "gulplaj-bufe", "adet", 80, 25],
  ["Ayran 200 ml", "gulplaj-bufe", "adet", 160, 50],
  ["Kefir", "gulplaj-bufe", "adet", 60, 20],
  ["Meyve Suyu Karışık", "gulplaj-bufe", "adet", 100, 35],
  ["Portakal Suyu Şişe", "gulplaj-bufe", "adet", 90, 30],
  ["Vişne Suyu", "gulplaj-bufe", "adet", 80, 25],
  ["Elma Suyu", "gulplaj-bufe", "adet", 80, 25],
  ["Soğuk Kahve Latte", "gulplaj-bufe", "adet", 90, 30],
  ["Soğuk Kahve Mocha", "gulplaj-bufe", "adet", 70, 24],
  ["Protein İçeceği", "gulplaj-bufe", "adet", 48, 16],
  ["Hindistan Cevizi Suyu", "gulplaj-bufe", "adet", 48, 16],
  ["Limonata Konsantresi", "gulplaj-bufe", "lt", 30, 10],
  ["Ev Yapımı Limonata Şişe", "gulplaj-bufe", "adet", 120, 40],
  ["Taze Limon", "gulplaj-bufe", "kg", 20, 7],
  ["Taze Nane", "gulplaj-bufe", "bağ", 30, 10],
  ["Portakal", "gulplaj-bufe", "kg", 24, 8],
  ["Çilek Püresi", "gulplaj-bufe", "kg", 12, 4],
  ["Mango Püresi", "gulplaj-bufe", "kg", 10, 4],
  ["Şeftali Püresi", "gulplaj-bufe", "kg", 10, 4],
  ["Soğuk İçecek Buzu", "gulplaj-bufe", "kg", 80, 25],
  ["Buz Torbası 2 kg", "gulplaj-bufe", "adet", 50, 16],
  ["Espresso Çekirdeği", "gulplaj-bufe", "kg", 18, 6],
  ["Filtre Kahve", "gulplaj-bufe", "kg", 12, 4],
  ["Türk Kahvesi", "gulplaj-bufe", "kg", 10, 4],
  ["Nescafe Classic", "gulplaj-bufe", "kg", 8, 3],
  ["Nescafe Gold", "gulplaj-bufe", "kg", 8, 3],
  ["Kapsül Kahve", "gulplaj-bufe", "adet", 120, 40],
  ["Kafeinsiz Kahve", "gulplaj-bufe", "kg", 4, 2],
  ["Sıcak Çikolata Tozu", "gulplaj-bufe", "kg", 10, 4],
  ["Kakao Tozu", "gulplaj-bufe", "kg", 6, 2],
  ["Chai Tea Latte Tozu", "gulplaj-bufe", "kg", 6, 2],
  ["Matcha Tozu", "gulplaj-bufe", "kg", 4, 1],
  ["Süt", "gulplaj-bufe", "lt", 80, 26],
  ["Laktozsuz Süt", "gulplaj-bufe", "lt", 30, 10],
  ["Yulaf Sütü", "gulplaj-bufe", "lt", 30, 10],
  ["Badem Sütü", "gulplaj-bufe", "lt", 20, 7],
  ["Krema", "gulplaj-bufe", "lt", 24, 8],
  ["Şanti Sprey", "gulplaj-bufe", "adet", 24, 8],
  ["Vanilya Şurubu", "gulplaj-bufe", "lt", 12, 4],
  ["Karamel Şurubu", "gulplaj-bufe", "lt", 12, 4],
  ["Fındık Şurubu", "gulplaj-bufe", "lt", 10, 4],
  ["Çikolata Şurubu", "gulplaj-bufe", "lt", 10, 4],
  ["Çilek Şurubu", "gulplaj-bufe", "lt", 8, 3],
  ["Karamel Sos", "gulplaj-bufe", "kg", 10, 4],
  ["Çikolata Sos", "gulplaj-bufe", "kg", 10, 4],
  ["Beyaz Çikolata Sos", "gulplaj-bufe", "kg", 8, 3],
  ["Stick Şeker", "gulplaj-bufe", "kutu", 40, 12],
  ["Esmer Şeker Stick", "gulplaj-bufe", "kutu", 24, 8],
  ["Tatlandırıcı Stick", "gulplaj-bufe", "kutu", 20, 7],
  ["Tarçın", "gulplaj-bufe", "kg", 3, 1],
  ["Çikolata Parça", "gulplaj-bufe", "kg", 6, 2],
  ["Marshmallow", "gulplaj-bufe", "paket", 24, 8],
  ["Sıcak İçecek Karton Bardak 8 oz", "gulplaj-bufe", "adet", 500, 160],
  ["Sıcak İçecek Karton Bardak 12 oz", "gulplaj-bufe", "adet", 500, 160],
  ["Sıcak Bardak Kapağı", "gulplaj-bufe", "adet", 500, 160],
  ["Bardak Sleeve", "gulplaj-bufe", "adet", 400, 130],
  ["Soğuk İçecek Bardağı 16 oz", "gulplaj-bufe", "adet", 500, 160],
  ["Soğuk İçecek Bardağı 20 oz", "gulplaj-bufe", "adet", 400, 130],
  ["Soğuk Bardak Düz Kapak", "gulplaj-bufe", "adet", 500, 160],
  ["Dome Kapak", "gulplaj-bufe", "adet", 300, 100],
  ["Pipet", "gulplaj-bufe", "paket", 60, 20],
  ["Karıştırıcı Çubuk", "gulplaj-bufe", "paket", 60, 20],
  ["Peçete", "gulplaj-bufe", "paket", 120, 40],
  ["Taşıma Tepsisi", "gulplaj-bufe", "adet", 200, 70],
  ["Karton Servis Tabağı", "gulplaj-bufe", "adet", 300, 100],
  ["Karton Kase", "gulplaj-bufe", "adet", 240, 80],
  ["Plastik Çatal", "gulplaj-bufe", "paket", 80, 25],
  ["Plastik Kaşık", "gulplaj-bufe", "paket", 80, 25],
  ["Plastik Bıçak", "gulplaj-bufe", "paket", 50, 16],
  ["Dondurma Kaşığı", "gulplaj-bufe", "paket", 80, 25],
  ["Dondurma Külahı", "gulplaj-bufe", "adet", 300, 100],
  ["Dondurma Kabı", "gulplaj-bufe", "adet", 240, 80],
  ["Paket Servis Poşeti", "gulplaj-bufe", "adet", 300, 100],
  ["Kraft Kese Kağıdı", "gulplaj-bufe", "adet", 300, 100],
  ["Sandviç Kutusu", "gulplaj-bufe", "adet", 200, 70],
  ["Tost Kutusu", "gulplaj-bufe", "adet", 200, 70],
  ["Streç Film", "gulplaj-bufe", "rulo", 24, 8],
  ["Alüminyum Folyo", "gulplaj-bufe", "rulo", 24, 8],
  ["Buzdolabı Poşeti", "gulplaj-bufe", "rulo", 40, 12],
  ["Çöp Poşeti Orta", "gulplaj-bufe", "rulo", 60, 20],
  ["Tek Kullanımlık Eldiven", "gulplaj-bufe", "kutu", 60, 20],
  ["Gıda Etiketi", "gulplaj-bufe", "rulo", 20, 6],
  ["Cips Klasik", "gulplaj-bufe", "adet", 120, 40],
  ["Cips Baharatlı", "gulplaj-bufe", "adet", 120, 40],
  ["Cips Peynirli", "gulplaj-bufe", "adet", 100, 35],
  ["Tortilla Cips", "gulplaj-bufe", "adet", 90, 30],
  ["Patlamış Mısır", "gulplaj-bufe", "paket", 80, 25],
  ["Kraker Tuzlu", "gulplaj-bufe", "adet", 100, 35],
  ["Kraker Peynirli", "gulplaj-bufe", "adet", 100, 35],
  ["Çubuk Kraker", "gulplaj-bufe", "adet", 100, 35],
  ["Bisküvi Sade", "gulplaj-bufe", "adet", 120, 40],
  ["Bisküvi Kakaolu", "gulplaj-bufe", "adet", 120, 40],
  ["Gofret", "gulplaj-bufe", "adet", 150, 50],
  ["Çikolata Bar", "gulplaj-bufe", "adet", 160, 50],
  ["Bitter Çikolata", "gulplaj-bufe", "adet", 80, 25],
  ["Sütlü Çikolata", "gulplaj-bufe", "adet", 120, 40],
  ["Protein Bar", "gulplaj-bufe", "adet", 80, 25],
  ["Granola Bar", "gulplaj-bufe", "adet", 80, 25],
  ["Kek", "gulplaj-bufe", "adet", 120, 40],
  ["Muffin", "gulplaj-bufe", "adet", 80, 25],
  ["Kruvasan Paketli", "gulplaj-bufe", "adet", 80, 25],
  ["Sakız", "gulplaj-bufe", "adet", 120, 40],
  ["Nane Şekeri", "gulplaj-bufe", "adet", 100, 35],
  ["Jelibon", "gulplaj-bufe", "adet", 80, 25],
  ["Lolipop", "gulplaj-bufe", "adet", 100, 35],
  ["Karışık Kuruyemiş", "gulplaj-bufe", "kg", 20, 7],
  ["Kavrulmuş Fındık", "gulplaj-bufe", "kg", 12, 4],
  ["Badem", "gulplaj-bufe", "kg", 12, 4],
  ["Kaju", "gulplaj-bufe", "kg", 10, 4],
  ["Antep Fıstığı", "gulplaj-bufe", "kg", 10, 4],
  ["Ay Çekirdeği", "gulplaj-bufe", "kg", 20, 7],
  ["Kabuklu Fıstık", "gulplaj-bufe", "kg", 18, 6],
  ["Kuru Meyve Karışık", "gulplaj-bufe", "kg", 12, 4],
  ["Sandviç Paketli", "gulplaj-bufe", "adet", 60, 20],
  ["Tost Ekmeği", "gulplaj-bufe", "paket", 30, 10],
  ["Kaşar Peyniri Dilimli", "gulplaj-bufe", "kg", 12, 4],
  ["Hindi Füme Dilimli", "gulplaj-bufe", "kg", 10, 4],
  ["Salam Dilimli", "gulplaj-bufe", "kg", 10, 4],
  ["Tereyağı Porsiyon", "gulplaj-bufe", "adet", 120, 40],
  ["Reçel Porsiyon", "gulplaj-bufe", "adet", 120, 40],
  ["Bal Porsiyon", "gulplaj-bufe", "adet", 100, 35],
  ["Nutella Porsiyon", "gulplaj-bufe", "adet", 100, 35],
  ["Instant Noodle", "gulplaj-bufe", "adet", 80, 25],
  ["Makarna Paket", "gulplaj-bufe", "paket", 40, 12],
  ["Ton Balığı Konservesi", "gulplaj-bufe", "adet", 48, 16],
  ["Mısır Konservesi", "gulplaj-bufe", "adet", 36, 12],
  ["Çorba Hazır Paket", "gulplaj-bufe", "adet", 50, 16],
  ["Ekmek", "gulplaj-bufe", "adet", 60, 20],
  ["Simit", "gulplaj-bufe", "adet", 80, 25],
  ["Poğaça", "gulplaj-bufe", "adet", 80, 25],
  ["Küçük Süt UHT", "gulplaj-bufe", "adet", 80, 25],
  ["Mısır Gevreği", "gulplaj-bufe", "paket", 24, 8],
  ["Pirinç", "gulplaj-bufe", "kg", 20, 7],
  ["Bulgur", "gulplaj-bufe", "kg", 20, 7],
  ["Toz Şeker Paket", "gulplaj-bufe", "kg", 30, 10],
  ["Tuz Paket", "gulplaj-bufe", "kg", 12, 4],
  ["Zeytinyağı 1 lt", "gulplaj-bufe", "adet", 24, 8],
  ["Ayçiçek Yağı 1 lt", "gulplaj-bufe", "adet", 24, 8],
  ["Ketçap Küçük", "gulplaj-bufe", "adet", 60, 20],
  ["Mayonez Küçük", "gulplaj-bufe", "adet", 60, 20],
  ["Hardal Küçük", "gulplaj-bufe", "adet", 40, 12],
  ["Saklama Kabı", "gulplaj-bufe", "adet", 40, 12],
  ["Kağıt Havlu", "gulplaj-bufe", "paket", 80, 25],
  ["Islak Mendil", "gulplaj-bufe", "paket", 80, 25],
  ["Kağıt Mendil", "gulplaj-bufe", "adet", 120, 40],
  ["El Dezenfektanı", "gulplaj-bufe", "adet", 40, 12],
  ["Sıvı Sabun", "gulplaj-bufe", "lt", 24, 8],
  ["Güneş Kremi SPF 30", "gulplaj-bufe", "adet", 40, 12],
  ["Güneş Kremi SPF 50", "gulplaj-bufe", "adet", 40, 12],
  ["After Sun Losyon", "gulplaj-bufe", "adet", 30, 10],
  ["Aloe Vera Jel", "gulplaj-bufe", "adet", 30, 10],
  ["Dudak Koruyucu", "gulplaj-bufe", "adet", 40, 12],
  ["Sinek Kovucu Sprey", "gulplaj-bufe", "adet", 30, 10],
  ["Yara Bandı", "gulplaj-bufe", "kutu", 30, 10],
  ["Diş Fırçası", "gulplaj-bufe", "adet", 40, 12],
  ["Diş Macunu Seyahat", "gulplaj-bufe", "adet", 40, 12],
  ["Şampuan Seyahat", "gulplaj-bufe", "adet", 40, 12],
  ["Duş Jeli Seyahat", "gulplaj-bufe", "adet", 40, 12],
  ["Deodorant", "gulplaj-bufe", "adet", 30, 10],
  ["Tıraş Bıçağı", "gulplaj-bufe", "adet", 40, 12],
  ["Hijyenik Ped", "gulplaj-bufe", "paket", 30, 10],
  ["Tampon", "gulplaj-bufe", "paket", 20, 7],
  ["Bebek Bezi", "gulplaj-bufe", "paket", 20, 7],
  ["Bebek Islak Mendili", "gulplaj-bufe", "paket", 30, 10],
  ["Kulak Tıkacı", "gulplaj-bufe", "adet", 40, 12],
  ["Plaj Terliği", "gulplaj-bufe", "çift", 30, 10],
  ["Plaj Havlusu", "gulplaj-bufe", "adet", 40, 12],
  ["Şapka", "gulplaj-bufe", "adet", 30, 10],
  ["Güneş Gözlüğü", "gulplaj-bufe", "adet", 24, 8],
  ["Deniz Gözlüğü", "gulplaj-bufe", "adet", 24, 8],
  ["Kolluk", "gulplaj-bufe", "çift", 24, 8],
  ["Şişme Deniz Topu", "gulplaj-bufe", "adet", 30, 10],
  ["Su Geçirmez Telefon Kılıfı", "gulplaj-bufe", "adet", 30, 10],
  ["Telefon Şarj Kablosu Type-C", "gulplaj-bufe", "adet", 20, 7],
  ["Telefon Şarj Kablosu Lightning", "gulplaj-bufe", "adet", 20, 7],
  ["Powerbank", "gulplaj-bufe", "adet", 10, 3],
  ["Çakmak", "gulplaj-bufe", "adet", 60, 20],
  ["Oyun Kartı", "gulplaj-bufe", "adet", 20, 7],
  ["Plaj Oyuncağı Seti", "gulplaj-bufe", "adet", 20, 7],
];

const professionalSmileFoodHouseCatalog = [
  ["Sandviç Ekmeği", "smile-food-house", "adet", 70, 25],
  ["Patates", "smile-food-house", "kg", 45, 18],
  ["Ketçap", "smile-food-house", "adet", 24, 8],
  ["Hamburger Ekmeği", "smile-food-house", "adet", 160, 55],
  ["Brioche Burger Ekmeği", "smile-food-house", "adet", 90, 30],
  ["Mini Burger Ekmeği", "smile-food-house", "adet", 120, 40],
  ["Tost Ekmeği", "smile-food-house", "adet", 180, 60],
  ["Ayvalık Tost Ekmeği", "smile-food-house", "adet", 120, 40],
  ["Tortilla Lavaş", "smile-food-house", "paket", 45, 15],
  ["Wrap Lavaş", "smile-food-house", "paket", 38, 12],
  ["Sosisli Ekmeği", "smile-food-house", "adet", 90, 30],
  ["Dana Burger Köftesi", "smile-food-house", "kg", 42, 16],
  ["Tavuk Burger Köftesi", "smile-food-house", "kg", 34, 12],
  ["Vegan Burger Köftesi", "smile-food-house", "adet", 50, 18],
  ["Dana Kıyma", "smile-food-house", "kg", 28, 10],
  ["Tavuk Göğüs", "smile-food-house", "kg", 36, 14],
  ["Tavuk Şerit", "smile-food-house", "kg", 28, 10],
  ["Tavuk Nugget", "smile-food-house", "kg", 30, 12],
  ["Tavuk Schnitzel", "smile-food-house", "kg", 26, 10],
  ["Fajita Dana Eti", "smile-food-house", "kg", 24, 9],
  ["Fajita Tavuk Eti", "smile-food-house", "kg", 30, 12],
  ["Köfte", "smile-food-house", "kg", 26, 10],
  ["Sosis", "smile-food-house", "kg", 22, 8],
  ["Sucuk", "smile-food-house", "kg", 20, 8],
  ["Hindi Füme", "smile-food-house", "kg", 12, 5],
  ["Salam", "smile-food-house", "kg", 14, 5],
  ["Jambon", "smile-food-house", "kg", 12, 5],
  ["Ton Balığı Konservesi", "smile-food-house", "adet", 36, 12],
  ["Cheddar Dilim", "smile-food-house", "paket", 55, 18],
  ["Kaşar Peyniri", "smile-food-house", "kg", 26, 10],
  ["Mozzarella", "smile-food-house", "kg", 18, 7],
  ["Parmesan", "smile-food-house", "kg", 8, 3],
  ["Beyaz Peynir", "smile-food-house", "kg", 10, 4],
  ["Tulum Peyniri", "smile-food-house", "kg", 8, 3],
  ["Labne", "smile-food-house", "kg", 10, 4],
  ["Krema", "smile-food-house", "lt", 28, 10],
  ["Süt", "smile-food-house", "lt", 36, 12],
  ["Tereyağı", "smile-food-house", "kg", 12, 5],
  ["Yumurta", "smile-food-house", "adet", 180, 60],
  ["Marul", "smile-food-house", "adet", 42, 15],
  ["Iceberg", "smile-food-house", "adet", 36, 12],
  ["Roka", "smile-food-house", "bağ", 24, 8],
  ["Akdeniz Yeşillik", "smile-food-house", "kg", 18, 7],
  ["Domates", "smile-food-house", "kg", 42, 15],
  ["Cherry Domates", "smile-food-house", "kg", 12, 5],
  ["Salatalık", "smile-food-house", "kg", 24, 8],
  ["Salatalık Turşusu", "smile-food-house", "kg", 18, 7],
  ["Kornişon Turşu", "smile-food-house", "kg", 16, 6],
  ["Karamelize Soğan", "smile-food-house", "kg", 10, 4],
  ["Kırmızı Soğan", "smile-food-house", "kg", 14, 5],
  ["Soğan", "smile-food-house", "kg", 24, 8],
  ["Jalapeno", "smile-food-house", "kg", 10, 4],
  ["Mantar", "smile-food-house", "kg", 18, 7],
  ["Avokado", "smile-food-house", "adet", 30, 10],
  ["Kapya Biber", "smile-food-house", "kg", 18, 7],
  ["Yeşil Biber", "smile-food-house", "kg", 18, 7],
  ["Sarı Biber", "smile-food-house", "kg", 12, 5],
  ["Mısır", "smile-food-house", "kg", 14, 5],
  ["Siyah Fasulye", "smile-food-house", "kg", 10, 4],
  ["Kırmızı Fasulye", "smile-food-house", "kg", 10, 4],
  ["Zeytin Dilimi", "smile-food-house", "kg", 10, 4],
  ["Kurutulmuş Domates", "smile-food-house", "kg", 6, 2],
  ["Taze Fesleğen", "smile-food-house", "bağ", 18, 6],
  ["Mayonez", "smile-food-house", "adet", 30, 10],
  ["Hardal", "smile-food-house", "adet", 18, 6],
  ["BBQ Sos", "smile-food-house", "adet", 24, 8],
  ["Ranch Sos", "smile-food-house", "adet", 20, 7],
  ["Buffalo Sos", "smile-food-house", "adet", 18, 6],
  ["Acı Sos", "smile-food-house", "adet", 18, 6],
  ["Sweet Chili Sos", "smile-food-house", "adet", 18, 6],
  ["Sriracha", "smile-food-house", "adet", 12, 4],
  ["Chipotle Sos", "smile-food-house", "adet", 12, 4],
  ["Burger Sos", "smile-food-house", "adet", 24, 8],
  ["Trüf Mayonez", "smile-food-house", "adet", 10, 4],
  ["Sarımsaklı Mayonez", "smile-food-house", "adet", 14, 5],
  ["Pesto Sos", "smile-food-house", "kg", 8, 3],
  ["Domates Sos", "smile-food-house", "kg", 22, 8],
  ["Napoliten Sos", "smile-food-house", "kg", 18, 7],
  ["Arrabbiata Sos", "smile-food-house", "kg", 14, 5],
  ["Alfredo Sos", "smile-food-house", "kg", 14, 5],
  ["Krema Bazlı Makarna Sosu", "smile-food-house", "kg", 14, 5],
  ["Bolonez Sos", "smile-food-house", "kg", 16, 6],
  ["Mantar Sos", "smile-food-house", "kg", 12, 5],
  ["Fesleğen Sos", "smile-food-house", "kg", 10, 4],
  ["Teriyaki Sos", "smile-food-house", "adet", 10, 4],
  ["Soya Sos", "smile-food-house", "adet", 10, 4],
  ["Worcestershire Sos", "smile-food-house", "adet", 8, 3],
  ["Salsa Sos", "smile-food-house", "kg", 10, 4],
  ["Guacamole", "smile-food-house", "kg", 8, 3],
  ["Ekşi Krema", "smile-food-house", "kg", 8, 3],
  ["Domates Salçası", "smile-food-house", "kg", 10, 4],
  ["Biber Salçası", "smile-food-house", "kg", 8, 3],
  ["Spaghetti", "smile-food-house", "paket", 45, 15],
  ["Penne", "smile-food-house", "paket", 55, 18],
  ["Fettuccine", "smile-food-house", "paket", 34, 12],
  ["Fusilli", "smile-food-house", "paket", 30, 10],
  ["Tagliatelle", "smile-food-house", "paket", 24, 8],
  ["Mac and Cheese Makarna", "smile-food-house", "paket", 24, 8],
  ["Lazanya Yaprağı", "smile-food-house", "paket", 18, 6],
  ["Ravioli", "smile-food-house", "kg", 12, 5],
  ["Fajita Baharatı", "smile-food-house", "kg", 8, 3],
  ["Taco Baharatı", "smile-food-house", "kg", 6, 2],
  ["Kajun Baharatı", "smile-food-house", "kg", 7, 3],
  ["Köri", "smile-food-house", "kg", 5, 2],
  ["Paprika", "smile-food-house", "kg", 5, 2],
  ["Kimyon", "smile-food-house", "kg", 5, 2],
  ["Kekik", "smile-food-house", "kg", 5, 2],
  ["Pul Biber", "smile-food-house", "kg", 5, 2],
  ["Karabiber", "smile-food-house", "kg", 5, 2],
  ["Tuz", "smile-food-house", "kg", 18, 6],
  ["Toz Sarımsak", "smile-food-house", "kg", 5, 2],
  ["Toz Soğan", "smile-food-house", "kg", 5, 2],
  ["Susam", "smile-food-house", "kg", 6, 2],
  ["Un", "smile-food-house", "kg", 24, 8],
  ["Galeta Unu", "smile-food-house", "kg", 12, 4],
  ["Panko", "smile-food-house", "kg", 10, 4],
  ["Ayçiçek Yağı", "smile-food-house", "lt", 45, 15],
  ["Zeytinyağı", "smile-food-house", "lt", 18, 6],
  ["Kızartma Yağı", "smile-food-house", "lt", 80, 25],
  ["Patates Kızartması", "smile-food-house", "kg", 55, 20],
  ["Elma Dilim Patates", "smile-food-house", "kg", 36, 12],
  ["Kajun Baharatlı Patates", "smile-food-house", "kg", 30, 10],
  ["Soğan Halkası", "smile-food-house", "kg", 24, 8],
  ["Mozzarella Stick", "smile-food-house", "kg", 20, 7],
  ["Tortilla Cips", "smile-food-house", "paket", 28, 10],
  ["Coleslaw Karışımı", "smile-food-house", "kg", 16, 6],
  ["Amerikan Salatası", "smile-food-house", "kg", 14, 5],
  ["Mısır Salata", "smile-food-house", "kg", 14, 5],
  ["Sezar Sos", "smile-food-house", "adet", 12, 4],
  ["Kruton", "smile-food-house", "paket", 18, 6],
  ["Zeytin Ezmesi", "smile-food-house", "kg", 8, 3],
  ["Brownie", "smile-food-house", "adet", 60, 20],
  ["Cheesecake", "smile-food-house", "adet", 45, 15],
  ["Waffle Hamuru", "smile-food-house", "kg", 18, 6],
  ["Nutella", "smile-food-house", "kg", 10, 4],
  ["Muz", "smile-food-house", "kg", 16, 6],
  ["Çilek", "smile-food-house", "kg", 12, 5],
  ["Dondurma Top", "smile-food-house", "adet", 90, 30],
  ["Çikolata Parça", "smile-food-house", "kg", 8, 3],
  ["Kola 330 ml", "smile-food-house", "adet", 180, 60],
  ["Kola Zero 330 ml", "smile-food-house", "adet", 120, 40],
  ["Gazoz", "smile-food-house", "adet", 90, 30],
  ["Ayran", "smile-food-house", "adet", 140, 50],
  ["Su 500 ml", "smile-food-house", "adet", 220, 80],
  ["Maden Suyu", "smile-food-house", "adet", 110, 40],
  ["Ice Tea", "smile-food-house", "adet", 120, 40],
  ["Limonata", "smile-food-house", "lt", 40, 15],
  ["Milkshake Bazı", "smile-food-house", "lt", 18, 6],
  ["Milkshake Çikolata", "smile-food-house", "lt", 14, 5],
  ["Milkshake Çilek", "smile-food-house", "lt", 14, 5],
  ["Burger Kutusu", "smile-food-house", "adet", 300, 100],
  ["Patates Kutusu", "smile-food-house", "adet", 260, 90],
  ["Makarna Kutusu", "smile-food-house", "adet", 220, 80],
  ["Salata Kasesi", "smile-food-house", "adet", 160, 60],
  ["Sos Kabı", "smile-food-house", "adet", 500, 180],
  ["Paket Servis Poşeti", "smile-food-house", "adet", 300, 100],
  ["Kraft Kese Kağıdı", "smile-food-house", "adet", 250, 90],
  ["Karton Bardak", "smile-food-house", "adet", 260, 90],
  ["Bardak Kapağı", "smile-food-house", "adet", 260, 90],
  ["Pipet", "smile-food-house", "adet", 500, 180],
  ["Peçete", "smile-food-house", "paket", 90, 30],
  ["Islak Mendil", "smile-food-house", "paket", 80, 25],
  ["Tek Kullanımlık Çatal", "smile-food-house", "adet", 300, 100],
  ["Tek Kullanımlık Kaşık", "smile-food-house", "adet", 250, 90],
  ["Tek Kullanımlık Bıçak", "smile-food-house", "adet", 250, 90],
  ["Eldiven", "smile-food-house", "kutu", 40, 12],
  ["Bone", "smile-food-house", "paket", 35, 10],
  ["Gıda Etiketi", "smile-food-house", "rulo", 30, 10],
  ["Streç Film", "smile-food-house", "rulo", 36, 12],
  ["Alüminyum Folyo", "smile-food-house", "rulo", 30, 10],
  ["Pişirme Kağıdı", "smile-food-house", "rulo", 24, 8],
  ["Çöp Poşeti", "smile-food-house", "rulo", 45, 15],
  ["Yağ Çöz Sıvı", "smile-food-house", "lt", 20, 7],
  ["Fritöz Filtre Kağıdı", "smile-food-house", "paket", 18, 6],
  ["Izgara Yağ Sıyırıcı", "smile-food-house", "adet", 12, 4],
  ["Termal Fiş Rulosu", "smile-food-house", "rulo", 45, 15],
  ["POS Rulosu", "smile-food-house", "rulo", 45, 15],
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
    recipients: "temizlik@otel.com, mutfak@otel.com, bufe@otel.com, smile@otel.com, resepsiyon@otel.com",
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

const defaultPortionSettings = {
  date: todayKey(),
  people: 120,
  profileId: "hotel-buffet",
  departmentId: "all-food",
  bufferPercent: portionProfiles["hotel-buffet"].defaultBuffer,
  note: "",
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
  portionSettings: normalizePortionSettings(load("hotel-portion-settings", defaultPortionSettings)),
  mailStatus: null,
};

state.products = ensureProfessionalProductCatalogs(state.products);
save("hotel-stock-products", state.products);

function todayKey() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Europe/Istanbul",
  }).formatToParts(new Date());
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${lookup.year}-${lookup.month}-${lookup.day}`;
}

const app = document.querySelector("#app");
const localBackendUrl = "http://127.0.0.1:8787";
const configuredApiBaseUrl = readConfiguredApiBaseUrl();
const firebaseConfig = window.OTEL_CONFIG?.firebase || {};
const firebaseConfigured = hasFirebaseConfig(firebaseConfig);
const firebaseAppDocumentId = cleanFirestoreId(window.OTEL_CONFIG?.firebaseAppId || "otel-yonetim");
const isGithubPages = location.hostname.endsWith("github.io");
const isFileMode = location.protocol === "file:";
const staticFrontendMode = isGithubPages && !configuredApiBaseUrl && !firebaseConfigured;
const backendBaseUrl = configuredApiBaseUrl || (isFileMode ? localBackendUrl : "");
const backendEnabled = ["http:", "https:", "file:"].includes(location.protocol) && !webApiRequired() && !firebaseConfigured;
const backendMode = firebaseConfigured ? "firebase" : configuredApiBaseUrl ? "cloud" : isFileMode ? "local" : isGithubPages ? "unconfigured-static" : "same-origin";
const firebaseState = {
  enabled: firebaseConfigured,
  readyPromise: null,
  modules: null,
  app: null,
  auth: null,
  db: null,
  authUser: null,
  listeners: [],
  status: firebaseConfigured ? "Firebase hazırlanıyor." : "",
  lastError: "",
};

function cleanApiBaseUrl(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function cleanFirestoreId(value) {
  return String(value || "otel-yonetim").trim().replace(/[^A-Za-z0-9_-]/g, "-") || "otel-yonetim";
}

function hasFirebaseConfig(value = {}) {
  return ["apiKey", "authDomain", "projectId", "appId"].every((key) => String(value?.[key] || "").trim());
}

function readConfiguredApiBaseUrl() {
  const queryValue = new URLSearchParams(location.search).get("api");
  const savedValue = localStorage.getItem("otel-api-base-url");
  const configValue = window.OTEL_CONFIG?.apiBaseUrl;
  return cleanApiBaseUrl(queryValue || savedValue || configValue || "");
}

function webApiRequired() {
  return staticFrontendMode;
}

function backendDisplayUrl() {
  if (configuredApiBaseUrl) return configuredApiBaseUrl;
  if (isFileMode) return localBackendUrl;
  if (backendMode === "same-origin") return location.origin;
  return "";
}

async function apiRequest(path, options = {}) {
  if (!backendEnabled) return null;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (state.sessionToken) {
    headers.Authorization = `Bearer ${state.sessionToken}`;
  }
  const response = await fetch(`${backendBaseUrl}${path}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `API error ${response.status}`);
  }
  return response.json();
}

async function ensureFirebaseReady() {
  if (!firebaseState.enabled) return false;
  if (firebaseState.readyPromise) return firebaseState.readyPromise;

  firebaseState.readyPromise = (async () => {
    try {
      firebaseState.status = "Firebase SDK yükleniyor.";
      const [appModule, authModule, firestoreModule] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js"),
        import("https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"),
      ]);

      const firebaseApp = appModule.getApps().length
        ? appModule.getApp()
        : appModule.initializeApp(firebaseConfig);
      const auth = authModule.getAuth(firebaseApp);
      const db = firestoreModule.getFirestore(firebaseApp);

      try {
        await firestoreModule.enableIndexedDbPersistence(db);
      } catch (error) {
        console.warn("Firebase offline cache etkinleşmedi.", error);
      }

      firebaseState.modules = { appModule, authModule, firestoreModule };
      firebaseState.app = firebaseApp;
      firebaseState.auth = auth;
      firebaseState.db = db;
      firebaseState.status = "Firebase kimlik doğrulama hazırlanıyor.";
      const credential = await authModule.signInAnonymously(auth);
      firebaseState.authUser = credential.user;
      firebaseState.status = "Firebase Spark bağlı.";
      firebaseState.lastError = "";
      return true;
    } catch (error) {
      firebaseState.status = "Firebase bağlantısı kurulamadı.";
      firebaseState.lastError = error.message || String(error);
      console.warn("Firebase bağlantısı kurulamadı.", error);
      return false;
    }
  })();

  return firebaseState.readyPromise;
}

function firebaseStateDoc(name) {
  return firebaseState.modules.firestoreModule.doc(
    firebaseState.db,
    "otelApps",
    firebaseAppDocumentId,
    "state",
    name
  );
}

function firebaseCountsDoc(date) {
  return firebaseState.modules.firestoreModule.doc(
    firebaseState.db,
    "otelApps",
    firebaseAppDocumentId,
    "counts",
    date
  );
}

function firebaseCountsCollection() {
  return firebaseState.modules.firestoreModule.collection(
    firebaseState.db,
    "otelApps",
    firebaseAppDocumentId,
    "counts"
  );
}

async function syncFromFirebase(renderAfter = false) {
  if (!(await ensureFirebaseReady())) return false;
  const { getDoc, getDocs, setDoc, serverTimestamp } = firebaseState.modules.firestoreModule;

  try {
    const [productsSnap, settingsSnap, countsSnap] = await Promise.all([
      getDoc(firebaseStateDoc("products")),
      getDoc(firebaseStateDoc("settings")),
      getDocs(firebaseCountsCollection()),
    ]);

    if (productsSnap.exists()) {
      state.products = ensureProfessionalProductCatalogs(productsSnap.data().products || state.products);
    } else {
      state.products = ensureProfessionalProductCatalogs(state.products);
      await setDoc(firebaseStateDoc("products"), {
        products: state.products,
        updatedAt: serverTimestamp(),
        updatedBy: state.user?.username || "system",
      });
    }

    if (settingsSnap.exists()) {
      state.mailSettings = normalizeMailSettings(settingsSnap.data().mailSettings || state.mailSettings);
    } else {
      await setDoc(firebaseStateDoc("settings"), {
        mailSettings: state.mailSettings,
        updatedAt: serverTimestamp(),
        updatedBy: state.user?.username || "system",
      });
    }

    const nextCounts = {};
    countsSnap.forEach((docSnap) => {
      nextCounts[docSnap.id] = docSnap.data().items || {};
    });
    state.counts = nextCounts;

    save("hotel-stock-products", state.products);
    save("hotel-stock-counts", state.counts);
    save("hotel-stock-mail-settings", state.mailSettings);
    firebaseState.status = "Firebase Spark bağlı.";
    firebaseState.lastError = "";
    startFirebaseListeners();
    if (renderAfter) render();
    return true;
  } catch (error) {
    firebaseState.status = "Firebase veri senkronizasyonu başarısız.";
    firebaseState.lastError = error.message || String(error);
    console.warn("Firebase veri senkronizasyonu başarısız.", error);
    if (renderAfter) render();
    return false;
  }
}

async function syncFirebaseDate(date, renderAfter = false) {
  if (!(await ensureFirebaseReady())) return false;
  const { getDoc } = firebaseState.modules.firestoreModule;
  try {
    const snap = await getDoc(firebaseCountsDoc(date));
    state.counts[date] = snap.exists() ? snap.data().items || {} : {};
    save("hotel-stock-counts", state.counts);
    if (renderAfter) render();
    return true;
  } catch (error) {
    console.warn("Firebase tarih sayımı okunamadı.", error);
    return false;
  }
}

function startFirebaseListeners() {
  if (!firebaseState.enabled || !firebaseState.authUser || firebaseState.listeners.length > 0 || !state.user) return;
  const { onSnapshot } = firebaseState.modules.firestoreModule;

  firebaseState.listeners.push(
    onSnapshot(firebaseStateDoc("products"), (snap) => {
      if (!snap.exists()) return;
      state.products = ensureProfessionalProductCatalogs(snap.data().products || state.products);
      save("hotel-stock-products", state.products);
      if (state.user) render();
    }, (error) => console.warn("Firebase ürün dinleyicisi hata verdi.", error)),
    onSnapshot(firebaseStateDoc("settings"), (snap) => {
      if (!snap.exists()) return;
      state.mailSettings = normalizeMailSettings(snap.data().mailSettings || state.mailSettings);
      save("hotel-stock-mail-settings", state.mailSettings);
      if (state.user) render();
    }, (error) => console.warn("Firebase ayar dinleyicisi hata verdi.", error)),
    onSnapshot(firebaseCountsDoc(todayKey()), (snap) => {
      state.counts[todayKey()] = snap.exists() ? snap.data().items || {} : {};
      save("hotel-stock-counts", state.counts);
      if (state.user && state.view === "sayim") render();
    }, (error) => console.warn("Firebase sayım dinleyicisi hata verdi.", error))
  );
}

function stopFirebaseListeners() {
  firebaseState.listeners.forEach((unsubscribe) => {
    try {
      unsubscribe();
    } catch {}
  });
  firebaseState.listeners = [];
}

async function saveProductsToFirebase() {
  if (!(await ensureFirebaseReady())) return false;
  const { setDoc, serverTimestamp } = firebaseState.modules.firestoreModule;
  await setDoc(firebaseStateDoc("products"), {
    products: state.products,
    updatedAt: serverTimestamp(),
    updatedBy: state.user?.username || "system",
  }, { merge: true });
  return true;
}

async function saveCountToFirebase(date, productId, entry) {
  if (!(await ensureFirebaseReady())) return false;
  const { setDoc, serverTimestamp } = firebaseState.modules.firestoreModule;
  await setDoc(firebaseCountsDoc(date), {
    items: { [productId]: entry },
    updatedAt: serverTimestamp(),
    updatedBy: state.user?.username || "system",
  }, { merge: true });
  return true;
}

async function saveMailSettingsToFirebase() {
  if (!(await ensureFirebaseReady())) return false;
  const { setDoc, serverTimestamp } = firebaseState.modules.firestoreModule;
  await setDoc(firebaseStateDoc("settings"), {
    mailSettings: state.mailSettings,
    updatedAt: serverTimestamp(),
    updatedBy: state.user?.username || "system",
  }, { merge: true });
  return true;
}

async function resetFirebaseDemoData() {
  if (!(await ensureFirebaseReady())) return false;
  const { getDocs, deleteDoc, setDoc, serverTimestamp } = firebaseState.modules.firestoreModule;
  const countDocs = await getDocs(firebaseCountsCollection());
  await Promise.all(countDocs.docs.map((docSnap) => deleteDoc(docSnap.ref)));
  await setDoc(firebaseStateDoc("products"), {
    products: state.products,
    updatedAt: serverTimestamp(),
    updatedBy: state.user?.username || "system",
  });
  await setDoc(firebaseStateDoc("settings"), {
    mailSettings: state.mailSettings,
    updatedAt: serverTimestamp(),
    updatedBy: state.user?.username || "system",
  }, { merge: true });
  return true;
}

async function syncFromBackend() {
  if (firebaseState.enabled) {
    await syncFromFirebase(false);
    return;
  }
  if (!state.sessionToken) return;
  try {
    const data = await apiRequest("/api/bootstrap");
    if (!data) return;
    if (data.user) {
      state.user = data.user;
      state.selectedDepartment = data.user.role === "admin" ? state.selectedDepartment : data.user.departmentId;
      if (!state.view) state.view = data.user.role === "admin" ? "dashboard" : "sayim";
    }
    state.products = ensureProfessionalProductCatalogs(data.products || state.products);
    state.counts = data.counts || state.counts;
    state.mailSettings = normalizeMailSettings(data.mailSettings || state.mailSettings);
    save("hotel-stock-products", state.products);
    save("hotel-stock-counts", state.counts);
    save("hotel-stock-mail-settings", state.mailSettings);
    await refreshMailStatus(false);
    render();
  } catch (error) {
    console.warn("Backend bağlantısı kurulamadı, yerel demo modu kullanılacak.", error);
  }
}

async function refreshMailStatus(renderAfter = false) {
  if (!backendEnabled || state.user?.role !== "admin") {
    state.mailStatus = null;
    return null;
  }

  try {
    state.mailStatus = await apiRequest("/api/mail/status");
    if (renderAfter) render();
    return state.mailStatus;
  } catch (error) {
    state.mailStatus = {
      smtp: { ok: false, enabled: false, message: backendConnectionMessage() },
      automation: {},
      mailLog: [],
    };
    console.warn("Mail durumu okunamadı.", error);
    if (renderAfter) render();
    return null;
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
    { prefix: "resepsiyon", items: professionalReceptionCatalog },
    { prefix: "bufe", items: professionalBufeCatalog },
    { prefix: "smile", items: professionalSmileFoodHouseCatalog },
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

function normalizePortionSettings(settings = {}) {
  const profileId = portionProfiles[settings.profileId] ? settings.profileId : defaultPortionSettings.profileId;
  const allowedDepartments = ["all-food", ...foodDepartmentIds];
  const departmentId = allowedDepartments.includes(settings.departmentId) ? settings.departmentId : "all-food";
  const people = Math.max(1, Math.min(20000, Number(settings.people || defaultPortionSettings.people)));
  const defaultBuffer = portionProfiles[profileId]?.defaultBuffer ?? defaultPortionSettings.bufferPercent;
  const bufferPercent = Math.max(0, Math.min(40, Number(settings.bufferPercent ?? defaultBuffer)));
  return {
    date: settings.date || todayKey(),
    people,
    profileId,
    departmentId,
    bufferPercent,
    note: String(settings.note || "").slice(0, 1500),
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

function productFallbackQty(productId) {
  const product = state.products.find((item) => item.id === productId);
  const existing = getTodayCount(productId);
  return existing?.qty ?? product?.lastQty ?? 0;
}

function hasManualOrderRequest(count) {
  return Boolean(count?.orderRequest?.requested);
}

function shouldOrderItem(item) {
  return item.qty <= Number(item.product.minQty) || hasManualOrderRequest(item.count);
}

function orderStatusMeta(status = "pending") {
  const statuses = {
    pending: { label: "Yonetici onayi bekliyor", cls: "warn" },
    approved: { label: "Onaylandi", cls: "ok" },
    ordered: { label: "Siparise alindi", cls: "ok" },
    rejected: { label: "Reddedildi", cls: "danger" },
  };
  return statuses[status] || statuses.pending;
}

function orderPriorityLabel(item) {
  if (!item) return "Planli";
  if (item.qty <= Number(item.product.minQty) * 0.5) return "Acil";
  if (item.qty <= Number(item.product.minQty)) return "Bugun";
  if (hasManualOrderRequest(item.count)) return "Yonetici onayi";
  return "Planli";
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
  if (firebaseState.enabled) {
    saveCountToFirebase(date, productId, entry).catch((error) => console.warn("Sayım Firebase'e yazılamadı.", error));
  }
  apiRequest("/api/counts", {
    method: "POST",
    body: JSON.stringify({ date, productId, ...entry }),
  }).catch((error) => console.warn("Sayım backend'e yazılamadı.", error));
}

function setOrderRequestStatus(productId, status) {
  const date = state.reportDate || todayKey();
  const count = getCount(productId, date);
  const product = state.products.find((item) => item.id === productId);
  if (!count || !product) {
    window.alert("Bu talep icin once stok sayimi kaydi olusturulmali.");
    return;
  }

  const orderRequest = {
    ...(count.orderRequest || {}),
    requested: true,
    status,
    statusBy: state.user?.name || "",
    statusAt: new Date().toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" }),
  };
  state.counts[date][productId] = { ...count, orderRequest };
  save("hotel-stock-counts", state.counts);
  if (firebaseState.enabled) {
    saveCountToFirebase(date, productId, state.counts[date][productId]).catch((error) => console.warn("Talep durumu Firebase'e yazilamadi.", error));
  }
  apiRequest("/api/counts", {
    method: "POST",
    body: JSON.stringify({ date, productId, ...state.counts[date][productId] }),
  }).catch((error) => console.warn("Talep durumu backend'e yazilamadi.", error));
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
          ${state.user.role === "admin" ? navButton("porsiyon", "Porsiyon Analizi") : ""}
          ${state.user.role === "admin" ? navButton("urunler", "Ürünler") : ""}
          ${state.user.role === "admin" ? navButton("ayarlar", "Mail Ayarları") : ""}
          ${state.user.role === "admin" ? navButton("kullanicilar", "Kullanıcılar") : ""}
        </nav>
        <button class="logout" data-action="logout">Çıkış yap</button>
      </aside>
      <section class="content">
        ${renderTopbar()}
        ${renderRuntimeBanner()}
        ${renderView()}
      </section>
    </div>
  `;
}

function restoreSearchFocus(selectionStart, selectionEnd) {
  const searchInput = app.querySelector('[data-action="search"]');
  if (!searchInput) return;

  try {
    searchInput.focus({ preventScroll: true });
  } catch {
    searchInput.focus();
  }
  if (typeof searchInput.setSelectionRange === "function") {
    searchInput.setSelectionRange(selectionStart ?? searchInput.value.length, selectionEnd ?? searchInput.value.length);
  }
}

function navButton(view, label) {
  return `<button class="${state.view === view ? "active" : ""}" data-view="${view}">${label}</button>`;
}

function renderTopbar() {
  const todaySnapshot = state.user ? buildDailyReportSnapshot(todayKey(), state.user.role === "admin" ? "all" : state.user.departmentId) : null;
  const counted = todaySnapshot ? todaySnapshot.productStates.length - todaySnapshot.notCounted.length : 0;
  const total = todaySnapshot?.productStates.length || 0;
  const completion = total ? Math.round((counted / total) * 100) : 0;
  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">${departmentName(state.selectedDepartment)}</p>
        <h2>${viewTitle()}</h2>
      </div>
      <div class="topbar-actions">
        <div class="ops-pill">
          <strong>%${completion}</strong>
          <span>Bugunku sayim</span>
        </div>
        <div class="date-pill">${new Date().toLocaleDateString("tr-TR", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}</div>
      </div>
    </header>
  `;
}

function renderRuntimeBanner() {
  if (backendEnabled) return "";
  if (firebaseState.enabled) {
    const detail = firebaseState.lastError
      ? `Firebase hata: ${escapeHtml(firebaseState.lastError)}`
      : "Ücretsiz Firebase Spark modu ortak stok verisini Firestore üzerinde tutar. Gerçek otomatik mail için Cloud Functions ücretli plan ister; rapor metni uygulamada hazırlanır.";
    return `
      <section class="notice-panel">
        <strong>${escapeHtml(firebaseState.status || "Firebase Spark modu")}</strong>
        <span>${detail}</span>
      </section>
    `;
  }
  if (staticFrontendMode) {
    return `
      <section class="notice-panel">
        <strong>Önizleme modu</strong>
        <span>Siteye giriş yapabilirsin. Ortak stok verisi ve gerçek mail için uygulamayı otel içi backend adresinden aç: ana bilgisayarda <b>OTEL_AGDA_CALISTIR.cmd</b> çalışınca ekranda çıkan <b>http://192.168.x.x:8787/</b> adresi tüm cihazlarda kullanılacak.</span>
      </section>
    `;
  }
  return `
    <section class="notice-panel">
      <strong>Web API bekleniyor</strong>
      <span>${escapeHtml(backendConnectionMessage())}</span>
    </section>
  `;
}

function viewTitle() {
  const titles = {
    sayim: "Bugünkü stok sayım ekranı",
    dashboard: "Otel operasyon kontrol paneli",
    rapor: "Günlük rapor ve mail özeti",
    porsiyon: "Kişi sayısına göre porsiyon analizi",
    urunler: "Ürün ve minimum stok yönetimi",
    ayarlar: "Otomatik mail ayarları",
    kullanicilar: "Kullanıcı ve departman listesi",
  };
  return titles[state.view];
}

function renderView() {
  if (state.view === "dashboard") return renderDashboardPro();
  if (state.view === "rapor") return renderExecutiveReport();
  if (state.view === "porsiyon") return renderPortionAnalysis();
  if (state.view === "urunler") return renderProductsAdmin();
  if (state.view === "ayarlar") return renderMailSettings();
  if (state.view === "kullanicilar") return renderUsers();
  return renderCounting();
}

function renderDashboardPro() {
  const activeProducts = state.products.filter((product) => product.active);
  const snapshot = buildDailyReportSnapshot(todayKey(), "all");
  const portionSnapshot = buildPortionAnalysisSnapshot({ ...state.portionSettings, date: todayKey() });
  const countedProducts = snapshot.productStates.length - snapshot.notCounted.length;
  const completion = snapshot.productStates.length ? Math.round((countedProducts / snapshot.productStates.length) * 100) : 0;
  const incompleteDepartments = snapshot.departmentSummaries.filter((item) => item.missing > 0).length;
  const operationScore = Math.max(
    0,
    Math.min(100, Math.round(completion - (snapshot.criticalItems.length * 4) - (snapshot.manualRequests.length * 2) - (portionSnapshot.shortageRows.length * 3) - (incompleteDepartments * 5) + 18))
  );
  const scoreClass = operationScore >= 82 ? "ok" : operationScore >= 62 ? "warn" : "danger";

  const actionRows = snapshot.orderNeededItems.slice(0, 8).map(({ product, count, qty }) => `
    <tr>
      <td data-label="Urun"><strong>${escapeHtml(product.name)}</strong><br><span class="hint">${departmentName(product.departmentId)}</span></td>
      <td data-label="Mevcut">${formatReportNumber(qty)} ${escapeHtml(product.unit)}</td>
      <td data-label="Minimum">${formatReportNumber(product.minQty)} ${escapeHtml(product.unit)}</td>
      <td data-label="Oncelik"><span class="badge ${qty <= product.minQty ? "danger" : "warn"}">${escapeHtml(orderPriorityLabel({ product, count, qty }))}</span></td>
    </tr>
  `).join("");

  const departmentRows = snapshot.departmentSummaries.map((item) => `
    <tr>
      <td data-label="Departman"><strong>${departmentStockTitle(item.department)}</strong></td>
      <td data-label="Sayim">${item.counted} / ${item.products}<br><span class="hint">%${item.completion}</span></td>
      <td data-label="Kritik">${item.critical}</td>
      <td data-label="Talep">${item.manual}</td>
      <td data-label="Durum"><span class="badge ${item.missing ? "danger" : "ok"}">${item.missing ? `${item.missing} eksik` : "Tamamlandi"}</span></td>
    </tr>
  `).join("");

  const portionRows = portionSnapshot.shortageRows.slice(0, 6).map((row) => `
    <tr>
      <td data-label="Departman">${escapeHtml(portionDepartmentLabel(row.product.departmentId))}</td>
      <td data-label="Urun"><strong>${escapeHtml(row.product.name)}</strong><br><span class="hint">${escapeHtml(row.rule.label)}</span></td>
      <td data-label="Acik">${escapeHtml(formatReportNumber(row.shortage))} ${escapeHtml(row.product.unit)}</td>
      <td data-label="Karsilama">%${row.coverage}</td>
    </tr>
  `).join("");

  const decisionCards = [
    ["Sayim disiplini", `%${completion}`, incompleteDepartments ? `${incompleteDepartments} departman tamamlanmadi` : "Tum departmanlar tamam"],
    ["Satinalma aksiyonu", snapshot.orderNeededItems.length, `${snapshot.criticalItems.length} kritik, ${snapshot.manualRequests.length} talep`],
    ["Kisi analizi", portionSnapshot.shortageRows.length, `${state.portionSettings.people} kisi icin riskli kalem`],
    ["Rapor saati", state.mailSettings.report.sendTime, state.mailSettings.report.recipients],
  ].map(([title, value, detail]) => `
    <div>
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(title)}</span>
      <small>${escapeHtml(detail)}</small>
    </div>
  `).join("");

  return `
    <section class="panel command-panel">
      <div class="command-hero">
        <div>
          <p class="eyebrow">Gunluk operasyon merkezi</p>
          <h3>Bugunun stok karari tek ekranda</h3>
          <span>${completion}% sayim tamamlandi, ${snapshot.criticalItems.length} kritik stok, ${snapshot.manualRequests.length} manuel talep, ${portionSnapshot.shortageRows.length} porsiyon riski.</span>
        </div>
        <span class="badge ${scoreClass}">Operasyon skoru %${operationScore}</span>
      </div>
      <div class="command-actions">
        <button class="btn" data-view="sayim">Sayim ekranina git</button>
        <button class="btn secondary" data-view="rapor">Kurumsal rapor</button>
        <button class="btn secondary" data-view="porsiyon">Kisi analizi</button>
        <button class="btn secondary" data-view="ayarlar">Mail merkezi</button>
      </div>
    </section>
    <div class="executive-decision-grid">${decisionCards}</div>
    <div class="grid executive-layout">
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Bugunun satinalma aksiyonlari</h3>
          <button class="btn secondary" data-view="rapor">Raporu ac</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Urun</th><th>Mevcut</th><th>Minimum</th><th>Oncelik</th></tr></thead>
            <tbody>${actionRows || `<tr><td data-label="Durum" colspan="4" class="empty">Bugun siparis gerektiren urun yok.</td></tr>`}</tbody>
          </table>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Departman sayim disiplini</h3>
          <button class="btn secondary" data-view="sayim">Sayim ekrani</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Departman</th><th>Sayim</th><th>Kritik</th><th>Talep</th><th>Durum</th></tr></thead>
            <tbody>${departmentRows}</tbody>
          </table>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Kisi sayisina gore riskler</h3>
          <button class="btn secondary" data-view="porsiyon">Analizi ac</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Departman</th><th>Urun</th><th>Acik</th><th>Karsilama</th></tr></thead>
            <tbody>${portionRows || `<tr><td data-label="Durum" colspan="4" class="empty">Kisi analizine gore acil siparis riski yok.</td></tr>`}</tbody>
          </table>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Mail ve rapor merkezi</h3>
          <button class="btn secondary" data-view="ayarlar">Ayarlar</button>
        </div>
        <div class="settings-list">
          <div><strong>Personel hatirlatma</strong><span>${escapeHtml(state.mailSettings.reminder.sendTime)} - ${escapeHtml(state.mailSettings.reminder.recipients)}</span></div>
          <div><strong>Yonetici siparis raporu</strong><span>${escapeHtml(state.mailSettings.report.sendTime)} - ${escapeHtml(state.mailSettings.report.recipients)}</span></div>
          <div><strong>Dagitim</strong><span>PDF, Excel, WhatsApp ozeti ve mail metni ayni kurumsal rapor setinden uretilir.</span></div>
        </div>
      </section>
    </div>
  `;
}

function renderDashboard() {
  const activeProducts = state.products.filter((product) => product.active);
  const criticalItems = activeProducts
    .map((product) => {
      const count = getTodayCount(product.id);
      const qty = count ? count.qty : product.lastQty;
      return { product, count, qty };
    })
    .filter((item) => item.qty <= item.product.minQty || hasManualOrderRequest(item.count));
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
    return qty <= product.minQty || hasManualOrderRequest(count);
  }).length;
  const completion = products.length ? Math.round((counted / products.length) * 100) : 0;

  return `
    <div class="grid stats">
      <div class="stat"><strong>${products.length}</strong><span>Aktif ürün</span></div>
      <div class="stat"><strong>${counted}</strong><span>Bugün sayılan</span></div>
      <div class="stat"><strong>${critical}</strong><span>Sipariş gereken</span></div>
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
      const statusLabel = requested ? "Siparis talebi" : isCritical ? "Kritik" : "Yeterli";
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
          <td data-label="Durum"><span class="badge ${isCritical || requested ? "danger" : "ok"}">${statusLabel}</span></td>
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
          <button class="btn secondary" data-view="rapor">Raporu gonder</button>
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
              <th>Oncelik</th>
              <th>Onay</th>
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
    ${renderReportActionPanel()}
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
                <th>Sipariş</th>
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
    ${renderDetailedReportTable(state.reportDate)}
  `;
}

function reportDepartmentId() {
  return state.user?.role === "admin" ? state.selectedDepartment : state.user?.departmentId || state.selectedDepartment;
}

function reportScopeLabel() {
  return departmentName(reportDepartmentId());
}

function renderReportActionPanel() {
  const shareSupport = navigator.share ? "Mobil cihazlarda WhatsApp, Mail ve diger uygulamalara dosya paylasimi acilir." : "Bu cihazda dosya paylasimi desteklenmezse dosya indirilir.";
  return `
    <section class="panel report-center-panel">
      <div class="panel-head">
        <h3 class="panel-title">Departman rapor gonderim merkezi</h3>
        <span class="badge ok">${escapeHtml(reportScopeLabel())}</span>
      </div>
      <div class="report-action-grid">
        <button class="btn" data-action="download-pdf-report">PDF indir</button>
        <button class="btn secondary" data-action="print-pdf-report">PDF yazdir</button>
        <button class="btn" data-action="download-excel-report">Excel indir</button>
        <button class="btn secondary" data-action="share-pdf-report">WhatsApp PDF</button>
        <button class="btn secondary" data-action="share-excel-report">WhatsApp Excel</button>
        <button class="btn secondary" data-action="share-whatsapp-report">WhatsApp ozeti</button>
        <button class="btn secondary" data-action="email-report">Mail olarak hazirla</button>
        <button class="btn secondary" data-action="copy-report">Rapor metnini kopyala</button>
      </div>
      <div class="report-action-note">
        <strong>${escapeHtml(state.reportDate)}</strong>
        <span>${escapeHtml(shareSupport)} PDF butonu yazdirma ekranini acar; bilgisayarda "PDF olarak kaydet", telefonda paylas/yazdir secenegi kullanilir.</span>
      </div>
    </section>
  `;
}

function renderExecutiveReport() {
  const snapshot = buildDailyReportSnapshot(state.reportDate, reportDepartmentId());
  return `
    ${renderReportToolbar()}
    ${renderReportActionPanel()}
    ${renderReportExecutiveSummary(snapshot)}
    ${renderReportIssueSection("critical", snapshot)}
    ${renderReportIssueSection("manual", snapshot)}
    ${renderReportPortionSection()}
    <section class="panel">
      <div class="panel-head">
        <h3 class="panel-title">Kurumsal mail ön izlemesi</h3>
        <span class="badge">${escapeHtml(state.mailSettings.report.sendTime)} yönetici raporu</span>
      </div>
      <div class="mail-preview executive-mail-preview">${escapeHtml(buildMailReport())}</div>
    </section>
  `;
}

function renderReportToolbar() {
  return `
    <section class="panel report-filter-panel">
      <div class="panel-head">
        <div>
          <h3 class="panel-title">Stok aksiyon raporu</h3>
          <span class="hint">Rapor yalnızca kritik stok seviyesi ve manuel sipariş taleplerini içerir.</span>
        </div>
        <div class="toolbar">
          ${renderDepartmentFilter()}
          <input class="field" type="date" value="${state.reportDate}" data-action="report-date" />
        </div>
      </div>
    </section>
  `;
}

function reportAffectedDepartmentCount(snapshot) {
  const ids = new Set([
    ...snapshot.criticalItems.map((item) => item.product.departmentId),
    ...snapshot.manualRequests.map((item) => item.product.departmentId),
  ]);
  return ids.size;
}

function renderReportExecutiveSummary(snapshot) {
  const portionSnapshot = buildPortionAnalysisSnapshot({ ...state.portionSettings, date: state.reportDate });
  return `
    <section class="panel executive-report-summary">
      <div class="executive-report-brand">
        <div>
          <p class="eyebrow">Otel Yönetim Holding Standardı</p>
          <h3>Stok ve satın alma aksiyon raporu</h3>
          <span>${escapeHtml(reportScopeLabel())} · ${escapeHtml(state.reportDate)}</span>
        </div>
        <span class="badge ok">Kurumsal format</span>
      </div>
      <div class="executive-summary-grid">
        <div><strong>${snapshot.criticalItems.length}</strong><span>Kritik stok kalemi</span></div>
        <div><strong>${snapshot.manualRequests.length}</strong><span>Manuel sipariş talebi</span></div>
        <div><strong>${snapshot.orderNeededItems.length}</strong><span>Toplam aksiyon</span></div>
        <div><strong>${portionSnapshot.shortageRows.length}</strong><span>Porsiyon riski</span></div>
      </div>
    </section>
  `;
}

function reportIssueRows(snapshot, type) {
  const items = type === "critical" ? snapshot.criticalItems : snapshot.manualRequests;
  return items.map(({ product, count, qty }) => {
    const request = count?.orderRequest || {};
    const statusMeta = orderStatusMeta(request.status);
    const shortage = Math.max(Number(product.minQty) - Number(qty), 0);
    const requestQty = request.qty ? `${formatReportNumber(request.qty)} ${product.unit}` : "";
    const suggestedQty = shortage > 0 ? `${formatReportNumber(shortage)} ${product.unit}` : "Satın alma onayı";
    return {
      productId: product.id,
      department: departmentStockTitle(departments.find((department) => department.id === product.departmentId) || { id: product.departmentId, name: departmentName(product.departmentId) }),
      product: product.name,
      unit: product.unit,
      current: `${formatReportNumber(qty)} ${product.unit}`,
      minimum: `${formatReportNumber(product.minQty)} ${product.unit}`,
      actionQty: type === "critical" ? suggestedQty : requestQty || "Miktar belirtilmedi",
      reason: type === "critical" ? (count?.note || "Minimum stok seviyesinin altında") : (request.reason || count?.note || "Manuel satın alma talebi"),
      priority: orderPriorityLabel({ product, count, qty }),
      status: request.status || "pending",
      statusLabel: type === "critical" ? "Kritik stok" : statusMeta.label,
      statusClass: type === "critical" ? "danger" : statusMeta.cls,
      savedBy: count?.user || "Sistem",
      savedAt: count?.time || "",
    };
  });
}

function renderReportIssueSection(type, snapshot) {
  const isCritical = type === "critical";
  const rows = reportIssueRows(snapshot, type);
  const title = isCritical ? "Kritik stok seviyesine düşen ürünler" : "Stok yeterli olsa da talep edilen ürünler";
  const subtitle = isCritical
    ? "Minimum stok altına inen kalemler satın alma önceliğiyle listelenir."
    : "Departmanların ayrıca sipariş edilmesini istediği kalemler ayrı tutulur.";
  const qtyTitle = isCritical ? "Önerilen sipariş" : "Talep miktarı";
  const body = rows.map((row) => `
    <tr>
      <td data-label="Departman">${escapeHtml(row.department)}</td>
      <td data-label="Ürün"><strong>${escapeHtml(row.product)}</strong></td>
      <td data-label="Mevcut">${escapeHtml(row.current)}</td>
      <td data-label="Minimum">${escapeHtml(row.minimum)}</td>
      <td data-label="${qtyTitle}">${escapeHtml(row.actionQty)}</td>
      <td data-label="Açıklama">${escapeHtml(row.reason)}</td>
      <td data-label="Oncelik"><span class="badge ${row.priority === "Acil" ? "danger" : row.priority === "Bugun" ? "warn" : ""}">${escapeHtml(row.priority)}</span></td>
      <td data-label="Onay"><span class="badge ${row.statusClass}">${escapeHtml(row.statusLabel)}</span>${!isCritical && state.user?.role === "admin" ? `<div class="inline-actions order-status-actions"><button class="mini-btn" data-action="set-order-status" data-product-id="${row.productId}" data-status="approved">Onayla</button><button class="mini-btn" data-action="set-order-status" data-product-id="${row.productId}" data-status="ordered">Siparise al</button><button class="mini-btn" data-action="set-order-status" data-product-id="${row.productId}" data-status="rejected">Reddet</button></div>` : ""}</td>
      <td data-label="Kaydeden">${escapeHtml(row.savedBy)}${row.savedAt ? `<br><span class="hint">${escapeHtml(row.savedAt)}</span>` : ""}</td>
    </tr>
  `).join("");

  return `
    <section class="panel report-issue-panel ${isCritical ? "critical-report-panel" : "manual-report-panel"}">
      <div class="panel-head">
        <div>
          <h3 class="panel-title">${title}</h3>
          <span class="hint">${subtitle}</span>
        </div>
        <span class="badge ${rows.length ? "danger" : "ok"}">${rows.length} kalem</span>
      </div>
      <div class="table-wrap report-action-table">
        <table>
          <thead>
            <tr>
              <th>Departman</th>
              <th>Ürün</th>
              <th>Mevcut</th>
              <th>Minimum</th>
              <th>${qtyTitle}</th>
              <th>Açıklama</th>
              <th>Oncelik</th>
              <th>Onay</th>
              <th>Kaydeden</th>
            </tr>
          </thead>
          <tbody>${body || `<tr><td data-label="Durum" colspan="9" class="empty">Bu bölümde raporlanacak ürün yok.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}

function reportPortionRowsForExecutive() {
  const snapshot = buildPortionAnalysisSnapshot({ ...state.portionSettings, date: state.reportDate });
  return {
    snapshot,
    rows: [...snapshot.shortageRows, ...snapshot.reviewRows].slice(0, 18),
  };
}

function renderReportPortionSection() {
  const { snapshot, rows } = reportPortionRowsForExecutive();
  const body = rows.map((row) => `
    <tr>
      <td data-label="Departman">${escapeHtml(portionDepartmentLabel(row.product.departmentId))}</td>
      <td data-label="Urun"><strong>${escapeHtml(row.product.name)}</strong><br><span class="hint">${escapeHtml(row.rule.label)}</span></td>
      <td data-label="Mevcut">${escapeHtml(formatReportNumber(row.available))} ${escapeHtml(row.product.unit)}</td>
      <td data-label="Ihtiyac">${escapeHtml(formatReportNumber(row.required))} ${escapeHtml(row.requirementUnit)}</td>
      <td data-label="Acik">${row.shortage > 0 ? `${escapeHtml(formatReportNumber(row.shortage))} ${escapeHtml(row.product.unit)}` : "-"}</td>
      <td data-label="Gorus">${escapeHtml(row.opinion)}</td>
    </tr>
  `).join("");

  return `
    <section class="panel report-issue-panel portion-report-panel">
      <div class="panel-head">
        <div>
          <h3 class="panel-title">Kisi sayisina gore stok yeterlilik gorusu</h3>
          <span class="hint">${escapeHtml(snapshot.settings.people)} kisi, ${escapeHtml(snapshot.profile.label)} ve %${snapshot.settings.bufferPercent} emniyet payi ile uretilen satin alma gorusudur.</span>
        </div>
        <span class="badge ${snapshot.shortageRows.length ? "danger" : snapshot.reviewRows.length ? "warn" : "ok"}">${snapshot.shortageRows.length} siparis / ${snapshot.reviewRows.length} gorus</span>
      </div>
      <div class="table-wrap report-action-table">
        <table>
          <thead>
            <tr><th>Departman</th><th>Urun</th><th>Mevcut</th><th>Ihtiyac</th><th>Acik</th><th>Gorus</th></tr>
          </thead>
          <tbody>${body || `<tr><td data-label="Durum" colspan="6" class="empty">Kisi sayisina gore rapora girecek riskli kalem yok.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}

function foldText(value) {
  const replacements = {
    ç: "c", Ç: "c",
    ğ: "g", Ğ: "g",
    ı: "i", İ: "i",
    ö: "o", Ö: "o",
    ş: "s", Ş: "s",
    ü: "u", Ü: "u",
  };
  return String(value || "")
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, (char) => replacements[char] || char)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function portionDepartmentLabel(id) {
  if (id === "all-food") return "Tüm gıda operasyonu";
  return departmentStockTitle(departments.find((department) => department.id === id) || { id, name: departmentName(id) });
}

function portionDepartmentOptions(selectedId = state.portionSettings.departmentId) {
  return [
    `<option value="all-food" ${selectedId === "all-food" ? "selected" : ""}>Tüm gıda operasyonu</option>`,
    ...foodDepartmentIds.map((id) => `<option value="${id}" ${selectedId === id ? "selected" : ""}>${escapeHtml(portionDepartmentLabel(id))}</option>`),
  ].join("");
}

function portionProfileOptions(selectedId = state.portionSettings.profileId) {
  return Object.entries(portionProfiles)
    .map(([id, profile]) => `<option value="${id}" ${selectedId === id ? "selected" : ""}>${escapeHtml(profile.label)}</option>`)
    .join("");
}

function matchPortionRule(product) {
  const name = foldText(product.name);
  return portionRules.find((rule) => rule.keywords.some((keyword) => name.includes(foldText(keyword)))) || null;
}

function portionPackageKgEstimate(product) {
  const name = foldText(product.name);
  if (name.includes("makarna") || name.includes("noodle")) return 0.5;
  if (name.includes("pirinc") || name.includes("bulgur") || name.includes("un") || name.includes("seker") || name.includes("misir gevregi")) return 1;
  if (name.includes("baharat") || name.includes("tuz") || name.includes("tarcin")) return 0.5;
  if (name.includes("marshmallow") || name.includes("patlamis misir")) return 0.25;
  return null;
}

function portionPackagePieceEstimate(product) {
  const name = foldText(product.name);
  if (name.includes("pipet") || name.includes("karistirici")) return 100;
  if (name.includes("pecete") || name.includes("islak mendil")) return 100;
  if (name.includes("catal") || name.includes("kasik") || name.includes("bicak")) return 100;
  if (name.includes("stick")) return 500;
  return null;
}

function portionPieceKgEstimate(product) {
  const name = foldText(product.name);
  const kgMatch = name.match(/(\d+(?:[\.,]\d+)?)\s*kg/);
  if (kgMatch) return Number(kgMatch[1].replace(",", "."));
  if (name.includes("ton baligi")) return 0.16;
  if (name.includes("misir konservesi")) return 0.22;
  return null;
}

function portionPieceLiterEstimate(product) {
  const name = foldText(product.name);
  const literMatch = name.match(/(\d+(?:[\.,]\d+)?)\s*lt/);
  if (literMatch) return Number(literMatch[1].replace(",", "."));
  const mlMatch = name.match(/(\d{2,4})\s*ml/);
  if (mlMatch) return Number(mlMatch[1]) / 1000;
  if (name.includes("yag") && name.includes("1")) return 1;
  return null;
}

function convertPortionRequirement(requiredBase, rule, product) {
  const productUnit = foldText(product.unit);
  const ruleUnit = foldText(rule.unit);
  if (productUnit === ruleUnit) {
    return { amount: requiredBase, unit: product.unit, confidence: "high", note: "" };
  }
  if (ruleUnit === "kg" && productUnit === "gr") {
    return { amount: requiredBase * 1000, unit: product.unit, confidence: "high", note: "" };
  }
  if (ruleUnit === "kg" && productUnit === "paket") {
    const kgPerPackage = portionPackageKgEstimate(product);
    if (kgPerPackage) return { amount: requiredBase / kgPerPackage, unit: product.unit, confidence: "medium", note: `1 paket yaklaşık ${kgPerPackage} kg kabul edildi.` };
  }
  if (ruleUnit === "kg" && productUnit === "adet") {
    const kgPerPiece = portionPieceKgEstimate(product);
    if (kgPerPiece) return { amount: requiredBase / kgPerPiece, unit: product.unit, confidence: "medium", note: `1 adet yaklaşık ${kgPerPiece} kg kabul edildi.` };
  }
  if (ruleUnit === "lt" && productUnit === "adet") {
    const literPerPiece = portionPieceLiterEstimate(product);
    if (literPerPiece) return { amount: requiredBase / literPerPiece, unit: product.unit, confidence: "medium", note: `1 adet yaklaşık ${literPerPiece} lt kabul edildi.` };
  }
  if (ruleUnit === "adet" && (productUnit === "paket" || productUnit === "kutu")) {
    const piecePerPackage = portionPackagePieceEstimate(product);
    if (piecePerPackage) return { amount: requiredBase / piecePerPackage, unit: product.unit, confidence: "medium", note: `1 ${product.unit} yaklaşık ${piecePerPackage} adet kabul edildi.` };
  }
  return {
    amount: requiredBase,
    unit: rule.unit,
    confidence: "review",
    note: `Ürün birimi "${product.unit}", hesap birimi "${rule.unit}". Satın alma öncesi birim dönüşümü kontrol edilmeli.`,
  };
}

function profileFactorForRule(profile, rule) {
  if (rule.kind === "beverage") return profile.beverageMultiplier;
  if (rule.kind === "service") return profile.serviceMultiplier;
  return profile.multiplier;
}

function buildPortionProductAnalysis(product, settings, profile) {
  const rule = matchPortionRule(product);
  if (!rule) return null;

  const count = getCount(product.id, settings.date);
  const available = count ? Number(count.qty) : Number(product.lastQty);
  const profileFactor = profileFactorForRule(profile, rule);
  const baseRequirement = settings.people * rule.perGuest * rule.demand * profileFactor;
  const requiredBase = baseRequirement * (1 + settings.bufferPercent / 100);
  const conversion = convertPortionRequirement(requiredBase, rule, product);
  const required = Number(conversion.amount);
  const shortage = conversion.confidence === "review" ? 0 : Math.max(required - available, 0);
  const coverage = required > 0 ? Math.round((available / required) * 100) : 100;
  const needsReserveReview = conversion.confidence !== "review" && shortage <= 0 && available < required * 1.18;
  const needsFreshCountReview = !count && conversion.confidence !== "review" && shortage <= 0 && available < required * 1.35;

  let status = "ok";
  let statusLabel = "Yeterli";
  let opinion = "Stok kişi sayısı ve emniyet payına göre yeterli görünüyor.";

  if (conversion.confidence === "review") {
    status = "review";
    statusLabel = "Birim görüşü";
    opinion = conversion.note;
  } else if (shortage > 0) {
    status = "shortage";
    statusLabel = "Sipariş gerekir";
    opinion = `${formatReportNumber(shortage)} ${product.unit} ek sipariş önerilir.`;
  } else if (needsReserveReview || needsFreshCountReview || conversion.confidence === "medium") {
    status = "review";
    statusLabel = needsFreshCountReview ? "Sayım teyidi" : "Şef görüşü";
    opinion = needsFreshCountReview
      ? "Bugünkü sayım yok; analiz son stok üzerinden yapıldı. Servis öncesi depo teyidi önerilir."
      : conversion.note || "Stok yeterli ama emniyet payı dar. Menü yoğunluğu ve kişi profili şef tarafından onaylanmalı.";
  }

  return {
    product,
    rule,
    count,
    available,
    required,
    shortage,
    coverage,
    status,
    statusLabel,
    opinion,
    source: count ? "Bugünkü sayım" : "Son kayıtlı stok",
    requirementUnit: conversion.unit,
    confidence: conversion.confidence,
    baseRequirement,
  };
}

function buildPortionAnalysisSnapshot(settings = state.portionSettings) {
  const normalized = normalizePortionSettings(settings);
  const profile = portionProfiles[normalized.profileId] || portionProfiles["hotel-buffet"];
  const departmentIds = normalized.departmentId === "all-food" ? foodDepartmentIds : [normalized.departmentId];
  const products = state.products
    .filter((product) => product.active && departmentIds.includes(product.departmentId));
  const rows = products
    .map((product) => buildPortionProductAnalysis(product, normalized, profile))
    .filter(Boolean);
  const shortageRows = rows
    .filter((row) => row.status === "shortage")
    .sort((a, b) => (b.shortage / Math.max(b.required, 1)) - (a.shortage / Math.max(a.required, 1)));
  const reviewRows = rows
    .filter((row) => row.status === "review")
    .sort((a, b) => a.coverage - b.coverage);
  const okRows = rows
    .filter((row) => row.status === "ok")
    .sort((a, b) => a.coverage - b.coverage);
  const unmappedProducts = products
    .filter((product) => !matchPortionRule(product))
    .slice(0, 24);

  return {
    settings: normalized,
    profile,
    products,
    rows,
    shortageRows,
    reviewRows,
    okRows,
    unmappedProducts,
  };
}

function portionRowCells(row, includeOpinion = true) {
  const department = portionDepartmentLabel(row.product.departmentId);
  const shortageText = row.shortage > 0 ? `${formatReportNumber(row.shortage)} ${row.product.unit}` : "-";
  return `
    <td data-label="Departman">${escapeHtml(department)}</td>
    <td data-label="Ürün"><strong>${escapeHtml(row.product.name)}</strong><br><span class="hint">${escapeHtml(row.rule.label)}</span></td>
    <td data-label="Mevcut">${escapeHtml(formatReportNumber(row.available))} ${escapeHtml(row.product.unit)}<br><span class="hint">${escapeHtml(row.source)}</span></td>
    <td data-label="İhtiyaç">${escapeHtml(formatReportNumber(row.required))} ${escapeHtml(row.requirementUnit)}<br><span class="hint">%${row.coverage} karşılama</span></td>
    <td data-label="Açık">${escapeHtml(shortageText)}</td>
    ${includeOpinion ? `<td data-label="Görüş">${escapeHtml(row.opinion)}</td>` : ""}
  `;
}

function renderPortionAnalysis() {
  const snapshot = buildPortionAnalysisSnapshot();
  return `
    ${renderPortionControlPanel(snapshot)}
    ${renderPortionSummary(snapshot)}
    ${renderPortionActionPanel(snapshot)}
    ${renderPortionIssueSection("shortage", snapshot)}
    ${renderPortionIssueSection("review", snapshot)}
    ${renderPortionReferencePanel(snapshot)}
  `;
}

function renderPortionControlPanel(snapshot) {
  const { settings, profile } = snapshot;
  return `
    <section class="panel portion-control-panel">
      <div class="panel-head">
        <div>
          <h3 class="panel-title">Kişi sayısına göre üretim kontrolü</h3>
          <span class="hint">${escapeHtml(profile.description)}</span>
        </div>
        <span class="badge ok">Gıda operasyonu</span>
      </div>
      <form class="portion-control-grid" data-action="portion-form">
        <label>
          <span>Kişi sayısı</span>
          <input class="field" name="people" type="number" min="1" max="20000" step="1" required value="${escapeHtml(settings.people)}" />
        </label>
        <label>
          <span>Servis tipi</span>
          <select class="field" name="profileId">${portionProfileOptions(settings.profileId)}</select>
        </label>
        <label>
          <span>Departman</span>
          <select class="field" name="departmentId">${portionDepartmentOptions(settings.departmentId)}</select>
        </label>
        <label>
          <span>Tarih</span>
          <input class="field" name="date" type="date" value="${escapeHtml(settings.date)}" />
        </label>
        <label>
          <span>Fire / emniyet payı (%)</span>
          <input class="field" name="bufferPercent" type="number" min="0" max="40" step="1" value="${escapeHtml(settings.bufferPercent)}" />
        </label>
        <button class="btn" type="submit">Analizi hesapla</button>
      </form>
    </section>
  `;
}

function portionRiskLabel(snapshot) {
  if (snapshot.shortageRows.length > 0) return { text: "Satın alma aksiyonu var", cls: "danger" };
  if (snapshot.reviewRows.length > 0) return { text: "Şef görüşü gerekli", cls: "warn" };
  return { text: "Stok güvenli", cls: "ok" };
}

function renderPortionSummary(snapshot) {
  const risk = portionRiskLabel(snapshot);
  return `
    <section class="panel portion-summary-panel">
      <div class="portion-summary-head">
        <div>
          <p class="eyebrow">Operasyon görüş raporu</p>
          <h3>${escapeHtml(snapshot.settings.people)} kişi için stok yeterlilik analizi</h3>
          <span>${escapeHtml(portionDepartmentLabel(snapshot.settings.departmentId))} · ${escapeHtml(snapshot.settings.date)} · ${escapeHtml(snapshot.profile.label)}</span>
        </div>
        <span class="badge ${risk.cls}">${escapeHtml(risk.text)}</span>
      </div>
      <div class="portion-summary-grid">
        <div><strong>${snapshot.rows.length}</strong><span>Hesaplanan kalem</span></div>
        <div><strong>${snapshot.shortageRows.length}</strong><span>Sipariş gereken</span></div>
        <div><strong>${snapshot.reviewRows.length}</strong><span>Görüş isteyen</span></div>
        <div><strong>${snapshot.settings.bufferPercent}%</strong><span>Emniyet payı</span></div>
      </div>
    </section>
  `;
}

function renderPortionActionPanel(snapshot) {
  return `
    <section class="panel portion-actions-panel">
      <div class="panel-head">
        <h3 class="panel-title">Porsiyon raporu çıktı merkezi</h3>
        <span class="badge">${escapeHtml(snapshot.settings.people)} kişi</span>
      </div>
      <div class="report-action-grid">
        <button class="btn" data-action="download-portion-pdf">Porsiyon PDF indir</button>
        <button class="btn" data-action="download-portion-excel">Porsiyon Excel indir</button>
        <button class="btn secondary" data-action="share-portion-pdf">WhatsApp PDF</button>
        <button class="btn secondary" data-action="share-portion-whatsapp">WhatsApp özeti</button>
        <button class="btn secondary" data-action="copy-portion-report">Rapor metnini kopyala</button>
      </div>
    </section>
  `;
}

function renderPortionIssueSection(type, snapshot) {
  const isShortage = type === "shortage";
  const rows = isShortage ? snapshot.shortageRows : snapshot.reviewRows;
  const title = isShortage ? "Sipariş edilmesi gereken gıda ve servis kalemleri" : "Şef / yönetici görüşü gereken kalemler";
  const subtitle = isShortage
    ? "Kişi sayısı ve emniyet payına göre mevcut stok ihtiyacı karşılamıyor."
    : "Stok teknik olarak yetebilir; ancak sayım, birim dönüşümü veya dar emniyet payı nedeniyle görüş istenir.";
  const badgeClass = rows.length ? (isShortage ? "danger" : "warn") : "ok";
  const body = rows.map((row) => `<tr>${portionRowCells(row)}</tr>`).join("");
  return `
    <section class="panel portion-issue-panel">
      <div class="panel-head">
        <div>
          <h3 class="panel-title">${title}</h3>
          <span class="hint">${subtitle}</span>
        </div>
        <span class="badge ${badgeClass}">${rows.length} kalem</span>
      </div>
      <div class="table-wrap portion-table">
        <table>
          <thead>
            <tr>
              <th>Departman</th>
              <th>Ürün</th>
              <th>Mevcut</th>
              <th>İhtiyaç</th>
              <th>Açık</th>
              <th>Görüş</th>
            </tr>
          </thead>
          <tbody>${body || `<tr><td data-label="Durum" colspan="6" class="empty">Bu bölümde aksiyon gerektiren ürün yok.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderPortionReferencePanel(snapshot) {
  const okPreview = snapshot.okRows.slice(0, 8).map((row) => `
    <tr>
      ${portionRowCells(row, false)}
      <td data-label="Durum"><span class="badge ok">Yeterli</span></td>
    </tr>
  `).join("");
  const unmapped = snapshot.unmappedProducts.map((product) => `<span>${escapeHtml(product.name)}</span>`).join("");
  return `
    <section class="panel portion-reference-panel">
      <div class="panel-head">
        <div>
          <h3 class="panel-title">Hesap yöntemi ve yönetici notu</h3>
          <span class="hint">Formül: kişi sayısı × porsiyon gramajı/adedi × satış payı × servis tipi × emniyet payı.</span>
        </div>
        <span class="badge">Kurumsal reçete kontrolü</span>
      </div>
      <div class="portion-reference-grid">
        <div class="portion-method-box">
          <strong>Kabul edilen operasyon standardı</strong>
          <span>Protein, nişasta, sebze/salata, içecek ve tek kullanımlık servis kalemleri ayrı hesaplanır. Birim dönüşümü net olmayan stoklarda sistem otomatik olarak “görüş gerekir” uyarısı verir.</span>
          <span>USDA Food Buying Guide mantığına uygun olarak hesap satın alma birimine çevrilir; otel büfesi için fire/emniyet payı ayrıca eklenir.</span>
        </div>
        <form class="portion-note-box" data-action="portion-note-form">
          <label>
            <span>Şef / yönetici görüş notu</span>
            <textarea name="note" placeholder="Menü yoğunluğu, özel grup, çocuk oranı, geç servis veya tedarikçi notu...">${escapeHtml(snapshot.settings.note)}</textarea>
          </label>
          <button class="btn secondary" type="submit">Görüş notunu kaydet</button>
        </form>
      </div>
      <div class="table-wrap portion-table compact">
        <table>
          <thead>
            <tr>
              <th>Departman</th>
              <th>Ürün</th>
              <th>Mevcut</th>
              <th>İhtiyaç</th>
              <th>Açık</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>${okPreview || `<tr><td data-label="Durum" colspan="6" class="empty">Yeterli görünen ürün yok.</td></tr>`}</tbody>
        </table>
      </div>
      ${unmapped ? `<div class="portion-unmapped"><strong>Analiz dışı bırakılan destek kalemleri:</strong>${unmapped}</div>` : ""}
    </section>
  `;
}

function renderDetailedReportTable(date = state.reportDate) {
  const rows = reportProductRows(date)
    .map((row) => `
      <tr>
        <td data-label="Departman">${escapeHtml(row.department)}</td>
        <td data-label="Urun"><strong>${escapeHtml(row.product)}</strong></td>
        <td data-label="Birim">${escapeHtml(row.unit)}</td>
        <td data-label="Onceki">${escapeHtml(row.previous)}</td>
        <td data-label="Minimum">${escapeHtml(row.minimum)}</td>
        <td data-label="Sayim">${escapeHtml(row.counted || "Girilmedi")}</td>
        <td data-label="Durum"><span class="badge ${row.status === "Kritik" || row.status === "Bekliyor" || row.status === "Siparis Talebi" ? "danger" : "ok"}">${escapeHtml(row.status)}</span></td>
        <td data-label="Siparis">${escapeHtml(row.manualOrder)}</td>
        <td data-label="Talep">${escapeHtml(row.requestQty)}</td>
        <td data-label="Not">${escapeHtml(row.note || row.requestReason)}</td>
      </tr>
    `)
    .join("");

  return `
    <section class="panel">
      <div class="panel-head">
        <h3 class="panel-title">Rapor detay tablosu</h3>
        <span class="badge">${escapeHtml(reportScopeLabel())}</span>
      </div>
      <div class="table-wrap report-detail-wrap">
        <table>
          <thead>
            <tr>
              <th>Departman</th>
              <th>Urun</th>
              <th>Birim</th>
              <th>Onceki</th>
              <th>Minimum</th>
              <th>Sayim</th>
              <th>Durum</th>
              <th>Siparis</th>
              <th>Talep</th>
              <th>Not</th>
            </tr>
          </thead>
          <tbody>${rows || `<tr><td data-label="Durum" colspan="10" class="empty">Bu rapor filtresinde urun yok.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
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
        return (count ? count.qty : product.lastQty) <= product.minQty || hasManualOrderRequest(count);
      }).length;
      const complete = counted === products.length && products.length > 0;
      return `
        <tr>
          <td data-label="Departman"><strong>${department.name}</strong></td>
          <td data-label="Ürün">${products.length}</td>
          <td data-label="Sayılan">${counted}</td>
          <td data-label="Sipariş">${critical}</td>
          <td data-label="Durum"><span class="badge ${complete ? "ok" : "danger"}">${complete ? "Tamamlandı" : "Eksik"}</span></td>
        </tr>
      `;
    })
    .join("");
}

function buildDailyReportSnapshot(date = state.reportDate, departmentId = state.selectedDepartment) {
  const departmentList = visibleDepartments().filter((department) => departmentId === "all" || department.id === departmentId);
  const productStates = state.products
    .filter((product) => product.active)
    .filter((product) => departmentId === "all" || product.departmentId === departmentId)
    .map((product) => {
      const count = getCount(product.id, date);
      const qty = count ? Number(count.qty) : Number(product.lastQty);
      return { product, count, qty };
    });
  const criticalItems = productStates.filter((item) => item.qty <= Number(item.product.minQty));
  const manualRequests = productStates.filter((item) => item.count?.orderRequest?.requested);
  const orderNeededItems = productStates.filter(shouldOrderItem);
  const notCounted = productStates.filter((item) => !item.count);
  const departmentSummaries = departmentList.map((department) => {
    const products = productStates.filter((item) => item.product.departmentId === department.id);
    const counted = products.filter((item) => item.count).length;
    const critical = products.filter((item) => item.qty <= Number(item.product.minQty)).length;
    const manual = products.filter((item) => item.count?.orderRequest?.requested).length;
    const orderNeeded = products.filter(shouldOrderItem).length;
    const completion = products.length ? Math.round((counted / products.length) * 100) : 0;
    return { department, products: products.length, counted, missing: Math.max(products.length - counted, 0), critical, manual, orderNeeded, completion };
  });

  return {
    date,
    productStates,
    criticalItems,
    manualRequests,
    orderNeededItems,
    notCounted,
    departmentSummaries,
  };
}

function appendExecutiveMailSection(lines, title, rows, emptyText) {
  lines.push("");
  lines.push(title);
  lines.push("-".repeat(title.length));
  if (rows.length === 0) {
    lines.push(emptyText);
    return;
  }

  rows.forEach((row, index) => {
    lines.push(`${index + 1}. ${row.department} / ${row.product}`);
    lines.push(`   Mevcut: ${row.current} | Minimum: ${row.minimum} | Aksiyon: ${row.actionQty}`);
    lines.push(`   Açıklama: ${row.reason}`);
    if (row.savedBy || row.savedAt) lines.push(`   Kaydeden: ${row.savedBy}${row.savedAt ? ` - ${row.savedAt}` : ""}`);
  });
}

function buildExecutiveMailReport() {
  const snapshot = buildDailyReportSnapshot(state.reportDate, reportDepartmentId());
  const criticalRows = reportIssueRows(snapshot, "critical");
  const manualRows = reportIssueRows(snapshot, "manual");
  const portionReport = reportPortionRowsForExecutive();
  const lines = [
    "OTEL YÖNETİM STOK VE SATIN ALMA AKSİYON RAPORU",
    `Tarih: ${snapshot.date}`,
    `Kapsam: ${reportScopeLabel()}`,
    `Oluşturan: ${state.user?.name || ""}`,
    `Alıcılar: ${state.mailSettings.report.recipients}`,
    "",
    "Yönetici Özeti",
    "--------------",
    `Kritik stok kalemi: ${criticalRows.length}`,
    `Manuel sipariş talebi: ${manualRows.length}`,
    `Toplam satın alma aksiyonu: ${snapshot.orderNeededItems.length}`,
    `Porsiyon riski: ${portionReport.snapshot.shortageRows.length}`,
  ];

  appendExecutiveMailSection(lines, "1. KRİTİK STOK SEVİYESİNE DÜŞEN ÜRÜNLER", criticalRows, "Kritik stok seviyesine düşen ürün yok.");
  appendExecutiveMailSection(lines, "2. STOK YETERLİ OLSA DA TALEP EDİLEN ÜRÜNLER", manualRows, "Manuel sipariş talebi yok.");
  appendPortionTextSection(lines, "3. KISI SAYISINA GORE STOK YETERLILIK GORUSU", portionReport.rows, "Kisi sayisina gore rapora girecek riskli kalem yok.");

  lines.push("");
  lines.push("Not: Rapor yalnızca satın alma aksiyonu gerektiren kalemleri içerir. Normal stok kalemleri sistemde saklanır, bu rapora dahil edilmez.");
  return lines.join("\n");
}

function buildMailReport() {
  return buildExecutiveMailReport();
  const snapshot = buildDailyReportSnapshot();
  const lines = [
    state.mailSettings.report.subject,
    `Tarih: ${snapshot.date}`,
    `Alıcılar: ${state.mailSettings.report.recipients}`,
    `Gönderim saati: ${state.mailSettings.report.sendTime}`,
    "",
    "Özet:",
    `- Aktif ürün: ${snapshot.productStates.length}`,
    `- Sayılan ürün: ${snapshot.productStates.length - snapshot.notCounted.length}`,
    `- Sayımı eksik ürün: ${snapshot.notCounted.length}`,
    `- Kritik stok: ${snapshot.criticalItems.length}`,
    `- Manuel sipariş talebi: ${snapshot.manualRequests.length}`,
    `- Sipariş verilecek toplam ürün: ${snapshot.orderNeededItems.length}`,
    "",
    "Departman durumu:",
  ];

  snapshot.departmentSummaries.forEach((item) => {
    lines.push(`- ${departmentStockTitle(item.department)}: ${item.counted}/${item.products} sayıldı | %${item.completion} | Sipariş: ${item.orderNeeded} | Kritik: ${item.critical} | Manuel talep: ${item.manual}`);
  });

  lines.push("");
  lines.push("Sipariş verilmesi gereken ürünler:");
  lines.push("");

  if (snapshot.orderNeededItems.length === 0) {
    lines.push("Bugün sipariş verilmesi gereken ürün bulunmuyor.");
    lines.push("");
  } else {
    snapshot.departmentSummaries.forEach(({ department }) => {
      const departmentItems = snapshot.orderNeededItems.filter((item) => item.product.departmentId === department.id);
      if (departmentItems.length === 0) return;
      lines.push(departmentStockTitle(department));
      departmentItems.forEach(({ product, count, qty }) => {
        const note = count?.note ? ` | Not: ${count.note}` : "";
        const request = count?.orderRequest?.requested ? count.orderRequest : null;
        const requestedQty = request?.qty ? ` | Talep miktarı: ${request.qty} ${product.unit}` : "";
        const reason = request?.reason ? ` | Gerekçe: ${request.reason}` : "";
        const reasonLabel = qty <= Number(product.minQty) ? "Minimum altı" : "Manuel sipariş talebi";
        lines.push(`- ${product.name}: ${qty} ${product.unit} | Minimum: ${product.minQty} | ${reasonLabel}${requestedQty}${reason}${note}`);
      });
      lines.push("");
    });
  }

  lines.push("Manuel sipariş talepleri:");
  lines.push("");

  if (snapshot.manualRequests.length === 0) {
    lines.push("Yeterli stokta olup ayrıca sipariş talep edilen ürün yok.");
  } else {
    snapshot.manualRequests.forEach(({ product, count, qty }) => {
      const department = departments.find((item) => item.id === product.departmentId) || { id: product.departmentId, name: departmentName(product.departmentId) };
      const request = count.orderRequest;
      const requestedQty = request.qty ? ` | Talep miktarı: ${request.qty} ${product.unit}` : "";
      const reason = request.reason ? ` | Gerekçe: ${request.reason}` : "";
      lines.push(`- ${departmentStockTitle(department)} / ${product.name}: mevcut ${qty} ${product.unit}${requestedQty}${reason}`);
    });
  }

  if (snapshot.notCounted.length > 0) {
    lines.push("");
    lines.push("Sayımı henüz girilmemiş ilk 25 ürün:");
    snapshot.notCounted.slice(0, 25).forEach(({ product }) => {
      lines.push(`- ${departmentName(product.departmentId)} / ${product.name}`);
    });
  }

  return lines.join("\n");
}

function buildReminderMail() {
  const snapshot = buildDailyReportSnapshot(todayKey(), "all");
  const lines = [
    state.mailSettings.reminder.subject,
    `Tarih: ${todayKey()}`,
    `Alıcılar: ${state.mailSettings.reminder.recipients}`,
    `Gönderim saati: ${state.mailSettings.reminder.sendTime}`,
    "",
    state.mailSettings.reminder.message,
    "",
    "Bugünkü departman sayım durumu:",
  ];

  snapshot.departmentSummaries.forEach((item) => {
    lines.push(`- ${departmentStockTitle(item.department)}: ${item.counted}/${item.products} sayıldı | Kalan: ${item.missing}`);
  });

  return lines.join("\n");
}

function formatReportNumber(value) {
  if (value === "" || value === null || value === undefined) return "";
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  return Number.isInteger(numeric) ? String(numeric) : numeric.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

function reportFileStem(extension = "") {
  const scope = reportScopeLabel()
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "") || "rapor";
  return `stok-raporu-${state.reportDate}-${scope}${extension}`;
}

function portionFileStem(extension = "") {
  const scope = portionDepartmentLabel(state.portionSettings.departmentId)
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "") || "porsiyon";
  return `porsiyon-analizi-${state.portionSettings.date}-${state.portionSettings.people}-kisi-${scope}${extension}`;
}

function appendPortionTextSection(lines, title, rows, emptyText) {
  lines.push("", title, "-".repeat(title.length));
  if (!rows.length) {
    lines.push(emptyText);
    return;
  }
  rows.forEach((row, index) => {
    lines.push(`${index + 1}. ${portionDepartmentLabel(row.product.departmentId)} / ${row.product.name}`);
    lines.push(`   Mevcut: ${formatReportNumber(row.available)} ${row.product.unit} | Ihtiyac: ${formatReportNumber(row.required)} ${row.requirementUnit} | Acik: ${row.shortage > 0 ? `${formatReportNumber(row.shortage)} ${row.product.unit}` : "-"}`);
    lines.push(`   Gorus: ${row.opinion}`);
  });
}

function buildPortionReportText() {
  const snapshot = buildPortionAnalysisSnapshot();
  const risk = portionRiskLabel(snapshot);
  const lines = [
    "OTEL YONETIM PORSIYON VE STOK YETERLILIK RAPORU",
    `Tarih: ${snapshot.settings.date}`,
    `Kapsam: ${portionDepartmentLabel(snapshot.settings.departmentId)}`,
    `Kisi sayisi: ${snapshot.settings.people}`,
    `Servis tipi: ${snapshot.profile.label}`,
    `Emniyet payi: %${snapshot.settings.bufferPercent}`,
    `Durum: ${risk.text}`,
    "",
    `Hesaplanan kalem: ${snapshot.rows.length}`,
    `Siparis gereken: ${snapshot.shortageRows.length}`,
    `Sef / yonetici gorusu gereken: ${snapshot.reviewRows.length}`,
  ];

  appendPortionTextSection(lines, "1. SIPARIS EDILMESI GEREKEN KALEMLER", snapshot.shortageRows, "Bu kisi sayisina gore dogrudan siparis gerektiren kalem yok.");
  appendPortionTextSection(lines, "2. SEF / YONETICI GORUSU GEREKEN KALEMLER", snapshot.reviewRows, "Gorus gerektiren kalem yok.");

  if (snapshot.settings.note) {
    lines.push("", "Yonetici notu", "------------", snapshot.settings.note);
  }

  lines.push("", "Not: Hesaplar tahmini porsiyon, satis payi ve emniyet payi ile yapilir; son karar menu kompozisyonu ve servis yogunluguna gore sef/yetkili tarafindan onaylanmalidir.");
  return lines.join("\n");
}

function portionExcelRows(rows, emptyText) {
  if (!rows.length) return `<tr><td colspan="9">${excelCell(emptyText)}</td></tr>`;
  return rows.map((row) => `
    <tr>
      <td>${excelCell(portionDepartmentLabel(row.product.departmentId))}</td>
      <td>${excelCell(row.product.name)}</td>
      <td>${excelCell(row.rule.label)}</td>
      <td>${excelCell(`${formatReportNumber(row.available)} ${row.product.unit}`)}</td>
      <td>${excelCell(`${formatReportNumber(row.required)} ${row.requirementUnit}`)}</td>
      <td>${excelCell(row.shortage > 0 ? `${formatReportNumber(row.shortage)} ${row.product.unit}` : "-")}</td>
      <td>${excelCell(`%${row.coverage}`)}</td>
      <td>${excelCell(row.statusLabel)}</td>
      <td>${excelCell(row.opinion)}</td>
    </tr>
  `).join("");
}

function buildPortionExcelHtml() {
  const snapshot = buildPortionAnalysisSnapshot();
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; color: #16211f; }
        table { border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #cfd8d5; padding: 7px 9px; vertical-align: top; }
        th { background: #eef4f2; color: #0f6758; }
        h2 { color: #0f6758; }
      </style>
    </head>
    <body>
      <h2>Otel Yönetim Porsiyon ve Stok Yeterlilik Raporu</h2>
      <p>Tarih: ${excelCell(snapshot.settings.date)} | Kapsam: ${excelCell(portionDepartmentLabel(snapshot.settings.departmentId))} | Kişi: ${snapshot.settings.people} | Servis: ${excelCell(snapshot.profile.label)} | Emniyet: %${snapshot.settings.bufferPercent}</p>
      <table>
        <thead><tr><th>Hesaplanan kalem</th><th>Sipariş gereken</th><th>Görüş gereken</th><th>Servis tipi</th></tr></thead>
        <tbody><tr><td>${snapshot.rows.length}</td><td>${snapshot.shortageRows.length}</td><td>${snapshot.reviewRows.length}</td><td>${excelCell(snapshot.profile.label)}</td></tr></tbody>
      </table>
      <h3>Sipariş edilmesi gereken kalemler</h3>
      <table>
        <thead><tr><th>Departman</th><th>Ürün</th><th>Kategori</th><th>Mevcut</th><th>İhtiyaç</th><th>Açık</th><th>Karşılama</th><th>Durum</th><th>Görüş</th></tr></thead>
        <tbody>${portionExcelRows(snapshot.shortageRows, "Sipariş gerektiren kalem yok.")}</tbody>
      </table>
      <h3>Şef / yönetici görüşü gereken kalemler</h3>
      <table>
        <thead><tr><th>Departman</th><th>Ürün</th><th>Kategori</th><th>Mevcut</th><th>İhtiyaç</th><th>Açık</th><th>Karşılama</th><th>Durum</th><th>Görüş</th></tr></thead>
        <tbody>${portionExcelRows(snapshot.reviewRows, "Görüş gerektiren kalem yok.")}</tbody>
      </table>
      ${snapshot.settings.note ? `<h3>Yönetici notu</h3><p>${excelCell(snapshot.settings.note)}</p>` : ""}
    </body>
  </html>`;
}

function createPortionExcelFile() {
  const blob = new Blob([`\ufeff${buildPortionExcelHtml()}`], { type: "application/vnd.ms-excel;charset=utf-8" });
  const name = portionFileStem(".xls");
  try {
    return new File([blob], name, { type: blob.type });
  } catch {
    blob.name = name;
    return blob;
  }
}

function downloadPortionExcelReport() {
  const file = createPortionExcelFile();
  downloadBlob(file, file.name || portionFileStem(".xls"));
}

function buildPortionPdfLines() {
  return buildPortionReportText().split("\n").map(toPdfText);
}

function createPortionPdfFile() {
  const blob = buildPdfBlobFromLines(buildPortionPdfLines());
  const name = portionFileStem(".pdf");
  try {
    return new File([blob], name, { type: blob.type });
  } catch {
    blob.name = name;
    return blob;
  }
}

function downloadPortionPdfReport() {
  const file = createPortionPdfFile();
  downloadBlob(file, file.name || portionFileStem(".pdf"));
}

async function sharePortionPdfReport() {
  const file = createPortionPdfFile();
  if (navigator.canShare?.({ files: [file] }) && navigator.share) {
    await navigator.share({
      title: "Otel Yonetim porsiyon analizi",
      text: buildPortionReportText(),
      files: [file],
    });
    return;
  }
  downloadBlob(file, file.name || portionFileStem(".pdf"));
  openWhatsAppPortionReport();
  window.alert("Bu cihaz PDF dosyasini dogrudan paylasamadigi icin PDF indirildi. Acilan WhatsApp mesajina PDF dosyasini ekleyebilirsin.");
}

function openWhatsAppPortionReport() {
  const text = encodeURIComponent(buildPortionReportText());
  window.open(`https://wa.me/?text=${text}`, "_blank");
}

function reportProductRows(date = state.reportDate, departmentId = reportDepartmentId()) {
  const snapshot = buildDailyReportSnapshot(date, departmentId);
  return snapshot.productStates.map(({ product, count, qty }) => {
    const orderRequest = count?.orderRequest || {};
    const counted = count ? Number(count.qty) : "";
    const status = count ? (orderRequest?.requested ? "Siparis Talebi" : Number(count.qty) <= Number(product.minQty) ? "Kritik" : "Yeterli") : "Bekliyor";
    return {
      date,
      department: departmentName(product.departmentId),
      product: product.name,
      unit: product.unit,
      previous: formatReportNumber(product.lastQty),
      minimum: formatReportNumber(product.minQty),
      counted: formatReportNumber(counted),
      status,
      savedBy: count?.user || "",
      savedAt: count?.time || "",
      note: count?.note || "",
      manualOrder: orderRequest.requested ? "Evet" : "Hayir",
      requestQty: orderRequest.requested && orderRequest.qty ? `${formatReportNumber(orderRequest.qty)} ${product.unit}` : "",
      requestReason: orderRequest.reason || "",
      effectiveQty: formatReportNumber(qty),
    };
  });
}

function reportSummaryText() {
  const snapshot = buildDailyReportSnapshot(state.reportDate, reportDepartmentId());
  const lines = [
    "Otel Yönetim stok aksiyon raporu",
    `Tarih: ${state.reportDate}`,
    `Kapsam: ${reportScopeLabel()}`,
    `Kritik stok: ${snapshot.criticalItems.length}`,
    `Manuel talep: ${snapshot.manualRequests.length}`,
  ];

  if (snapshot.criticalItems.length) {
    lines.push("", "Kritik stoklar:");
    reportIssueRows(snapshot, "critical").slice(0, 10).forEach((row) => {
      lines.push(`- ${row.department} / ${row.product}: ${row.current} | min ${row.minimum}`);
    });
  }

  if (snapshot.manualRequests.length) {
    lines.push("", "Manuel talepler:");
    reportIssueRows(snapshot, "manual").slice(0, 10).forEach((row) => {
      lines.push(`- ${row.department} / ${row.product}: ${row.actionQty} | ${row.reason}`);
    });
  }

  return lines.join("\n");
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function excelCell(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function buildExcelIssueTable(title, rows, emptyText) {
  const bodyRows = rows.length
    ? rows.map((row) => `
      <tr>
        <td>${excelCell(row.department)}</td>
        <td>${excelCell(row.product)}</td>
        <td>${excelCell(row.current)}</td>
        <td>${excelCell(row.minimum)}</td>
        <td>${excelCell(row.actionQty)}</td>
        <td>${excelCell(row.reason)}</td>
        <td>${excelCell(row.savedBy)}</td>
        <td>${excelCell(row.savedAt)}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="8">${excelCell(emptyText)}</td></tr>`;

  return `
    <h3>${excelCell(title)}</h3>
    <table>
      <thead><tr><th>Departman</th><th>Ürün</th><th>Mevcut</th><th>Minimum</th><th>Aksiyon miktarı</th><th>Açıklama</th><th>Kaydeden</th><th>Saat</th></tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>
  `;
}

function buildExcelHtml() {
  const snapshot = buildDailyReportSnapshot(state.reportDate, reportDepartmentId());
  const criticalRows = reportIssueRows(snapshot, "critical");
  const manualRows = reportIssueRows(snapshot, "manual");
  const portionReport = reportPortionRowsForExecutive();
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; color: #16211f; }
        table { border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #cfd8d5; padding: 7px 9px; vertical-align: top; }
        th { background: #eef4f2; color: #0f6758; }
        h2 { color: #0f6758; }
        h3 { margin-top: 22px; color: #16211f; }
      </style>
    </head>
    <body>
      <h2>Otel Yönetim Stok ve Satın Alma Aksiyon Raporu</h2>
      <p>Tarih: ${excelCell(state.reportDate)} | Kapsam: ${excelCell(reportScopeLabel())}</p>
      <table>
        <thead><tr><th>Kritik stok</th><th>Manuel talep</th><th>Toplam aksiyon</th><th>Etkilenen departman</th></tr></thead>
        <tbody><tr><td>${criticalRows.length}</td><td>${manualRows.length}</td><td>${snapshot.orderNeededItems.length}</td><td>${reportAffectedDepartmentCount(snapshot)}</td></tr></tbody>
      </table>
      ${buildExcelIssueTable("Kritik stok seviyesine düşen ürünler", criticalRows, "Kritik stok seviyesine düşen ürün yok.")}
      ${buildExcelIssueTable("Stok yeterli olsa da talep edilen ürünler", manualRows, "Manuel sipariş talebi yok.")}
      <h3>Kisi sayisina gore stok yeterlilik gorusu</h3>
      <table>
        <thead><tr><th>Departman</th><th>Urun</th><th>Kategori</th><th>Mevcut</th><th>Ihtiyac</th><th>Acik</th><th>Karsilama</th><th>Durum</th><th>Gorus</th></tr></thead>
        <tbody>${portionExcelRows(portionReport.rows, "Kisi sayisina gore rapora girecek riskli kalem yok.")}</tbody>
      </table>
    </body>
  </html>`;
  const rows = reportProductRows();
  const headers = ["Tarih", "Departman", "Urun", "Birim", "Onceki", "Minimum", "Sayim", "Durum", "Kaydeden", "Saat", "Not", "Manuel Siparis", "Talep Miktari", "Talep Gerekcesi"];
  const bodyRows = rows.map((row) => `
    <tr>
      <td>${excelCell(row.date)}</td>
      <td>${excelCell(row.department)}</td>
      <td>${excelCell(row.product)}</td>
      <td>${excelCell(row.unit)}</td>
      <td>${excelCell(row.previous)}</td>
      <td>${excelCell(row.minimum)}</td>
      <td>${excelCell(row.counted)}</td>
      <td>${excelCell(row.status)}</td>
      <td>${excelCell(row.savedBy)}</td>
      <td>${excelCell(row.savedAt)}</td>
      <td>${excelCell(row.note)}</td>
      <td>${excelCell(row.manualOrder)}</td>
      <td>${excelCell(row.requestQty)}</td>
      <td>${excelCell(row.requestReason)}</td>
    </tr>
  `).join("");

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        table { border-collapse: collapse; font-family: Arial, sans-serif; }
        th, td { border: 1px solid #cfd8d5; padding: 7px 9px; vertical-align: top; }
        th { background: #eef4f2; color: #0f6758; }
      </style>
    </head>
    <body>
      <h2>Otel Yonetim Stok Raporu</h2>
      <p>Tarih: ${excelCell(state.reportDate)} | Kapsam: ${excelCell(reportScopeLabel())}</p>
      <table>
        <thead><tr>${headers.map((header) => `<th>${excelCell(header)}</th>`).join("")}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </body>
  </html>`;
}

function createExcelFile() {
  const blob = new Blob([`\ufeff${buildExcelHtml()}`], { type: "application/vnd.ms-excel;charset=utf-8" });
  const name = reportFileStem(".xls");
  try {
    return new File([blob], name, { type: blob.type });
  } catch {
    blob.name = name;
    return blob;
  }
}

function downloadExcelReport() {
  const file = createExcelFile();
  downloadBlob(file, file.name || reportFileStem(".xls"));
}

async function shareExcelReport() {
  const file = createExcelFile();
  if (navigator.canShare?.({ files: [file] }) && navigator.share) {
    await navigator.share({
      title: "Otel Yonetim stok raporu",
      text: reportSummaryText(),
      files: [file],
    });
    return;
  }

  downloadBlob(file, file.name || reportFileStem(".xls"));
  openWhatsAppReport();
  window.alert("Bu cihaz dosya paylasimini dogrudan desteklemedi. Excel dosyasi indirildi; acilan WhatsApp mesajina dosyayi ekleyebilirsin.");
}

function toPdfText(value) {
  const replacements = {
    "ç": "c", "Ç": "C",
    "ğ": "g", "Ğ": "G",
    "ı": "i", "İ": "I",
    "ö": "o", "Ö": "O",
    "ş": "s", "Ş": "S",
    "ü": "u", "Ü": "U",
  };
  return String(value || "")
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, (char) => replacements[char] || char)
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "")
    .slice(0, 150);
}

function pdfEscape(value) {
  return toPdfText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPdfLines() {
  const snapshot = buildDailyReportSnapshot(state.reportDate, reportDepartmentId());
  const criticalRows = reportIssueRows(snapshot, "critical");
  const manualRows = reportIssueRows(snapshot, "manual");
  const lines = [
    "OTEL YONETIM STOK VE SATIN ALMA AKSIYON RAPORU",
    `Tarih: ${state.reportDate}`,
    `Kapsam: ${reportScopeLabel()}`,
    `Olusturan: ${state.user?.name || ""}`,
    "",
    `Kritik stok: ${criticalRows.length}`,
    `Manuel talep: ${manualRows.length}`,
    `Toplam aksiyon: ${snapshot.orderNeededItems.length}`,
    `Etkilenen departman: ${reportAffectedDepartmentCount(snapshot)}`,
    "",
    "1. KRITIK STOK SEVIYESINE DUSEN URUNLER",
  ];

  if (criticalRows.length === 0) {
    lines.push("Kritik stok seviyesine dusen urun yok.");
  } else {
    criticalRows.forEach((row, index) => {
      lines.push(`${index + 1}. ${row.department} / ${row.product}`);
      lines.push(`   Mevcut: ${row.current} | Minimum: ${row.minimum} | Aksiyon: ${row.actionQty}`);
      lines.push(`   Aciklama: ${row.reason}`);
    });
  }

  lines.push("", "2. STOK YETERLI OLSA DA TALEP EDILEN URUNLER");
  if (manualRows.length === 0) {
    lines.push("Manuel siparis talebi yok.");
  } else {
    manualRows.forEach((row, index) => {
      lines.push(`${index + 1}. ${row.department} / ${row.product}`);
      lines.push(`   Mevcut: ${row.current} | Talep: ${row.actionQty}`);
      lines.push(`   Gerekce: ${row.reason}`);
    });
  }

  const portionReport = reportPortionRowsForExecutive();
  lines.push("", "3. KISI SAYISINA GORE STOK YETERLILIK GORUSU");
  if (portionReport.rows.length === 0) {
    lines.push("Kisi sayisina gore rapora girecek riskli kalem yok.");
  } else {
    portionReport.rows.forEach((row, index) => {
      lines.push(`${index + 1}. ${portionDepartmentLabel(row.product.departmentId)} / ${row.product.name}`);
      lines.push(`   Mevcut: ${formatReportNumber(row.available)} ${row.product.unit} | Ihtiyac: ${formatReportNumber(row.required)} ${row.requirementUnit}`);
      lines.push(`   Gorus: ${row.opinion}`);
    });
  }

  return lines.map(toPdfText);
}

function buildPdfBlobFromLines(lines) {
  const pageWidth = 842;
  const pageHeight = 595;
  const marginX = 36;
  const startY = 552;
  const lineHeight = 13;
  const linesPerPage = 39;
  const pages = [];

  for (let index = 0; index < lines.length; index += linesPerPage) {
    pages.push(lines.slice(index, index + linesPerPage));
  }

  const objects = [];
  const addObject = (body) => {
    objects.push(body);
    return objects.length;
  };

  addObject("<< /Type /Catalog /Pages 2 0 R >>");
  addObject("__PAGES__");
  addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  const pageIds = [];
  pages.forEach((pageLines, pageIndex) => {
    const stream = [
      "BT",
      `/F1 ${pageIndex === 0 ? 12 : 10} Tf`,
      `${marginX} ${startY} Td`,
      `${lineHeight} TL`,
      ...pageLines.map((line) => `(${pdfEscape(line)}) Tj T*`),
      "ET",
    ].join("\n");
    const contentId = objects.length + 2;
    const pageId = addObject(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentId} 0 R >>`);
    addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    pageIds.push(pageId);
  });

  objects[1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

function buildPdfBlob() {
  return buildPdfBlobFromLines(buildPdfLines());
}

function createPdfFile() {
  const blob = buildPdfBlob();
  const name = reportFileStem(".pdf");
  try {
    return new File([blob], name, { type: blob.type });
  } catch {
    blob.name = name;
    return blob;
  }
}

function downloadPdfReport() {
  const file = createPdfFile();
  downloadBlob(file, file.name || reportFileStem(".pdf"));
}

async function sharePdfReport() {
  const file = createPdfFile();
  if (navigator.canShare?.({ files: [file] }) && navigator.share) {
    await navigator.share({
      title: "Otel Yonetim stok raporu",
      text: reportSummaryText(),
      files: [file],
    });
    return;
  }

  downloadBlob(file, file.name || reportFileStem(".pdf"));
  openWhatsAppReport();
  window.alert("Bu cihaz PDF dosyasini dogrudan paylasamadigi icin PDF indirildi. Acilan WhatsApp mesajina PDF dosyasini ekleyebilirsin.");
}

function buildPrintableIssueTable(title, rows, emptyText) {
  const body = rows.length
    ? rows.map((row) => `
      <tr>
        <td>${escapeHtml(row.department)}</td>
        <td><strong>${escapeHtml(row.product)}</strong></td>
        <td>${escapeHtml(row.current)}</td>
        <td>${escapeHtml(row.minimum)}</td>
        <td>${escapeHtml(row.actionQty)}</td>
        <td>${escapeHtml(row.reason)}</td>
        <td>${escapeHtml(row.savedBy)}${row.savedAt ? ` / ${escapeHtml(row.savedAt)}` : ""}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="7">${escapeHtml(emptyText)}</td></tr>`;

  return `
    <h2>${escapeHtml(title)}</h2>
    <table>
      <thead><tr><th>Departman</th><th>Ürün</th><th>Mevcut</th><th>Minimum</th><th>Aksiyon</th><th>Açıklama</th><th>Kaydeden</th></tr></thead>
      <tbody>${body}</tbody>
    </table>
  `;
}

function buildPrintablePortionTable(title, rows, emptyText) {
  const body = rows.length
    ? rows.map((row) => `
      <tr>
        <td>${escapeHtml(portionDepartmentLabel(row.product.departmentId))}</td>
        <td><strong>${escapeHtml(row.product.name)}</strong></td>
        <td>${escapeHtml(row.rule.label)}</td>
        <td>${escapeHtml(formatReportNumber(row.available))} ${escapeHtml(row.product.unit)}</td>
        <td>${escapeHtml(formatReportNumber(row.required))} ${escapeHtml(row.requirementUnit)}</td>
        <td>${row.shortage > 0 ? `${escapeHtml(formatReportNumber(row.shortage))} ${escapeHtml(row.product.unit)}` : "-"}</td>
        <td>${escapeHtml(row.opinion)}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="7">${escapeHtml(emptyText)}</td></tr>`;

  return `
    <h2>${escapeHtml(title)}</h2>
    <table>
      <thead><tr><th>Departman</th><th>Urun</th><th>Kategori</th><th>Mevcut</th><th>Ihtiyac</th><th>Acik</th><th>Gorus</th></tr></thead>
      <tbody>${body}</tbody>
    </table>
  `;
}

function buildPrintableReportHtml() {
  const snapshot = buildDailyReportSnapshot(state.reportDate, reportDepartmentId());
  const criticalRows = reportIssueRows(snapshot, "critical");
  const manualRows = reportIssueRows(snapshot, "manual");
  const portionReport = reportPortionRowsForExecutive();
  return `<!doctype html>
  <html lang="tr">
    <head>
      <meta charset="utf-8">
      <title>Stok Aksiyon Raporu ${escapeHtml(state.reportDate)}</title>
      <style>
        * { box-sizing: border-box; }
        body { margin: 0; padding: 28px; color: #16211f; font-family: Arial, Helvetica, sans-serif; }
        header { display: flex; justify-content: space-between; gap: 18px; border-bottom: 3px solid #0f6758; padding-bottom: 16px; margin-bottom: 18px; }
        h1, h2 { margin: 0; }
        h1 { font-size: 24px; letter-spacing: 0; }
        h2 { font-size: 16px; margin: 24px 0 10px; color: #0f6758; }
        .meta { color: #60716d; line-height: 1.5; text-align: right; }
        .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 16px 0; }
        .stat { border: 1px solid #d7e1de; border-radius: 8px; padding: 10px; }
        .stat strong { display: block; font-size: 20px; }
        .stat span { color: #60716d; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; page-break-inside: auto; margin-bottom: 18px; }
        tr { page-break-inside: avoid; page-break-after: auto; }
        th, td { border: 1px solid #d7e1de; padding: 8px 9px; text-align: left; vertical-align: top; font-size: 12px; }
        th { background: #eef4f2; color: #0f6758; text-transform: uppercase; font-size: 11px; }
        .note { margin-top: 18px; color: #60716d; font-size: 12px; }
        @page { size: A4 landscape; margin: 12mm; }
        @media print { body { padding: 0; } .no-print { display: none; } }
      </style>
    </head>
    <body>
      <button class="no-print" onclick="window.print()" style="margin-bottom:14px;padding:10px 14px;border:0;border-radius:8px;background:#0f6758;color:white;font-weight:700">PDF / Yazdır</button>
      <header>
        <div>
          <h1>Otel Yönetim Stok ve Satın Alma Aksiyon Raporu</h1>
          <p>Yalnızca kritik stok seviyesi ve manuel sipariş talepleri raporlanır.</p>
        </div>
        <div class="meta">
          <strong>Tarih:</strong> ${escapeHtml(state.reportDate)}<br>
          <strong>Kapsam:</strong> ${escapeHtml(reportScopeLabel())}<br>
          <strong>Oluşturan:</strong> ${escapeHtml(state.user?.name || "")}
        </div>
      </header>
      <section class="stats">
        <div class="stat"><strong>${criticalRows.length}</strong><span>Kritik stok</span></div>
        <div class="stat"><strong>${manualRows.length}</strong><span>Manuel talep</span></div>
        <div class="stat"><strong>${snapshot.orderNeededItems.length}</strong><span>Toplam aksiyon</span></div>
        <div class="stat"><strong>${reportAffectedDepartmentCount(snapshot)}</strong><span>Departman</span></div>
      </section>
      ${buildPrintableIssueTable("Kritik stok seviyesine düşen ürünler", criticalRows, "Kritik stok seviyesine düşen ürün yok.")}
      ${buildPrintableIssueTable("Stok yeterli olsa da talep edilen ürünler", manualRows, "Manuel sipariş talebi yok.")}
      ${buildPrintablePortionTable("Kisi sayisina gore stok yeterlilik gorusu", portionReport.rows, "Kisi sayisina gore rapora girecek riskli kalem yok.")}
      <p class="note">Normal stok kalemleri sistemde saklanır; satın alma aksiyonu gerektirmediği için bu kurumsal rapora dahil edilmez.</p>
    </body>
  </html>`;
}

function openPrintableReport() {
  const reportWindow = window.open("", "_blank");
  if (!reportWindow) {
    window.alert("Tarayici yeni pencereyi engelledi. Pop-up izni verip tekrar dene.");
    return;
  }
  reportWindow.document.open();
  reportWindow.document.write(buildPrintableReportHtml());
  reportWindow.document.close();
  reportWindow.focus();
  setTimeout(() => reportWindow.print(), 450);
}

function openWhatsAppReport() {
  const text = encodeURIComponent(reportSummaryText());
  window.open(`https://wa.me/?text=${text}`, "_blank", "noopener");
}

async function openEmailReport() {
  if (backendEnabled) {
    try {
      const result = await apiRequest(`/api/mail/send-report?date=${encodeURIComponent(state.reportDate)}&departmentId=${encodeURIComponent(reportDepartmentId())}`, { method: "POST" });
      if (result) {
        window.alert(result.message || "Rapor maili islendi.");
        return;
      }
    } catch (error) {
      console.warn("Backend mail gonderimi basarisiz, mail uygulamasi aciliyor.", error);
    }
  }

  const subject = encodeURIComponent(`${state.mailSettings.report.subject} - ${state.reportDate} - ${reportScopeLabel()}`);
  const body = encodeURIComponent(buildMailReport());
  const recipients = String(state.mailSettings.report.recipients || "").replace(/\s+/g, "");
  window.location.href = `mailto:${recipients}?subject=${subject}&body=${body}`;
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
      <section class="panel product-form-panel">
        <div class="panel-head">
          <h3 class="panel-title">Ürün düzenle</h3>
          <button class="btn secondary" data-action="cancel-edit">Vazgeç</button>
        </div>
        ${renderProductForm(editingProduct.departmentId, editingProduct)}
      </section>
    `;
  }

  return `
    <section class="panel product-form-panel">
      <div class="panel-head">
        <h3 class="panel-title">Yeni ürün kartı</h3>
        <span class="badge">Manuel stok</span>
      </div>
      ${renderProductForm(state.openStockDepartmentId, null, true)}
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

function renderDepartmentOptions(selectedDepartmentId) {
  return departments
    .map((department) => `<option value="${department.id}" ${selectedDepartmentId === department.id ? "selected" : ""}>${departmentStockTitle(department)}</option>`)
    .join("");
}

function renderProductDepartmentField(departmentId, product, allowDepartmentSelect) {
  if (allowDepartmentSelect && !product) {
    return `
      <div class="form-row">
        <label>Departman</label>
        <select name="departmentId" required data-action="product-department">
          ${renderDepartmentOptions(departmentId)}
        </select>
      </div>
    `;
  }

  return `
    <div class="form-row">
      <label>Departman</label>
      <input type="hidden" name="departmentId" value="${departmentId}" />
      <input value="${escapeHtml(departmentStockTitle(departments.find((department) => department.id === departmentId) || { id: departmentId, name: departmentName(departmentId) }))}" disabled />
    </div>
  `;
}

function renderProductForm(departmentId, product = null, allowDepartmentSelect = false) {
  return `
    <form class="form-body compact-product-form" data-action="product-form">
      <input type="hidden" name="id" value="${product?.id || ""}" />
      <div class="quick-product-grid">
        <div class="form-row">
          <label>Ürün adı</label>
          <input name="name" required value="${escapeHtml(product?.name || "")}" placeholder="Örn. Çöp poşeti, su, kalem" />
        </div>
        ${renderProductDepartmentField(departmentId, product, allowDepartmentSelect)}
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
        <div class="form-row product-submit-row">
          <button class="btn" type="submit">${product ? "Ürünü güncelle" : "Ürünü ekle"}</button>
        </div>
      </div>
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

function formatMailDate(value) {
  if (!value) return "Yok";
  try {
    return new Date(value).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return String(value);
  }
}

function mailStatusBadge(status) {
  if (firebaseState.enabled) return `<span class="badge ${firebaseState.authUser ? "ok" : ""}">Firebase Spark</span>`;
  if (!status) return `<span class="badge">Yerel mod</span>`;
  if (status.smtp?.enabled && status.smtp?.ok) return `<span class="badge ok">SMTP hazır</span>`;
  if (status.smtp?.enabled && !status.smtp?.ok) return `<span class="badge danger">SMTP hata</span>`;
  return `<span class="badge">Log modu</span>`;
}

function renderMailStatusPanel() {
  const status = state.mailStatus;
  const smtpMessage = status?.smtp?.message || (firebaseState.enabled
    ? "Firebase ücretsiz modda otomatik mail gönderimi kapalıdır; rapor metni hazırlanır ve manuel kullanılabilir."
    : backendEnabled ? "Backend mail durumu bekleniyor." : "Yerel dosya modunda gerçek mail gönderimi yapılmaz.");
  const reminderDelivery = status?.automation?.reminder?.lastDelivery;
  const reportDelivery = status?.automation?.report?.lastDelivery;
  return `
    <section class="panel mail-status-panel">
      <div class="panel-head">
        <h3 class="panel-title">Mail merkezi</h3>
        ${mailStatusBadge(status)}
      </div>
      <div class="mail-status-grid">
        <div>
          <strong>SMTP</strong>
          <span>${escapeHtml(smtpMessage)}</span>
        </div>
        <div>
          <strong>Hatırlatma otomasyonu</strong>
          <span>${escapeHtml(state.mailSettings.reminder.sendTime)} | Son işlem: ${escapeHtml(formatMailDate(reminderDelivery?.at))}</span>
        </div>
        <div>
          <strong>Yönetici raporu</strong>
          <span>${escapeHtml(state.mailSettings.report.sendTime)} | Son işlem: ${escapeHtml(formatMailDate(reportDelivery?.at))}</span>
        </div>
      </div>
    </section>
  `;
}

function renderMailLogPanel() {
  const logs = state.mailStatus?.mailLog || [];
  const rows = logs.map((log) => `
    <tr>
      <td data-label="Zaman">${escapeHtml(formatMailDate(log.createdAt))}</td>
      <td data-label="Tür">${log.kind === "reminder" ? "Hatırlatma" : "Yönetici raporu"}</td>
      <td data-label="Durum"><span class="badge ${log.status === "sent" ? "ok" : log.status?.includes("error") ? "danger" : ""}">${escapeHtml(log.status || "log")}</span></td>
      <td data-label="Konu">${escapeHtml(log.subject || "")}</td>
    </tr>
  `).join("");

  return `
    <section class="panel mail-log-panel">
      <div class="panel-head">
        <h3 class="panel-title">Son mail işlemleri</h3>
        <button class="btn secondary" data-action="refresh-mail-status">Yenile</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Zaman</th><th>Tür</th><th>Durum</th><th>Konu</th></tr></thead>
          <tbody>${rows || `<tr><td data-label="Durum" colspan="4" class="empty">Henüz mail işlemi yok.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderWebApiPanel() {
  const displayUrl = backendDisplayUrl();
  const badgeClass = backendEnabled || firebaseState.authUser ? "ok" : "";
  const badgeText = firebaseState.enabled
    ? (firebaseState.authUser ? "Firebase bağlı" : "Firebase hazırlanıyor")
    : backendEnabled ? "Web API bağlı" : "Önizleme modu";
  const note = firebaseState.enabled
    ? "Ücretsiz Firebase Spark modu ortak stok verisini Firestore'da tutar. Mail ön izleme çalışır; gerçek otomatik mail için ücretli Cloud Functions gerekir."
    : webApiRequired()
    ? "GitHub Pages sadece arayüzdür. Ortak veri ve mail için otel içi backend adresinden gir veya bulut backend URL'i tanımla."
    : backendMode === "same-origin"
      ? "Uygulama backend ile aynı web adresinden çalışıyor; telefon ve bilgisayarlar aynı veriyi kullanır."
      : "Bu adres tüm cihazlarda kullanılacak merkezi API bağlantısıdır.";
  const connectionLabel = firebaseState.enabled ? "Firebase proje" : "API";
  const connectionValue = firebaseState.enabled ? firebaseConfig.projectId : displayUrl || "Tanımlı değil";
  const apiSettingsDisabled = firebaseState.enabled ? "disabled" : "";
  const apiInputValue = firebaseState.enabled ? firebaseConfig.projectId : configuredApiBaseUrl;
  const apiInputLabel = firebaseState.enabled ? "Firebase proje ID" : "Bulut backend adresi";

  return `
    <section class="panel web-api-panel">
      <div class="panel-head">
        <h3 class="panel-title">Web API bağlantısı</h3>
        <span class="badge ${badgeClass}">${badgeText}</span>
      </div>
      <form class="form-body" data-action="api-settings">
        <div class="form-row">
          <label>${apiInputLabel}</label>
          <input name="apiBaseUrl" placeholder="https://otel-yonetim.onrender.com" value="${escapeHtml(apiInputValue)}" ${apiSettingsDisabled} />
          <span class="hint">${escapeHtml(note)}</span>
        </div>
        <div class="toolbar">
          <button class="btn" type="submit" ${apiSettingsDisabled}>API adresini kaydet</button>
          <button class="btn secondary" type="button" data-action="refresh-mail-status">Bağlantıyı kontrol et</button>
        </div>
      </form>
      <div class="meta-list">
        <div><strong>Aktif mod</strong><span>${escapeHtml(backendMode)}</span></div>
        <div><strong>${connectionLabel}</strong><span>${escapeHtml(connectionValue)}</span></div>
      </div>
    </section>
  `;
}

function backendConnectionMessage() {
  if (webApiRequired()) {
    return "Bu GitHub Pages adresi sadece arayüzü yayınlıyor. Stok kayıtları ve mail gönderimi için bulut backend adresi config.js içinde tanımlanmalı ya da uygulama backend'in kendi web adresinden açılmalı.";
  }
  if (backendMode === "cloud") {
    return `Bulut API bağlantısı kurulamadı: ${backendDisplayUrl()}`;
  }
  if (isFileMode) {
    return `Yerel dosyadan açılan ekranda gerçek mail için backend açık olmalı: ${localBackendUrl}/`;
  }
  return `Web API bağlantısı kurulamadı: ${backendDisplayUrl() || location.origin}`;
}

async function handleMailBackendFailure(kind, error) {
  const text = kind === "reminder" ? buildReminderMail() : buildMailReport();
  if (firebaseState.enabled) {
    window.alert("Firebase ücretsiz modda gerçek otomatik mail yok. Rapor ve hatırlatma metni ekranda hazırlanır; gerçek otomasyon için Firebase Cloud Functions ücretli plan ister.");
    return;
  }
  if (staticFrontendMode) {
    window.alert("Mail gönderimi için web backend gerekli. Ana bilgisayarda OTEL_AGDA_CALISTIR.cmd çalıştır, ekranda çıkan http://192.168.x.x:8787/ adresinden giriş yap.");
    return;
  }
  try {
    await copyText(text);
    window.alert(`${backendConnectionMessage()}\n\nMail gerçek gönderilmedi; ${kind === "reminder" ? "hatırlatma" : "rapor"} metni panoya kopyalandı.\n\nTeknik detay: ${error.message || "backend bağlantısı yok"}`);
  } catch {
    window.alert(`${backendConnectionMessage()}\n\nMail gerçek gönderilmedi.\n\nTeknik detay: ${error.message || "backend bağlantısı yok"}`);
  }
}

function renderMailSettings() {
  const mailActionDisabled = backendEnabled ? "" : "disabled";
  const mailActionHint = backendEnabled
    ? ""
    : `<span class="hint">${firebaseState.enabled ? "Firebase ücretsiz modda otomatik mail için ücretli Cloud Functions gerekir; bu ekrandaki metinler ön izleme ve manuel kullanım içindir." : "Mail gönderimi için backend adresinden giriş yapılmalı."}</span>`;
  return `
    <div class="grid mail-settings-layout">
      ${renderWebApiPanel()}
      ${renderMailStatusPanel()}
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
            <button class="btn secondary" type="button" data-action="verify-smtp" ${mailActionDisabled}>SMTP kontrol et</button>
          </div>
          ${mailActionHint}
        </form>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Hatırlatma maili ön izlemesi</h3>
          <div class="toolbar">
            <span class="badge">Personel</span>
            <button class="btn secondary" data-action="send-reminder-mail" ${mailActionDisabled}>Hatırlatma gönder</button>
          </div>
        </div>
        ${mailActionHint}
        <div class="mail-preview">${escapeHtml(buildReminderMail())}</div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h3 class="panel-title">Yönetici raporu ön izlemesi</h3>
          <div class="toolbar">
            <span class="badge">Sipariş gerekli</span>
            <button class="btn secondary" data-action="send-report-mail" ${mailActionDisabled}>Rapor gönder</button>
          </div>
        </div>
        ${mailActionHint}
        <div class="mail-preview">${escapeHtml(buildMailReport())}</div>
      </section>
      ${renderMailLogPanel()}
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
          <div class="login-brand-mark">OY</div>
          <div>
            <p class="eyebrow">Günlük operasyon</p>
            <h1>Otel yönetimi tek ekranda.</h1>
          </div>
          <p>Personel kendi departmanına girer, sayımı tamamlar; yönetici stok, sipariş ve mail raporlarını tek yerden takip eder.</p>
          <div class="login-metrics">
            <div><strong>5</strong><span>Departman</span></div>
            <div><strong>24/7</strong><span>Stok kontrol</span></div>
            <div><strong>PDF</strong><span>Yonetici raporu</span></div>
          </div>
        </div>
        <form class="login-form" data-action="login">
          <div>
            <p class="eyebrow">Giriş</p>
            <h2>Kullanıcı hesabı</h2>
          </div>
          ${webApiRequired() ? `<div class="notice-box"><strong>Önizleme modu açık.</strong> Bu adresten siteye girebilirsin. Ortak stok, 10 cihazdan kullanım ve gerçek mail için ana bilgisayarda <b>OTEL_AGDA_CALISTIR.cmd</b> çalıştırıp ekranda çıkan <b>http://192.168.x.x:8787/</b> adresinden giriş yapılmalı. Bulut backend kullanacaksan aşağıya API adresini girebilirsin.</div>` : ""}
          ${webApiRequired() ? `
            <div class="form-row">
              <label for="apiBaseUrl">Bulut backend adresi</label>
              <input id="apiBaseUrl" name="apiBaseUrl" placeholder="https://otel-yonetim.onrender.com" />
            </div>
          ` : ""}
          <div class="form-row">
            <label for="username">Kullanıcı adı</label>
            <input id="username" name="username" autocomplete="username" value="admin" />
          </div>
          <div class="form-row">
            <label for="password">Şifre</label>
            <input id="password" name="password" type="password" autocomplete="current-password" value="admin123" />
          </div>
          <div class="hint">Demo kullanıcıları: admin/admin123, satinalma/SatinAlma2026, operasyon/Operasyon2026, temizlik/Temizlik2026, mutfak/Mutfak2026, bufe/Bufe2026, resepsiyon/Resepsiyon2026</div>
          <div class="error" data-error></div>
          <button class="btn" type="submit">Giriş yap</button>
        </form>
      </div>
    </section>
  `;
}

function exportCsv() {
  const snapshot = buildDailyReportSnapshot(state.reportDate, reportDepartmentId());
  const actionRows = [
    ...reportIssueRows(snapshot, "critical").map((row) => ["Kritik stok", row]),
    ...reportIssueRows(snapshot, "manual").map((row) => ["Manuel talep", row]),
  ];
  const executiveHeader = ["Tarih", "Rapor Bolumu", "Departman", "Urun", "Mevcut", "Minimum", "Aksiyon Miktari", "Aciklama", "Kaydeden", "Saat"];
  const executiveCsv = [executiveHeader, ...actionRows.map(([section, row]) => [
    state.reportDate,
    section,
    row.department,
    row.product,
    row.current,
    row.minimum,
    row.actionQty,
    row.reason,
    row.savedBy,
    row.savedAt,
  ])]
    .map((line) => line.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(";"))
    .join("\n");
  downloadBlob(new Blob([`\ufeff${executiveCsv}`], { type: "text/csv;charset=utf-8" }), reportFileStem(".csv"));
  return;
  const header = ["Tarih", "Departman", "Ürün", "Birim", "Önceki", "Minimum", "Sayım", "Durum", "Kaydeden", "Saat", "Not", "Manuel Sipariş", "Talep Miktarı", "Talep Gerekçesi"];
  const rows = visibleProducts().map((product) => {
    const count = getCount(product.id, state.reportDate);
    const qty = count?.qty ?? "";
    const status = count ? (hasManualOrderRequest(count) ? "Siparis Talebi" : count.qty <= product.minQty ? "Kritik" : "Yeterli") : "Bekliyor";
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
  if (firebaseState.enabled) {
    saveProductsToFirebase().catch((error) => console.warn("Ürün Firebase'e yazılamadı.", error));
  }
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
    stopFirebaseListeners();
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
      const note = document.querySelector(`[data-note="${input.dataset.count}"]`)?.value || "";
      const requestedByCheck = document.querySelector(`[data-order-request="${input.dataset.count}"]`)?.checked || false;
      const orderQty = document.querySelector(`[data-order-qty="${input.dataset.count}"]`)?.value || "";
      const reason = document.querySelector(`[data-order-reason="${input.dataset.count}"]`)?.value || "";
      const requested = requestedByCheck || String(orderQty).trim() !== "" || String(reason).trim() !== "";
      if (input.value !== "" || requested || note.trim() !== "") {
        const qty = input.value !== "" ? input.value : productFallbackQty(input.dataset.count);
        const existingRequest = getTodayCount(input.dataset.count)?.orderRequest || {};
        const orderRequest = requested
          ? { requested: true, qty: Number(orderQty || 0), reason, status: existingRequest.status || "pending" }
          : { requested: false, qty: 0, reason: "" };
        setTodayCount(input.dataset.count, qty, note, orderRequest);
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

  if (action === "print-pdf-report") {
    openPrintableReport();
  }

  if (action === "download-pdf-report") {
    downloadPdfReport();
  }

  if (action === "share-pdf-report") {
    try {
      await sharePdfReport();
    } catch (error) {
      console.warn("PDF paylasimi basarisiz.", error);
      downloadPdfReport();
    }
  }

  if (action === "download-excel-report") {
    downloadExcelReport();
  }

  if (action === "share-excel-report") {
    try {
      await shareExcelReport();
    } catch (error) {
      console.warn("Excel paylasimi basarisiz.", error);
      downloadExcelReport();
    }
  }

  if (action === "share-whatsapp-report") {
    openWhatsAppReport();
  }

  if (action === "email-report") {
    await openEmailReport();
  }

  if (action === "copy-portion-report") {
    await copyText(buildPortionReportText());
    target.textContent = "Kopyalandı";
    setTimeout(render, 900);
  }

  if (action === "download-portion-pdf") {
    downloadPortionPdfReport();
  }

  if (action === "share-portion-pdf") {
    try {
      await sharePortionPdfReport();
    } catch (error) {
      console.warn("Porsiyon PDF paylaşımı başarısız.", error);
      downloadPortionPdfReport();
    }
  }

  if (action === "download-portion-excel") {
    downloadPortionExcelReport();
  }

  if (action === "share-portion-whatsapp") {
    openWhatsAppPortionReport();
  }

  if (action === "send-reminder-mail") {
    try {
      const result = await apiRequest("/api/mail/send-reminder", { method: "POST" });
      if (!result) throw new Error("Backend kapalı.");
      await refreshMailStatus(false);
      window.alert(result?.message || "Hatırlatma maili işlendi.");
      render();
    } catch (error) {
      await handleMailBackendFailure("reminder", error);
    }
  }

  if (action === "send-report-mail") {
    try {
      const result = await apiRequest(`/api/mail/send-report?date=${encodeURIComponent(state.reportDate)}&departmentId=${encodeURIComponent(reportDepartmentId())}`, { method: "POST" });
      if (!result) throw new Error("Backend kapalı.");
      await refreshMailStatus(false);
      window.alert(result?.message || "Yönetici raporu işlendi.");
      render();
    } catch (error) {
      await handleMailBackendFailure("report", error);
    }
  }

  if (action === "verify-smtp") {
    try {
      const result = await apiRequest("/api/mail/verify-smtp", { method: "POST" });
      if (!result) throw new Error("Backend kapalı.");
      await refreshMailStatus(false);
      window.alert(result?.message || (result?.enabled ? "SMTP kontrol edildi." : "SMTP kapalı. .env içinde SMTP_ENABLED=true yapılmalı."));
      render();
    } catch (error) {
      window.alert(`${backendConnectionMessage()}\n\nTeknik detay: ${error.message || "SMTP kontrolü başarısız"}`);
    }
  }

  if (action === "refresh-mail-status") {
    if (firebaseState.enabled) {
      await syncFromFirebase(true);
      return;
    }
    await refreshMailStatus(true);
  }

  if (action === "set-order-status") {
    setOrderRequestStatus(target.dataset.productId, target.dataset.status || "pending");
    render();
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
    if (firebaseState.enabled) {
      saveProductsToFirebase().catch((error) => console.warn("Ürün durumu Firebase'e yazılamadı.", error));
    }
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
    if (firebaseState.enabled) {
      resetFirebaseDemoData().catch((error) => console.warn("Firebase demo verisi sıfırlanamadı.", error));
    }
    render();
  }
});

app.addEventListener("input", (event) => {
  if (event.target.dataset.action === "search") {
    const selectionStart = event.target.selectionStart;
    const selectionEnd = event.target.selectionEnd;
    state.search = event.target.value;
    render();
    restoreSearchFocus(selectionStart, selectionEnd);
  }
});

app.addEventListener("change", async (event) => {
  if (event.target.dataset.action === "department") {
    state.selectedDepartment = event.target.value;
    render();
  }

  if (event.target.dataset.action === "product-department") {
    state.openStockDepartmentId = event.target.value || state.openStockDepartmentId;
  }

  if (event.target.dataset.action === "report-date") {
    state.reportDate = event.target.value || todayKey();
    if (firebaseState.enabled) {
      await syncFirebaseDate(state.reportDate);
    }
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
    const loginApiBaseUrl = cleanApiBaseUrl(formData.get("apiBaseUrl"));
    if (loginApiBaseUrl && loginApiBaseUrl !== configuredApiBaseUrl) {
      localStorage.setItem("otel-api-base-url", loginApiBaseUrl);
      window.location.reload();
      return;
    }
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
      } catch (error) {
        if (!user) {
          user = null;
        }
      }
    }

    if (!user) {
      event.target.querySelector("[data-error]").textContent = "Kullanıcı adı veya şifre hatalı.";
      return;
    }

    state.user = user;
    state.selectedDepartment = user.role === "admin" ? "all" : user.departmentId;
    state.view = user.role === "admin" ? "dashboard" : "sayim";
    await syncFromBackend();
    render();
  }

  if (action === "product-form") {
    upsertProduct(event.target);
    render();
  }

  if (action === "portion-form") {
    const formData = new FormData(event.target);
    state.portionSettings = normalizePortionSettings({
      ...state.portionSettings,
      people: formData.get("people"),
      profileId: String(formData.get("profileId") || state.portionSettings.profileId),
      departmentId: String(formData.get("departmentId") || state.portionSettings.departmentId),
      date: String(formData.get("date") || state.portionSettings.date),
      bufferPercent: formData.get("bufferPercent"),
    });
    save("hotel-portion-settings", state.portionSettings);
    if (firebaseState.enabled) {
      await syncFirebaseDate(state.portionSettings.date);
    }
    render();
  }

  if (action === "portion-note-form") {
    const formData = new FormData(event.target);
    state.portionSettings = normalizePortionSettings({
      ...state.portionSettings,
      note: String(formData.get("note") || "").trim(),
    });
    save("hotel-portion-settings", state.portionSettings);
    render();
  }

  if (action === "api-settings") {
    const formData = new FormData(event.target);
    const apiBaseUrl = cleanApiBaseUrl(formData.get("apiBaseUrl"));
    if (apiBaseUrl) {
      localStorage.setItem("otel-api-base-url", apiBaseUrl);
    } else {
      localStorage.removeItem("otel-api-base-url");
    }
    window.alert("Web API adresi kaydedildi. Sayfa yeniden yüklenecek.");
    window.location.reload();
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
    if (firebaseState.enabled) {
      await saveMailSettingsToFirebase().catch((error) => console.warn("Mail ayarları Firebase'e yazılamadı.", error));
    }
    try {
      await apiRequest("/api/mail-settings", {
        method: "PUT",
        body: JSON.stringify(state.mailSettings),
      });
      await refreshMailStatus(false);
    } catch (error) {
      console.warn("Mail ayarları backend'e yazılamadı.", error);
    }
    render();
  }
});

render();
syncFromBackend();
