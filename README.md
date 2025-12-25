# 💐 Kok Niat - Interactive Romantic Website

Sebuah website interaktif yang dibuat khusus sebagai hadiah spesial, penuh dengan animasi halus, musik romantis, dan pesan yang menyentuh hati. Project ini dirancang untuk memberikan pengalaman "digital journey" yang personal dan tak terlupakan.

![Project Preview](/public/icon-512.png) 
*(Note: Ganti path gambar ini dengan screenshot asli aplikasi jika ada)*

## ✨ Fitur Premium

Aplikasi ini dilengkapi dengan berbagai fitur interaktif yang dirancang untuk membangun suasana romantis:

### 💌 The Experience
*   **Envelope Opening**: Animasi pembuka berupa amplop surat 3D yang harus "dibuka" oleh pengguna.
*   **Personalized Greeting**: Menyapa pengguna dengan nama panggilan kesayangan mereka.
*   **Interactive Questions**: Serangkaian pertanyaan "This or That" dengan respon yang puitis dan memvalidasi perasaan.
*   **Romantic Atmosphere**: Efek visual **Falling Petals (Sakura)** & **Hearts** yang jatuh perlahan di background.
*   **Jurnal Memori (Recap)**: Di akhir sesi, jawaban pengguna dirangkum dalam bentuk "Jurnal Kenangan" yang manis.

### 🎨 Visual & Audio
*   **3 Tema Warna**: Pilihan tema Pink (Romance), Purple (Mystery), dan Blue (Calm) yang bisa diganti realtime.
*   **Smart Music Player**:
    *   Pemutar musik dengan playlist otomatis (Archive.org & Pixabay).
    *   Fitur **Auto-Fallback**: Jika satu lagu gagal diputar, otomatis pindah ke lagu cadangan.
    *   **Force Play Strategy**: Mengatasi blokir autoplay browser dengan mendeteksi interaksi pertama.
*   **Glassmorphism UI**: Desain modern dengan efek kaca yang elegan dan transisi yang sangat halus (Framer Motion).
*   **Mobile-First Design**: Tampilan yang dioptimalkan khusus untuk layar HP (tombol besar, layout vertikal).

### ⚙️ Teknis Canggih
*   **PWA Ready**: Bisa di-install menjadi aplikasi native di Android/iOS (icon di homescreen).
*   **Typing Animations**: Efek teks mengetik untuk memberikan kesan "sedang berbicara".
*   **Confetti Celebration**: Efek perayaan saat menyelesaikan perjalanan.
*   **Local Storage**: Menyimpan progress pengguna agar tidak hilang saat di-refresh.

## 🛠️ Tech Stack

Dibuat dengan teknologi web modern untuk performa maksimal:

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: Vanilla CSS (Optimized) + CSS Modules
*   **Animation**: [Framer Motion](https://www.framer.com/motion/)
*   **Audio**: HTML5 Audio API dengan Custom Logic
*   **Icons**: [Lucide React](https://lucide.dev/) (jika digunakan) / Emoji Native

## 🚀 Cara Menjalankan

1.  **Clone Repository** (atau download folder project):
    ```bash
    git clone https://github.com/username/kok-niat.git
    cd kok-niat
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Jalankan Development Server**:
    ```bash
    npm run dev
    ```

4.  **Buka Browser**:
    Kunjungi [http://localhost:3000](http://localhost:3000).

## 📝 Konfigurasi & Kustomisasi

Kamu bisa mengubah konten agar lebih personal untuk si dia:

*   **Pertanyaan & Respon**:
    Edit file `app/data.ts`. Ubah teks pertanyaan, pilihan jawaban, dan komentar romantisnya di sana.

*   **Musik**:
    Edit file `app/components/MusicPlayer.tsx`. Kamu bisa mengganti URL di variabel `playlist`.

*   **Nama Aplikasi & Metadata**:
    Edit file `app/layout.tsx` dan `public/manifest.json`.

## 📱 Cara Install (PWA)

1.  Buka website di browser HP (Chrome/Safari).
2.  Klik menu "Share" (iOS) atau titik tiga (Android).
3.  Pilih **"Add to Home Screen"** atau **"Tambahkan ke Layar Utama"**.
4.  Aplikasi akan muncul seperti aplikasi native dengan icon hati 💖.

## 💝 Credits

Dibuat dengan ❤️ oleh **Abib**.
*Special for someone special.*

---
*"Sebuah pesan tulus untuk seseorang yang spesial..."*
