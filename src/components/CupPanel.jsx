import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Coffee, Flame, Sparkles } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';
import CoffeeCup from './CoffeeCup';
import { STEPS } from '../data/menu';

const SPARKLES = [
  { top: '12%', left: '4%', size: 30, delay: 0 },
  { top: '30%', left: '94%', size: 18, delay: 0.5 },
  { top: '58%', left: '0%', size: 16, delay: 1 },
  { top: '72%', left: '98%', size: 24, delay: 1.5 },
  { top: '4%', left: '70%', size: 14, delay: 0.8 },
];

const SUCCESS_MESSAGE = 'Kopimu sudah siap disajikan. Selamat menikmati!';

const BADGE =
  'inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200';

export default function CupPanel({ step, steaming, isSuccess }) {
  const [pouring, setPouring] = useState(false);

  const current = STEPS.find((s) => s.id === step) ?? STEPS[0];
  const level = isSuccess ? 100 : current.level;
  const message = isSuccess ? SUCCESS_MESSAGE : current.message;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-row items-center justify-center gap-4 sm:gap-8 lg:flex-col lg:gap-6"
    >
      <div className="relative shrink-0">
        <CoffeeCup
          level={level}
          steaming={steaming || isSuccess}
          intense={isSuccess}
          onPouringChange={setPouring}
          className="w-40 drop-shadow-2xl sm:w-56 lg:w-80"
        />

        {isSuccess &&
          SPARKLES.map((s, i) => (
            <motion.span
              key={i}
              className="absolute text-amber-300"
              style={{ top: s.top, left: s.left }}
              animate={{ scale: [0, 1, 0], rotate: [0, 90, 180], opacity: [0, 1, 0] }}
              transition={{
                duration: 2.4,
                delay: s.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Sparkles size={s.size} />
            </motion.span>
          ))}
      </div>

      <div className="min-w-0 flex-1 lg:w-full lg:max-w-xs lg:flex-none lg:text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-latte/70">
          Level Kopi
        </p>

        <p className="mt-1 font-display text-5xl font-bold leading-none text-cream sm:text-6xl">
          <AnimatedNumber value={level} />
          <span className="ml-0.5 text-3xl text-caramel sm:text-4xl">%</span>
        </p>

        <div
          className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10 shadow-neu-in"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={level}
          aria-label="Level kopi"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-caramel to-amber-400"
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 2.2, delay: 0.35, ease: 'easeInOut' }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-sm leading-relaxed text-cream/70"
          >
            {message}
          </motion.p>
        </AnimatePresence>

        <div className="mt-3 min-h-[1.75rem] lg:flex lg:justify-center">
          <AnimatePresence mode="wait">
            {pouring ? (
              <motion.span
                key="pour"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={BADGE}
              >
                <Coffee size={13} className="animate-pulse" aria-hidden />
                Mesin sedang menyeduh…
              </motion.span>
            ) : steaming && !isSuccess ? (
              <motion.span
                key="steam"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={BADGE}
              >
                <Flame size={13} aria-hidden />
                Langkah lengkap, uap mengepul
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
