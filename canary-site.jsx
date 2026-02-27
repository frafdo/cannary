import { useState } from "react";

const C = {
  black: "#1a1a1a", dark: "#2d2d2d", mid: "#4a4a4a", gray: "#888",
  light: "#e8e8e8", off: "#f5f4f0", white: "#fff",
  yellow: "#d4a012", yellowL: "#f0d654", yellowD: "#b8860b", yellowM: "#e8d48b",
  red: "#c0392b", green: "#27ae60",
};

const PLANS = [
  { name: "مجاني", price: 0, posts: 1, duration: "أسبوع", color: C.gray },
  { name: "فضي", price: 10, posts: 5, duration: "أسبوع", color: "#a0a0a0" },
  { name: "ذهبي", price: 20, posts: 10, duration: "أسبوعين", color: C.yellow },
  { name: "بلاتيني", price: 30, posts: "غير محدود", duration: "شهر كامل", color: C.dark },
];

const BREEDS = ["ووترسلاجر", "تمبرادو", "رولر", "جلوستر", "يوركشاير", "نورويتش", "فايف فانسي", "بوردر", "ريد فاكتور", "ليزارد", "كرستد", "ستافورد"];
const CITIES = ["الرياض", "جدة", "الدمام", "مكة", "المدينة", "تبوك", "أبها", "الخبر", "الطائف", "بريدة"];

const canaries = [
  { id: 1, name: "ووترسلاجر ذكر بطل", breed: "ووترسلاجر", age: "سنة", price: 850, seller: "كناري الناصر", city: "الرياض", color: "أصفر", singing: "ممتاز", featured: true, desc: "ووترسلاجر حائز على جوائز بجودة تغريد استثنائية. من سلالات بلجيكية مستوردة. جاهز للمسابقات." },
  { id: 2, name: "زوج تمبرادو مغرد", breed: "تمبرادو", age: "٨ أشهر", price: 1200, seller: "طيور جدة", city: "جدة", color: "أخضر/أصفر", singing: "جيد جداً", featured: true, desc: "زوج تمبرادو إسباني متوافق. نمط تغريد معدني قوي. مثالي لبرنامج التربية." },
  { id: 3, name: "جلوستر كورونا أنثى", breed: "جلوستر", age: "٦ أشهر", price: 450, seller: "طيور الصحراء", city: "الدمام", color: "قرفة", singing: "متوسط", featured: false, desc: "جلوستر كورونا بتشكيل تاج مثالي. عينة بجودة عرض مع مزاج هادئ." },
  { id: 4, name: "يوركشاير عملاق للعرض", breed: "يوركشاير", age: "سنتان", price: 1800, seller: "كناري رويال", city: "الرياض", color: "أصفر صافي", singing: "جيد", featured: true, desc: "يوركشاير مهيب بطول ١٧ سم. حائز على جوائز عرض متعددة. وقفة وجودة ريش ممتازة." },
  { id: 5, name: "ريد فاكتور ذكر تربية", breed: "ريد فاكتور", age: "سنة ونصف", price: 650, seller: "طيور الألوان", city: "الطائف", color: "أحمر غامق", singing: "جيد", featured: false, desc: "ريد فاكتور ذكر بتلوين زاهي. مربي مثبت مع استجابة ممتازة للتغذية اللونية." },
  { id: 6, name: "زوج نورويتش متوج", breed: "نورويتش", age: "١٠ أشهر", price: 2200, seller: "طيور بريميوم", city: "الخبر", color: "أصفر باهت", singing: "متوسط", featured: true, desc: "زوج نورويتش بجودة معرض. صدر عريض وملمس ريش ممتاز. سلالات أوروبية مستوردة." },
  { id: 7, name: "فايف فانسي ذكر صغير", breed: "فايف فانسي", age: "٤ أشهر", price: 350, seller: "كناري الناصر", city: "الرياض", color: "مبرقش", singing: "قيد التطور", featured: false, desc: "فايف فانسي واعد ببنية ممتازة. صغير ومضغوط وفقاً لمعايير السلالة." },
  { id: 8, name: "ثلاثي رولر كناري", breed: "رولر", age: "سنة", price: 1500, seller: "هارز ماونتن", city: "المدينة", color: "أخضر", singing: "استثنائي", featured: true, desc: "ثلاثة ذكور رولر هارز مدربين بمقاطع تغريد عميقة ومتدحرجة. لفة مجوفة وجولة باس مؤكدة." },
  { id: 9, name: "بوردر كناري أنثى", breed: "بوردر", age: "٧ أشهر", price: 300, seller: "طيور الصحراء", city: "الدمام", color: "أصفر", singing: "خفيف", featured: false, desc: "بوردر نظيفة ومتناسقة. مثالية للتربية بجودة ريش ممتازة." },
  { id: 10, name: "ليزارد كناري نادر", breed: "ليزارد", age: "سنة", price: 3500, seller: "طيور نادرة", city: "جدة", color: "تاج ذهبي", singing: "جيد", featured: true, desc: "ليزارد نادر للغاية بتاج ذهبي ونمط حراشف مثالي. عينة بجودة متحفية." },
];

const auctionsInit = [
  { id: 1, title: "ووترسلاجر ذكر بطولة", breed: "ووترسلاجر", current: 1250, bids: 18, end: "٢ س ٣٤ د", hot: true },
  { id: 2, title: "زوج رولر بلجيكي مستورد", breed: "رولر", current: 2800, bids: 24, end: "٥ س ١٢ د", hot: true },
  { id: 3, title: "يوركشاير عملاق للعرض", breed: "يوركشاير", current: 1600, bids: 11, end: "١ يوم ٣ س", hot: false },
  { id: 4, title: "ستافورد كناري نادر", breed: "ستافورد", current: 4200, bids: 31, end: "٤٥ د", hot: true },
  { id: 5, title: "مجموعة جلوستر للتربية", breed: "جلوستر", current: 950, bids: 8, end: "٢ يوم ٨ س", hot: false },
  { id: 6, title: "رباعي تمبرادو للمسابقات", breed: "تمبرادو", current: 3100, bids: 19, end: "٨ س ٤٥ د", hot: true },
];

const suppliersData = [
  { id: 1, name: "مستلزمات الجزيرة", cat: "أقفاص وإكسسوارات", city: "الرياض", rating: 4.8, reviews: 124, verified: true, desc: "أقفاص كناري فاخرة وصناديق تربية وإكسسوارات. وكيل معتمد لفيربلاست وسافيك." },
  { id: 2, name: "بذور الوادي الأخضر", cat: "طعام وبذور", city: "جدة", rating: 4.6, reviews: 89, verified: true, desc: "خلطات بذور كناري متخصصة وطعام بيض ومكملات تلوين. خيارات عضوية متوفرة." },
  { id: 3, name: "رعاية الطيور العربية", cat: "منتجات صحية", city: "الدمام", rating: 4.9, reviews: 201, verified: true, desc: "فيتامينات ومكملات وعلاجات طفيليات ومساعدات تربية مصممة خصيصاً للكناري." },
  { id: 4, name: "ريشة وعش", cat: "مستلزمات تعشيش", city: "الرياض", rating: 4.5, reviews: 67, verified: true, desc: "مواد تعشيش وأقفاص تربية وكشافات بيض ومستلزمات تربية يدوية لمربي الكناري." },
  { id: 5, name: "عالم الكناري للتجارة", cat: "مستلزمات مستوردة", city: "الخبر", rating: 4.7, reviews: 156, verified: true, desc: "معدات تربية أوروبية مستوردة وأقفاص عرض وأدوات تربية احترافية." },
  { id: 6, name: "صانعو الألحان", cat: "أدوات تدريب", city: "المدينة", rating: 4.4, reviews: 43, verified: false, desc: "أقراص تدريب التغريد وتسجيلات طيور معلمة وخزائن عزل صوتي لتدريب تغريد الكناري." },
];

const servicesData = [
  { id: 1, name: "فحص DNA لتحديد الجنس", provider: "مختبر بيولاب العربي", city: "الرياض", price: "٧٥ ريال", cat: "فحوصات" },
  { id: 2, name: "إيواء الكناري", provider: "أجنحة آمنة", city: "جدة", price: "٢٥ ريال/يوم", cat: "إيواء" },
  { id: 3, name: "برنامج تدريب التغريد", provider: "أكاديمية التغريد", city: "الرياض", price: "٢٠٠ ريال/شهر", cat: "تدريب" },
  { id: 4, name: "تجهيز للمعارض", provider: "تجهيز البطولات", city: "الدمام", price: "١٥٠ ريال", cat: "تجميل" },
  { id: 5, name: "استشارة تربية", provider: "د. خالد - وراثة الطيور", city: "الرياض", price: "٣٠٠ ريال/جلسة", cat: "استشارات" },
  { id: 6, name: "خدمة نقل الطيور", provider: "أجنحة إكسبريس", city: "متعدد", price: "من ٥٠ ريال", cat: "نقل" },
];

const medsData = [
  { id: 1, name: "علاج تنفسي للكناري", brand: "أفيان فارما", type: "سائل", price: "٤٥ ريال", cond: "التهابات تنفسية" },
  { id: 2, name: "بخاخ مضاد للعث", brand: "بيرد شيلد", type: "بخاخ", price: "٣٥ ريال", cond: "طفيليات خارجية" },
  { id: 3, name: "فيتامينات شاملة للكناري", brand: "فيتا بيرد", type: "قطرات", price: "٥٥ ريال", cond: "صحة عامة" },
  { id: 4, name: "مانع احتباس البيض", brand: "أفيان فارما", type: "مكمل", price: "٦٥ ريال", cond: "صحة إنجابية" },
  { id: 5, name: "تركيبة نمو الريش", brand: "بلوما كير", type: "بودرة", price: "٤٠ ريال", cond: "دعم القلش" },
  { id: 6, name: "طارد ديدان للكناري", brand: "بيرد شيلد", type: "سائل", price: "٥٠ ريال", cond: "طفيليات داخلية" },
];

const vetsData = [
  { id: 1, name: "د. أحمد الفهد", clinic: "عيادة الرياض للطيور", city: "الرياض", spec: "طب الطيور", exp: "١٥ سنة", rating: 4.9, emergency: true },
  { id: 2, name: "د. سارة حسن", clinic: "مستشفى جدة للطيور", city: "جدة", spec: "جراحة الطيور", exp: "١٢ سنة", rating: 4.8, emergency: true },
  { id: 3, name: "د. محمد قرشي", clinic: "بيطري المنطقة الشرقية", city: "الدمام", spec: "وراثة الكناري", exp: "١٠ سنوات", rating: 4.7, emergency: false },
  { id: 4, name: "د. فاطمة الرشيد", clinic: "أجنحة وعافية", city: "الرياض", spec: "رعاية وقائية", exp: "٨ سنوات", rating: 4.6, emergency: false },
  { id: 5, name: "د. خالد إبراهيم", clinic: "مركز الطائف البيطري", city: "الطائف", spec: "تغذية الطيور", exp: "٢٠ سنة", rating: 4.9, emergency: true },
];

const blogData = [
  { id: 1, title: "الدليل الشامل لتدريب تغريد الووترسلاجر", author: "أحمد الناصر", date: "قبل يومين", cat: "تدريب", likes: 47, comments: 12, excerpt: "بعد ٢٠ سنة من تربية الووترسلاجر، طورت طريقة تدريب تغريد تنتج باستمرار مغردين بمستوى مسابقات. المفتاح يبدأ باختيار الطائر المعلم المناسب..." },
  { id: 2, title: "تجهيزات موسم التربية: ما يجب أن يعرفه كل مربي", author: "د. سارة حسن", date: "قبل ٥ أيام", cat: "تربية", likes: 83, comments: 28, excerpt: "مع اقتراب موسم التربية، التحضير السليم يمكن أن يحدث الفارق بين فراخ صحية وخيبة أمل. ابدأ بتعديل التغذية قبل ٦ أسابيع من التزاوج..." },
  { id: 3, title: "لماذا يفقد الريد فاكتور لونه وكيف تعالج ذلك", author: "طيور الألوان", date: "قبل أسبوع", cat: "صحة", likes: 62, comments: 19, excerpt: "التغذية اللونية فن وعلم في آن واحد. كثير من ملاك الريد فاكتور الجدد يصابون بخيبة أمل عندما تبهت ألوان طيورهم بعد أول قلش..." },
  { id: 4, title: "بناء غرفة الكناري المثالية: التحكم بالمناخ في السعودية", author: "فهد المطيري", date: "قبل أسبوع", cat: "إسكان", likes: 95, comments: 34, excerpt: "تربية الكناري في المناخ السعودي تمثل تحديات فريدة. تنظيم درجة الحرارة بين ١٨-٢٤ درجة أمر حاسم خاصة في أشهر الصيف..." },
  { id: 5, title: "معايير العرض: فهم ما يبحث عنه الحكام", author: "اتحاد الكناري السعودي", date: "قبل أسبوعين", cat: "معارض", likes: 71, comments: 22, excerpt: "سواء كنت تجهز كناري نوع أو كناري تغريد للمسابقة، فهم معايير التحكيم أمر أساسي. هذا الدليل يغطي نظام التقييم الرسمي..." },
  { id: 6, title: "سؤال وجواب: كناري توقف عن التغريد - الأسباب الشائعة", author: "د. محمد قرشي", date: "قبل أسبوعين", cat: "صحة", likes: 108, comments: 45, excerpt: "هذا ربما أكثر سؤال أتلقاه. كناري صامت يمكن أن يشير لعدة أمور: القلش، المرض، الإجهاد البيئي، أو ببساطة التغيرات الموسمية..." },
];

const pendingInit = [
  { id: 1, supplier: "متجر طيور جديد", title: "خلطة بذور كناري إيطالية فاخرة", cat: "طعام", time: "قبل ساعة" },
  { id: 2, supplier: "أدوات الطيور", title: "طقم حلقات أرجل احترافي", cat: "إكسسوارات", time: "قبل ٣ ساعات" },
  { id: 3, supplier: "تجارة الخليج للحيوانات", title: "أقفاص عرض مستوردة - طراز بادوفا", cat: "أقفاص", time: "أمس" },
];

const SUPPLY_CATS = ["أقفاص", "بذور وطعام", "فيتامينات ومكملات", "مستلزمات تعشيش", "أدوات تدريب", "معدات عرض", "منتجات صحية", "مستلزمات مستوردة"];

const portalProducts = [
  { id: 1, name: "قفص كناري فاخر - موديل ميلانو", cat: "أقفاص", price: "٣٥٠ ريال", stock: 12, status: "نشط", views: 847, orders: 23, img: 0 },
  { id: 2, name: "خلطة بذور كناري سوبر بريميوم ١ كجم", cat: "بذور وطعام", price: "٤٥ ريال", stock: 156, status: "نشط", views: 1203, orders: 89, img: 1 },
  { id: 3, name: "فيتامين E سائل للتربية ٣٠ مل", cat: "فيتامينات ومكملات", price: "٦٥ ريال", stock: 45, status: "نشط", views: 562, orders: 34, img: 2 },
  { id: 4, name: "عش كناري خيزران طبيعي (عبوة ٥)", cat: "مستلزمات تعشيش", price: "٢٥ ريال", stock: 230, status: "نشط", views: 921, orders: 67, img: 3 },
  { id: 5, name: "قفص عرض بادوفا مستورد", cat: "معدات عرض", price: "٨٥٠ ريال", stock: 3, status: "مخزون منخفض", views: 445, orders: 5, img: 4 },
  { id: 6, name: "طعام بيض بالعسل ٥٠٠ جرام", cat: "بذور وطعام", price: "٣٨ ريال", stock: 0, status: "نفذ المخزون", views: 678, orders: 42, img: 1 },
  { id: 7, name: "بخاخ مضاد للعث - آمن للطيور", cat: "منتجات صحية", price: "٣٥ ريال", stock: 78, status: "نشط", views: 334, orders: 19, img: 2 },
  { id: 8, name: "حلقات أرجل ألمنيوم ملونة (١٠٠ حلقة)", cat: "معدات عرض", price: "٤٠ ريال", stock: 95, status: "نشط", views: 289, orders: 15, img: 3 },
];

const portalAds = [
  { id: 1, title: "عرض خاص: خصم ٢٠٪ على جميع الأقفاص", status: "منشور", submitted: "قبل ٣ أيام", views: 1234, clicks: 89, expires: "٢٠ يوم" },
  { id: 2, title: "وصول شحنة بذور أوروبية جديدة", status: "منشور", submitted: "قبل أسبوع", views: 876, clicks: 56, expires: "١٣ يوم" },
  { id: 3, title: "مستلزمات تربية الموسم الجديد متوفرة", status: "بانتظار المراجعة", submitted: "قبل ساعتين", views: 0, clicks: 0, expires: "-" },
  { id: 4, title: "تخفيضات نهاية الشهر - فيتامينات ومكملات", status: "بانتظار المراجعة", submitted: "قبل ٤ ساعات", views: 0, clicks: 0, expires: "-" },
  { id: 5, title: "أقفاص عرض إيطالية - كمية محدودة", status: "مرفوض", submitted: "قبل ٥ أيام", views: 0, clicks: 0, expires: "-", reason: "الصور غير واضحة - يرجى إعادة الإرسال بصور عالية الجودة" },
  { id: 6, title: "باقة المربي المبتدئ - كل ما تحتاجه", status: "منتهي", submitted: "قبل شهر", views: 2341, clicks: 178, expires: "منتهي" },
];

const portalOrders = [
  { id: "ORD-١٠٤٥", product: "قفص كناري فاخر - موديل ميلانو", buyer: "أحمد الكريم", city: "الرياض", qty: 1, total: "٣٥٠ ريال", status: "جديد", date: "اليوم" },
  { id: "ORD-١٠٤٤", product: "خلطة بذور كناري سوبر بريميوم", buyer: "فهد السالم", city: "جدة", qty: 3, total: "١٣٥ ريال", status: "قيد التجهيز", date: "أمس" },
  { id: "ORD-١٠٤٣", product: "فيتامين E سائل للتربية", buyer: "سلطان العمري", city: "الدمام", qty: 2, total: "١٣٠ ريال", status: "تم الشحن", date: "قبل يومين" },
  { id: "ORD-١٠٤٢", product: "عش كناري خيزران (عبوة ٥)", buyer: "خالد الحربي", city: "الرياض", qty: 5, total: "١٢٥ ريال", status: "تم التسليم", date: "قبل ٣ أيام" },
  { id: "ORD-١٠٤١", product: "حلقات أرجل ألمنيوم ملونة", buyer: "ناصر المنصور", city: "الخبر", qty: 2, total: "٨٠ ريال", status: "تم التسليم", date: "قبل ٤ أيام" },
];

const Svg = ({ children, s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
const ISearch = () => <Svg><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Svg>;
const IClock = () => <Svg s={14}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Svg>;
const IHeart = () => <Svg s={14}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></Svg>;
const IChat = () => <Svg s={14}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Svg>;
const IPin = () => <Svg s={14}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Svg>;
const IShield = () => <Svg s={14}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={C.green} /></Svg>;
const IFire = () => <Svg s={14}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" stroke={C.red} /></Svg>;
const IGavel = () => <Svg s={18}><path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L11 10" /><path d="m16 16 6-6" /><path d="m8 8 6-6" /><path d="m9 7 8 8" /><path d="m21 11-8-8" /></Svg>;
const IStar = ({ f }) => <svg width="14" height="14" viewBox="0 0 24 24" fill={f ? C.yellow : "none"} stroke={C.yellow} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;

const Bird = ({ s = 80, v = 0 }) => {
  const cs = [{ b: "#e8b829", w: "#c49a1a", y: "#f0d654" }, { b: "#d4a012", w: "#a07d0e", y: "#e8c84a" }, { b: "#cc8833", w: "#995522", y: "#ddaa55" }, { b: "#88aa33", w: "#668822", y: "#bbcc66" }, { b: "#cc3322", w: "#992211", y: "#dd6644" }][v % 5];
  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <ellipse cx="50" cy="55" rx="22" ry="26" fill={cs.b} /><ellipse cx="50" cy="62" rx="16" ry="14" fill={cs.y} />
      <circle cx="50" cy="32" r="14" fill={cs.b} /><circle cx="45" cy="29" r="2.5" fill="#1a1a1a" /><circle cx="44.5" cy="28.5" r=".8" fill="#fff" />
      <path d="M58 32 L70 30 L58 34 Z" fill={C.yellowD} />
      <path d="M32 50 Q20 65 28 78" stroke={cs.w} strokeWidth="3" fill="none" /><path d="M35 52 Q24 64 30 75" stroke={cs.w} strokeWidth="2" fill="none" />
      <line x1="45" y1="80" x2="43" y2="92" stroke="#886644" strokeWidth="2.5" /><line x1="55" y1="80" x2="57" y2="92" stroke="#886644" strokeWidth="2.5" />
      <line x1="40" y1="92" x2="47" y2="92" stroke="#886644" strokeWidth="2" /><line x1="54" y1="92" x2="61" y2="92" stroke="#886644" strokeWidth="2" />
    </svg>
  );
};

const Rating = ({ v }) => <div style={{ display: "flex", gap: 2, alignItems: "center" }}>{[1, 2, 3, 4, 5].map(i => <IStar key={i} f={i <= Math.round(v)} />)}<span style={{ fontSize: 13, color: C.gray, marginRight: 4 }}>{v}</span></div>;

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.white, width: "100%", maxWidth: 520, maxHeight: "85vh", overflowY: "auto", padding: "24px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 28, cursor: "pointer", color: C.gray, lineHeight: 1 }}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState("home");
  const [auctions, setAuctions] = useState(auctionsInit);
  const [pending, setPending] = useState(pendingInit);
  const [sel, setSel] = useState(null);
  const [bidM, setBidM] = useState(null);
  const [bidAmt, setBidAmt] = useState("");
  const [postForm, setPostForm] = useState(false);
  const [note, setNote] = useState(null);
  const [q, setQ] = useState("");
  const [cityF, setCityF] = useState("الكل");
  const [admin, setAdmin] = useState(false);
  const [menu, setMenu] = useState(false);
  const [portalTab, setPortalTab] = useState("dashboard");
  const [addProduct, setAddProduct] = useState(false);
  const [addAd, setAddAd] = useState(false);

  const notify = m => { setNote(m); setTimeout(() => setNote(null), 3000); };
  const go = k => { setPage(k); setMenu(false); window.scrollTo(0, 0); };

  const handleBid = () => {
    const a = parseInt(bidAmt);
    if (!a || a <= bidM.current) { notify("يجب أن يكون المبلغ أعلى من المزايدة الحالية"); return; }
    setAuctions(p => p.map(x => x.id === bidM.id ? { ...x, current: a, bids: x.bids + 1 } : x));
    setBidM(null); setBidAmt(""); notify("تم تقديم المزايدة بنجاح!");
  };

  const navs = [
    { k: "home", l: "الرئيسية" }, { k: "buy", l: "شراء" }, { k: "sell", l: "بيع" },
    { k: "auction", l: "المزادات" }, { k: "supplies", l: "المستلزمات" }, { k: "services", l: "الخدمات" },
    { k: "medication", l: "الأدوية" }, { k: "vets", l: "البيطريين" }, { k: "blog", l: "المدونة" },
    { k: "suppliers", l: "الموردين" },
  ];

  const filtered = canaries.filter(c => {
    const s = q;
    return (!s || c.name.includes(s) || c.breed.includes(s) || c.seller.includes(s)) && (cityF === "الكل" || c.city === cityF);
  });

  const CanaryCard = ({ c }) => (
    <div className="card" onClick={() => setSel(c)} style={{ cursor: "pointer" }}>
      <div className="img-box"><Bird s={90} v={c.id} />{c.featured && <span className="tag tag-y" style={{ position: "absolute", top: 10, right: 10 }}>مميز</span>}</div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>{c.breed}</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.4 }}>{c.name}</h3>
        <div className="price">{c.price} ريال</div>
        <hr className="divider" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span className="stat"><IPin />{c.city}</span><span style={{ fontSize: 12, color: C.gray }}>{c.seller}</span></div>
        <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}><span className="tag tag-g">{c.color}</span><span className="tag tag-g">تغريد: {c.singing}</span></div>
      </div>
    </div>
  );

  const AuctionCard = ({ a }) => (
    <div className="card" style={{ border: a.hot ? `1px solid ${C.red}` : undefined }}>
      <div className="img-box"><Bird s={80} v={a.id + 5} />{a.hot && <span className="badge badge-h" style={{ position: "absolute", top: 10, left: 10 }}><IFire /> ساخن</span>}<span className="tag tag-d" style={{ position: "absolute", top: 10, right: 10 }}>مزاد</span></div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>{a.breed}</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.4 }}>{a.title}</h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div><div style={{ fontSize: 11, color: C.gray }}>المزايدة الحالية</div><div className="price" style={{ color: C.yellow }}>{a.current} ريال</div></div>
          <div style={{ textAlign: "left" }}><div style={{ fontSize: 11, color: C.gray }}>ينتهي خلال</div><div style={{ color: C.red, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 4 }}><IClock />{a.end}</div></div>
        </div>
        <hr className="divider" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 13, color: C.gray }}>{a.bids} مزايدة</span><button className="btn btn-y btn-s" onClick={e => { e.stopPropagation(); setBidM(a); }}>زايد الآن</button></div>
      </div>
    </div>
  );

  const css = `
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Tajawal',sans-serif;background:${C.off};direction:rtl}
input,select,textarea,button{font-family:'Tajawal',sans-serif}
.btn{border:none;padding:10px 20px;font-size:14px;font-weight:700;cursor:pointer}
.btn-y{background:${C.yellow};color:#fff}
.btn-o{background:transparent;color:${C.black};border:1.5px solid ${C.black}}
.btn-s{padding:6px 14px;font-size:12px}
.btn-g{background:${C.green};color:#fff}
.btn-r{background:${C.red};color:#fff}
.card{background:${C.white};border:1px solid ${C.light};transition:box-shadow .2s}
.tag{display:inline-block;padding:3px 10px;font-size:11px;font-weight:700;margin-left:6px}
.tag-y{background:${C.yellow};color:#fff}
.tag-d{background:${C.black};color:#fff}
.tag-g{background:${C.light};color:${C.mid}}
.inp{width:100%;padding:10px 14px;border:1px solid ${C.light};font-size:14px;outline:none}
.lbl{font-size:12px;font-weight:700;color:${C.mid};margin-bottom:6px;display:block}
.grid{display:grid;gap:16px}
.g1{grid-template-columns:1fr}
.g2{grid-template-columns:1fr}
.g3{grid-template-columns:1fr}
.g4{grid-template-columns:1fr 1fr}
@media(min-width:540px){.g3{grid-template-columns:repeat(2,1fr)}.g4{grid-template-columns:repeat(2,1fr)}}
@media(min-width:860px){.g3{grid-template-columns:repeat(3,1fr)}.g2{grid-template-columns:repeat(2,1fr)}.g4{grid-template-columns:repeat(4,1fr)}}
.stat{display:flex;align-items:center;gap:6px;font-size:13px;color:${C.gray}}
.divider{height:1px;background:${C.light};margin:14px 0;border:none}
.badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;font-size:11px;font-weight:700}
.badge-v{background:#e8f5e9;color:${C.green}}
.badge-h{background:#fce4ec;color:${C.red}}
.badge-e{background:${C.red};color:#fff}
.price{font-size:22px;font-weight:800;color:${C.black}}
.nav-btn{padding:10px 14px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:none;white-space:nowrap;border-bottom:2px solid transparent;color:${C.mid}}
.nav-btn.active{border-bottom-color:${C.yellow};color:${C.black}}
.hdr{background:${C.white};border-bottom:2px solid ${C.yellow};position:sticky;top:0;z-index:100}
.hdr-top{display:flex;align-items:center;justify-content:space-between;padding:10px 16px}
.logo{font-size:22px;font-weight:800;cursor:pointer;color:${C.black}}
.logo span{color:${C.yellow}}
.nav-scroll{display:flex;overflow-x:auto;gap:0;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:0 12px}
.nav-scroll::-webkit-scrollbar{display:none}
.hero{background:${C.black};color:#fff;padding:32px 16px;position:relative;overflow:hidden}
@media(min-width:640px){.hero{padding:48px 32px}}
.hero h1{font-size:28px;font-weight:800;line-height:1.3}
@media(min-width:640px){.hero h1{font-size:40px}}
.hero p{font-size:15px;color:#ccc;margin-top:10px;line-height:1.7}
.search-bar{display:flex;background:#fff;max-width:500px;margin-top:16px}
.search-bar input{flex:1;border:none;padding:10px 14px;font-size:14px;outline:none;direction:rtl;font-family:'Tajawal',sans-serif;min-width:0}
.search-bar button{background:${C.yellow};border:none;padding:10px 16px;cursor:pointer;display:flex;align-items:center}
.stats-row{display:flex;gap:20px;margin-top:20px;flex-wrap:wrap}
.stat-box{text-align:center}
.stat-num{font-size:26px;font-weight:800;color:${C.yellow}}
.stat-lbl{font-size:11px;color:#999}
.img-box{height:150px;background:#f0ece3;display:flex;align-items:center;justify-content:center;position:relative}
.main{padding:16px;max-width:1200px;margin:0 auto}
.sec{margin-bottom:32px}
.sec-title{font-size:22px;font-weight:800;margin-bottom:4px}
@media(min-width:640px){.sec-title{font-size:26px}}
.sec-sub{font-size:14px;color:${C.gray};margin-bottom:14px}
.plan{text-align:center;padding:20px 16px;position:relative}
.plan-name{font-size:18px;font-weight:800}
.plan-price{font-size:30px;font-weight:800;margin:8px 0 4px}
.plan-feat{font-size:13px;color:${C.mid};padding:6px 0;border-bottom:1px solid ${C.light}}
.quick-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:28px}
@media(min-width:540px){.quick-grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:860px){.quick-grid{grid-template-columns:repeat(6,1fr)}}
.quick-item{background:${C.white};border:1px solid ${C.light};padding:14px 8px;text-align:center;cursor:pointer;font-weight:700;font-size:13px;transition:border-color .2s}
.quick-item:active,.quick-item:hover{border-color:${C.yellow}}
.admin-row{background:${C.white};border:1px solid ${C.light};padding:14px;display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:10px}
table{width:100%;border-collapse:collapse}
th{text-align:right;padding:10px 12px;border-bottom:2px solid ${C.black};font-size:12px;font-weight:700;color:${C.mid}}
td{padding:12px;border-bottom:1px solid ${C.light};font-size:14px}
.cats-row{display:flex;gap:8px;overflow-x:auto;margin-bottom:16px;padding-bottom:4px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.cats-row::-webkit-scrollbar{display:none}
.cat-chip{padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid ${C.light};background:${C.white};color:${C.mid};white-space:nowrap}
.cat-chip.active{background:${C.yellow};color:#fff;border-color:${C.yellow}}
.foot{background:${C.black};color:#999;padding:28px 16px;margin-top:40px}
.foot-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:1200px;margin:0 auto}
@media(min-width:640px){.foot-grid{grid-template-columns:repeat(4,1fr)}}
.foot-title{color:${C.yellow};font-size:14px;font-weight:700;margin-bottom:8px}
.foot-link{display:block;color:#999;font-size:13px;padding:3px 0;cursor:pointer}
.mob-menu{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:150;display:flex;justify-content:flex-start}
.mob-inner{background:${C.white};width:280px;max-width:80vw;height:100%;padding:20px;overflow-y:auto}
.mob-item{display:block;padding:12px 0;border-bottom:1px solid ${C.light};font-size:15px;font-weight:700;cursor:pointer;color:${C.black}}
.mob-item:active{color:${C.yellow}}
.warn-box{background:#fff8e1;border:1px solid ${C.yellowM};padding:14px;margin-bottom:16px;font-size:14px;color:${C.mid}}
.form-grid{display:grid;grid-template-columns:1fr;gap:14px}
@media(min-width:540px){.form-grid{grid-template-columns:1fr 1fr}}
.ham{background:none;border:none;cursor:pointer;padding:8px;display:flex;flex-direction:column;gap:4px}
.ham span{display:block;width:20px;height:2px;background:${C.black}}
`;

  return (
    <div dir="rtl" style={{ fontFamily: "'Tajawal',sans-serif", color: C.black, background: C.off, minHeight: "100vh" }}>
      <style>{css}</style>

      {note && <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", background: C.black, color: "#fff", padding: "10px 20px", zIndex: 300, fontSize: 14, fontWeight: 700, boxShadow: "0 4px 12px rgba(0,0,0,.2)", whiteSpace: "nowrap", maxWidth: "90vw", textAlign: "center" }}>{note}</div>}

      {menu && <div className="mob-menu" onClick={() => setMenu(false)}>
        <div className="mob-inner" onClick={e => e.stopPropagation()}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span className="logo">كناري<span>KSA</span></span>
            <button onClick={() => setMenu(false)} style={{ background: "none", border: "none", fontSize: 28, cursor: "pointer" }}>&times;</button>
          </div>
          {navs.map(n => <div key={n.k} className="mob-item" style={page === n.k ? { color: C.yellow } : {}} onClick={() => go(n.k)}>{n.l}</div>)}
          <div className="mob-item" style={page === "portal" ? { color: C.yellow } : {}} onClick={() => go("portal")}>بوابة الموردين</div>
          {admin && <div className="mob-item" style={{ color: C.red }} onClick={() => go("admin")}>لوحة الإدارة</div>}
          <hr className="divider" />
          <div className="mob-item" onClick={() => { setAdmin(!admin); if (!admin) go("admin"); else setMenu(false); }}>{admin ? "خروج من الإدارة" : "دخول الإدارة"}</div>
        </div>
      </div>}

      <header className="hdr">
        <div className="hdr-top">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button className="ham" onClick={() => setMenu(true)}><span /><span /><span /></button>
            <span className="logo" onClick={() => go("home")}>كناري<span>KSA</span></span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className="btn btn-y btn-s" onClick={() => go("auction")} style={{ display: "flex", alignItems: "center", gap: 4 }}><IGavel /> المزادات</button>
            <button className="btn btn-o btn-s" onClick={() => go("suppliers")}>الموردين</button>
            <button className="btn btn-s" style={{ background: C.dark, color: "#fff", border: "none" }} onClick={() => go("portal")}>بوابة الموردين</button>
          </div>
        </div>
        <div className="nav-scroll">
          {navs.map(n => <button key={n.k} className={`nav-btn ${page === n.k ? "active" : ""}`} onClick={() => go(n.k)}>{n.l}</button>)}
          {admin && <button className={`nav-btn ${page === "admin" ? "active" : ""}`} style={{ color: C.red }} onClick={() => go("admin")}>الإدارة</button>}
        </div>
      </header>

      {/* HOME */}
      {page === "home" && <>
        <div className="hero">
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
            <h1>سوق المملكة الأول<br /><span style={{ color: C.yellow }}>للكناري</span></h1>
            <p>بيع وشراء ومزايدة ورعاية الكناري. تواصل مع المربين والموردين والبيطريين في جميع أنحاء المملكة.</p>
            <div className="search-bar"><input placeholder="ابحث بالسلالة أو اللون أو البائع..." value={q} onChange={e => setQ(e.target.value)} /><button><ISearch /></button></div>
            <div className="stats-row">
              <div className="stat-box"><div className="stat-num">+٢,٤٠٠</div><div className="stat-lbl">إعلان نشط</div></div>
              <div className="stat-box"><div className="stat-num">+٨٥٠</div><div className="stat-lbl">بائع موثق</div></div>
              <div className="stat-box"><div className="stat-num">١٢</div><div className="stat-lbl">مدينة</div></div>
            </div>
            <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", opacity: .08, display: "none" }}><Bird s={200} /></div>
          </div>
        </div>
        <div className="main">
          <div className="quick-grid">
            {[{ l: "شراء كناري", k: "buy" }, { l: "بيع كناري", k: "sell" }, { l: "المزادات", k: "auction" }, { l: "المستلزمات", k: "supplies" }, { l: "البيطريين", k: "vets" }, { l: "المدونة", k: "blog" }].map(i =>
              <div key={i.k} className="quick-item" onClick={() => go(i.k)}>{i.l}</div>
            )}
          </div>
          <div className="sec">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <div><h2 className="sec-title">كناري مميزة</h2><p className="sec-sub">طيور مختارة بعناية من بائعين موثقين</p></div>
              <button className="btn btn-o btn-s" onClick={() => go("buy")}>عرض الكل</button>
            </div>
            <div className="grid g3">{canaries.filter(c => c.featured).slice(0, 3).map(c => <CanaryCard key={c.id} c={c} />)}</div>
          </div>
          <div className="sec">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <div><h2 className="sec-title">مزادات حية</h2><p className="sec-sub">زايد على كناري استثنائية</p></div>
              <button className="btn btn-y btn-s" onClick={() => go("auction")}><span style={{ display: "flex", alignItems: "center", gap: 4 }}><IGavel /> كل المزادات</span></button>
            </div>
            <div className="grid g3">{auctions.slice(0, 3).map(a => <AuctionCard key={a.id} a={a} />)}</div>
          </div>
          <div className="sec">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <div><h2 className="sec-title">من المدونة</h2><p className="sec-sub">نصائح وإرشادات من المجتمع</p></div>
              <button className="btn btn-o btn-s" onClick={() => go("blog")}>كل المقالات</button>
            </div>
            <div className="grid g2">
              {blogData.slice(0, 4).map(p => <div key={p.id} className="card" style={{ padding: 16 }}>
                <span className="tag tag-y">{p.cat}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "8px 0 6px", lineHeight: 1.4 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: C.mid, lineHeight: 1.6, margin: "0 0 10px" }}>{p.excerpt.substring(0, 90)}...</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                  <span style={{ fontSize: 12, color: C.gray }}>{p.author} · {p.date}</span>
                  <div style={{ display: "flex", gap: 12 }}><span className="stat"><IHeart />{p.likes}</span><span className="stat"><IChat />{p.comments}</span></div>
                </div>
              </div>)}
            </div>
          </div>
          <div className="sec">
            <h2 className="sec-title" style={{ textAlign: "center" }}>باقات البائعين</h2>
            <p className="sec-sub" style={{ textAlign: "center", marginBottom: 20 }}>اختر الباقة المناسبة لاحتياجاتك</p>
            <div className="grid g4">
              {PLANS.map(p => <div key={p.name} className="card plan" style={{ borderTop: `4px solid ${p.color}`, position: "relative" }}>
                {p.name === "ذهبي" && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.yellow, color: "#fff", padding: "2px 12px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>الأكثر شعبية</div>}
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">{p.price === 0 ? "مجاني" : `${p.price} ريال`}{p.price > 0 && <span style={{ fontSize: 13, color: C.gray, fontWeight: 400 }}>/شهرياً</span>}</div>
                <hr className="divider" />
                <div className="plan-feat">{p.posts === "غير محدود" ? "منشورات غير محدودة" : `${p.posts} منشور شهرياً`}</div>
                <div className="plan-feat">مدة الإعلان: {p.duration}</div>
                <div className="plan-feat">{p.name === "مجاني" ? "ظهور أساسي" : p.name === "فضي" ? "ظهور محسّن" : p.name === "ذهبي" ? "موقع مميز" : "أولوية قصوى"}</div>
                <button className="btn btn-y" style={{ width: "100%", marginTop: 14, background: p.price === 0 ? C.mid : C.yellow }} onClick={() => notify(`تم اختيار باقة ${p.name}!`)}>{p.price === 0 ? "ابدأ مجاناً" : "اشترك الآن"}</button>
              </div>)}
            </div>
          </div>
        </div>
      </>}

      {/* BUY */}
      {page === "buy" && <div className="main">
        <h2 className="sec-title">شراء كناري</h2>
        <p className="sec-sub">تصفح إعلانات موثقة من مربين معتمدين</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <div className="search-bar" style={{ flex: 1, minWidth: 180 }}><input placeholder="ابحث..." value={q} onChange={e => setQ(e.target.value)} /><button><ISearch /></button></div>
          <select className="inp" style={{ width: "auto", minWidth: 110 }} value={cityF} onChange={e => setCityF(e.target.value)}><option value="الكل">كل المدن</option>{CITIES.map(c => <option key={c} value={c}>{c}</option>)}</select>
          <span style={{ fontSize: 13, color: C.gray }}>{filtered.length} نتيجة</span>
        </div>
        <div className="grid g3">{filtered.map(c => <CanaryCard key={c.id} c={c} />)}</div>
      </div>}

      {/* SELL */}
      {page === "sell" && <div className="main">
        <h2 className="sec-title">بيع الكناري</h2>
        <p className="sec-sub">أعرض كناريك وتواصل مع آلاف المشترين</p>
        <div className="grid g4" style={{ marginBottom: 28 }}>
          {PLANS.map(p => <div key={p.name} className="card plan" style={{ borderTop: `4px solid ${p.color}` }}>
            <div className="plan-name">{p.name}</div>
            <div className="plan-price" style={{ fontSize: 26 }}>{p.price === 0 ? "مجاني" : `${p.price} ريال`}{p.price > 0 && <span style={{ fontSize: 13, color: C.gray, fontWeight: 400 }}>/شهر</span>}</div>
            <div style={{ fontSize: 13, color: C.mid, margin: "6px 0" }}>{p.posts === "غير محدود" ? "غير محدود" : `${p.posts} منشور/شهر`} | {p.duration}</div>
            <button className="btn btn-y" style={{ width: "100%" }} onClick={() => notify(`تم اختيار باقة ${p.name}`)}>اختر {p.name}</button>
          </div>)}
        </div>
        <div className="card" style={{ padding: "20px 16px" }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 14 }}>إنشاء إعلان</h3>
          <div className="form-grid">
            <div><label className="lbl">اسم الكناري</label><input className="inp" placeholder="مثال: ووترسلاجر ذكر بطل" /></div>
            <div><label className="lbl">السلالة</label><select className="inp"><option>اختر السلالة</option>{BREEDS.map(b => <option key={b}>{b}</option>)}</select></div>
            <div><label className="lbl">العمر</label><input className="inp" placeholder="مثال: سنة" /></div>
            <div><label className="lbl">السعر (ريال)</label><input className="inp" type="number" placeholder="مثال: ٥٠٠" /></div>
            <div><label className="lbl">اللون</label><input className="inp" placeholder="مثال: أصفر" /></div>
            <div><label className="lbl">جودة التغريد</label><select className="inp"><option>اختر</option><option>استثنائي</option><option>ممتاز</option><option>جيد جداً</option><option>جيد</option><option>متوسط</option></select></div>
            <div><label className="lbl">المدينة</label><select className="inp">{CITIES.map(c => <option key={c}>{c}</option>)}</select></div>
            <div><label className="lbl">الصور</label><input className="inp" type="file" /></div>
          </div>
          <div style={{ marginTop: 14 }}><label className="lbl">الوصف</label><textarea className="inp" style={{ minHeight: 90, resize: "vertical" }} placeholder="صف الكناري بالتفصيل..." /></div>
          <button className="btn btn-y" style={{ marginTop: 14 }} onClick={() => notify("تم إرسال الإعلان للمراجعة!")}>إرسال الإعلان</button>
          <p style={{ fontSize: 12, color: C.gray, marginTop: 8 }}>جميع الإعلانات تتم مراجعتها من فريقنا قبل النشر.</p>
        </div>
      </div>}

      {/* AUCTION */}
      {page === "auction" && <div className="main">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <div><h2 className="sec-title">المزادات الحية</h2><p className="sec-sub">زايد على كناري فاخرة من أفضل المربين</p></div>
          <span className="badge badge-v" style={{ fontSize: 13 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, display: "inline-block" }} /> {auctions.length} مزاد حي</span>
        </div>
        <div className="grid g3">{auctions.map(a => <AuctionCard key={a.id} a={a} />)}</div>
      </div>}

      {/* SUPPLIES */}
      {page === "supplies" && <div className="main">
        <h2 className="sec-title">مستلزمات الكناري</h2>
        <p className="sec-sub">كل ما يحتاجه كناريك من موردين موثوقين</p>
        <div className="cats-row">{["أقفاص", "بذور وطعام", "فيتامينات", "تعشيش", "تدريب", "تجميل", "معدات عرض", "تربية"].map(c => <span key={c} className="cat-chip">{c}</span>)}</div>
        <div className="grid g2">{suppliersData.map(s => <div key={s.id} className="card" style={{ padding: 16 }}>
          <span className="tag tag-y">{s.cat}</span>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: "8px 0 4px" }}>{s.name}</h3>
          <p style={{ fontSize: 14, color: C.mid, margin: "0 0 8px", lineHeight: 1.5 }}>{s.desc}</p>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}><span className="stat"><IPin />{s.city}</span><Rating v={s.rating} /></div>
        </div>)}</div>
      </div>}

      {/* SUPPLIERS */}
      {page === "suppliers" && <div className="main">
        <h2 className="sec-title">الموردين</h2>
        <p className="sec-sub">موردون معتمدون لمنتجات ومعدات الكناري</p>
        <p style={{ fontSize: 13, color: C.gray, marginBottom: 16, fontStyle: "italic" }}>جميع إعلانات الموردين تتم مراجعتها واعتمادها من قبل الإدارة قبل النشر.</p>
        <div className="grid g2">{suppliersData.map(s => <div key={s.id} className="card" style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{s.name}</h3>{s.verified && <span className="badge badge-v"><IShield /> موثق</span>}</div>
              <span className="tag tag-y">{s.cat}</span>
            </div>
            <Rating v={s.rating} />
          </div>
          <p style={{ fontSize: 14, color: C.mid, lineHeight: 1.5, margin: "12px 0" }}>{s.desc}</p>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}><span className="stat"><IPin />{s.city}</span><span style={{ fontSize: 13, color: C.gray }}>{s.reviews} تقييم</span></div>
        </div>)}</div>
      </div>}

      {/* SERVICES */}
      {page === "services" && <div className="main">
        <h2 className="sec-title">خدمات الكناري</h2>
        <p className="sec-sub">خدمات احترافية لأصحاب ومربي الكناري</p>
        <div className="grid g2">{servicesData.map(s => <div key={s.id} className="card" style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 8 }}>
            <div><span className="tag tag-y">{s.cat}</span><h3 style={{ fontSize: 17, fontWeight: 700, margin: "8px 0 4px" }}>{s.name}</h3><div style={{ fontSize: 13, color: C.gray }}>{s.provider}</div></div>
            <div className="price" style={{ fontSize: 18 }}>{s.price}</div>
          </div>
          <div className="stat" style={{ marginTop: 10 }}><IPin />{s.city}</div>
        </div>)}</div>
      </div>}

      {/* MEDICATION */}
      {page === "medication" && <div className="main">
        <h2 className="sec-title">أدوية الكناري</h2>
        <p className="sec-sub">منتجات صحية وعلاجات للكناري</p>
        <div className="warn-box">يُرجى دائماً استشارة طبيب بيطري متخصص قبل إعطاء أي دواء. الجرعة تعتمد على وزن الطائر وحالته.</div>
        <div className="grid g2">{medsData.map(m => <div key={m.id} className="card" style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 8 }}>
            <div><h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 4px" }}>{m.name}</h3><div style={{ fontSize: 13, color: C.gray }}>{m.brand} | {m.type}</div></div>
            <div className="price" style={{ fontSize: 18 }}>{m.price}</div>
          </div>
          <span className="tag tag-g" style={{ marginTop: 10 }}>لعلاج: {m.cond}</span>
        </div>)}</div>
      </div>}

      {/* VETS */}
      {page === "vets" && <div className="main">
        <h2 className="sec-title">أطباء بيطريين للكناري</h2>
        <p className="sec-sub">متخصصون في طب الطيور في جميع أنحاء المملكة</p>
        <div className="grid g2">{vetsData.map(v => <div key={v.id} className="card" style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{v.name}</h3>{v.emergency && <span className="badge badge-e">طوارئ ٢٤/٧</span>}</div>
              <div style={{ fontSize: 14, color: C.mid, marginTop: 4 }}>{v.clinic}</div>
            </div>
            <Rating v={v.rating} />
          </div>
          <hr className="divider" />
          <div className="form-grid" style={{ fontSize: 14, color: C.mid }}><div><strong>التخصص:</strong> {v.spec}</div><div><strong>الخبرة:</strong> {v.exp}</div><div className="stat"><IPin />{v.city}</div></div>
        </div>)}</div>
      </div>}

      {/* BLOG */}
      {page === "blog" && <div className="main">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <div><h2 className="sec-title">مدونة الكناري</h2><p className="sec-sub">نصائح وإرشادات وأسئلة وقصص من المجتمع</p></div>
          <button className="btn btn-y" onClick={() => setPostForm(true)}>اكتب مقال</button>
        </div>
        <div className="cats-row">{["الكل", "تدريب", "تربية", "صحة", "إسكان", "معارض"].map((c, i) => <span key={c} className={`cat-chip ${i === 0 ? "active" : ""}`}>{c}</span>)}</div>
        {blogData.map(p => <div key={p.id} className="card" style={{ padding: 16, marginBottom: 12 }}>
          <span className="tag tag-y">{p.cat}</span>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: "8px 0 6px", lineHeight: 1.4 }}>{p.title}</h3>
          <p style={{ fontSize: 14, color: C.mid, lineHeight: 1.6, margin: "0 0 10px" }}>{p.excerpt}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
            <span style={{ fontSize: 12, color: C.gray }}>{p.author} · {p.date}</span>
            <div style={{ display: "flex", gap: 12 }}><span className="stat"><IHeart />{p.likes}</span><span className="stat"><IChat />{p.comments}</span></div>
          </div>
        </div>)}
      </div>}

      {/* ADMIN */}
      {page === "admin" && <div className="main">
        <h2 className="sec-title">لوحة الإدارة</h2>
        <p className="sec-sub">مراجعة واعتماد إعلانات الموردين</p>
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>بانتظار الموافقة ({pending.length})</h3>
          {pending.length === 0 ? <div style={{ padding: 20, textAlign: "center", background: C.white, border: `1px solid ${C.light}`, color: C.gray }}>لا توجد إعلانات بانتظار المراجعة.</div> :
            pending.map(a => <div key={a.id} className="admin-row">
              <div><h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{a.title}</h4><div style={{ fontSize: 13, color: C.gray }}>{a.supplier} · {a.cat} · {a.time}</div></div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-g btn-s" onClick={() => { setPending(p => p.filter(x => x.id !== a.id)); notify("تمت الموافقة"); }}>موافقة</button>
                <button className="btn btn-r btn-s" onClick={() => { setPending(p => p.filter(x => x.id !== a.id)); notify("تم الرفض"); }}>رفض</button>
              </div>
            </div>)
          }
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>إحصائيات المنصة</h3>
        <div className="grid g3" style={{ marginBottom: 24 }}>
          {[{ l: "إجمالي الإعلانات", v: "٢,٤٣٧" }, { l: "البائعون النشطون", v: "٨٥٦" }, { l: "المزادات الحية", v: "٦" }, { l: "مقالات المدونة", v: "٣١٢" }, { l: "المستخدمون", v: "٤,٨٩١" }, { l: "الإيرادات الشهرية", v: "٢٨,٤٥٠ ر" }].map(s =>
            <div key={s.l} className="card" style={{ padding: 14, textAlign: "center" }}><div className="stat-num">{s.v}</div><div className="stat-lbl">{s.l}</div></div>
          )}
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>توزيع الاشتراكات</h3>
        <div style={{ overflowX: "auto" }}>
          <table><thead><tr><th>الباقة</th><th>المشتركون</th><th>الإيرادات/شهر</th></tr></thead>
            <tbody>
              <tr><td>مجاني</td><td>٤١٢</td><td>٠ ريال</td></tr>
              <tr><td>فضي</td><td>٢٨٩</td><td>٢,٨٩٠ ريال</td></tr>
              <tr><td>ذهبي</td><td>١١٨</td><td>٢,٣٦٠ ريال</td></tr>
              <tr><td>بلاتيني</td><td>٣٧</td><td>١,١١٠ ريال</td></tr>
            </tbody>
          </table>
        </div>
      </div>}

      {/* SUPPLIER PORTAL */}
      {page === "portal" && <div className="main">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
          <div>
            <h2 className="sec-title">بوابة الموردين</h2>
            <p className="sec-sub">إدارة متجرك ومنتجاتك وإعلاناتك</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="badge badge-v"><IShield /> متجر موثق</span>
            <span style={{ fontSize: 13, color: C.gray }}>مستلزمات الجزيرة</span>
          </div>
        </div>

        {/* Portal Sub-Navigation */}
        <div className="cats-row" style={{ marginBottom: 20, borderBottom: `1px solid ${C.light}`, paddingBottom: 0 }}>
          {[
            { k: "dashboard", l: "لوحة التحكم" },
            { k: "products", l: "المنتجات" },
            { k: "ads", l: "الإعلانات" },
            { k: "orders", l: "الطلبات" },
            { k: "profile", l: "الملف التجاري" },
          ].map(t => <button key={t.k} className={`nav-btn ${portalTab === t.k ? "active" : ""}`} onClick={() => setPortalTab(t.k)} style={{ fontSize: 14 }}>{t.l}</button>)}
        </div>

        {/* DASHBOARD TAB */}
        {portalTab === "dashboard" && <>
          <div className="grid g3" style={{ marginBottom: 24 }}>
            {[
              { l: "إجمالي المنتجات", v: "٨", c: C.yellow },
              { l: "المنتجات النشطة", v: "٦", c: C.green },
              { l: "إجمالي المبيعات", v: "٢٩٤", c: C.yellow },
              { l: "الإيرادات (هذا الشهر)", v: "١٢,٤٥٠ ر", c: C.green },
              { l: "المشاهدات (هذا الشهر)", v: "٥,٢٧٩", c: C.yellow },
              { l: "الإعلانات النشطة", v: "٢", c: C.dark },
            ].map(s => <div key={s.l} className="card" style={{ padding: 16, textAlign: "center", borderTop: `3px solid ${s.c}` }}>
              <div className="stat-num">{s.v}</div>
              <div className="stat-lbl">{s.l}</div>
            </div>)}
          </div>

          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>آخر الطلبات</h3>
          <div style={{ overflowX: "auto", marginBottom: 24 }}>
            <table>
              <thead><tr><th>رقم الطلب</th><th>المنتج</th><th>المشتري</th><th>المبلغ</th><th>الحالة</th></tr></thead>
              <tbody>
                {portalOrders.slice(0, 3).map(o => <tr key={o.id}>
                  <td style={{ fontWeight: 700 }}>{o.id}</td>
                  <td>{o.product.substring(0, 25)}...</td>
                  <td>{o.buyer}</td>
                  <td style={{ fontWeight: 700 }}>{o.total}</td>
                  <td><span className="badge" style={{ background: o.status === "جديد" ? "#fff3e0" : o.status === "قيد التجهيز" ? "#e3f2fd" : o.status === "تم الشحن" ? "#e8f5e9" : "#f5f5f5", color: o.status === "جديد" ? "#e65100" : o.status === "قيد التجهيز" ? "#1565c0" : o.status === "تم الشحن" ? C.green : C.mid }}>{o.status}</span></td>
                </tr>)}
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>المنتجات الأكثر مبيعاً</h3>
          <div className="grid g3">
            {portalProducts.filter(p => p.orders > 30).map(p => <div key={p.id} className="card" style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{p.name}</h4>
                  <span className="tag tag-g">{p.cat}</span>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{p.price}</div>
                </div>
              </div>
              <hr className="divider" />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.gray }}>
                <span>{p.views} مشاهدة</span>
                <span>{p.orders} طلب</span>
                <span>المخزون: {p.stock}</span>
              </div>
            </div>)}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
            <button className="btn btn-y" onClick={() => setPortalTab("products")}>إدارة المنتجات</button>
            <button className="btn btn-o" onClick={() => setPortalTab("ads")}>إدارة الإعلانات</button>
          </div>
        </>}

        {/* PRODUCTS TAB */}
        {portalTab === "products" && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700 }}>منتجاتي ({portalProducts.length})</h3>
            <button className="btn btn-y" onClick={() => setAddProduct(true)}>إضافة منتج جديد</button>
          </div>

          {portalProducts.map(p => <div key={p.id} className="card" style={{ padding: 16, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 200 }}>
              <div style={{ width: 50, height: 50, background: "#f0ece3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Bird s={35} v={p.img} /></div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 2px" }}>{p.name}</h4>
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                  <span className="tag tag-g" style={{ margin: 0 }}>{p.cat}</span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{p.price}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 800 }}>{p.views}</div><div style={{ fontSize: 11, color: C.gray }}>مشاهدة</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 800 }}>{p.orders}</div><div style={{ fontSize: 11, color: C.gray }}>طلب</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 800 }}>{p.stock}</div><div style={{ fontSize: 11, color: C.gray }}>مخزون</div></div>
              <span className="badge" style={{
                background: p.status === "نشط" ? "#e8f5e9" : p.status === "مخزون منخفض" ? "#fff3e0" : "#fce4ec",
                color: p.status === "نشط" ? C.green : p.status === "مخزون منخفض" ? "#e65100" : C.red
              }}>{p.status}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-o btn-s" onClick={() => notify("تم فتح التعديل")}>تعديل</button>
                {p.stock === 0 && <button className="btn btn-y btn-s" onClick={() => notify("تم تحديث المخزون")}>تحديث المخزون</button>}
              </div>
            </div>
          </div>)}
        </>}

        {/* ADS TAB */}
        {portalTab === "ads" && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700 }}>إعلاناتي</h3>
            <button className="btn btn-y" onClick={() => setAddAd(true)}>إنشاء إعلان جديد</button>
          </div>
          <div className="warn-box">جميع الإعلانات تخضع لمراجعة الإدارة قبل النشر. عادةً تتم المراجعة خلال ٢٤ ساعة.</div>

          {portalAds.map(a => <div key={a.id} className="card" style={{ padding: 16, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 8 }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px" }}>{a.title}</h4>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", fontSize: 13, color: C.gray }}>
                  <span>أُرسل: {a.submitted}</span>
                  {a.expires !== "-" && a.expires !== "منتهي" && <span>ينتهي خلال: {a.expires}</span>}
                </div>
              </div>
              <span className="badge" style={{
                background: a.status === "منشور" ? "#e8f5e9" : a.status === "بانتظار المراجعة" ? "#fff3e0" : a.status === "مرفوض" ? "#fce4ec" : "#f5f5f5",
                color: a.status === "منشور" ? C.green : a.status === "بانتظار المراجعة" ? "#e65100" : a.status === "مرفوض" ? C.red : C.gray,
                fontSize: 12
              }}>{a.status}</span>
            </div>
            {a.status === "منشور" && <div style={{ display: "flex", gap: 20, marginTop: 10, fontSize: 13, color: C.mid }}>
              <span>{a.views} مشاهدة</span>
              <span>{a.clicks} نقرة</span>
              <span>نسبة النقر: {a.views > 0 ? ((a.clicks / a.views) * 100).toFixed(1) : 0}٪</span>
            </div>}
            {a.status === "مرفوض" && a.reason && <div style={{ marginTop: 10, padding: 10, background: "#fce4ec", fontSize: 13, color: C.red }}>
              <strong>سبب الرفض:</strong> {a.reason}
            </div>}
            {a.status === "مرفوض" && <button className="btn btn-y btn-s" style={{ marginTop: 10 }} onClick={() => notify("تم فتح نموذج إعادة الإرسال")}>إعادة إرسال</button>}
          </div>)}
        </>}

        {/* ORDERS TAB */}
        {portalTab === "orders" && <>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>الطلبات الواردة</h3>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead><tr><th>رقم الطلب</th><th>المنتج</th><th>المشتري</th><th>المدينة</th><th>الكمية</th><th>المبلغ</th><th>الحالة</th><th>التاريخ</th><th>إجراء</th></tr></thead>
              <tbody>
                {portalOrders.map(o => <tr key={o.id}>
                  <td style={{ fontWeight: 700 }}>{o.id}</td>
                  <td style={{ fontSize: 13 }}>{o.product.substring(0, 22)}...</td>
                  <td>{o.buyer}</td>
                  <td>{o.city}</td>
                  <td>{o.qty}</td>
                  <td style={{ fontWeight: 700 }}>{o.total}</td>
                  <td><span className="badge" style={{
                    background: o.status === "جديد" ? "#fff3e0" : o.status === "قيد التجهيز" ? "#e3f2fd" : o.status === "تم الشحن" ? "#e8f5e9" : "#f5f5f5",
                    color: o.status === "جديد" ? "#e65100" : o.status === "قيد التجهيز" ? "#1565c0" : o.status === "تم الشحن" ? C.green : C.mid
                  }}>{o.status}</span></td>
                  <td style={{ fontSize: 12, color: C.gray }}>{o.date}</td>
                  <td>{o.status === "جديد" ? <button className="btn btn-y btn-s" onClick={() => notify("تم قبول الطلب وبدء التجهيز")}>قبول</button> :
                    o.status === "قيد التجهيز" ? <button className="btn btn-g btn-s" onClick={() => notify("تم تحديث حالة الشحن")}>شحن</button> :
                    <span style={{ fontSize: 12, color: C.gray }}>-</span>}
                  </td>
                </tr>)}
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: 17, fontWeight: 700, margin: "24px 0 14px" }}>ملخص الطلبات</h3>
          <div className="grid g4">
            {[
              { l: "طلبات جديدة", v: "١", c: "#e65100", bg: "#fff3e0" },
              { l: "قيد التجهيز", v: "١", c: "#1565c0", bg: "#e3f2fd" },
              { l: "تم الشحن", v: "١", c: C.green, bg: "#e8f5e9" },
              { l: "تم التسليم", v: "٢", c: C.mid, bg: "#f5f5f5" },
            ].map(s => <div key={s.l} className="card" style={{ padding: 14, textAlign: "center", borderTop: `3px solid ${s.c}` }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.c }}>{s.v}</div>
              <div className="stat-lbl">{s.l}</div>
            </div>)}
          </div>
        </>}

        {/* PROFILE TAB */}
        {portalTab === "profile" && <>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>الملف التجاري</h3>
          <div className="card" style={{ padding: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ width: 80, height: 80, background: "#f0ece3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Bird s={55} v={0} /></div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 4px" }}>مستلزمات الجزيرة</h3>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span className="badge badge-v"><IShield /> موثق</span>
                  <Rating v={4.8} />
                  <span style={{ fontSize: 13, color: C.gray }}>١٢٤ تقييم</span>
                </div>
              </div>
            </div>
            <div className="form-grid">
              <div><label className="lbl">اسم المتجر</label><input className="inp" defaultValue="مستلزمات الجزيرة" /></div>
              <div><label className="lbl">التصنيف الرئيسي</label><select className="inp" defaultValue="أقفاص وإكسسوارات">{SUPPLY_CATS.map(c => <option key={c}>{c}</option>)}</select></div>
              <div><label className="lbl">المدينة</label><select className="inp" defaultValue="الرياض">{CITIES.map(c => <option key={c}>{c}</option>)}</select></div>
              <div><label className="lbl">رقم الجوال</label><input className="inp" defaultValue="٠٥٥ XXX XXXX" /></div>
              <div><label className="lbl">البريد الإلكتروني</label><input className="inp" defaultValue="info@jazeera-supplies.sa" /></div>
              <div><label className="lbl">رقم السجل التجاري</label><input className="inp" defaultValue="XXXXXXXXXX" /></div>
            </div>
            <div style={{ marginTop: 14 }}>
              <label className="lbl">وصف المتجر</label>
              <textarea className="inp" style={{ minHeight: 80, resize: "vertical" }} defaultValue="أقفاص كناري فاخرة وصناديق تربية وإكسسوارات. وكيل معتمد لفيربلاست وسافيك. نخدم مربي الكناري منذ أكثر من ١٠ سنوات." />
            </div>
            <div style={{ marginTop: 14 }}>
              <label className="lbl">شعار المتجر</label>
              <input className="inp" type="file" />
            </div>
            <button className="btn btn-y" style={{ marginTop: 16 }} onClick={() => notify("تم حفظ التعديلات بنجاح!")}>حفظ التعديلات</button>
          </div>

          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>باقة الاشتراك الحالية</h3>
          <div className="card" style={{ padding: 20, borderTop: `4px solid ${C.yellow}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>الباقة الذهبية</div>
                <div style={{ fontSize: 14, color: C.mid, marginTop: 4 }}>١٠ إعلانات شهرياً · مدة الإعلان أسبوعين · موقع مميز</div>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.yellow }}>٢٠ ريال<span style={{ fontSize: 13, fontWeight: 400, color: C.gray }}>/شهرياً</span></div>
                <div style={{ fontSize: 12, color: C.gray }}>التجديد: ١٥ مارس ٢٠٢٦</div>
              </div>
            </div>
            <hr className="divider" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, fontSize: 14, color: C.mid }}>
              <span>الإعلانات المستخدمة هذا الشهر: ٢ من ١٠</span>
              <div style={{ background: C.light, height: 8, flex: 1, minWidth: 100, maxWidth: 200 }}><div style={{ background: C.yellow, height: "100%", width: "20%" }} /></div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
              <button className="btn btn-o btn-s" onClick={() => notify("تم فتح صفحة ترقية الباقة")}>ترقية للبلاتيني</button>
              <button className="btn btn-s" style={{ background: C.light, color: C.mid, border: "none" }} onClick={() => notify("تم فتح سجل الفواتير")}>سجل الفواتير</button>
            </div>
          </div>

          <h3 style={{ fontSize: 17, fontWeight: 700, margin: "20px 0 14px" }}>إعدادات الإشعارات</h3>
          <div className="card" style={{ padding: 20 }}>
            {["طلب جديد", "تعليق أو تقييم جديد", "تمت الموافقة على إعلان", "تم رفض إعلان", "تنبيه نفاذ المخزون", "تقرير أسبوعي بالأداء"].map((n, i) =>
              <div key={n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 5 ? `1px solid ${C.light}` : "none" }}>
                <span style={{ fontSize: 14 }}>{n}</span>
                <label style={{ position: "relative", display: "inline-block", width: 44, height: 24, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked={i < 4} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{ position: "absolute", inset: 0, background: i < 4 ? C.yellow : C.light, transition: ".3s", borderRadius: 12 }}>
                    <span style={{ position: "absolute", height: 18, width: 18, right: i < 4 ? 3 : "auto", left: i < 4 ? "auto" : 3, bottom: 3, background: "#fff", transition: ".3s", borderRadius: "50%" }} />
                  </span>
                </label>
              </div>
            )}
          </div>
        </>}
      </div>}

      {/* ADD PRODUCT MODAL */}
      <Modal open={addProduct} onClose={() => setAddProduct(false)} title="إضافة منتج جديد">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label className="lbl">اسم المنتج</label><input className="inp" placeholder="مثال: قفص كناري فاخر" /></div>
          <div><label className="lbl">التصنيف</label><select className="inp"><option>اختر التصنيف</option>{SUPPLY_CATS.map(c => <option key={c}>{c}</option>)}</select></div>
          <div className="form-grid">
            <div><label className="lbl">السعر (ريال)</label><input className="inp" type="number" placeholder="مثال: ٣٥٠" /></div>
            <div><label className="lbl">الكمية المتوفرة</label><input className="inp" type="number" placeholder="مثال: ٥٠" /></div>
          </div>
          <div><label className="lbl">الوصف</label><textarea className="inp" style={{ minHeight: 80, resize: "vertical" }} placeholder="وصف تفصيلي للمنتج..." /></div>
          <div><label className="lbl">صور المنتج</label><input className="inp" type="file" /></div>
          <div className="form-grid">
            <div><label className="lbl">رقم SKU (اختياري)</label><input className="inp" placeholder="مثال: CAG-001" /></div>
            <div><label className="lbl">الوزن (اختياري)</label><input className="inp" placeholder="مثال: ٢.٥ كجم" /></div>
          </div>
          <button className="btn btn-y" onClick={() => { setAddProduct(false); notify("تمت إضافة المنتج بنجاح!"); }}>إضافة المنتج</button>
        </div>
      </Modal>

      {/* ADD AD MODAL */}
      <Modal open={addAd} onClose={() => setAddAd(false)} title="إنشاء إعلان جديد">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="warn-box" style={{ margin: 0 }}>الإعلان سيخضع لمراجعة فريق الإدارة قبل النشر.</div>
          <div><label className="lbl">عنوان الإعلان</label><input className="inp" placeholder="مثال: عرض خاص - خصم ٢٠٪ على الأقفاص" /></div>
          <div><label className="lbl">نوع الإعلان</label><select className="inp"><option>عرض خاص / تخفيض</option><option>منتج جديد</option><option>وصول شحنة</option><option>باقة / مجموعة</option><option>إعلان عام</option></select></div>
          <div><label className="lbl">المنتجات المرتبطة</label><select className="inp" multiple style={{ minHeight: 80 }}>{portalProducts.map(p => <option key={p.id}>{p.name}</option>)}</select></div>
          <div><label className="lbl">وصف الإعلان</label><textarea className="inp" style={{ minHeight: 80, resize: "vertical" }} placeholder="تفاصيل العرض أو الإعلان..." /></div>
          <div><label className="lbl">صورة الإعلان</label><input className="inp" type="file" /></div>
          <div className="form-grid">
            <div><label className="lbl">تاريخ البداية</label><input className="inp" type="date" /></div>
            <div><label className="lbl">تاريخ النهاية</label><input className="inp" type="date" /></div>
          </div>
          <button className="btn btn-y" onClick={() => { setAddAd(false); notify("تم إرسال الإعلان للمراجعة!"); }}>إرسال للمراجعة</button>
        </div>
      </Modal>

      {/* DETAIL MODAL */}
      <Modal open={!!sel} onClose={() => setSel(null)} title={sel?.name || ""}>
        {sel && <div>
          <div style={{ display: "flex", justifyContent: "center", background: "#f0ece3", padding: 20, marginBottom: 14 }}><Bird s={110} v={sel.id} /></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div><span className="tag tag-y">{sel.breed}</span><span className="tag tag-g">{sel.color}</span></div>
            <div className="price" style={{ fontSize: 24 }}>{sel.price} ريال</div>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: C.mid, marginBottom: 12 }}>{sel.desc}</p>
          <div className="form-grid" style={{ fontSize: 14, color: C.mid, marginBottom: 14 }}>
            <div><strong>العمر:</strong> {sel.age}</div><div><strong>التغريد:</strong> {sel.singing}</div>
            <div><strong>البائع:</strong> {sel.seller}</div><div><strong>المدينة:</strong> {sel.city}</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn btn-y" style={{ flex: 1 }} onClick={() => { setSel(null); notify("تم التواصل مع البائع!"); }}>تواصل مع البائع</button>
            <button className="btn btn-o" style={{ flex: 1 }}>حفظ في المفضلة</button>
          </div>
        </div>}
      </Modal>

      {/* BID MODAL */}
      <Modal open={!!bidM} onClose={() => { setBidM(null); setBidAmt(""); }} title={bidM ? `مزايدة: ${bidM.title}` : ""}>
        {bidM && <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <div><div style={{ fontSize: 13, color: C.gray }}>المزايدة الحالية</div><div className="price" style={{ color: C.yellow }}>{bidM.current} ريال</div></div>
            <div style={{ textAlign: "left" }}><div style={{ fontSize: 13, color: C.gray }}>ينتهي خلال</div><div style={{ fontWeight: 700, color: C.red, fontSize: 18 }}>{bidM.end}</div></div>
          </div>
          <div style={{ fontSize: 13, color: C.gray }}>{bidM.bids} مزايدة حتى الآن</div>
          <hr className="divider" />
          <label className="lbl">مبلغ المزايدة (ريال)</label>
          <input className="inp" type="number" style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }} placeholder={`الحد الأدنى ${bidM.current + 50}`} value={bidAmt} onChange={e => setBidAmt(e.target.value)} />
          <button className="btn btn-y" style={{ width: "100%" }} onClick={handleBid}>تقديم المزايدة</button>
        </div>}
      </Modal>

      {/* POST MODAL */}
      <Modal open={postForm} onClose={() => setPostForm(false)} title="كتابة مقال">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label className="lbl">العنوان</label><input className="inp" placeholder="عنوان المقال..." /></div>
          <div><label className="lbl">التصنيف</label><select className="inp"><option>تدريب</option><option>تربية</option><option>صحة</option><option>إسكان</option><option>معارض</option><option>سؤال</option><option>نصيحة</option></select></div>
          <div><label className="lbl">المحتوى</label><textarea className="inp" style={{ minHeight: 100, resize: "vertical" }} placeholder="شارك معرفتك أو نصائحك أو أسئلتك..." /></div>
          <button className="btn btn-y" onClick={() => { setPostForm(false); notify("تم إرسال المقال للمراجعة!"); }}>نشر المقال</button>
        </div>
      </Modal>

      {/* FOOTER */}
      <footer className="foot">
        <div className="foot-grid">
          <div><div className="foot-title">كناري KSA</div><p style={{ fontSize: 13, lineHeight: 1.6 }}>السوق الأول في المملكة المخصص بالكامل للكناري. نربط المربين والمشترين والهواة منذ ٢٠٢٤.</p></div>
          <div><div className="foot-title">السوق</div><span className="foot-link" onClick={() => go("buy")}>شراء كناري</span><span className="foot-link" onClick={() => go("sell")}>بيع كناري</span><span className="foot-link" onClick={() => go("auction")}>المزادات</span><span className="foot-link" onClick={() => go("supplies")}>المستلزمات</span></div>
          <div><div className="foot-title">الموارد</div><span className="foot-link" onClick={() => go("services")}>الخدمات</span><span className="foot-link" onClick={() => go("medication")}>الأدوية</span><span className="foot-link" onClick={() => go("vets")}>البيطريين</span><span className="foot-link" onClick={() => go("blog")}>المدونة</span></div>
          <div><div className="foot-title">الشركة</div><span className="foot-link">من نحن</span><span className="foot-link">تواصل معنا</span><span className="foot-link">الشروط والأحكام</span><span className="foot-link">سياسة الخصوصية</span></div>
        </div>
        <div style={{ maxWidth: 1200, margin: "20px auto 0", paddingTop: 14, borderTop: "1px solid #333", textAlign: "center", fontSize: 12 }}>٢٠٢٤ كناري KSA. جميع الحقوق محفوظة. مخصص ١٠٠٪ للكناري.</div>
      </footer>
    </div>
  );
}
