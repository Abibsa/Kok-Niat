import { Question } from './types';

export const allQuestions: Question[] = [
    {
        id: 1,
        question: "Di antara aroma pagi, {nama} lebih terpikat pada... ☕🍵",
        options: ["Pahit manis Kopi ☕", "Aroma tenangnya Teh 🍵"],
        responses: [
            "Penyuka kopi... sosok yang dinamis tapi punya sisi manis yang tersembunyi. 😊☕",
            "Penyuka teh... jiwa yang tenang, meneduhkan, dan bikin nyaman siapa aja di dekatnya. 🍃"
        ]
    },
    {
        id: 2,
        question: "Saat langit berbicara, {nama} lebih suka mendengarkan... 🌧️☀️",
        options: ["Senandung Hujan 🌧️", "Hangatnya Matahari ☀️"],
        responses: [
            "Penyuka rintik... katanya orang yang suka hujan punya hati yang deep dan penuh perasaan. 🌧️💭",
            "Penyuka terang... pantulan jiwamu yang selalu hangat menyinari sekeliling. ☀️✨"
        ]
    },
    {
        id: 3,
        question: "Ketika dunia terasa bising, tempat pelarian {nama} adalah...",
        options: ["Deep sleep 😴", "Movie marathon 📺", "Tenggelam di lagu 🎵"],
        responses: [
            "Tidur adalah cara terbaik me-recharge senyum manismu besok. 😴💤",
            "Masuk ke cerita lain... imajinasimu pasti seindah film favoritmu. 📺✨",
            "Lewat nada... karena terkadang lagu lebih mengerti perasaan daripada kata-kata. 🎵🎧"
        ]
    },
    {
        id: 4,
        question: "Di waktu mana {nama} merasa paling 'hidup'? 🌅🌙",
        options: ["Kelembutan Pagi 🌅", "Misteri Malam 🌙"],
        responses: [
            "Pagi yang penuh harapan, sama seperti energi positif yang kamu bawa setiap hari. 🌅✨",
            "Malam yang syahdu... waktu di mana bintang (dan kamu) bersinar paling terang. 🌙💫"
        ]
    },
    {
        id: 5,
        question: "Apa cara favorit {nama} menikmati 'Me Time'? ✨",
        options: ["Menyelami Buku 📚", "Serunya Game 🎮", "Scroll Dunia Maya 📱"],
        responses: [
            "Membaca... tanda seseorang yang punya pemikiran luas dan hati yang peka. 📚💡",
            "Antusiasme-mu saat main game itu gemas banget tau. 🎮🔥",
            "Selalu update... wawasanmu luas, makanya ngobrol sama kamu nggak pernah bosenin. 📱✨"
        ]
    },
    {
        id: 6,
        question: "Jika bisa lari sejenak, {nama} ingin pergi ke... 🗺️",
        options: ["Deburan Pantai 🏖️", "Dinginnya Gunung 🏔️"],
        responses: [
            "Pantai... berjiwa bebas dan menenangkan kayak suara ombak. 🏖️🌊",
            "Gunung... tangguh dan menyukai ketenangan di ketinggian. 🏔️⛰️"
        ]
    },
    {
        id: 7,
        question: "Rasa apa yang paling bisa bikin mood {nama} balik lagi?",
        options: ["Manis 🍰", "Gurih Asin 🍟"],
        responses: [
            "Manis... tapi kayaknya nggak ada yang lebih manis dari senyum kamu deh. 🍰💕",
            "Gurih... simpel, apa adanya, dan ngangenin. Kayak kamu. 🍟😋"
        ]
    },
    {
        id: 8,
        question: "Di antara dua teman setia ini, mana yang {nama} pilih?",
        options: ["Kucing Menggemaskan 🐱", "Anjing Setia 🐶"],
        responses: [
            "Suka kucing? Pantesan kamu punya aura misterius yang bikin penasaran. 🐱💕",
            "Suka anjing? Kelihatan banget kok kamu orang yang tulus dan penyayang. 🐶💌"
        ]
    }
];

export const getRandomQuestions = (count: number = 3): Question[] => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((q, index) => ({ ...q, id: index + 1 }));
};

export const questions = getRandomQuestions(3);

export const STORAGE_KEY = 'kok_niat_progress';

export const saveProgress = (progress: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
};

export const loadProgress = () => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    }
    return null;
};

export const clearProgress = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
    }
};
