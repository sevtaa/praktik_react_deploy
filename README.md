# Kedai Kopi Senja — Formulir Presensi & Pemesanan

Aplikasi React (Vite) bertema *cozy coffee shop* dengan cangkir kopi interaktif,
form 3 langkah, animasi uap, dan struk kasir di layar sukses.

**Tech stack:** React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion · Lucide React

## Cara menjalankan (folder ini sudah lengkap)

Butuh **Node.js 18+**.

```bash
npm install
npm run dev
```

Buka alamat yang muncul di terminal (biasanya http://localhost:5173).

Perintah lain:

```bash
npm run build     # build produksi ke folder dist/
npm run preview   # pratinjau hasil build
```

## Membuat proyek yang sama dari nol

```bash
# 1. Buat proyek Vite + React
npm create vite@latest kopi-presensi -- --template react
cd kopi-presensi

# 2. Pasang library
npm install framer-motion lucide-react
npm install -D tailwindcss@3 postcss autoprefixer

# 3. Buat konfigurasi Tailwind (tailwind.config.js & postcss.config.js)
npx tailwindcss init -p
```

Lalu salin isi `tailwind.config.js`, `src/index.css`, `index.html`, dan seluruh
folder `src/` dari proyek ini.

## Struktur folder

```
kopi-presensi/
├── index.html                 # entry HTML + Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js         # warna & font tema kopi
├── postcss.config.js
└── src/
    ├── main.jsx               # entry React
    ├── App.jsx                # latar belakang + CoffeeForm
    ├── index.css              # Tailwind + class glass/neumorphism
    ├── data/
    │   └── menu.js            # varian kopi, level gula, langkah form
    ├── utils/
    │   ├── pour.js            # timing animasi tuang (dipakai bersama)
    │   ├── cn.js              # helper gabung className
    │   ├── format.js          # format Rupiah, tanggal, nomor order
    │   └── validators.js      # validasi per langkah
    └── components/
        ├── CoffeeForm.jsx     # KOMPONEN UTAMA: state, validasi, alur step
        ├── CupPanel.jsx       # cangkir + indikator "Level Kopi"
        ├── CoffeeCup.jsx      # mesin + cangkir dalam satu SVG, cairan, gelombang
        ├── CoffeeMachine.jsx  # mesin kopi: hopper, layar, lampu, gauge, nozzle
        ├── PourStream.jsx     # aliran kopi dari nozzle + riak di permukaan
        ├── Steam.jsx          # animasi uap
        ├── AnimatedNumber.jsx # angka persen yang menghitung halus
        ├── BackgroundDecor.jsx# gradient, blob, biji kopi melayang
        ├── StepProgress.jsx   # indikator langkah 1–2–3
        ├── Receipt.jsx        # struk kasir bergerigi
        ├── SuccessScreen.jsx  # layar sukses
        ├── steps/
        │   ├── StepPersonal.jsx   # Step 1: nama & email
        │   ├── StepOrder.jsx      # Step 2: varian, gula, jumlah
        │   └── StepConfirm.jsx    # Step 3: catatan & konfirmasi
        └── ui/
            └── Field.jsx      # label + pesan error
```

## Alur & interaksi

| Langkah | Isi | Level kopi |
| --- | --- | --- |
| 1 | Nama & email | 33% |
| 2 | Varian kopi, level gula, jumlah | 66% |
| 3 | Catatan khusus & konfirmasi | 100% |

- **Uap kopi** mengepul saat semua input pada langkah aktif valid.
- Tombol **Lanjut** menolak langkah yang belum valid (formulir bergoyang + pesan error).
- **Kirim** menampilkan layar sukses: cangkir penuh dengan uap lebih lebat dan
  struk kasir yang "tercetak" keluar.

## Kustomisasi cepat

- Menu & harga: `src/data/menu.js`
- Warna tema: `tailwind.config.js` (`espresso`, `roast`, `cream`, `caramel`, …)
- Nama kedai: `SHOP` di `src/data/menu.js`
- Pengiriman ke server: ganti `setTimeout` di `handleSubmit`
  (`src/components/CoffeeForm.jsx`) dengan `fetch`/`axios` ke API-mu.
