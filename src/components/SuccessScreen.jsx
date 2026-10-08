import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import Receipt from './Receipt';

export default function SuccessScreen({ order, onReset }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 sm:p-8"
      aria-live="polite"
    >
      <div className="flex flex-col items-center text-center">
        <motion.svg viewBox="0 0 52 52" className="h-14 w-14" aria-hidden>
          <motion.circle
            cx="26"
            cy="26"
            r="24"
            fill="none"
            stroke="#C68642"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d="M15 27 l8 8 l14 -16"
            fill="none"
            stroke="#FDFBF7"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
        </motion.svg>

        <h2 className="mt-4 font-display text-3xl font-bold">
          Terima kasih, {order.name.split(' ')[0]}!
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/70">
          Presensi & pesananmu sudah kami terima. Tunjukkan nomor{' '}
          <span className="font-mono font-bold text-amber-300">#{order.id}</span>{' '}
          ke barista.
        </p>
      </div>

      <div className="mt-8">
        <Receipt order={order} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
        className="mt-8 flex justify-center"
      >
        <motion.button
          type="button"
          onClick={onReset}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary"
        >
          <RotateCcw size={18} aria-hidden />
          Buat Pesanan Baru
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
