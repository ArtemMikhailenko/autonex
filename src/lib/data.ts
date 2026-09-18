export const CONTACT = {
  phone: "+38 (098) 123 45 67",
  phoneHref: "tel:+380981234567",
  email: "info@autonex.ua",
  telegram: "https://t.me/autonex",
};

export const NAV = [
  { label: "Про нас", href: "#why" },
  { label: "Послуги", href: "#services" },
  { label: "Процес", href: "#how" },
  { label: "Кейси", href: "#cases" },
  { label: "Відгуки", href: "#reviews" },
  { label: "Контакти", href: "#contacts" },
];

export const HERO_STATS = [
  { img: "/images/icons/clock.webp", value: "35 днів", label: "до ключів" },
  { img: "/images/icons/shield.webp", value: "100%", label: "застраховано" },
  { img: "/images/icons/globe.webp", value: "24/7", label: "підтримка" },
  { img: "/images/icons/hauler.webp", value: "Власна", label: "логістика" },
  { img: "/images/icons/pin.webp", value: "Відстеження", label: "на кожному етапі" },
];

export const STEPS = [
  {
    n: "01",
    img: "/images/process/01-auction.webp",
    title: "Купівля на аукціоні",
    text: "Підбираємо авто та викуповуємо для вас на Copart, IAAI чи в Європі.",
  },
  {
    n: "02",
    img: "/images/process/02-inspection.webp",
    title: "Інспекція та перевірка",
    text: "Повна перевірка авто та фото-звіт перед відправкою.",
  },
  {
    n: "03",
    img: "/images/process/03-port.webp",
    title: "Доставка в порт",
    text: "Підготовка та транспортування до порту відправлення.",
  },
  {
    n: "04",
    img: "/images/process/04-ocean.webp",
    title: "Морське перевезення",
    text: "RoRo або контейнер — на ваш вибір, з трекінгом судна.",
  },
  {
    n: "05",
    img: "/images/process/05-delivery.webp",
    title: "Митниця та доставка",
    text: "Розмитнення під ключ та доставка до ваших дверей.",
  },
];

export const LOGISTICS_POINTS = [
  "Власна мережа партнерів",
  "Прямі контракти з перевізниками",
  "Найкращі ціни без націнок",
  "Повна відповідальність за результат",
];

export const ADVANTAGES = [
  { icon: "Truck", title: "Автовози та RoRo", text: "Сучасні перевізники та безпечне транспортування." },
  { icon: "Shield", title: "Повне страхування", text: "Ваше авто застраховане на всьому шляху." },
  { icon: "Doc", title: "Прозорі умови", text: "Без прихованих платежів та неочікуваних витрат." },
  { icon: "Headset", title: "Підтримка 24/7", text: "Ми завжди на зв'язку на кожному етапі." },
];

export const CASES = [
  { model: "BMW X5", year: "2021", country: "Німеччина", flag: "🇩🇪", img: "/images/cars/bmw-x5.webp", price: "$1,920", days: "31 день" },
  { model: "Audi A6", year: "2020", country: "Польща", flag: "🇵🇱", img: "/images/cars/audi-a6.webp", price: "$1,650", days: "29 днів" },
  { model: "Toyota Camry", year: "2021", country: "США", flag: "🇺🇸", img: "/images/cars/toyota-camry.webp", price: "$2,480", days: "34 дні" },
];

export const REVIEWS = [
  { name: "Олександр", city: "Київ", rating: 5, avatar: "/images/av2.jpg", text: "Все пройшло ідеально! Авто отримав швидше, ніж очікував. Рекомендую!" },
  { name: "Максим", city: "перекуп", rating: 5, avatar: "/images/avf2.jpg", text: "Працюю з AUTONEX вже 8 місяців. Найкращі в справі — терміни й ціни тримають." },
  { name: "Ірина", city: "Львів", rating: 5, avatar: "/images/av5.jpg", text: "Везли авто з Європи, невелика затримка на кордоні, але підтримка тримала в курсі." },
  { name: "Дмитро", city: "Одеса", rating: 5, avatar: "/images/av2.jpg", text: "Розмитнення під ключ врятувало купу часу. Все офіційно й прозоро." },
];

export const TRACK_STEPS = [
  { code: "Купівля", state: "done" },
  { code: "В дорозі в порт", state: "done" },
  { code: "Морське перевезення", state: "active" },
  { code: "Митниця", state: "wait" },
  { code: "Доставка", state: "wait" },
];

export const COUNTRIES = ["DE", "PL", "NL", "BE", "FR", "IT", "CZ", "LT"];

export const FOOTER_SERVICES = ["Доставка з Європи", "Доставка з США", "Аукціонні послуги", "Страхування"];
export const FOOTER_COMPANY = ["Про нас", "Процес", "Кейси", "Контакти"];
