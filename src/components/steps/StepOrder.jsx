import { AnimatePresence, motion } from 'framer-motion';
import { Candy, Check, Coffee, Minus, Plus } from 'lucide-react';
import { FieldError } from '../ui/Field';
import { COFFEE_OPTIONS, MAX_QTY, SUGAR_LEVELS } from '../../data/menu';
import { cn } from '../../utils/cn';
import { formatRupiah } from '../../utils/format';

export default function StepOrder({ data, errors, onChange }) {
  const firstName = data.name.trim().split(' ')[0];

  return (
    <div className="space-y-6">
      {firstName && (
        <p className="text-sm text-cream/70">
          Halo, <span className="font-semibold text-latte">{firstName}</span>!
          Mau seduhan apa hari ini?
        </p>
      )}

      <fieldset>
        <legend className="mb-3 flex items-center gap-2 text-sm font-medium text-latte">
          <Coffee size={16} className="text-caramel" aria-hidden />
          Topik Presensi / Varian Kopi
        </legend>

        <div className="grid grid-cols-2 gap-3" role="radiogroup">
          {COFFEE_OPTIONS.map((opt) => {
            const selected = data.coffee === opt.id;
            const Icon = opt.icon;

            return (
              <motion.button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange('coffee', opt.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'relative overflow-hidden rounded-2xl border p-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel/60 sm:p-4',
                  selected
                    ? 'border-caramel/80 text-cream'
                    : 'border-white/10 bg-espresso/30 text-cream/80 hover:border-white/25',
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="coffee-highlight"
                    className="absolute inset-0 bg-gradient-to-br from-caramel/30 to-amber-700/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                <span className="relative z-10 flex flex-col gap-2">
                  <span className="flex items-center justify-between">
                    <span
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-xl transition-colors',
                        selected ? 'bg-caramel text-espresso' : 'bg-white/10 text-latte',
                      )}
                    >
                      <Icon size={18} aria-hidden />
                    </span>
                    <AnimatePresence>
                      {selected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-cream text-espresso"
                        >
                          <Check size={12} strokeWidth={3} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>

                  <span className="font-semibold">{opt.name}</span>
                  <span className="text-xs leading-snug text-cream/55">
                    {opt.tagline}
                  </span>
                  <span className="text-sm font-medium text-amber-300">
                    {formatRupiah(opt.price)}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
        <div className="mt-2">
          <FieldError id="coffee-error" message={errors.coffee} />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 flex items-center gap-2 text-sm font-medium text-latte">
          <Candy size={16} className="text-caramel" aria-hidden />
          Level Gula
        </legend>

        <div
          className="grid grid-cols-5 gap-1.5 rounded-2xl bg-espresso/40 p-1.5 shadow-neu-in"
          role="radiogroup"
        >
          {SUGAR_LEVELS.map((lvl) => {
            const selected = data.sugar === lvl.value;
            return (
              <button
                key={lvl.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange('sugar', lvl.value)}
                className="relative rounded-xl py-2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel/60"
              >
                {selected && (
                  <motion.span
                    layoutId="sugar-pill"
                    className="absolute inset-0 rounded-xl bg-caramel"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={cn(
                    'relative z-10 flex flex-col leading-tight transition-colors',
                    selected ? 'text-espresso' : 'text-cream/70',
                  )}
                >
                  <span className="text-sm font-bold">{lvl.value}%</span>
                  <span className="text-[10px] sm:text-xs">{lvl.label}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-2">
          <FieldError id="sugar-error" message={errors.sugar} />
        </div>
      </fieldset>

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <span className="text-sm font-medium text-latte">Jumlah</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Kurangi jumlah"
            disabled={data.quantity <= 1}
            onClick={() => onChange('quantity', data.quantity - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 disabled:opacity-30"
          >
            <Minus size={16} />
          </button>

          <div className="w-8 overflow-hidden text-center text-lg font-semibold">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={data.quantity}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {data.quantity}
              </motion.span>
            </AnimatePresence>
          </div>

          <button
            type="button"
            aria-label="Tambah jumlah"
            disabled={data.quantity >= MAX_QTY}
            onClick={() => onChange('quantity', data.quantity + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-caramel text-espresso transition hover:brightness-110 disabled:opacity-30"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
