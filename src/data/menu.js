import { Cloud, Milk, Snowflake, Zap } from 'lucide-react';

export const SHOP = {
  name: 'Kedai Kopi Senja',
  tagline: 'Presensi & Pemesanan',
  address: 'Jl. Libra Raya No. 7',
};

export const TAX_RATE = 0.1;
export const MAX_NOTES = 120;
export const MAX_QTY = 10;

export const COFFEE_OPTIONS = [
  {
    id: 'espresso',
    name: 'Espresso',
    tagline: 'Pekat, kuat, berani',
    price: 18000,
    icon: Zap,
  },
  {
    id: 'latte',
    name: 'Latte',
    tagline: 'Lembut dengan susu creamy',
    price: 26000,
    icon: Milk,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    tagline: 'Foam tebal, aroma hangat',
    price: 25000,
    icon: Cloud,
  },
  {
    id: 'coldbrew',
    name: 'Cold Brew',
    tagline: 'Diseduh dingin 18 jam',
    price: 28000,
    icon: Snowflake,
  },
];

export const SUGAR_LEVELS = [
  { value: 0, label: 'Tanpa' },
  { value: 25, label: 'Sedikit' },
  { value: 50, label: 'Normal' },
  { value: 75, label: 'Manis' },
  { value: 100, label: 'Ekstra' },
];

export const STEPS = [
  {
    id: 1,
    title: 'Data Diri',
    subtitle: 'Kenalan dulu sebelum ngopi',
    level: 33,
    message: 'Biji kopi mulai digiling… isi data dirimu.',
  },
  {
    id: 2,
    title: 'Pilih Seduhan',
    subtitle: 'Varian kopi & level kemanisan',
    level: 66,
    message: 'Air panas dituang. Pilih seduhan favoritmu.',
  },
  {
    id: 3,
    title: 'Konfirmasi',
    subtitle: 'Cek ulang & kirim presensi',
    level: 100,
    message: 'Sedikit lagi penuh! Konfirmasi dan sajikan.',
  },
];
