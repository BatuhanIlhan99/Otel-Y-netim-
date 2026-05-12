function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r]);}return n;},_extends.apply(null,arguments);}const DEPARTMENTS=[{id:"temizlik",name:"Temizlik",short:"TM",color:"brand",icon:"spray"},{id:"restorant",name:"Gülplaj Restorant",short:"GR",color:"accent",icon:"chef"},{id:"bufe",name:"Gülplaj Büfe",short:"GB",color:"accent",icon:"cup"},{id:"smile",name:"Smile Food House",short:"SF",color:"accent",icon:"burger"},{id:"resepsiyon",name:"Resepsiyon",short:"RS",color:"brand",icon:"concierge"}];const USERS=[{id:"u-admin",username:"admin",password:"admin123",name:"Yönetici",role:"admin",department:null,email:"yonetici@otel.com"},{id:"u-satin",username:"satinalma",password:"SatinAlma2026",name:"Satın Alma Sorumlusu",role:"admin",department:null,email:"satinalma@otel.com"},{id:"u-ops",username:"operasyon",password:"Operasyon2026",name:"Operasyon Müdürü",role:"admin",department:null,email:"operasyon@otel.com"},{id:"u-tem",username:"temizlik",password:"Temizlik2026",name:"Temizlik Kullanıcısı",role:"departman",department:"temizlik",email:"temizlik@otel.com"},{id:"u-mut",username:"mutfak",password:"Mutfak2026",name:"Mutfak Kullanıcısı",role:"departman",department:"restorant",email:"mutfak@otel.com"},{id:"u-buf",username:"bufe",password:"Bufe2026",name:"Büfe Kullanıcısı",role:"departman",department:"bufe",email:"bufe@otel.com"},{id:"u-smi",username:"smile",password:"1234",name:"Smile Food House",role:"departman",department:"smile",email:"smile@otel.com"},{id:"u-res",username:"resepsiyon",password:"Resepsiyon2026",name:"Resepsiyon Kullanıcısı",role:"departman",department:"resepsiyon",email:"resepsiyon@otel.com"}];const CATEGORIES={temizlik:["Yıkama & Çamaşır","Hijyen & Sabun","Kağıt Ürünleri","Kat Hizmetleri","Sarf Malzeme"],restorant:["Et & Tavuk","Sebze & Meyve","Süt Ürünleri","Bakliyat & Tahıl","Yağ & Şeker","Baharat"],bufe:["İçecek","Atıştırmalık","Dondurma","Tatlı"],smile:["Et & Tavuk","Ekmek & Hamur","Sos & Garnitür","İçecek"],resepsiyon:["Misafir Sarfı","Ofis Sarfı","Anahtar & Kart"]};const PRODUCTS=[{id:"p001",dept:"temizlik",cat:"Kağıt Ürünleri",name:"Tuvalet Kağıdı Jumbo",spec:"60 yaprak × 12'li koli",unit:"koli",stock:4,min:8,usedToday:2,supplier:"Tezel Kağıt",price:480},{id:"p002",dept:"temizlik",cat:"Kağıt Ürünleri",name:"Z Kağıt Havlu",spec:"200'lü × 12'li",unit:"koli",stock:12,min:6,usedToday:1,supplier:"Tezel Kağıt",price:320},{id:"p003",dept:"temizlik",cat:"Hijyen & Sabun",name:"Sıvı Sabun Refill",spec:"5L bidon",unit:"adet",stock:3,min:6,usedToday:0,supplier:"Hijyenex",price:145},{id:"p004",dept:"temizlik",cat:"Yıkama & Çamaşır",name:"Çamaşır Deterjanı",spec:"20kg endüstriyel",unit:"torba",stock:2,min:4,usedToday:1,supplier:"Hijyenex",price:980},{id:"p005",dept:"temizlik",cat:"Yıkama & Çamaşır",name:"Yumuşatıcı",spec:"5L bidon",unit:"adet",stock:5,min:3,usedToday:1,supplier:"Hijyenex",price:195},{id:"p006",dept:"temizlik",cat:"Hijyen & Sabun",name:"Çamaşır Suyu (Klor)",spec:"5L bidon",unit:"adet",stock:8,min:6,usedToday:2,supplier:"Bekir Hijyen",price:95},{id:"p007",dept:"temizlik",cat:"Sarf Malzeme",name:"Çöp Poşeti 80L",spec:"Siyah, 10'lu paket",unit:"paket",stock:18,min:10,usedToday:4,supplier:"Tezel Kağıt",price:65},{id:"p008",dept:"temizlik",cat:"Kat Hizmetleri",name:"Bornoz",spec:"Beyaz, M-XL",unit:"adet",stock:14,min:30,usedToday:0,supplier:"Lazo Tekstil",price:420},{id:"p009",dept:"temizlik",cat:"Kat Hizmetleri",name:"Banyo Havlusu",spec:"70×140 beyaz",unit:"adet",stock:28,min:40,usedToday:6,supplier:"Lazo Tekstil",price:165},{id:"p010",dept:"temizlik",cat:"Hijyen & Sabun",name:"Cam Silici",spec:"750ml sprey",unit:"adet",stock:9,min:5,usedToday:0,supplier:"Bekir Hijyen",price:48},{id:"p101",dept:"restorant",cat:"Et & Tavuk",name:"Dana Bonfile",spec:"1.kalite, kg",unit:"kg",stock:8,min:12,usedToday:4,supplier:"Yıldız Et",price:740},{id:"p102",dept:"restorant",cat:"Et & Tavuk",name:"Tavuk Göğüs Fileto",spec:"Taze, kg",unit:"kg",stock:14,min:10,usedToday:6,supplier:"Banvit",price:195},{id:"p103",dept:"restorant",cat:"Sebze & Meyve",name:"Domates",spec:"Salkım, kg",unit:"kg",stock:5,min:15,usedToday:8,supplier:"Hal Toptan",price:38},{id:"p104",dept:"restorant",cat:"Sebze & Meyve",name:"Soğan",spec:"Kuru, kg",unit:"kg",stock:22,min:10,usedToday:4,supplier:"Hal Toptan",price:24},{id:"p105",dept:"restorant",cat:"Süt Ürünleri",name:"Tereyağı",spec:"İnek, 250gr",unit:"adet",stock:11,min:20,usedToday:5,supplier:"İçim",price:145},{id:"p106",dept:"restorant",cat:"Süt Ürünleri",name:"Beyaz Peynir",spec:"Tam yağlı, kg",unit:"kg",stock:7,min:6,usedToday:1,supplier:"İçim",price:285},{id:"p107",dept:"restorant",cat:"Yağ & Şeker",name:"Ayçiçek Yağı",spec:"5L teneke",unit:"adet",stock:6,min:8,usedToday:1,supplier:"Yudum",price:480},{id:"p108",dept:"restorant",cat:"Bakliyat & Tahıl",name:"Pirinç Baldo",spec:"Premium, kg",unit:"kg",stock:28,min:15,usedToday:3,supplier:"Reis",price:88},{id:"p201",dept:"bufe",cat:"İçecek",name:"Coca-Cola",spec:"330ml kutu × 24'lü",unit:"koli",stock:12,min:8,usedToday:3,supplier:"CCİ",price:320},{id:"p202",dept:"bufe",cat:"İçecek",name:"Su 0.5L",spec:"12'li koli",unit:"koli",stock:5,min:10,usedToday:2,supplier:"Erikli",price:95},{id:"p203",dept:"bufe",cat:"Dondurma",name:"Algida Magnum",spec:"Çikolata, adet",unit:"adet",stock:18,min:24,usedToday:6,supplier:"Algida",price:65},{id:"p301",dept:"smile",cat:"Ekmek & Hamur",name:"Hamburger Ekmeği",spec:"Susamlı, 12'li",unit:"paket",stock:6,min:5,usedToday:2,supplier:"Pakmaya",price:78},{id:"p302",dept:"smile",cat:"Sos & Garnitür",name:"Patates Parmak",spec:"Donuk, 2.5kg",unit:"paket",stock:4,min:6,usedToday:1,supplier:"Aytaç",price:245},{id:"p401",dept:"resepsiyon",cat:"Misafir Sarfı",name:"Karşılama Kalemi",spec:"Logolu",unit:"adet",stock:240,min:100,usedToday:12,supplier:"Promax",price:8},{id:"p402",dept:"resepsiyon",cat:"Anahtar & Kart",name:"Oda Kart Anahtarı",spec:"RFID, beyaz",unit:"adet",stock:12,min:30,usedToday:0,supplier:"Salto",price:24}];const ORDER_REQUESTS=[{id:"or-1",productId:"p001",qty:6,reason:"Hafta sonu rezervasyon yoğunluğu",status:"pending",requestedBy:"Ayşe Demir",requestedAt:"Bugün, 09:14"},{id:"or-2",productId:"p008",qty:25,reason:"Yaz sezonu öncesi tamamlama",status:"approved",requestedBy:"Ayşe Demir",requestedAt:"Bugün, 08:32"},{id:"or-3",productId:"p103",qty:30,reason:"Açık büfe akşam yemeği",status:"pending",requestedBy:"Hasan Aksoy",requestedAt:"Bugün, 10:05"},{id:"or-4",productId:"p402",qty:50,reason:"Bayan asistan ekibinden talep",status:"pending",requestedBy:"Elif Çelik",requestedAt:"Dün, 17:42"}];const RECENT_COUNTS=[{dept:"temizlik",time:"10:42",user:"Ayşe Demir",items:47,critical:4},{dept:"restorant",time:"10:18",user:"Hasan Aksoy",items:62,critical:2},{dept:"bufe",time:"09:55",user:"Selin Korkmaz",items:18,critical:1},{dept:"resepsiyon",time:"09:30",user:"Elif Çelik",items:12,critical:1},{dept:"smile",time:"Bekliyor",user:"Burak Şahin",items:0,critical:0,pending:true}];const ACTIVITY=[{time:"10:42",icon:"edit",text:"Ayşe Demir, Temizlik departmanı sayımını tamamladı.",meta:"47 kalem · 4 kritik"},{time:"10:14",icon:"alert",text:"Domates stoğu kritik seviyenin altına düştü.",meta:"5 kg / minimum 15 kg",level:"danger"},{time:"09:30",icon:"mail",text:"Yöneticiye günlük sipariş raporu e-postası gönderildi.",meta:"mehmet@otel.com"},{time:"09:14",icon:"package",text:"Yeni sipariş talebi: Tuvalet kağıdı Jumbo × 6",meta:"Ayşe Demir · Temizlik"},{time:"08:48",icon:"check",text:"Hasan Aksoy giriş yaptı.",meta:"Mutfak kullanıcısı"}];const ICON={dashboard:React.createElement("path",{d:"M3 12L12 4l9 8M5 10v10h14V10"}),stock:React.createElement(React.Fragment,null,React.createElement("rect",{x:"3",y:"8",width:"18",height:"13",rx:"2"}),React.createElement("path",{d:"M8 8V5a4 4 0 018 0v3"})),orders:React.createElement(React.Fragment,null,React.createElement("path",{d:"M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"}),React.createElement("rect",{x:"8",y:"2",width:"8",height:"4",rx:"1"}),React.createElement("path",{d:"M9 12h6M9 16h4"})),reports:React.createElement(React.Fragment,null,React.createElement("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"})),admin:React.createElement(React.Fragment,null,React.createElement("circle",{cx:"12",cy:"8",r:"4"}),React.createElement("path",{d:"M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2"})),products:React.createElement(React.Fragment,null,React.createElement("path",{d:"M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"}),React.createElement("polyline",{points:"3.27,6.96 12,12.01 20.73,6.96"}),React.createElement("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})),mail:React.createElement(React.Fragment,null,React.createElement("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),React.createElement("path",{d:"M2 7l10 6 10-6"})),bell:React.createElement(React.Fragment,null,React.createElement("path",{d:"M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"}),React.createElement("path",{d:"M13.73 21a2 2 0 01-3.46 0"})),search:React.createElement(React.Fragment,null,React.createElement("circle",{cx:"11",cy:"11",r:"7"}),React.createElement("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})),logout:React.createElement(React.Fragment,null,React.createElement("path",{d:"M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"})),user:React.createElement(React.Fragment,null,React.createElement("path",{d:"M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"}),React.createElement("circle",{cx:"12",cy:"7",r:"4"})),plus:React.createElement(React.Fragment,null,React.createElement("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),React.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"})),minus:React.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),check:React.createElement("polyline",{points:"20 6 9 17 4 12"}),x:React.createElement(React.Fragment,null,React.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),React.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"})),alert:React.createElement(React.Fragment,null,React.createElement("path",{d:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"}),React.createElement("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),React.createElement("circle",{cx:"12",cy:"17",r:"0.5",fill:"currentColor"})),info:React.createElement(React.Fragment,null,React.createElement("circle",{cx:"12",cy:"12",r:"10"}),React.createElement("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),React.createElement("line",{x1:"12",y1:"8",x2:"12.01",y2:"8"})),arrow_right:React.createElement(React.Fragment,null,React.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),React.createElement("polyline",{points:"12 5 19 12 12 19"})),arrow_up:React.createElement(React.Fragment,null,React.createElement("line",{x1:"12",y1:"19",x2:"12",y2:"5"}),React.createElement("polyline",{points:"5 12 12 5 19 12"})),arrow_down:React.createElement(React.Fragment,null,React.createElement("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),React.createElement("polyline",{points:"19 12 12 19 5 12"})),download:React.createElement(React.Fragment,null,React.createElement("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),React.createElement("polyline",{points:"7 10 12 15 17 10"}),React.createElement("line",{x1:"12",y1:"15",x2:"12",y2:"3"})),filter:React.createElement(React.Fragment,null,React.createElement("polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"})),calendar:React.createElement(React.Fragment,null,React.createElement("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),React.createElement("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),React.createElement("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),React.createElement("line",{x1:"3",y1:"10",x2:"21",y2:"10"})),trend_up:React.createElement(React.Fragment,null,React.createElement("polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17"}),React.createElement("polyline",{points:"16 7 22 7 22 13"})),package:React.createElement(React.Fragment,null,React.createElement("path",{d:"M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"}),React.createElement("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),React.createElement("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})),edit:React.createElement(React.Fragment,null,React.createElement("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"}),React.createElement("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"})),trash:React.createElement(React.Fragment,null,React.createElement("polyline",{points:"3 6 5 6 21 6"}),React.createElement("path",{d:"M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"})),more:React.createElement(React.Fragment,null,React.createElement("circle",{cx:"12",cy:"12",r:"1"}),React.createElement("circle",{cx:"19",cy:"12",r:"1"}),React.createElement("circle",{cx:"5",cy:"12",r:"1"})),refresh:React.createElement(React.Fragment,null,React.createElement("polyline",{points:"23 4 23 10 17 10"}),React.createElement("polyline",{points:"1 20 1 14 7 14"}),React.createElement("path",{d:"M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"})),clock:React.createElement(React.Fragment,null,React.createElement("circle",{cx:"12",cy:"12",r:"10"}),React.createElement("polyline",{points:"12 6 12 12 16 14"})),building:React.createElement(React.Fragment,null,React.createElement("rect",{x:"4",y:"2",width:"16",height:"20",rx:"2"}),React.createElement("path",{d:"M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"})),spark:React.createElement(React.Fragment,null,React.createElement("polyline",{points:"3 17 9 11 13 15 21 7"}),React.createElement("polyline",{points:"14 7 21 7 21 14"})),send:React.createElement(React.Fragment,null,React.createElement("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),React.createElement("polygon",{points:"22 2 15 22 11 13 2 9 22 2"})),shield:React.createElement("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),settings:React.createElement(React.Fragment,null,React.createElement("circle",{cx:"12",cy:"12",r:"3"}),React.createElement("path",{d:"M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"})),history:React.createElement(React.Fragment,null,React.createElement("path",{d:"M3 3v5h5"}),React.createElement("path",{d:"M3.05 13A9 9 0 1015 4l-7 7"}),React.createElement("path",{d:"M12 7v5l4 2"})),copy:React.createElement(React.Fragment,null,React.createElement("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),React.createElement("path",{d:"M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"})),menu:React.createElement(React.Fragment,null,React.createElement("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),React.createElement("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),React.createElement("line",{x1:"3",y1:"18",x2:"21",y2:"18"})),eye:React.createElement(React.Fragment,null,React.createElement("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),React.createElement("circle",{cx:"12",cy:"12",r:"3"}))};function Icon({name,size=18,...rest}){const content=ICON[name];if(!content)return null;return React.createElement("svg",_extends({width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.75",strokeLinecap:"round",strokeLinejoin:"round"},rest),content);}function initials(name){return name.split(" ").map(s=>s[0]).join("").slice(0,2).toUpperCase();}function deptById(id){return DEPARTMENTS.find(d=>d.id===id);}function productById(id){return PRODUCTS.find(p=>p.id===id);}function stockStatus(p){if(p.stock<=p.min*0.5)return{key:"critical",label:"Kritik",cls:"badge-danger"};if(p.stock<p.min)return{key:"low",label:"Düşük",cls:"badge-warn"};if(p.stock<p.min*1.5)return{key:"ok",label:"Yeterli",cls:"badge-ok"};return{key:"ample",label:"Bol",cls:"badge-ghost"};}function todayStr(){const d=new Date();const months=["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];const days=["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];return`${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} · ${days[d.getDay()]}`;}function fmtNum(n){return new Intl.NumberFormat("tr-TR").format(n);}function fmtMoney(n){return new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY",maximumFractionDigits:0}).format(n);}const LS_KEY="otel-yonetim";const lsLoad=(key,fallback)=>{try{const raw=localStorage.getItem(`${LS_KEY}:${key}`);return raw?JSON.parse(raw):fallback;}catch(e){return fallback;}};const lsSave=(key,value)=>{try{localStorage.setItem(`${LS_KEY}:${key}`,JSON.stringify(value));}catch(e){}};const todayKey=()=>new Date().toISOString().slice(0,10);function authenticate(username,password){const u=USERS.find(x=>x.username===String(username||"").toLowerCase().trim());if(!u)return{ok:false,error:"Kullanıcı bulunamadı."};if(u.password!==password)return{ok:false,error:"Şifre hatalı."};return{ok:true,user:u};}Object.assign(window,{DEPARTMENTS,USERS,CATEGORIES,PRODUCTS,ORDER_REQUESTS,RECENT_COUNTS,ACTIVITY,Icon,ICON,initials,deptById,productById,stockStatus,todayStr,fmtNum,fmtMoney,lsLoad,lsSave,todayKey,authenticate,LS_KEY});function LoginScreen({onLogin}){const[username,setUsername]=React.useState("admin");const[password,setPassword]=React.useState("admin123");const[showPass,setShowPass]=React.useState(false);const[err,setErr]=React.useState("");const[loading,setLoading]=React.useState(false);const demoUsers=[{user:"admin",pass:"admin123",role:"Yönetici"},{user:"satinalma",pass:"SatinAlma2026",role:"Satın Alma"},{user:"operasyon",pass:"Operasyon2026",role:"Operasyon"},{user:"temizlik",pass:"Temizlik2026",role:"Temizlik"},{user:"mutfak",pass:"Mutfak2026",role:"Restorant"},{user:"bufe",pass:"Bufe2026",role:"Büfe"},{user:"smile",pass:"1234",role:"Smile"},{user:"resepsiyon",pass:"Resepsiyon2026",role:"Resepsiyon"}];function submit(e){e?.preventDefault();setErr("");setLoading(true);setTimeout(()=>{const result=authenticate(username,password);if(!result.ok){setErr(result.error||"Giriş başarısız.");setLoading(false);return;}onLogin(result.user);},380);}function quickFill(user,pass){setUsername(user);setPassword(pass);setErr("");}return React.createElement("div",{className:"login-page","data-screen-label":"01 Login"},React.createElement("div",{className:"login-card"},React.createElement("aside",{className:"login-aside"},React.createElement("div",{className:"login-brand"},React.createElement("div",{className:"rail-mark",style:{width:44,height:44,fontSize:14}},"OY"),React.createElement("div",null,React.createElement("div",{className:"login-brand-name"},"Otel Y\xF6netim"),React.createElement("div",{className:"login-brand-org"},"G\xFClplaj Resort & Hotel"))),React.createElement("div",{className:"login-aside-body"},React.createElement("div",{className:"login-eyebrow"},"Operasyon Y\xF6netim Sistemi"),React.createElement("h1",{className:"login-headline"},"Stok, sipari\u015F ve departman ak\u0131\u015F\u0131n\u0131 ",React.createElement("em",null,"tek panelden")," y\xF6netin."),React.createElement("p",{className:"login-lede"},"Her departman\u0131n g\xFCnl\xFCk say\u0131m ve sipari\u015F s\xFCre\xE7lerini tek noktada g\xF6r\xFCn. Kritik stok durumlar\u0131n\u0131 an\u0131nda izleyin, raporlar\u0131 otomatik y\xF6neticiye iletin."),React.createElement("div",{className:"login-features"},React.createElement("div",{className:"login-feat"},React.createElement(Icon,{name:"package",size:16}),React.createElement("span",null,"5 departman \xB7 600+ \xFCr\xFCn katalo\u011Fu")),React.createElement("div",{className:"login-feat"},React.createElement(Icon,{name:"alert",size:16}),React.createElement("span",null,"Anl\u0131k kritik stok uyar\u0131lar\u0131")),React.createElement("div",{className:"login-feat"},React.createElement(Icon,{name:"mail",size:16}),React.createElement("span",null,"Otomatik y\xF6netici raporu & SMTP")))),React.createElement("div",{className:"login-aside-foot"},React.createElement("div",null,React.createElement("strong",{className:"tnum"},"v2.0"),React.createElement("small",null,"S\xFCr\xFCm")),React.createElement("div",null,React.createElement("strong",null,React.createElement("span",{className:"meta-chip-live-dot"}),"\xC7evrimi\xE7i"),React.createElement("small",null,"Bulut backend")))),React.createElement("form",{className:"login-form-wrap",onSubmit:submit},React.createElement("div",{className:"login-form-head"},React.createElement("h2",null,"Oturum a\xE7"),React.createElement("p",null,"Kullan\u0131c\u0131 bilgilerinizle giri\u015F yap\u0131n.")),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Kullan\u0131c\u0131 ad\u0131"),React.createElement("div",{className:"input-with-icon"},React.createElement("span",{className:"input-icon"},React.createElement(Icon,{name:"user",size:16})),React.createElement("input",{className:"input",type:"text",value:username,onChange:e=>setUsername(e.target.value),placeholder:"\xF6rn. admin",autoFocus:true}))),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Parola",React.createElement("span",{className:"spacer"}),React.createElement("button",{type:"button",className:"link-mini",onClick:()=>alert("Yöneticiye danışın.")},"Unuttum")),React.createElement("div",{className:"input-with-icon",style:{position:"relative"}},React.createElement("span",{className:"input-icon"},React.createElement(Icon,{name:"shield",size:16})),React.createElement("input",{className:"input",type:showPass?"text":"password",value:password,onChange:e=>setPassword(e.target.value),placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",style:{paddingRight:40}}),React.createElement("button",{type:"button",onClick:()=>setShowPass(s=>!s),style:{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",width:28,height:28,borderRadius:6,color:"var(--ink-500)",display:"grid",placeItems:"center"}},React.createElement(Icon,{name:"eye",size:15})))),React.createElement("label",{className:"toggle",style:{marginTop:2}},React.createElement("input",{type:"checkbox",defaultChecked:true}),React.createElement("span",{className:"toggle-track"}),React.createElement("span",{className:"toggle-label"},"Bu cihazda beni hat\u0131rla")),err&&React.createElement("div",{className:"notice danger",style:{marginTop:4}},React.createElement(Icon,{name:"alert"}),React.createElement("div",{className:"notice-body"},err)),React.createElement("button",{className:"btn btn-lg btn-block",type:"submit",disabled:loading},loading?"Giriş yapılıyor...":"Giriş yap",!loading&&React.createElement(Icon,{name:"arrow_right",size:16})),React.createElement("div",{className:"login-divider"},React.createElement("span",null,"Demo giri\u015Fleri")),React.createElement("div",{className:"login-demo"},demoUsers.map(d=>React.createElement("button",{key:d.user,type:"button",className:"login-demo-chip",onClick:()=>quickFill(d.user,d.pass)},React.createElement("div",{className:"login-demo-tag"},d.role),React.createElement("div",{className:"login-demo-user"},d.user)))),React.createElement("div",{className:"login-form-foot"},"Sorun ya\u015F\u0131yorsan\u0131z ",React.createElement("a",{href:"#"},"y\xF6netici@otel.com")," adresine yaz\u0131n."))));}const loginStyles=`
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 18px;
  background:
    radial-gradient(1200px 600px at 80% -10%, rgba(13, 110, 94, 0.08), transparent 60%),
    radial-gradient(900px 500px at -10% 110%, rgba(192, 138, 62, 0.08), transparent 60%),
    var(--bg-warm);
}
.login-card {
  width: min(1080px, 100%);
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  background: var(--surface);
  border-radius: var(--r-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--line);
}
.login-aside {
  background:
    radial-gradient(800px 500px at 10% 10%, rgba(192, 138, 62, 0.2), transparent 55%),
    linear-gradient(160deg, #0e2823 0%, #0f3833 55%, #0c2520 100%);
  color: #e6efec;
  padding: 38px 38px 32px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  position: relative;
  overflow: hidden;
}
.login-aside::after {
  content: "";
  position: absolute;
  inset: auto -40px -160px auto;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(192,138,62,0.16), transparent);
  pointer-events: none;
}
.login-aside > * { position: relative; z-index: 1; }

.login-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.login-brand-name { color: #fff; font-weight: 600; font-size: 16px; letter-spacing: -0.005em; }
.login-brand-org { color: #9eb6b0; font-size: 12.5px; margin-top: 1px; }

.login-aside-body { flex: 1; display: flex; flex-direction: column; gap: 16px; justify-content: center; }
.login-eyebrow {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}
.login-headline {
  color: #fff;
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.025em;
  margin: 4px 0 0;
  max-width: 460px;
  text-wrap: pretty;
}
.login-headline em {
  font-style: normal;
  background: linear-gradient(90deg, var(--accent), #e2b56b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.login-lede {
  color: #b8c8c3;
  font-size: 14px;
  line-height: 1.55;
  max-width: 440px;
}
.login-features { display: flex; flex-direction: column; gap: 10px; margin-top: 12px; }
.login-feat {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #cad7d2;
}
.login-feat svg {
  width: 28px;
  height: 28px;
  padding: 6px;
  border-radius: 8px;
  background: rgba(255,255,255,0.06);
  color: var(--accent);
}

.login-aside-foot {
  display: flex;
  gap: 14px;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 18px;
}
.login-aside-foot > div { display: flex; flex-direction: column; gap: 2px; }
.login-aside-foot strong { color: #fff; font-size: 14px; font-weight: 600; display: flex; align-items: center; }
.login-aside-foot small { color: #94a59f; font-size: 11.5px; }

.login-form-wrap {
  padding: 44px 42px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-content: center;
  justify-content: center;
}
.login-form-head { margin-bottom: 6px; }
.login-form-head h2 { font-size: 24px; font-weight: 600; letter-spacing: -0.018em; margin: 0; color: var(--ink-900); }
.login-form-head p { color: var(--ink-500); font-size: 13.5px; margin-top: 4px; }

.link-mini { color: var(--brand); font-size: 12px; font-weight: 600; cursor: pointer; }
.link-mini:hover { color: var(--brand-strong); text-decoration: underline; }

.login-divider {
  display: flex; align-items: center; gap: 12px;
  color: var(--ink-400);
  font-size: 11.5px;
  font-weight: 500;
  margin: 4px 0;
  letter-spacing: 0.02em;
}
.login-divider::before, .login-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--line);
}

.login-demo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}
.login-demo-chip {
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 8px 10px;
  background: var(--surface);
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: all 0.12s;
  cursor: pointer;
}
.login-demo-chip:hover {
  border-color: var(--brand);
  background: var(--brand-tint);
}
.login-demo-tag {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-500);
}
.login-demo-user {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink-900);
  font-family: var(--font-mono);
}

.login-form-foot {
  text-align: center;
  font-size: 12px;
  color: var(--ink-500);
  margin-top: 6px;
}
.login-form-foot a { color: var(--brand); font-weight: 600; }

@media (max-width: 880px) {
  .login-card { grid-template-columns: 1fr; }
  .login-aside { padding: 28px 24px; }
  .login-headline { font-size: 26px; }
  .login-aside-body { gap: 12px; }
  .login-features { display: none; }
  .login-aside-foot { display: none; }
  .login-form-wrap { padding: 28px 22px; }
}
`;window.LoginScreen=LoginScreen;window.LOGIN_STYLES=loginStyles;function Dashboard({currentUser,onNavigate}){const isAdmin=currentUser.role==="admin";const criticalProducts=PRODUCTS.filter(p=>p.stock<p.min);const pendingOrders=ORDER_REQUESTS.filter(o=>o.status==="pending");const completedToday=RECENT_COUNTS.filter(c=>!c.pending).length;const totalSpend=PRODUCTS.reduce((s,p)=>s+p.usedToday*p.price,0);return React.createElement("div",{className:"col gap-lg","data-screen-label":"02 Dashboard"},React.createElement("header",{className:"page-head"},React.createElement("div",{className:"page-head-titles"},React.createElement("span",{className:"eyebrow"},"Komuta Paneli"),React.createElement("h1",{className:"page-title"},isAdmin?"Günaydın, Mehmet":`Merhaba, ${currentUser.name.split(" ")[0]}`," \uD83D\uDC4B"),React.createElement("span",{className:"page-sub"},todayStr()," \xB7 Operasyon durumu \xF6zet")),React.createElement("div",{className:"page-head-meta"},React.createElement("div",{className:"meta-chip"},React.createElement("small",null,React.createElement("span",{className:"meta-chip-live-dot"}),"Canl\u0131"),React.createElement("strong",null,"Otomasyon aktif")),React.createElement("div",{className:"meta-chip"},React.createElement("small",null,"Say\u0131m Penceresi"),React.createElement("strong",null,"08:00 \u2013 11:00")),React.createElement("button",{className:"btn"},React.createElement(Icon,{name:"send",size:15}),"G\xFCnl\xFCk raporu g\xF6nder"))),React.createElement("div",{className:"kpi-grid"},React.createElement(Kpi,{icon:"alert",iconCls:"danger",label:"Kritik stok",value:criticalProducts.length,suffix:"kalem",trend:{dir:"up",text:"+2 dün"},foot:`${criticalProducts.filter(p=>p.stock<=p.min*0.5).length} adet acil müdahale`}),React.createElement(Kpi,{icon:"package",iconCls:"warn",label:"Bekleyen sipari\u015F",value:pendingOrders.length,suffix:"talep",trend:{dir:"flat",text:"—"},foot:`${pendingOrders.reduce((s,o)=>s+o.qty,0)} kalem · onay bekliyor`}),React.createElement(Kpi,{icon:"check",iconCls:"ok",label:"Bug\xFCnk\xFC say\u0131m",value:`${completedToday}/${DEPARTMENTS.length}`,trend:{dir:"up",text:"Hızda"},foot:"1 departman bekliyor"}),React.createElement(Kpi,{icon:"trend_up",iconCls:"brand",label:"G\xFCnl\xFCk kullan\u0131m",value:fmtMoney(totalSpend),trend:{dir:"down",text:"−8% hafta"},foot:"Tahmini g\xFCnl\xFCk t\xFCketim de\u011Feri"})),criticalProducts.length>0&&React.createElement(CriticalBanner,{products:criticalProducts.slice(0,4),onView:()=>onNavigate("orders")}),React.createElement("div",{className:"grid-2-1"},React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Departman Durumu"),React.createElement("div",{className:"card-sub"},"Bug\xFCnk\xFC say\u0131m ve kritik stok durumu")),React.createElement("div",{className:"card-actions"},React.createElement("button",{className:"btn-ghost btn btn-sm"},React.createElement(Icon,{name:"refresh",size:14}),"Yenile"))),React.createElement("div",{className:"dept-rows"},DEPARTMENTS.map(d=>{const count=RECENT_COUNTS.find(c=>c.dept===d.id);const deptProducts=PRODUCTS.filter(p=>p.dept===d.id);const critical=deptProducts.filter(p=>p.stock<p.min).length;return React.createElement("button",{key:d.id,className:"dept-row",onClick:()=>onNavigate("stock",d.id)},React.createElement("div",{className:"dept-row-mark"},React.createElement("div",{className:`product-tile ${d.color}`},d.short)),React.createElement("div",{className:"dept-row-info"},React.createElement("strong",null,d.name),React.createElement("small",null,deptProducts.length," \xFCr\xFCn takipte")),React.createElement("div",{className:"dept-row-status"},count?.pending?React.createElement("span",{className:"badge badge-warn"},"Say\u0131m bekliyor"):React.createElement("span",{className:"badge badge-ok"},"Tamamland\u0131 \xB7 ",count?.time)),React.createElement("div",{className:"dept-row-crit"},critical>0?React.createElement("span",{className:"dept-crit"},React.createElement(Icon,{name:"alert",size:13}),React.createElement("strong",null,critical),React.createElement("small",null,"kritik")):React.createElement("span",{className:"dept-crit muted"},React.createElement(Icon,{name:"check",size:13}),React.createElement("small",null,"Stok yeterli"))),React.createElement(Icon,{name:"arrow_right",size:16}));}))),React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Son Hareketler"),React.createElement("div",{className:"card-sub"},"Bug\xFCn, 11:00 itibar\u0131yla")),React.createElement("button",{className:"btn-ghost btn btn-sm"},"T\xFCm\xFC")),React.createElement("div",{className:"activity-list"},ACTIVITY.map((a,i)=>React.createElement("div",{key:i,className:`activity-item ${a.level||""}`},React.createElement("div",{className:`activity-icon ${a.level==="danger"?"danger":""}`},React.createElement(Icon,{name:a.icon,size:14})),React.createElement("div",{className:"activity-body"},React.createElement("p",null,a.text),React.createElement("span",null,a.time," \xB7 ",a.meta))))))),React.createElement("div",{className:"grid-1-2"},React.createElement("div",{className:"card card-elev quick-actions"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"H\u0131zl\u0131 eylemler"),React.createElement("div",{className:"card-sub"},"En s\u0131k kullan\u0131lan i\u015Flemler"))),React.createElement("div",{className:"card-body"},React.createElement("div",{className:"quick-actions-grid"},React.createElement(QuickAction,{icon:"stock",label:"Say\u0131m ba\u015Flat",sub:"Departman se\xE7",onClick:()=>onNavigate("stock")}),React.createElement(QuickAction,{icon:"orders",label:"Sipari\u015F onayla",sub:`${pendingOrders.length} bekliyor`,onClick:()=>onNavigate("orders"),accent:true}),React.createElement(QuickAction,{icon:"reports",label:"G\xFCnl\xFCk rapor",sub:"CSV indir",onClick:()=>onNavigate("reports")}),React.createElement(QuickAction,{icon:"mail",label:"Y\xF6neticiye yolla",sub:"Otomatik mail",onClick:()=>onNavigate("mail")})))),React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Haftal\u0131k kritik stok e\u011Filimi"),React.createElement("div",{className:"card-sub"},"Son 7 g\xFCn \xB7 departman bazl\u0131")),React.createElement("div",{className:"card-actions"},React.createElement("div",{className:"segmented"},React.createElement("button",{className:"on"},"7G"),React.createElement("button",null,"30G"),React.createElement("button",null,"90G")))),React.createElement("div",{className:"card-body",style:{paddingTop:6}},React.createElement(MiniChart,null)))));}function Kpi({icon,iconCls,label,value,suffix,trend,foot}){return React.createElement("div",{className:"kpi"},React.createElement("div",{className:"kpi-label"},React.createElement("div",{className:`kpi-icon ${iconCls||""}`},React.createElement(Icon,{name:icon,size:14})),label),React.createElement("div",{className:"kpi-value"},value,suffix&&React.createElement("small",null,suffix)),React.createElement("div",{className:"kpi-foot"},trend&&React.createElement("span",{className:`kpi-trend ${trend.dir}`},trend.dir==="up"&&React.createElement(Icon,{name:"arrow_up",size:11}),trend.dir==="down"&&React.createElement(Icon,{name:"arrow_down",size:11}),trend.text),React.createElement("span",null,foot)));}function CriticalBanner({products,onView}){return React.createElement("div",{className:"critical-banner"},React.createElement("div",{className:"critical-icon"},React.createElement(Icon,{name:"alert",size:20})),React.createElement("div",{className:"critical-body"},React.createElement("strong",null,products.length," kalem kritik stok seviyesinde \u2014 sipari\u015F a\xE7\u0131lmas\u0131 \xF6neriliyor"),React.createElement("div",{className:"critical-items"},products.map(p=>React.createElement("span",{key:p.id,className:"critical-pill"},React.createElement("strong",null,p.name),React.createElement("span",{className:"tnum"},p.stock," / ",p.min," ",p.unit))))),React.createElement("button",{className:"btn",onClick:onView},"Sipari\u015Fleri g\xF6r\xFCnt\xFCle ",React.createElement(Icon,{name:"arrow_right",size:14})));}function QuickAction({icon,label,sub,onClick,accent}){return React.createElement("button",{className:`quick-action ${accent?"accent":""}`,onClick:onClick},React.createElement("div",{className:`quick-action-icon ${accent?"accent":""}`},React.createElement(Icon,{name:icon,size:18})),React.createElement("div",{className:"quick-action-body"},React.createElement("strong",null,label),React.createElement("small",null,sub)),React.createElement(Icon,{name:"arrow_right",size:14}));}function MiniChart(){const days=["Pz","Pt","Sa","Çr","Pr","Cm","Bg"];const series=[{name:"Temizlik",color:"#0d6e5e",data:[3,4,3,5,4,6,4]},{name:"Restorant",color:"#c08a3e",data:[2,3,4,2,3,4,2]},{name:"Büfe",color:"#3a6db5",data:[1,1,2,1,2,1,1]},{name:"Smile",color:"#8b5f1f",data:[1,0,1,2,1,1,1]},{name:"Resepsiyon",color:"#2e8a6a",data:[0,1,0,1,1,0,1]}];const W=720,H=220,PAD={l:30,r:14,t:14,b:26};const stacked=days.map((_,i)=>series.reduce((s,ser)=>s+ser.data[i],0));const maxY=Math.max(...stacked)+2;const stepX=(W-PAD.l-PAD.r)/(days.length-1);let cumulative=days.map(()=>0);return React.createElement("div",{className:"mini-chart-wrap"},React.createElement("svg",{viewBox:`0 0 ${W} ${H}`,className:"mini-chart"},[0,0.25,0.5,0.75,1].map(t=>{const y=PAD.t+(H-PAD.t-PAD.b)*t;return React.createElement("g",{key:t},React.createElement("line",{x1:PAD.l,x2:W-PAD.r,y1:y,y2:y,stroke:"#eef1ef",strokeWidth:"1"}),React.createElement("text",{x:PAD.l-6,y:y+4,fontSize:"10",fill:"#8b9893",textAnchor:"end"},Math.round(maxY*(1-t))));}),days.map((d,i)=>React.createElement("text",{key:d,x:PAD.l+i*stepX,y:H-8,fontSize:"11",fill:"#6b7975",textAnchor:"middle",fontWeight:"500"},d)),days.map((d,i)=>{const x=PAD.l+i*stepX-18;let bottom=H-PAD.b;return series.map((ser,sI)=>{const v=ser.data[i];const h=(H-PAD.t-PAD.b)/maxY*v;const y=bottom-h;const rect=React.createElement("rect",{key:ser.name+i,x:x,y:y,width:"36",height:h,fill:ser.color,opacity:i===6?1:0.7,rx:sI===series.length-1?3:0});bottom=y;return rect;});})),React.createElement("div",{className:"mini-chart-legend"},series.map(s=>React.createElement("div",{key:s.name,className:"legend-item"},React.createElement("span",{style:{background:s.color}}),s.name))));}const dashboardStyles=`
.grid-2-1 {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 16px;
}
.grid-1-2 {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
  gap: 16px;
}
@media (max-width: 960px) {
  .grid-2-1, .grid-1-2 { grid-template-columns: 1fr; }
}

/* Critical banner */
.critical-banner {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: linear-gradient(90deg, var(--danger-tint) 0%, var(--surface) 90%);
  border: 1px solid var(--danger-soft);
  border-left: 4px solid var(--danger);
  border-radius: var(--r-md);
}
.critical-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--danger-soft);
  color: var(--danger);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.critical-body { flex: 1; min-width: 0; }
.critical-body strong {
  display: block;
  color: var(--ink-900);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}
.critical-items {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.critical-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 10px;
  border-radius: var(--r-pill);
  background: var(--surface);
  border: 1px solid var(--danger-soft);
  font-size: 12px;
}
.critical-pill strong {
  color: var(--ink-900);
  font-weight: 600;
  font-size: 12px;
  display: inline;
  margin: 0;
}
.critical-pill span {
  color: var(--danger);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
@media (max-width: 700px) {
  .critical-banner { flex-direction: column; align-items: stretch; }
  .critical-banner .btn { width: 100%; }
}

/* Department rows */
.dept-rows { display: flex; flex-direction: column; }
.dept-row {
  display: grid;
  grid-template-columns: auto minmax(0,1fr) auto auto auto;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--line-soft);
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background 0.12s;
  width: 100%;
}
.dept-row:hover { background: #fafbfa; }
.dept-row:last-child { border-bottom: 0; }
.dept-row-info { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.dept-row-info strong { font-size: 14px; font-weight: 600; color: var(--ink-900); }
.dept-row-info small { font-size: 12px; color: var(--ink-500); }
.dept-row-status { min-width: 130px; text-align: right; }
.dept-row-crit { min-width: 110px; text-align: right; }
.dept-crit {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--danger);
  font-size: 12px;
}
.dept-crit strong { font-weight: 600; font-variant-numeric: tabular-nums; font-size: 13px; }
.dept-crit small { color: var(--ink-500); font-weight: 500; }
.dept-crit.muted { color: var(--ok); }
.dept-crit.muted small { color: var(--ink-500); }

@media (max-width: 700px) {
  .dept-row {
    grid-template-columns: auto minmax(0,1fr) auto;
    padding: 12px 14px;
    gap: 10px;
  }
  .dept-row-status, .dept-row-crit { display: none; }
}

/* Activity feed */
.activity-list { padding: 4px 0; }
.activity-item {
  display: flex;
  gap: 12px;
  padding: 11px 18px;
  border-bottom: 1px solid var(--line-soft);
}
.activity-item:last-child { border-bottom: 0; }
.activity-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--surface-soft);
  color: var(--ink-600);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  margin-top: 1px;
}
.activity-icon.danger { background: var(--danger-soft); color: var(--danger); }
.activity-body { flex: 1; }
.activity-body p {
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ink-800);
  margin: 0 0 2px;
}
.activity-body span {
  font-size: 11.5px;
  color: var(--ink-500);
  font-weight: 500;
}

/* Quick actions */
.quick-actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.quick-action {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  cursor: pointer;
  transition: all 0.12s;
  text-align: left;
}
.quick-action:hover {
  border-color: var(--brand);
  background: var(--brand-tint);
  transform: translateY(-1px);
}
.quick-action-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--brand-soft);
  color: var(--brand);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.quick-action-icon.accent { background: var(--accent-soft); color: var(--accent-strong); }
.quick-action-body { flex: 1; min-width: 0; }
.quick-action-body strong {
  display: block;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink-900);
}
.quick-action-body small {
  font-size: 11.5px;
  color: var(--ink-500);
}
@media (max-width: 480px) {
  .quick-actions-grid { grid-template-columns: 1fr; }
}

/* Mini chart */
.mini-chart-wrap { padding: 6px 4px 0; }
.mini-chart { width: 100%; height: auto; display: block; }
.mini-chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 10px 4px 0;
  border-top: 1px solid var(--line-soft);
  margin-top: 8px;
}
.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--ink-600);
}
.legend-item span {
  width: 9px;
  height: 9px;
  border-radius: 2px;
}
`;Object.assign(window,{Dashboard,Kpi,CriticalBanner,QuickAction,MiniChart,DASHBOARD_STYLES:dashboardStyles});function StockCount({currentUser,selectedDept,onNavigate}){const isAdmin=currentUser.role==="admin";const userDept=currentUser.department;const[dept,setDept]=React.useState(selectedDept||userDept||"temizlik");const[query,setQuery]=React.useState("");const[filter,setFilter]=React.useState("all");const[counts,setCounts]=React.useState({});const[openRow,setOpenRow]=React.useState(null);const department=deptById(dept);const products=PRODUCTS.filter(p=>p.dept===dept);const filtered=products.filter(p=>{if(query&&!p.name.toLowerCase().includes(query.toLowerCase()))return false;if(filter==="critical"&&!(p.stock<=p.min*0.5))return false;if(filter==="low"&&!(p.stock<p.min&&p.stock>p.min*0.5))return false;if(filter==="counted"&&!counts[p.id])return false;if(filter==="uncounted"&&counts[p.id])return false;return true;});const counted=Object.keys(counts).length;const total=products.length;const progress=total?Math.round(counted/total*100):0;const criticalCount=products.filter(p=>p.stock<p.min).length;function updateCount(id,field,value){setCounts(c=>({...c,[id]:{...c[id],[field]:value}}));}function quickAdd(id,delta){const p=productById(id);const cur=counts[id]?.stock??p.stock;const next=Math.max(0,cur+delta);updateCount(id,"stock",next);}return React.createElement("div",{className:"col gap-lg","data-screen-label":"03 Stok Say\u0131m"},React.createElement("header",{className:"page-head"},React.createElement("div",{className:"page-head-titles"},React.createElement("span",{className:"eyebrow"},"Stok Y\xF6netimi"),React.createElement("h1",{className:"page-title"},department.name," \xB7 G\xFCnl\xFCk Say\u0131m"),React.createElement("span",{className:"page-sub"},todayStr()," \xB7 Say\u0131m penceresi 08:00 \u2013 11:00")),React.createElement("div",{className:"page-head-meta"},React.createElement("div",{className:"meta-chip",style:{minWidth:0}},React.createElement("small",null,"\u0130lerleme"),React.createElement("strong",null,counted,"/",total," kalem \xB7 ",progress,"%")),React.createElement("button",{className:"btn btn-ghost"},React.createElement(Icon,{name:"history",size:14}),"Ge\xE7mi\u015F say\u0131mlar"),React.createElement("button",{className:"btn",disabled:counted===0},React.createElement(Icon,{name:"check",size:15}),"Say\u0131m\u0131 tamamla"))),React.createElement("div",{className:"progress-card"},React.createElement("div",{className:"progress-bar"},React.createElement("div",{className:"progress-fill",style:{width:`${progress}%`}})),React.createElement("div",{className:"progress-stats"},React.createElement("div",null,React.createElement("strong",{className:"tnum"},total-counted)," kalem kald\u0131"),React.createElement("div",null,React.createElement("strong",{className:"tnum",style:{color:"var(--danger)"}},criticalCount)," kritik stok"),React.createElement("div",null,React.createElement("strong",{className:"tnum"},products.reduce((s,p)=>s+p.usedToday,0))," bug\xFCnk\xFC t\xFCketim"))),isAdmin&&React.createElement("div",{className:"dept-tabs"},DEPARTMENTS.map(d=>{const c=PRODUCTS.filter(p=>p.dept===d.id&&p.stock<p.min).length;return React.createElement("button",{key:d.id,className:`dept-tab ${d.id===dept?"on":""}`,onClick:()=>{setDept(d.id);setCounts({});}},React.createElement("span",{className:`product-tile ${d.color}`},d.short),React.createElement("span",{className:"dept-tab-info"},React.createElement("strong",null,d.name),React.createElement("small",null,PRODUCTS.filter(p=>p.dept===d.id).length," \xFCr\xFCn \xB7 ",c," kritik")));})),React.createElement("div",{className:"stock-toolbar"},React.createElement("div",{className:"input-with-icon grow",style:{maxWidth:360}},React.createElement("span",{className:"input-icon"},React.createElement(Icon,{name:"search",size:16})),React.createElement("input",{className:"input",placeholder:"\xDCr\xFCn ad\u0131yla ara...",value:query,onChange:e=>setQuery(e.target.value)})),React.createElement("div",{className:"filter-chips"},React.createElement("button",{className:`chip ${filter==="all"?"on":""}`,onClick:()=>setFilter("all")},"T\xFCm\xFC ",React.createElement("strong",null,products.length)),React.createElement("button",{className:`chip critical ${filter==="critical"?"on":""}`,onClick:()=>setFilter("critical")},"Kritik ",React.createElement("strong",null,products.filter(p=>p.stock<=p.min*0.5).length)),React.createElement("button",{className:`chip warn ${filter==="low"?"on":""}`,onClick:()=>setFilter("low")},"D\xFC\u015F\xFCk ",React.createElement("strong",null,products.filter(p=>p.stock<p.min&&p.stock>p.min*0.5).length)),React.createElement("button",{className:`chip ${filter==="counted"?"on":""}`,onClick:()=>setFilter("counted")},"Say\u0131lan ",React.createElement("strong",null,counted)),React.createElement("button",{className:`chip ${filter==="uncounted"?"on":""}`,onClick:()=>setFilter("uncounted")},"Say\u0131lmad\u0131 ",React.createElement("strong",null,total-counted)))),React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},filtered.length," \xFCr\xFCn",filter!=="all"&&React.createElement("span",{className:"badge badge-brand no-dot"},"Filtrelenmi\u015F")),React.createElement("div",{className:"card-sub"},"Stok ve kullan\u0131m miktarlar\u0131n\u0131 girin \u2014 de\u011Fi\u015Fiklikler otomatik kaydedilir")),React.createElement("div",{className:"card-actions"},React.createElement("div",{className:"segmented hide-mobile"},React.createElement("button",{className:"on"},"Kart"),React.createElement("button",null,"Tablo")))),filtered.length===0?React.createElement("div",{className:"empty"},React.createElement(Icon,{name:"package",size:36}),React.createElement("strong",null,"E\u015Fle\u015Fen \xFCr\xFCn yok"),React.createElement("span",null,"Arama veya filtreyi de\u011Fi\u015Ftirin.")):React.createElement("div",{className:"stock-list"},filtered.map(p=>React.createElement(StockRow,{key:p.id,product:p,count:counts[p.id],isOpen:openRow===p.id,onToggle:()=>setOpenRow(o=>o===p.id?null:p.id),onUpdate:(field,value)=>updateCount(p.id,field,value),onQuickAdd:delta=>quickAdd(p.id,delta)})))),counted>0&&React.createElement("div",{className:"sticky-save-bar"},React.createElement("div",{className:"ssb-info"},React.createElement("strong",null,counted)," kalem haz\u0131r",React.createElement("small",null,"\xB7 Otomatik kaydedildi")),React.createElement("button",{className:"btn"},React.createElement(Icon,{name:"check",size:15}),"Say\u0131m\u0131 tamamla")));}function StockRow({product:p,count,isOpen,onToggle,onUpdate,onQuickAdd}){const status=stockStatus(p);const currentStock=count?.stock??p.stock;const used=count?.used??"";const note=count?.note??"";const isCounted=count&&(count.stock!==undefined||count.used!=="");const cls=status.key==="critical"?"critical":status.key==="low"?"low":"";return React.createElement("div",{className:`stock-row ${cls} ${isOpen?"open":""} ${isCounted?"counted":""}`},React.createElement("div",{className:"stock-row-main"},React.createElement("button",{className:"stock-row-head",onClick:onToggle},React.createElement("div",{className:`product-tile ${status.key==="critical"?"":""}`},p.name.split(" ").map(w=>w[0]).slice(0,2).join("")),React.createElement("div",{className:"stock-row-info"},React.createElement("div",{className:"stock-row-title-line"},React.createElement("strong",null,p.name),React.createElement("span",{className:`badge ${status.cls}`},status.label)),React.createElement("small",null,p.spec," \xB7 ",p.cat)),React.createElement("div",{className:"stock-row-current"},React.createElement("div",{className:"stock-row-num"},React.createElement("strong",{className:"tnum"},currentStock),React.createElement("small",null,"/ min ",p.min," ",p.unit)),isCounted&&React.createElement("span",{className:"counted-mark"},React.createElement(Icon,{name:"check",size:14})))),isOpen&&React.createElement("div",{className:"stock-row-edit"},React.createElement("div",{className:"edit-grid"},React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Mevcut stok"),React.createElement("div",{className:"num-stepper"},React.createElement("button",{onClick:()=>onQuickAdd(-1),type:"button"},React.createElement(Icon,{name:"minus",size:16})),React.createElement("input",{type:"number",className:"input input-num",value:currentStock,onChange:e=>onUpdate("stock",parseFloat(e.target.value)||0)}),React.createElement("button",{onClick:()=>onQuickAdd(1),type:"button"},React.createElement(Icon,{name:"plus",size:16}))),React.createElement("span",{className:"field-hint"},p.unit)),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Bug\xFCn kullan\u0131lan"),React.createElement("input",{type:"number",className:"input input-num",placeholder:"0",value:used,onChange:e=>onUpdate("used",e.target.value)}),React.createElement("span",{className:"field-hint"},p.usedToday>0?`Önceki ortalama: ${p.usedToday} ${p.unit}`:"İlk sayım")),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Not (opsiyonel)"),React.createElement("input",{type:"text",className:"input",placeholder:"\xF6rn. Yeni teslimat al\u0131nd\u0131",value:note,onChange:e=>onUpdate("note",e.target.value)}))),React.createElement("div",{className:"edit-actions"},p.stock<p.min?React.createElement("button",{className:"btn btn-soft btn-sm"},React.createElement(Icon,{name:"package",size:14}),"Sipari\u015F talep et (",Math.ceil(p.min-p.stock)," ",p.unit,")"):React.createElement("button",{className:"btn btn-ghost btn-sm"},React.createElement(Icon,{name:"package",size:14}),"Manuel sipari\u015F ekle"),React.createElement("span",{className:"muted-meta"},"Tedarik\xE7i: ",React.createElement("strong",null,p.supplier)," \xB7 ",fmtMoney(p.price)," / ",p.unit)))));}const stockStyles=`
/* Progress card */
.progress-card {
  padding: 14px 18px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.progress-bar {
  height: 8px;
  background: var(--surface-sunken);
  border-radius: var(--r-pill);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--brand), var(--ok));
  border-radius: var(--r-pill);
  transition: width 0.3s ease;
}
.progress-stats {
  display: flex;
  gap: 24px;
  font-size: 12.5px;
  color: var(--ink-500);
  flex-wrap: wrap;
}
.progress-stats strong {
  color: var(--ink-900);
  font-size: 14.5px;
  font-weight: 600;
  margin-right: 4px;
}

/* Department tabs (admin) */
.dept-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
}
.dept-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px 9px 9px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  text-align: left;
  flex-shrink: 0;
  min-width: 180px;
  cursor: pointer;
  transition: all 0.12s;
}
.dept-tab:hover {
  border-color: var(--brand);
  background: var(--brand-tint);
}
.dept-tab.on {
  border-color: var(--brand);
  background: var(--brand-tint);
  box-shadow: 0 0 0 3px rgba(13,110,94,0.08);
}
.dept-tab-info { display: flex; flex-direction: column; line-height: 1.25; min-width: 0; }
.dept-tab-info strong { font-size: 13px; font-weight: 600; color: var(--ink-900); white-space: nowrap; }
.dept-tab-info small { font-size: 11.5px; color: var(--ink-500); }

/* Toolbar */
.stock-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.filter-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-pill);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--ink-700);
  cursor: pointer;
  transition: all 0.12s;
  white-space: nowrap;
}
.chip strong {
  font-weight: 600;
  background: var(--surface-sunken);
  color: var(--ink-600);
  padding: 1px 7px;
  border-radius: var(--r-pill);
  font-size: 11px;
  min-width: 16px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.chip:hover {
  border-color: var(--ink-400);
  color: var(--ink-900);
}
.chip.on {
  background: var(--brand);
  color: #fff;
  border-color: var(--brand);
}
.chip.on strong {
  background: rgba(255,255,255,0.2);
  color: #fff;
}
.chip.critical.on { background: var(--danger); border-color: var(--danger); }
.chip.warn.on { background: var(--accent); border-color: var(--accent); }
.chip.critical strong { background: var(--danger-soft); color: var(--danger); }
.chip.warn strong { background: var(--accent-soft); color: var(--accent-strong); }
.chip.critical.on strong, .chip.warn.on strong { background: rgba(255,255,255,0.22); color: #fff; }

@media (max-width: 700px) {
  .stock-toolbar > .input-with-icon { max-width: none !important; width: 100%; }
  .hide-mobile { display: none; }
}

/* Stock list & rows */
.stock-list { display: flex; flex-direction: column; }
.stock-row {
  border-bottom: 1px solid var(--line-soft);
}
.stock-row:last-child { border-bottom: 0; }
.stock-row.open { background: var(--brand-tint); }
.stock-row.critical .stock-row-head::before {
  content: "";
  width: 3px;
  background: var(--danger);
  border-radius: 0 2px 2px 0;
  position: absolute;
  left: 0; top: 8px; bottom: 8px;
}
.stock-row.low .stock-row-head::before {
  content: "";
  width: 3px;
  background: var(--accent);
  border-radius: 0 2px 2px 0;
  position: absolute;
  left: 0; top: 8px; bottom: 8px;
}
.stock-row-main { position: relative; }
.stock-row-head {
  display: grid;
  grid-template-columns: auto minmax(0,1fr) auto;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  width: 100%;
  background: transparent;
  text-align: left;
  cursor: pointer;
  position: relative;
  transition: background 0.12s;
}
.stock-row-head:hover { background: rgba(13,110,94,0.04); }
.stock-row.open .stock-row-head { background: transparent; }
.stock-row-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.stock-row-title-line {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.stock-row-title-line strong {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-900);
}
.stock-row-info small {
  font-size: 12px;
  color: var(--ink-500);
  font-weight: 400;
}
.stock-row-current {
  display: flex;
  align-items: center;
  gap: 10px;
}
.stock-row-num {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.15;
}
.stock-row-num strong {
  font-size: 18px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--ink-900);
}
.stock-row.critical .stock-row-num strong { color: var(--danger); }
.stock-row.low .stock-row-num strong { color: var(--accent-strong); }
.stock-row-num small {
  font-size: 11px;
  color: var(--ink-500);
  font-weight: 500;
}
.counted-mark {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--ok);
  color: #fff;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.stock-row-edit {
  padding: 4px 18px 16px 70px;
  border-top: 1px dashed var(--line);
}
.edit-grid {
  display: grid;
  grid-template-columns: minmax(180px, 0.7fr) minmax(180px, 0.7fr) minmax(220px, 1.2fr);
  gap: 14px;
  margin-top: 12px;
}
.edit-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  flex-wrap: wrap;
}
.muted-meta {
  font-size: 11.5px;
  color: var(--ink-500);
  margin-left: auto;
}
.muted-meta strong {
  color: var(--ink-800);
  font-weight: 600;
}

@media (max-width: 700px) {
  .stock-row-head { padding: 12px 14px; gap: 11px; }
  .stock-row-head .product-tile { display: none; }
  .stock-row-edit { padding: 4px 14px 14px; }
  .edit-grid { grid-template-columns: 1fr 1fr; }
  .edit-grid .field:last-child { grid-column: 1 / -1; }
  .edit-actions { flex-direction: column; align-items: stretch; }
  .muted-meta { margin-left: 0; }
}

/* Number stepper */
.num-stepper {
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  overflow: hidden;
  transition: border-color 0.12s, box-shadow 0.12s;
}
.num-stepper:focus-within {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(13, 110, 94, 0.12);
}
.num-stepper input {
  flex: 1;
  height: 38px;
  border: 0;
  text-align: center;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  font-size: 15px;
  background: transparent;
  color: var(--ink-900);
  min-width: 0;
}
.num-stepper input:focus { outline: 0; }
.num-stepper button {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  color: var(--ink-700);
  background: var(--surface-soft);
  transition: background 0.12s;
}
.num-stepper button:hover {
  background: var(--brand-soft);
  color: var(--brand-strong);
}
.num-stepper button:first-child { border-right: 1px solid var(--line); }
.num-stepper button:last-child { border-left: 1px solid var(--line); }

/* Sticky save bar */
.sticky-save-bar {
  display: none;
}
@media (max-width: 960px) {
  .sticky-save-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    position: fixed;
    bottom: 76px;
    left: 12px;
    right: 12px;
    z-index: 20;
    background: var(--ink-900);
    color: #fff;
    padding: 12px 14px;
    border-radius: var(--r-md);
    box-shadow: var(--shadow-lg);
  }
  .ssb-info { flex: 1; font-size: 13.5px; color: #d8e3df; }
  .ssb-info strong { color: #fff; font-weight: 600; font-variant-numeric: tabular-nums; }
  .ssb-info small { font-size: 12px; color: #94a59f; margin-left: 4px; }
  .sticky-save-bar .btn { height: 38px; }
}
`;Object.assign(window,{StockCount,StockRow,STOCK_STYLES:stockStyles});function Orders({currentUser,onNavigate}){const[filter,setFilter]=React.useState("all");const[orderList,setOrderList]=React.useState(ORDER_REQUESTS);const criticalProducts=PRODUCTS.filter(p=>p.stock<p.min);function setStatus(id,status){setOrderList(list=>list.map(o=>o.id===id?{...o,status}:o));}const filtered=filter==="all"?orderList:orderList.filter(o=>o.status===filter);const pending=orderList.filter(o=>o.status==="pending");const approved=orderList.filter(o=>o.status==="approved");const totalValue=orderList.reduce((s,o)=>s+(productById(o.productId)?.price??0)*o.qty,0);return React.createElement("div",{className:"col gap-lg","data-screen-label":"04 Sipari\u015F & Kritik Stok"},React.createElement("header",{className:"page-head"},React.createElement("div",{className:"page-head-titles"},React.createElement("span",{className:"eyebrow"},"Sipari\u015F Merkezi"),React.createElement("h1",{className:"page-title"},"Kritik Stok & Sipari\u015F Talepleri"),React.createElement("span",{className:"page-sub"},"Onay bekleyen sipari\u015Fleri y\xF6netin ve kritik stoklar\u0131 izleyin")),React.createElement("div",{className:"page-head-meta"},React.createElement("button",{className:"btn btn-ghost"},React.createElement(Icon,{name:"download",size:14}),"Excel'e aktar"),React.createElement("button",{className:"btn"},React.createElement(Icon,{name:"send",size:15}),"Tedarik\xE7ilere g\xF6nder"))),React.createElement("div",{className:"kpi-grid"},React.createElement(Kpi,{icon:"alert",iconCls:"danger",label:"Kritik stok",value:criticalProducts.length,suffix:"kalem",foot:`${criticalProducts.filter(p=>p.stock<=p.min*0.5).length} adet acil`}),React.createElement(Kpi,{icon:"package",iconCls:"warn",label:"Bekleyen sipari\u015F",value:pending.length,suffix:"talep",foot:`${pending.reduce((s,o)=>s+o.qty,0)} kalem`}),React.createElement(Kpi,{icon:"check",iconCls:"ok",label:"Onaylanm\u0131\u015F",value:approved.length,suffix:"talep",foot:"Bug\xFCn tedarik\xE7iye gidecek"}),React.createElement(Kpi,{icon:"trend_up",iconCls:"brand",label:"Toplam tutar",value:fmtMoney(totalValue),foot:"Tahmini sipari\u015F de\u011Feri"})),React.createElement("div",{className:"grid-2-1"},React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Sipari\u015F Talepleri"),React.createElement("div",{className:"card-sub"},"Personel taraf\u0131ndan a\xE7\u0131lan manuel ve otomatik talepler")),React.createElement("div",{className:"filter-chips"},React.createElement("button",{className:`chip ${filter==="all"?"on":""}`,onClick:()=>setFilter("all")},"T\xFCm\xFC ",React.createElement("strong",null,orderList.length)),React.createElement("button",{className:`chip warn ${filter==="pending"?"on":""}`,onClick:()=>setFilter("pending")},"Bekleyen ",React.createElement("strong",null,pending.length)),React.createElement("button",{className:`chip ${filter==="approved"?"on":""}`,onClick:()=>setFilter("approved")},"Onayl\u0131 ",React.createElement("strong",null,approved.length)))),React.createElement("div",{className:"order-list"},filtered.map(o=>{const p=productById(o.productId);const d=deptById(p.dept);return React.createElement("div",{key:o.id,className:"order-card"},React.createElement("div",{className:"order-card-head"},React.createElement("div",{className:`product-tile ${d.color}`},p.name.split(" ").map(w=>w[0]).slice(0,2).join("")),React.createElement("div",{className:"order-card-info"},React.createElement("strong",null,p.name),React.createElement("small",null,p.spec," \xB7 ",React.createElement("span",{style:{color:"var(--brand)"}},d.name))),React.createElement("div",{className:"order-card-status"},o.status==="pending"&&React.createElement("span",{className:"badge badge-warn"},"Onay bekliyor"),o.status==="approved"&&React.createElement("span",{className:"badge badge-ok"},"Onayland\u0131"),o.status==="rejected"&&React.createElement("span",{className:"badge badge-danger"},"Reddedildi"))),React.createElement("div",{className:"order-card-grid"},React.createElement("div",{className:"order-meta"},React.createElement("small",null,"Talep edilen miktar"),React.createElement("strong",{className:"tnum"},o.qty," ",p.unit)),React.createElement("div",{className:"order-meta"},React.createElement("small",null,"Mevcut stok"),React.createElement("strong",{className:`tnum ${p.stock<p.min?"danger":""}`},p.stock," / min ",p.min)),React.createElement("div",{className:"order-meta"},React.createElement("small",null,"Tahmini tutar"),React.createElement("strong",{className:"tnum"},fmtMoney(o.qty*p.price))),React.createElement("div",{className:"order-meta"},React.createElement("small",null,"Tedarik\xE7i"),React.createElement("strong",null,p.supplier))),React.createElement("div",{className:"order-card-reason"},React.createElement(Icon,{name:"info",size:13}),React.createElement("span",null,React.createElement("strong",null,"Gerek\xE7e:")," ",o.reason)),React.createElement("div",{className:"order-card-foot"},React.createElement("span",{className:"muted",style:{fontSize:12}},React.createElement(Icon,{name:"user",size:12,style:{verticalAlign:"middle",marginRight:4}}),o.requestedBy," \xB7 ",o.requestedAt),React.createElement("div",{className:"row gap-sm"},o.status==="pending"?React.createElement(React.Fragment,null,React.createElement("button",{className:"btn btn-ghost btn-sm",onClick:()=>setStatus(o.id,"rejected")},React.createElement(Icon,{name:"x",size:13}),"Reddet"),React.createElement("button",{className:"btn btn-sm",onClick:()=>setStatus(o.id,"approved")},React.createElement(Icon,{name:"check",size:13}),"Onayla")):React.createElement("button",{className:"btn btn-ghost btn-sm",onClick:()=>setStatus(o.id,"pending")},"Geri al"))));}))),React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Kritik Stok (",criticalProducts.length,")"),React.createElement("div",{className:"card-sub"},"Otomatik sipari\u015F \xF6nerisi"))),React.createElement("div",{className:"critical-list"},criticalProducts.map(p=>{const need=Math.ceil(p.min-p.stock);const d=deptById(p.dept);return React.createElement("div",{key:p.id,className:"critical-row"},React.createElement("div",{className:"critical-row-info"},React.createElement("strong",null,p.name),React.createElement("small",null,d.name)),React.createElement("div",{className:"critical-row-stat"},React.createElement("div",{className:"cr-bar"},React.createElement("div",{className:"cr-bar-fill",style:{width:`${Math.min(100,p.stock/p.min*100)}%`}})),React.createElement("div",{className:"cr-nums"},React.createElement("strong",{className:"tnum"},p.stock),React.createElement("span",{className:"tnum muted"},"/ ",p.min," ",p.unit))),React.createElement("button",{className:"btn btn-soft btn-sm"},"+",need," sipari\u015F"));})))));}function Reports({onNavigate}){const[date,setDate]=React.useState("today");const[tab,setTab]=React.useState("daily");const allUsed=PRODUCTS.reduce((s,p)=>s+p.usedToday*p.price,0);const criticalProducts=PRODUCTS.filter(p=>p.stock<p.min);return React.createElement("div",{className:"col gap-lg","data-screen-label":"05 G\xFCnl\xFCk Rapor"},React.createElement("header",{className:"page-head"},React.createElement("div",{className:"page-head-titles"},React.createElement("span",{className:"eyebrow"},"Rapor Merkezi"),React.createElement("h1",{className:"page-title"},"G\xFCnl\xFCk Operasyon Raporu"),React.createElement("span",{className:"page-sub"},todayStr())),React.createElement("div",{className:"page-head-meta"},React.createElement("div",{className:"segmented"},React.createElement("button",{className:date==="today"?"on":"",onClick:()=>setDate("today")},"Bug\xFCn"),React.createElement("button",{className:date==="yesterday"?"on":"",onClick:()=>setDate("yesterday")},"D\xFCn"),React.createElement("button",{className:date==="week"?"on":"",onClick:()=>setDate("week")},"Bu hafta")),React.createElement("button",{className:"btn btn-ghost"},React.createElement(Icon,{name:"calendar",size:14}),"Tarih se\xE7"),React.createElement("button",{className:"btn btn-ghost"},React.createElement(Icon,{name:"download",size:14}),"CSV indir"),React.createElement("button",{className:"btn"},React.createElement(Icon,{name:"send",size:15}),"E-posta g\xF6nder"))),React.createElement("div",{className:"report-hero"},React.createElement("div",{className:"report-hero-titles"},React.createElement("span",{className:"eyebrow"},"Y\xF6netici \xD6zet"),React.createElement("h2",{style:{fontSize:22,marginTop:4,color:"#fff"}},"G\xFClplaj Resort \xB7 ",todayStr()),React.createElement("p",{style:{color:"#cad7d2",fontSize:13.5,marginTop:6}},"5 departman\u0131n 4'\xFC say\u0131m\u0131n\u0131 tamamlad\u0131. ",criticalProducts.length," kalem acil sipari\u015F bekliyor.")),React.createElement("div",{className:"report-hero-stats"},React.createElement("div",null,React.createElement("small",null,"Say\u0131m kapsam\u0131"),React.createElement("strong",{className:"tnum"},"132 \xFCr\xFCn")),React.createElement("div",null,React.createElement("small",null,"Bug\xFCnk\xFC t\xFCketim"),React.createElement("strong",{className:"tnum"},fmtMoney(allUsed))),React.createElement("div",null,React.createElement("small",null,"Sipari\u015F a\xE7\u0131lmas\u0131 gereken"),React.createElement("strong",{className:"tnum"},criticalProducts.length," kalem")))),React.createElement("div",{className:"report-tabs"},React.createElement("button",{className:tab==="daily"?"on":"",onClick:()=>setTab("daily")},"G\xFCnl\xFCk say\u0131m"),React.createElement("button",{className:tab==="critical"?"on":"",onClick:()=>setTab("critical")},"Sipari\u015F listesi"),React.createElement("button",{className:tab==="usage"?"on":"",onClick:()=>setTab("usage")},"T\xFCketim analizi"),React.createElement("button",{className:tab==="mail"?"on":"",onClick:()=>setTab("mail")},"E-posta \xF6nizleme")),tab==="daily"&&React.createElement(ReportDaily,null),tab==="critical"&&React.createElement(ReportCritical,{products:criticalProducts}),tab==="usage"&&React.createElement(ReportUsage,null),tab==="mail"&&React.createElement(ReportMail,{criticalCount:criticalProducts.length,totalSpend:allUsed}));}function ReportDaily(){return React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Say\u0131m Detay\u0131 \xB7 132 \xFCr\xFCn"),React.createElement("div",{className:"card-sub"},"T\xFCm departman say\u0131m kay\u0131tlar\u0131")),React.createElement("div",{className:"card-actions"},React.createElement("div",{className:"input-with-icon",style:{width:220}},React.createElement("span",{className:"input-icon"},React.createElement(Icon,{name:"search",size:15})),React.createElement("input",{className:"input input-sm",placeholder:"\xDCr\xFCn ara..."})),React.createElement("button",{className:"btn btn-ghost btn-sm"},React.createElement(Icon,{name:"filter",size:13}),"Filtre"))),React.createElement("div",{className:"table-wrap"},React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,"\xDCr\xFCn"),React.createElement("th",null,"Departman"),React.createElement("th",{className:"cell-num"},"Stok"),React.createElement("th",{className:"cell-num"},"Min"),React.createElement("th",{className:"cell-num"},"Bug\xFCn kullan\u0131lan"),React.createElement("th",null,"Durum"),React.createElement("th",null,"Say\u0131m yapan"),React.createElement("th",null,"Saat"))),React.createElement("tbody",null,PRODUCTS.slice(0,12).map(p=>{const d=deptById(p.dept);const s=stockStatus(p);return React.createElement("tr",{key:p.id},React.createElement("td",null,React.createElement("div",{className:"product-cell"},React.createElement("div",{className:`product-tile ${d.color}`},p.name.split(" ").map(w=>w[0]).slice(0,2).join("")),React.createElement("div",{className:"product-cell-text"},React.createElement("strong",null,p.name),React.createElement("small",null,p.spec)))),React.createElement("td",null,React.createElement("span",{className:"badge badge-ghost no-dot"},d.name)),React.createElement("td",{className:"cell-num"},React.createElement("strong",null,p.stock)," ",React.createElement("span",{className:"cell-meta"},p.unit)),React.createElement("td",{className:"cell-num cell-meta"},p.min),React.createElement("td",{className:"cell-num"},React.createElement("strong",null,p.usedToday)),React.createElement("td",null,React.createElement("span",{className:`badge ${s.cls}`},s.label)),React.createElement("td",null,React.createElement("span",{className:"cell-meta"},"Ay\u015Fe Demir")),React.createElement("td",null,React.createElement("span",{className:"cell-meta tnum"},"10:",14+Math.floor(Math.random()*30))));})))));}function ReportCritical({products}){return React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Sipari\u015F a\xE7\u0131lmas\u0131 gereken kalemler (",products.length,")"),React.createElement("div",{className:"card-sub"},"Otomatik \xF6neri \xB7 y\xF6netici onay\u0131yla tedarik\xE7ilere gidecek")),React.createElement("button",{className:"btn btn-sm"},React.createElement(Icon,{name:"send",size:13}),"Hepsini onaya g\xF6nder")),React.createElement("div",{className:"table-wrap"},React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,"\xDCr\xFCn"),React.createElement("th",null,"Departman"),React.createElement("th",{className:"cell-num"},"Mevcut"),React.createElement("th",{className:"cell-num"},"Minimum"),React.createElement("th",{className:"cell-num"},"\xD6nerilen"),React.createElement("th",null,"Tedarik\xE7i"),React.createElement("th",{className:"cell-num"},"Tahmini tutar"))),React.createElement("tbody",null,products.map(p=>{const d=deptById(p.dept);const need=Math.ceil(p.min-p.stock+p.min*0.5);return React.createElement("tr",{key:p.id},React.createElement("td",null,React.createElement("div",{className:"product-cell"},React.createElement("div",{className:"product-tile"},p.name.split(" ").map(w=>w[0]).slice(0,2).join("")),React.createElement("div",{className:"product-cell-text"},React.createElement("strong",null,p.name),React.createElement("small",null,p.spec)))),React.createElement("td",null,React.createElement("span",{className:"badge badge-ghost no-dot"},d.name)),React.createElement("td",{className:"cell-num"},React.createElement("strong",{style:{color:"var(--danger)"}},p.stock)," ",React.createElement("span",{className:"cell-meta"},p.unit)),React.createElement("td",{className:"cell-num cell-meta"},p.min),React.createElement("td",{className:"cell-num"},React.createElement("strong",null,"+",need)),React.createElement("td",null,p.supplier),React.createElement("td",{className:"cell-num"},React.createElement("strong",null,fmtMoney(need*p.price))));})))));}function ReportUsage(){const usageByDept=DEPARTMENTS.map(d=>{const items=PRODUCTS.filter(p=>p.dept===d.id);const value=items.reduce((s,p)=>s+p.usedToday*p.price,0);const count=items.reduce((s,p)=>s+p.usedToday,0);return{...d,value,count,items:items.length};}).sort((a,b)=>b.value-a.value);const max=Math.max(...usageByDept.map(d=>d.value));return React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Departman bazl\u0131 t\xFCketim \xB7 ",todayStr()),React.createElement("div",{className:"card-sub"},"Bug\xFCnk\xFC stok hareketleri parasal de\u011Fer \xFCzerinden"))),React.createElement("div",{className:"card-body"},React.createElement("div",{className:"usage-bars"},usageByDept.map(d=>React.createElement("div",{key:d.id,className:"usage-bar-row"},React.createElement("div",{className:"usage-bar-label"},React.createElement("div",{className:`product-tile ${d.color}`},d.short),React.createElement("div",null,React.createElement("strong",null,d.name),React.createElement("small",null,d.count," adet \xB7 ",d.items," \xFCr\xFCn takipte"))),React.createElement("div",{className:"usage-bar-wrap"},React.createElement("div",{className:"usage-bar-track"},React.createElement("div",{className:"usage-bar-fill",style:{width:max>0?`${d.value/max*100}%`:"0%"}})),React.createElement("strong",{className:"tnum"},fmtMoney(d.value))))))));}function ReportMail({criticalCount,totalSpend}){return React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Otomatik e-posta \xF6nizleme"),React.createElement("div",{className:"card-sub"},"Bug\xFCn 18:00'da mehmet@otel.com adresine g\xF6nderilecek")),React.createElement("div",{className:"card-actions"},React.createElement("button",{className:"btn btn-ghost btn-sm"},React.createElement(Icon,{name:"copy",size:13}),"Metni kopyala"),React.createElement("button",{className:"btn btn-sm"},React.createElement(Icon,{name:"send",size:13}),"\u015Eimdi g\xF6nder"))),React.createElement("div",{className:"mail-preview-body"},React.createElement("div",{className:"mail-head-row"},React.createElement("strong",null,"Kime:")," mehmet@otel.com"),React.createElement("div",{className:"mail-head-row"},React.createElement("strong",null,"Konu:")," G\xFClplaj Resort \u2014 G\xFCnl\xFCk Stok ve Sipari\u015F Raporu \xB7 ",todayStr()),React.createElement("hr",null),React.createElement("div",{className:"mail-body"},React.createElement("p",null,"Say\u0131n Mehmet Bey,"),React.createElement("p",null,"Bug\xFCne ait operasyon \xF6zeti a\u015Fa\u011F\u0131da yer almaktad\u0131r:"),React.createElement("ul",null,React.createElement("li",null,React.createElement("strong",null,criticalCount," kalem")," kritik stok seviyesinde \u2014 sipari\u015F a\xE7\u0131lmas\u0131 \xF6neriliyor."),React.createElement("li",null,"Bug\xFCnk\xFC toplam t\xFCketim de\u011Feri: ",React.createElement("strong",null,fmtMoney(totalSpend))),React.createElement("li",null,"5 departmandan 4'\xFC g\xFCnl\xFCk say\u0131m\u0131n\u0131 tamamlad\u0131 (Smile Food House bekliyor).")),React.createElement("p",null,React.createElement("strong",null,"\xD6ncelikli sipari\u015F listesi:")),React.createElement("ul",null,React.createElement("li",null,"Tuvalet Ka\u011F\u0131d\u0131 Jumbo \xD7 6 koli \u2014 Tezel Ka\u011F\u0131t"),React.createElement("li",null,"\xC7ama\u015F\u0131r Deterjan\u0131 \xD7 4 torba \u2014 Hijyenex"),React.createElement("li",null,"S\u0131v\u0131 Sabun Refill \xD7 4 adet \u2014 Hijyenex"),React.createElement("li",null,"Domates \xD7 30 kg \u2014 Hal Toptan")),React.createElement("p",null,"Detayl\u0131 rapor ekte CSV olarak g\xF6nderilmi\u015Ftir."),React.createElement("p",null,"Sayg\u0131lar\u0131mla,",React.createElement("br",null),React.createElement("strong",null,"Otel Y\xF6netim Otomasyonu")))));}function AdminProducts({onNavigate}){const[dept,setDept]=React.useState("all");const[query,setQuery]=React.useState("");const[showAdd,setShowAdd]=React.useState(false);const filtered=PRODUCTS.filter(p=>{if(dept!=="all"&&p.dept!==dept)return false;if(query&&!p.name.toLowerCase().includes(query.toLowerCase()))return false;return true;});return React.createElement("div",{className:"col gap-lg","data-screen-label":"06 \xDCr\xFCn Y\xF6netimi"},React.createElement("header",{className:"page-head"},React.createElement("div",{className:"page-head-titles"},React.createElement("span",{className:"eyebrow"},"Y\xF6netici"),React.createElement("h1",{className:"page-title"},"\xDCr\xFCn Katalo\u011Fu"),React.createElement("span",{className:"page-sub"},PRODUCTS.length," aktif \xFCr\xFCn \xB7 5 departman")),React.createElement("div",{className:"page-head-meta"},React.createElement("button",{className:"btn btn-ghost"},React.createElement(Icon,{name:"download",size:14}),"D\u0131\u015Fa aktar"),React.createElement("button",{className:"btn",onClick:()=>setShowAdd(s=>!s)},React.createElement(Icon,{name:showAdd?"x":"plus",size:15}),showAdd?"Kapat":"Yeni ürün"))),showAdd&&React.createElement(NewProductForm,{onClose:()=>setShowAdd(false)}),React.createElement("div",{className:"stock-toolbar"},React.createElement("div",{className:"input-with-icon grow",style:{maxWidth:360}},React.createElement("span",{className:"input-icon"},React.createElement(Icon,{name:"search",size:16})),React.createElement("input",{className:"input",placeholder:"\xDCr\xFCn ad\u0131 veya tedarik\xE7i...",value:query,onChange:e=>setQuery(e.target.value)})),React.createElement("div",{className:"filter-chips"},React.createElement("button",{className:`chip ${dept==="all"?"on":""}`,onClick:()=>setDept("all")},"T\xFCm\xFC ",React.createElement("strong",null,PRODUCTS.length)),DEPARTMENTS.map(d=>React.createElement("button",{key:d.id,className:`chip ${dept===d.id?"on":""}`,onClick:()=>setDept(d.id)},d.name," ",React.createElement("strong",null,PRODUCTS.filter(p=>p.dept===d.id).length))))),React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"table-wrap"},React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,"\xDCr\xFCn"),React.createElement("th",null,"Departman"),React.createElement("th",null,"Kategori"),React.createElement("th",{className:"cell-num"},"Stok"),React.createElement("th",{className:"cell-num"},"Min"),React.createElement("th",null,"Birim"),React.createElement("th",null,"Tedarik\xE7i"),React.createElement("th",{className:"cell-num"},"Birim fiyat"),React.createElement("th",null,"Durum"),React.createElement("th",null))),React.createElement("tbody",null,filtered.map(p=>{const d=deptById(p.dept);const s=stockStatus(p);return React.createElement("tr",{key:p.id},React.createElement("td",null,React.createElement("div",{className:"product-cell"},React.createElement("div",{className:`product-tile ${d.color}`},p.name.split(" ").map(w=>w[0]).slice(0,2).join("")),React.createElement("div",{className:"product-cell-text"},React.createElement("strong",null,p.name),React.createElement("small",null,p.spec)))),React.createElement("td",null,React.createElement("span",{className:"badge badge-ghost no-dot"},d.name)),React.createElement("td",null,React.createElement("span",{className:"cell-meta"},p.cat)),React.createElement("td",{className:"cell-num"},React.createElement("strong",null,p.stock)),React.createElement("td",{className:"cell-num cell-meta"},p.min),React.createElement("td",null,React.createElement("span",{className:"cell-meta"},p.unit)),React.createElement("td",null,p.supplier),React.createElement("td",{className:"cell-num"},React.createElement("strong",null,fmtMoney(p.price))),React.createElement("td",null,React.createElement("span",{className:`badge ${s.cls}`},s.label)),React.createElement("td",null,React.createElement("div",{className:"row gap-sm"},React.createElement("button",{className:"btn-icon btn btn-ghost btn-sm",style:{width:32,height:32},title:"D\xFCzenle"},React.createElement(Icon,{name:"edit",size:14})),React.createElement("button",{className:"btn-icon btn btn-ghost btn-sm",style:{width:32,height:32},title:"Sil"},React.createElement(Icon,{name:"trash",size:14})))));}))))));}function NewProductForm({onClose}){return React.createElement("div",{className:"card card-elev new-product"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Yeni \xFCr\xFCn ekle"),React.createElement("div",{className:"card-sub"},"Departman katalo\u011Funa yeni bir kalem ekleyin"))),React.createElement("div",{className:"card-body"},React.createElement("div",{className:"np-grid"},React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"\xDCr\xFCn ad\u0131 ",React.createElement("span",{className:"req"},"*")),React.createElement("input",{className:"input",placeholder:"\xF6rn. El sabunu s\u0131v\u0131"})),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Departman ",React.createElement("span",{className:"req"},"*")),React.createElement("select",{className:"select"},DEPARTMENTS.map(d=>React.createElement("option",{key:d.id},d.name)))),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Kategori"),React.createElement("select",{className:"select"},React.createElement("option",null,"Hijyen & Sabun"),React.createElement("option",null,"Ka\u011F\u0131t \xDCr\xFCnleri"))),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Birim"),React.createElement("select",{className:"select"},React.createElement("option",null,"adet"),React.createElement("option",null,"koli"),React.createElement("option",null,"kg"),React.createElement("option",null,"L"))),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Minimum stok"),React.createElement("input",{className:"input input-num",placeholder:"6"})),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Birim fiyat (\u20BA)"),React.createElement("input",{className:"input input-num",placeholder:"145"})),React.createElement("div",{className:"field",style:{gridColumn:"span 2"}},React.createElement("label",{className:"field-label"},"Spesifikasyon"),React.createElement("input",{className:"input",placeholder:"\xF6rn. 5L bidon"})),React.createElement("div",{className:"field",style:{gridColumn:"span 2"}},React.createElement("label",{className:"field-label"},"Tedarik\xE7i"),React.createElement("input",{className:"input",placeholder:"\xF6rn. Hijyenex"}))),React.createElement("div",{className:"row end gap-md",style:{marginTop:16}},React.createElement("button",{className:"btn btn-ghost",onClick:onClose},"\u0130ptal"),React.createElement("button",{className:"btn"},React.createElement(Icon,{name:"check",size:14}),"\xDCr\xFCn ekle"))));}function AdminUsers(){return React.createElement("div",{className:"col gap-lg","data-screen-label":"07 Kullan\u0131c\u0131 Y\xF6netimi"},React.createElement("header",{className:"page-head"},React.createElement("div",{className:"page-head-titles"},React.createElement("span",{className:"eyebrow"},"Y\xF6netici"),React.createElement("h1",{className:"page-title"},"Kullan\u0131c\u0131 Y\xF6netimi"),React.createElement("span",{className:"page-sub"},USERS.length," aktif kullan\u0131c\u0131")),React.createElement("div",{className:"page-head-meta"},React.createElement("button",{className:"btn"},React.createElement(Icon,{name:"plus",size:15}),"Yeni kullan\u0131c\u0131"))),React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"table-wrap"},React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,"Kullan\u0131c\u0131"),React.createElement("th",null,"Rol"),React.createElement("th",null,"Departman"),React.createElement("th",null,"E-posta"),React.createElement("th",null,"Son giri\u015F"),React.createElement("th",null,"Durum"),React.createElement("th",null))),React.createElement("tbody",null,USERS.map(u=>{const d=u.department?deptById(u.department):null;return React.createElement("tr",{key:u.id},React.createElement("td",null,React.createElement("div",{className:"product-cell"},React.createElement("div",{className:"rail-avatar",style:{borderRadius:10}},initials(u.name)),React.createElement("div",{className:"product-cell-text"},React.createElement("strong",null,u.name),React.createElement("small",{className:"mono"},u.username)))),React.createElement("td",null,u.role==="admin"?React.createElement("span",{className:"badge badge-accent"},"Y\xF6netici"):React.createElement("span",{className:"badge badge-brand"},"Departman")),React.createElement("td",null,d?React.createElement("span",{className:"badge badge-ghost no-dot"},d.name):React.createElement("span",{className:"cell-meta"},"\u2014")),React.createElement("td",null,React.createElement("span",{className:"cell-meta"},u.email)),React.createElement("td",null,React.createElement("span",{className:"cell-meta tnum"},"Bug\xFCn, 09:14")),React.createElement("td",null,React.createElement("span",{className:"badge badge-ok"},"Aktif")),React.createElement("td",null,React.createElement("div",{className:"row gap-sm"},React.createElement("button",{className:"btn-icon btn btn-ghost btn-sm",style:{width:32,height:32}},React.createElement(Icon,{name:"edit",size:14})),React.createElement("button",{className:"btn-icon btn btn-ghost btn-sm",style:{width:32,height:32}},React.createElement(Icon,{name:"more",size:14})))));}))))));}function MailSettings(){const[staffTime,setStaffTime]=React.useState("08:30");const[adminTime,setAdminTime]=React.useState("18:00");const[smtpOn,setSmtpOn]=React.useState(true);const[staffOn,setStaffOn]=React.useState(true);const[adminOn,setAdminOn]=React.useState(true);return React.createElement("div",{className:"col gap-lg","data-screen-label":"08 Mail Ayarlar\u0131"},React.createElement("header",{className:"page-head"},React.createElement("div",{className:"page-head-titles"},React.createElement("span",{className:"eyebrow"},"Otomasyon"),React.createElement("h1",{className:"page-title"},"Mail & Bildirim Ayarlar\u0131"),React.createElement("span",{className:"page-sub"},"SMTP, hat\u0131rlatma ve y\xF6netici raporu zamanlamas\u0131")),React.createElement("div",{className:"page-head-meta"},React.createElement("button",{className:"btn btn-ghost"},React.createElement(Icon,{name:"history",size:14}),"Mail logu"),React.createElement("button",{className:"btn"},React.createElement(Icon,{name:"check",size:15}),"T\xFCm ayarlar\u0131 kaydet"))),React.createElement("div",{className:"grid-2-1"},React.createElement("div",{className:"col gap-md"},React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"SMTP Yap\u0131land\u0131rmas\u0131",React.createElement("span",{className:`badge ${smtpOn?"badge-ok":"badge-ghost"}`},smtpOn?"Bağlı":"Pasif")),React.createElement("div",{className:"card-sub"},"Otomatik e-postalar\u0131n g\xF6nderilece\u011Fi sunucu")),React.createElement("label",{className:"toggle"},React.createElement("input",{type:"checkbox",checked:smtpOn,onChange:e=>setSmtpOn(e.target.checked)}),React.createElement("span",{className:"toggle-track"}))),React.createElement("div",{className:"card-body"},React.createElement("div",{className:"np-grid"},React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"SMTP sunucu"),React.createElement("input",{className:"input",defaultValue:"smtp.office365.com"})),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Port"),React.createElement("input",{className:"input input-num",defaultValue:"587"})),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Kullan\u0131c\u0131 ad\u0131"),React.createElement("input",{className:"input",defaultValue:"otomasyon@gulplaj.com"})),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"\u015Eifre"),React.createElement("input",{type:"password",className:"input",defaultValue:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"})),React.createElement("div",{className:"field",style:{gridColumn:"span 2"}},React.createElement("label",{className:"field-label"},"G\xF6nderen ad\u0131"),React.createElement("input",{className:"input",defaultValue:"G\xFClplaj Resort Otomasyonu"}))),React.createElement("div",{className:"row end gap-sm",style:{marginTop:14}},React.createElement("button",{className:"btn btn-ghost btn-sm"},"Test e-postas\u0131 g\xF6nder"),React.createElement("button",{className:"btn btn-sm"},"Kaydet")))),React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Personel say\u0131m hat\u0131rlatmas\u0131"),React.createElement("div",{className:"card-sub"},"Departman kullan\u0131c\u0131lar\u0131na stok giri\u015Fi hat\u0131rlatmas\u0131")),React.createElement("label",{className:"toggle"},React.createElement("input",{type:"checkbox",checked:staffOn,onChange:e=>setStaffOn(e.target.checked)}),React.createElement("span",{className:"toggle-track"}))),React.createElement("div",{className:"card-body"},React.createElement("div",{className:"np-grid"},React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"G\xF6nderim saati"),React.createElement("input",{className:"input",type:"time",value:staffTime,onChange:e=>setStaffTime(e.target.value)})),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Hat\u0131rlatma s\u0131kl\u0131\u011F\u0131"),React.createElement("select",{className:"select"},React.createElement("option",null,"Her g\xFCn"),React.createElement("option",null,"Hafta i\xE7i"),React.createElement("option",null,"Pazartesi-\xC7ar\u015Famba-Cuma"))),React.createElement("div",{className:"field",style:{gridColumn:"span 2"}},React.createElement("label",{className:"field-label"},"Mail metni"),React.createElement("textarea",{className:"textarea",defaultValue:"G\xFCnayd\u0131n, l\xFCtfen bug\xFCne ait stok say\u0131m\u0131n\u0131z\u0131 11:00'a kadar sisteme girin. Say\u0131m yap\u0131lmayan departmanlar otomatik olarak y\xF6neticiye bildirilir."})))))),React.createElement("div",{className:"col gap-md"},React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Y\xF6netici sipari\u015F raporu"),React.createElement("div",{className:"card-sub"},"G\xFCnl\xFCk kritik stok ve sipari\u015F \xF6zeti")),React.createElement("label",{className:"toggle"},React.createElement("input",{type:"checkbox",checked:adminOn,onChange:e=>setAdminOn(e.target.checked)}),React.createElement("span",{className:"toggle-track"}))),React.createElement("div",{className:"card-body"},React.createElement("div",{className:"np-grid"},React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"G\xF6nderim saati"),React.createElement("input",{className:"input",type:"time",value:adminTime,onChange:e=>setAdminTime(e.target.value)})),React.createElement("div",{className:"field"},React.createElement("label",{className:"field-label"},"Al\u0131c\u0131"),React.createElement("input",{className:"input",defaultValue:"mehmet@otel.com"}))))),React.createElement("div",{className:"card card-elev"},React.createElement("div",{className:"card-head"},React.createElement("div",{className:"card-head-titles"},React.createElement("div",{className:"card-title"},"Mail durumu"))),React.createElement("div",{className:"status-list"},React.createElement("div",{className:"status-row"},React.createElement(Icon,{name:"check",size:16,style:{color:"var(--ok)"}}),React.createElement("div",null,React.createElement("strong",null,"SMTP do\u011Frulamas\u0131 ba\u015Far\u0131l\u0131"),React.createElement("small",null,"Son test: Bug\xFCn 08:00"))),React.createElement("div",{className:"status-row"},React.createElement(Icon,{name:"check",size:16,style:{color:"var(--ok)"}}),React.createElement("div",null,React.createElement("strong",null,"Personel hat\u0131rlatmas\u0131 g\xF6nderildi"),React.createElement("small",null,"5 departman \xB7 ",staffTime))),React.createElement("div",{className:"status-row"},React.createElement(Icon,{name:"clock",size:16,style:{color:"var(--accent-strong)"}}),React.createElement("div",null,React.createElement("strong",null,"Y\xF6netici raporu beklemede"),React.createElement("small",null,"Sonraki g\xF6nderim: ",adminTime))),React.createElement("div",{className:"status-row"},React.createElement(Icon,{name:"info",size:16,style:{color:"var(--info)"}}),React.createElement("div",null,React.createElement("strong",null,"Mail logu"),React.createElement("small",null,"Son 30 g\xFCnde 87 e-posta g\xF6nderildi"))))))));}const screenStyles=`
.danger { color: var(--danger); }

/* Order cards */
.order-list { display: flex; flex-direction: column; }
.order-card {
  padding: 16px 18px;
  border-bottom: 1px solid var(--line-soft);
}
.order-card:last-child { border-bottom: 0; }
.order-card-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.order-card-info { flex: 1; min-width: 0; display: flex; flex-direction: column; line-height: 1.3; }
.order-card-info strong { font-size: 14.5px; font-weight: 600; color: var(--ink-900); }
.order-card-info small { font-size: 12.5px; color: var(--ink-500); }
.order-card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  padding: 12px 14px;
  background: var(--surface-soft);
  border-radius: var(--r-sm);
  margin-bottom: 10px;
}
.order-meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.order-meta small { font-size: 11px; color: var(--ink-500); font-weight: 500; letter-spacing: 0.02em; text-transform: uppercase; }
.order-meta strong { font-size: 14.5px; font-weight: 600; color: var(--ink-900); }
.order-meta strong.danger { color: var(--danger); }
.order-card-reason {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 9px 12px;
  background: var(--brand-tint);
  border-radius: var(--r-sm);
  font-size: 13px;
  color: var(--ink-700);
  margin-bottom: 10px;
}
.order-card-reason svg { color: var(--brand); margin-top: 2px; flex-shrink: 0; }
.order-card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

@media (max-width: 700px) {
  .order-card-grid { grid-template-columns: 1fr 1fr; }
  .order-card-foot { flex-direction: column; align-items: stretch; }
}

/* Critical list (right panel) */
.critical-list { padding: 4px 0; }
.critical-row {
  display: grid;
  grid-template-columns: minmax(0,1fr) minmax(100px, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 11px 18px;
  border-bottom: 1px solid var(--line-soft);
}
.critical-row:last-child { border-bottom: 0; }
.critical-row-info { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.critical-row-info strong { font-size: 13.5px; font-weight: 600; color: var(--ink-900); }
.critical-row-info small { font-size: 11.5px; color: var(--ink-500); }
.critical-row-stat { display: flex; flex-direction: column; gap: 4px; }
.cr-bar { height: 4px; background: var(--surface-sunken); border-radius: var(--r-pill); overflow: hidden; }
.cr-bar-fill { height: 100%; background: var(--danger); border-radius: var(--r-pill); }
.cr-nums { font-size: 11.5px; display: flex; gap: 4px; }
.cr-nums strong { font-weight: 600; color: var(--danger); }

@media (max-width: 700px) {
  .critical-row { grid-template-columns: 1fr; gap: 6px; padding: 12px 14px; }
}

/* Report hero */
.report-hero {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px 26px;
  border-radius: var(--r-lg);
  background:
    radial-gradient(600px 300px at 80% 50%, rgba(192,138,62,0.18), transparent 60%),
    linear-gradient(135deg, #0f2823 0%, #0d3833 100%);
  color: #fff;
}
.report-hero-titles { flex: 1; min-width: 0; }
.report-hero-titles .eyebrow { color: var(--accent); }
.report-hero-stats { display: flex; gap: 18px; }
.report-hero-stats > div {
  border: 1px solid rgba(255,255,255,0.12);
  padding: 12px 16px;
  border-radius: var(--r-md);
  background: rgba(255,255,255,0.04);
  min-width: 130px;
}
.report-hero-stats small { color: #9eb6b0; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 500; display: block; margin-bottom: 4px; }
.report-hero-stats strong { color: #fff; font-size: 18px; font-weight: 600; display: block; font-variant-numeric: tabular-nums; }

@media (max-width: 760px) {
  .report-hero { flex-direction: column; align-items: stretch; padding: 18px; }
  .report-hero-stats { flex-wrap: wrap; }
  .report-hero-stats > div { flex: 1; min-width: 130px; }
}

/* Report tabs */
.report-tabs {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  overflow-x: auto;
}
.report-tabs button {
  padding: 8px 14px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-600);
  white-space: nowrap;
  transition: all 0.12s;
}
.report-tabs button:hover { color: var(--ink-900); }
.report-tabs button.on {
  background: var(--brand);
  color: #fff;
  font-weight: 600;
}

/* Usage bars */
.usage-bars { display: flex; flex-direction: column; gap: 14px; }
.usage-bar-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.5fr);
  gap: 16px;
  align-items: center;
}
.usage-bar-label { display: flex; gap: 10px; align-items: center; min-width: 0; }
.usage-bar-label strong { font-size: 13.5px; font-weight: 600; color: var(--ink-900); display: block; line-height: 1.25; }
.usage-bar-label small { font-size: 12px; color: var(--ink-500); line-height: 1.25; }
.usage-bar-wrap { display: flex; align-items: center; gap: 14px; min-width: 0; }
.usage-bar-track {
  flex: 1;
  height: 10px;
  background: var(--surface-soft);
  border-radius: var(--r-pill);
  overflow: hidden;
}
.usage-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--brand), var(--accent));
  border-radius: var(--r-pill);
}
.usage-bar-wrap strong {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-900);
  font-variant-numeric: tabular-nums;
  min-width: 90px;
  text-align: right;
}

@media (max-width: 700px) {
  .usage-bar-row { grid-template-columns: 1fr; gap: 6px; }
}

/* Mail preview body */
.mail-preview-body {
  padding: 20px 24px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-700);
  background: #fafbfa;
}
.mail-head-row { font-size: 13px; color: var(--ink-600); margin-bottom: 4px; }
.mail-head-row strong { color: var(--ink-800); font-weight: 600; margin-right: 6px; }
.mail-preview-body hr { border: 0; border-top: 1px solid var(--line); margin: 14px 0; }
.mail-body p { margin: 10px 0; }
.mail-body ul { margin: 10px 0; padding-left: 22px; }
.mail-body li { margin: 4px 0; }

/* New product form grid */
.np-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
@media (max-width: 600px) {
  .np-grid { grid-template-columns: 1fr; }
}

/* Status list (mail) */
.status-list { padding: 4px 0; }
.status-row {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--line-soft);
}
.status-row:last-child { border-bottom: 0; }
.status-row svg { flex-shrink: 0; margin-top: 2px; }
.status-row strong { display: block; font-size: 13.5px; font-weight: 600; color: var(--ink-900); }
.status-row small { display: block; font-size: 12px; color: var(--ink-500); margin-top: 1px; }
`;Object.assign(window,{Orders,Reports,AdminProducts,AdminUsers,MailSettings,SCREEN_STYLES:screenStyles});const NAV_ITEMS=[{id:"dashboard",label:"Komuta Paneli",icon:"dashboard",roles:["admin","departman"]},{id:"stock",label:"Stok Sayım",icon:"stock",roles:["admin","departman"]},{id:"orders",label:"Sipariş Talepleri",icon:"orders",roles:["admin","departman"],badge:"danger"},{id:"reports",label:"Günlük Rapor",icon:"reports",roles:["admin"]}];const ADMIN_NAV=[{id:"products",label:"Ürün Yönetimi",icon:"products",roles:["admin"]},{id:"users",label:"Kullanıcı Yönetimi",icon:"user",roles:["admin"]},{id:"mail",label:"Mail & Otomasyon",icon:"mail",roles:["admin"]}];const MOBILE_NAV=[{id:"dashboard",label:"Panel",icon:"dashboard"},{id:"stock",label:"Sayım",icon:"stock"},{id:"orders",label:"Sipariş",icon:"orders",badge:true},{id:"reports",label:"Rapor",icon:"reports"},{id:"more",label:"Daha",icon:"more"}];function App(){const[user,setUser]=React.useState(null);const[route,setRoute]=React.useState("dashboard");const[stockDept,setStockDept]=React.useState(null);const[moreOpen,setMoreOpen]=React.useState(false);const[tweaksOpen,setTweaksOpen]=React.useState(false);const[tweaks,setTweaks]=React.useState({accent:"#c08a3e",brand:"#0d6e5e",density:"balanced",radius:"soft",sidebar:"dark"});React.useEffect(()=>{function onMsg(e){if(e.data?.type==="__activate_edit_mode")setTweaksOpen(true);if(e.data?.type==="__deactivate_edit_mode")setTweaksOpen(false);}window.addEventListener("message",onMsg);window.parent.postMessage({type:"__edit_mode_available"},"*");return()=>window.removeEventListener("message",onMsg);},[]);React.useEffect(()=>{const root=document.documentElement;root.style.setProperty("--brand",tweaks.brand);root.style.setProperty("--accent",tweaks.accent);if(tweaks.density==="compact"){root.style.setProperty("--r-md","8px");root.style.setProperty("--r-lg","10px");}else if(tweaks.density==="airy"){root.style.setProperty("--r-md","14px");root.style.setProperty("--r-lg","18px");}else{root.style.setProperty("--r-md","12px");root.style.setProperty("--r-lg","16px");}const rmap={sharp:{sm:"4px",md:"6px",lg:"8px"},soft:{sm:"8px",md:"12px",lg:"16px"},round:{sm:"12px",md:"18px",lg:"24px"}}[tweaks.radius];root.style.setProperty("--r-sm",rmap.sm);root.style.setProperty("--r-md",rmap.md);root.style.setProperty("--r-lg",rmap.lg);if(tweaks.sidebar==="light"){root.style.setProperty("--rail-bg","#ffffff");root.style.setProperty("--rail-bg-2","#f4f6f4");root.style.setProperty("--rail-text","#2f3d3a");root.style.setProperty("--rail-text-strong","#0d1815");root.style.setProperty("--rail-muted","#6b7975");root.style.setProperty("--rail-line","#e7eae8");root.style.setProperty("--rail-hover","#f0f3f1");root.style.setProperty("--rail-active","#e6f0ed");}else{root.style.setProperty("--rail-bg","#0f221e");root.style.setProperty("--rail-bg-2","#0a1916");root.style.setProperty("--rail-text","#d8e3df");root.style.setProperty("--rail-text-strong","#ffffff");root.style.setProperty("--rail-muted","#94a59f");root.style.setProperty("--rail-line","rgba(255,255,255,0.08)");root.style.setProperty("--rail-hover","rgba(255,255,255,0.06)");root.style.setProperty("--rail-active","rgba(255,255,255,0.12)");}},[tweaks]);if(!user){return React.createElement(LoginScreen,{onLogin:u=>{setUser(u);setRoute("dashboard");}});}function navigate(target,payload){if(target==="stock"&&payload)setStockDept(payload);setRoute(target);setMoreOpen(false);}let currentScreen;switch(route){case"dashboard":currentScreen=React.createElement(Dashboard,{currentUser:user,onNavigate:navigate});break;case"stock":currentScreen=React.createElement(StockCount,{currentUser:user,selectedDept:stockDept,onNavigate:navigate});break;case"orders":currentScreen=React.createElement(Orders,{currentUser:user,onNavigate:navigate});break;case"reports":currentScreen=React.createElement(Reports,{onNavigate:navigate});break;case"products":currentScreen=React.createElement(AdminProducts,{onNavigate:navigate});break;case"users":currentScreen=React.createElement(AdminUsers,null);break;case"mail":currentScreen=React.createElement(MailSettings,null);break;default:currentScreen=React.createElement(Dashboard,{currentUser:user,onNavigate:navigate});}const allNav=[...NAV_ITEMS,...ADMIN_NAV].filter(n=>n.roles.includes(user.role));const pendingOrdersCount=ORDER_REQUESTS.filter(o=>o.status==="pending").length;return React.createElement("div",{className:"app-shell"},React.createElement("aside",{className:"rail"},React.createElement("div",{className:"rail-brand"},React.createElement("div",{className:"rail-mark"},"OY"),React.createElement("div",{className:"rail-brand-text"},React.createElement("strong",null,"Otel Y\xF6netim"),React.createElement("small",null,"G\xFClplaj Resort"))),React.createElement("nav",{className:"rail-nav"},React.createElement("div",{className:"rail-section-label"},"Operasyon"),NAV_ITEMS.filter(n=>n.roles.includes(user.role)).map(n=>React.createElement("button",{key:n.id,className:`rail-link ${route===n.id?"active":""}`,onClick:()=>navigate(n.id)},React.createElement(Icon,{name:n.icon,size:17}),n.label,n.id==="orders"&&pendingOrdersCount>0&&React.createElement("span",{className:"rail-badge"},pendingOrdersCount)))),user.role==="admin"&&React.createElement("nav",{className:"rail-nav"},React.createElement("div",{className:"rail-section-label"},"Y\xF6netici"),ADMIN_NAV.map(n=>React.createElement("button",{key:n.id,className:`rail-link ${route===n.id?"active":""}`,onClick:()=>navigate(n.id)},React.createElement(Icon,{name:n.icon,size:17}),n.label))),React.createElement("div",{className:"rail-user"},React.createElement("div",{className:"rail-avatar"},initials(user.name)),React.createElement("div",{className:"rail-user-info"},React.createElement("strong",null,user.name),React.createElement("small",null,user.role==="admin"?"Yönetici":deptById(user.department)?.name)),React.createElement("button",{onClick:()=>setUser(null),title:"\xC7\u0131k\u0131\u015F"},React.createElement(Icon,{name:"logout",size:14})))),React.createElement("div",{className:"mobile-topbar"},React.createElement("div",{className:"mobile-brand"},React.createElement("div",{className:"rail-mark"},"OY"),React.createElement("strong",null,"Otel Y\xF6netim")),React.createElement("div",{className:"mobile-topbar-actions"},React.createElement("button",{className:"mobile-icon-btn"},React.createElement(Icon,{name:"bell"}),React.createElement("span",{className:"dot"})),React.createElement("button",{className:"mobile-icon-btn",onClick:()=>setUser(null),title:"\xC7\u0131k\u0131\u015F"},React.createElement(Icon,{name:"logout"})))),React.createElement("main",{className:"main"},currentScreen),React.createElement("nav",{className:"mobile-nav"},MOBILE_NAV.map(n=>{if(n.id==="more"){return React.createElement("button",{key:n.id,className:moreOpen?"on":"",onClick:()=>setMoreOpen(o=>!o)},React.createElement(Icon,{name:"menu"}),React.createElement("span",null,n.label));}return React.createElement("button",{key:n.id,className:route===n.id?"on":"",onClick:()=>navigate(n.id),style:{position:"relative"}},React.createElement(Icon,{name:n.icon}),n.badge&&pendingOrdersCount>0&&React.createElement("span",{style:{position:"absolute",top:4,right:22,width:8,height:8,borderRadius:4,background:"var(--danger)"}}),React.createElement("span",null,n.label));})),moreOpen&&React.createElement("div",{className:"more-sheet",onClick:()=>setMoreOpen(false)},React.createElement("div",{className:"more-sheet-content",onClick:e=>e.stopPropagation()},React.createElement("div",{className:"more-sheet-handle"}),React.createElement("div",{className:"more-sheet-title"},"Daha fazla"),user.role==="admin"&&ADMIN_NAV.map(n=>React.createElement("button",{key:n.id,className:"more-sheet-item",onClick:()=>navigate(n.id)},React.createElement("div",{className:"more-sheet-icon"},React.createElement(Icon,{name:n.icon})),React.createElement("span",null,n.label),React.createElement(Icon,{name:"arrow_right",size:14}))),React.createElement("button",{className:"more-sheet-item danger",onClick:()=>setUser(null)},React.createElement("div",{className:"more-sheet-icon"},React.createElement(Icon,{name:"logout"})),React.createElement("span",null,"\xC7\u0131k\u0131\u015F yap")))),tweaksOpen&&React.createElement(TweaksPanel,{tweaks:tweaks,setTweaks:setTweaks,onClose:()=>{setTweaksOpen(false);window.parent.postMessage({type:"__edit_mode_dismissed"},"*");}}));}function TweaksPanel({tweaks,setTweaks,onClose}){function update(key,value){setTweaks(t=>({...t,[key]:value}));}const brandSwatches=[{name:"Zümrüt",value:"#0d6e5e"},{name:"Lacivert",value:"#1c3d6e"},{name:"Bordo",value:"#7a2e3e"},{name:"Kömür",value:"#2a2e2e"}];const accentSwatches=[{name:"Altın",value:"#c08a3e"},{name:"Bakır",value:"#b06030"},{name:"Şampanya",value:"#a89060"},{name:"Hardal",value:"#a18030"}];return React.createElement("div",{className:"tweaks-panel"},React.createElement("div",{className:"tweaks-head"},React.createElement("strong",null,"Tweaks"),React.createElement("button",{onClick:onClose},React.createElement(Icon,{name:"x",size:16}))),React.createElement("div",{className:"tweaks-body"},React.createElement("div",{className:"tweak-section"},React.createElement("label",null,"Marka rengi"),React.createElement("div",{className:"swatch-row"},brandSwatches.map(s=>React.createElement("button",{key:s.value,className:`swatch ${tweaks.brand===s.value?"on":""}`,style:{background:s.value},onClick:()=>update("brand",s.value),title:s.name})))),React.createElement("div",{className:"tweak-section"},React.createElement("label",null,"Aksan rengi"),React.createElement("div",{className:"swatch-row"},accentSwatches.map(s=>React.createElement("button",{key:s.value,className:`swatch ${tweaks.accent===s.value?"on":""}`,style:{background:s.value},onClick:()=>update("accent",s.value),title:s.name})))),React.createElement("div",{className:"tweak-section"},React.createElement("label",null,"Yo\u011Funluk"),React.createElement("div",{className:"segmented",style:{width:"100%"}},[{id:"compact",label:"Kompakt"},{id:"balanced",label:"Dengeli"},{id:"airy",label:"Ferah"}].map(o=>React.createElement("button",{key:o.id,className:tweaks.density===o.id?"on":"",onClick:()=>update("density",o.id),style:{flex:1}},o.label)))),React.createElement("div",{className:"tweak-section"},React.createElement("label",null,"K\xF6\u015Fe yuvarlakl\u0131\u011F\u0131"),React.createElement("div",{className:"segmented",style:{width:"100%"}},[{id:"sharp",label:"Keskin"},{id:"soft",label:"Yumuşak"},{id:"round",label:"Yuvarlak"}].map(o=>React.createElement("button",{key:o.id,className:tweaks.radius===o.id?"on":"",onClick:()=>update("radius",o.id),style:{flex:1}},o.label)))),React.createElement("div",{className:"tweak-section"},React.createElement("label",null,"Sidebar"),React.createElement("div",{className:"segmented",style:{width:"100%"}},React.createElement("button",{className:tweaks.sidebar==="dark"?"on":"",onClick:()=>update("sidebar","dark"),style:{flex:1}},"Koyu"),React.createElement("button",{className:tweaks.sidebar==="light"?"on":"",onClick:()=>update("sidebar","light"),style:{flex:1}},"A\xE7\u0131k")))));}const shellExtraStyles=`
/* More sheet (mobile) */
.more-sheet {
  position: fixed;
  inset: 0;
  background: rgba(13, 24, 21, 0.5);
  z-index: 60;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.more-sheet-content {
  width: 100%;
  max-width: 480px;
  background: var(--surface);
  border-radius: var(--r-lg) var(--r-lg) 0 0;
  padding: 18px 0;
  margin-bottom: 70px;
  box-shadow: var(--shadow-lg);
}
.more-sheet-handle {
  width: 40px;
  height: 4px;
  background: var(--line-strong);
  border-radius: 4px;
  margin: 0 auto 14px;
}
.more-sheet-title {
  padding: 0 18px 12px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-500);
}
.more-sheet-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 18px;
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-800);
}
.more-sheet-item:hover { background: var(--surface-soft); }
.more-sheet-item.danger { color: var(--danger); border-top: 1px solid var(--line-soft); margin-top: 8px; padding-top: 16px; }
.more-sheet-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--surface-soft); color: var(--ink-700);
  display: grid; place-items: center;
}
.more-sheet-item.danger .more-sheet-icon { background: var(--danger-soft); color: var(--danger); }
.more-sheet-item span { flex: 1; }

/* Tweaks panel */
.tweaks-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-lg);
  z-index: 100;
  overflow: hidden;
}
.tweaks-head {
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--line-soft);
  background: var(--surface-soft);
}
.tweaks-head strong { font-size: 13px; font-weight: 600; color: var(--ink-900); letter-spacing: 0.04em; text-transform: uppercase; }
.tweaks-head button { color: var(--ink-600); padding: 4px; }
.tweaks-body { padding: 14px; display: flex; flex-direction: column; gap: 14px; }
.tweak-section { display: flex; flex-direction: column; gap: 7px; }
.tweak-section > label {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--ink-700);
}
.swatch-row { display: flex; gap: 6px; }
.swatch {
  width: 32px; height: 32px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
  transition: transform 0.12s;
}
.swatch:hover { transform: scale(1.06); }
.swatch.on {
  border-color: var(--ink-900);
  box-shadow: 0 0 0 2px #fff inset;
}

@media (max-width: 600px) {
  .tweaks-panel {
    bottom: 78px;
    right: 12px;
    left: 12px;
    width: auto;
  }
}
`;Object.assign(window,{App,TweaksPanel,SHELL_STYLES:shellExtraStyles});const styleEl=document.getElementById("__runtime-styles");if(styleEl){styleEl.textContent=[window.LOGIN_STYLES,window.DASHBOARD_STYLES,window.STOCK_STYLES,window.SCREEN_STYLES,window.SHELL_STYLES].filter(Boolean).join("\n");}const root=ReactDOM.createRoot(document.getElementById("root"));root.render(React.createElement(App));