import { motion } from 'framer-motion';
import { SHOP, SUGAR_LEVELS, TAX_RATE } from '../data/menu';
import { formatDateTime, formatRupiah } from '../utils/format';

const TEETH = 14;
const ZIGZAG = (() => {
  const points = ['0 0', '100% 0'];
  for (let i = TEETH; i >= 0; i--) {
    const x = ((i * 100) / TEETH).toFixed(3);
    const y = i % 2 === 0 ? 'calc(100% - 10px)' : '100%';
    points.push(`${x}% ${y}`);
  }
  return `polygon(${points.join(',')})`;
})();

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } },
};
const item = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0 },
};

function Row({ left, right, bold = false }) {
  return (
    <div className={`flex justify-between gap-4 ${bold ? 'font-bold' : ''}`}>
      <span className="min-w-0 break-words">{left}</span>
      <span className="shrink-0 text-right">{right}</span>
    </div>
  );
}

function Divider() {
  return <div className="my-3 border-t border-dashed border-espresso/35" />;
}

function Barcode({ seed }) {
  const bars = Array.from({ length: 44 }, (_, i) => ({
    w: 1 + ((i * 7 + seed.charCodeAt(i % seed.length)) % 3),
  }));
  return (
    <div className="flex h-10 items-stretch justify-center gap-[2px]" aria-hidden>
      {bars.map((b, i) => (
        <span
          key={i}
          className="bg-espresso"
          style={{ width: `${b.w}px`, opacity: i % 5 === 0 ? 0.55 : 1 }}
        />
      ))}
    </div>
  );
}

export default function Receipt({ order }) {
  const sugar = SUGAR_LEVELS.find((s) => s.value === order.sugar);

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative z-10 mx-auto -mb-2 h-3.5 w-[104%] -translate-x-[2%] rounded-full border border-white/10 bg-black/60 shadow-inner" />

      <div className="drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)]">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-cream px-6 pb-10 pt-6 font-mono text-[13px] leading-relaxed text-espresso"
            style={{ clipPath: ZIGZAG }}
          >
            <motion.div variants={container} initial="hidden" animate="show">
              <motion.div variants={item} className="text-center">
                <p className="font-display text-xl font-bold tracking-wide">
                  {SHOP.name}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-mocha">
                  {SHOP.tagline}
                </p>
                <p className="text-xs text-mocha">{SHOP.address}</p>
              </motion.div>

              <Divider />

              <motion.div variants={item} className="space-y-0.5">
                <Row left="No. Order" right={`#${order.id}`} bold />
                <Row left="Waktu" right={formatDateTime(order.createdAt)} />
                <Row left="Nama" right={order.name} />
                <Row left="Email" right={<span className="break-all">{order.email}</span>} />
                <Row left="Presensi" right="HADIR ✓" bold />
              </motion.div>

              <Divider />

              <motion.div variants={item} className="space-y-0.5">
                <Row
                  left={`${order.quantity}× ${order.coffee.name}`}
                  right={formatRupiah(order.subtotal)}
                />
                <p className="text-xs text-mocha">
                  Gula: {sugar?.label} ({order.sugar}%)
                </p>
                {order.notes && (
                  <p className="break-words text-xs text-mocha">
                    Catatan: {order.notes}
                  </p>
                )}
              </motion.div>

              <Divider />

              <motion.div variants={item} className="space-y-0.5">
                <Row left="Subtotal" right={formatRupiah(order.subtotal)} />
                <Row
                  left={`PB1 ${TAX_RATE * 100}%`}
                  right={formatRupiah(order.tax)}
                />
                <div className="pt-1 text-base">
                  <Row left="TOTAL" right={formatRupiah(order.total)} bold />
                </div>
              </motion.div>

              <Divider />

              <motion.div variants={item} className="space-y-3 text-center">
                <Barcode seed={order.id} />
                <p className="text-xs font-bold tracking-[0.25em]">
                  TERIMA KASIH
                </p>
                <p className="text-xs text-mocha">Sampai jumpa di cangkir berikutnya</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
