import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { STEPS } from '../data/menu';
import { cn } from '../utils/cn';

export default function StepProgress({ step }) {
  return (
    <ol className="flex items-center" aria-label="Langkah formulir">
      {STEPS.map((s, i) => {
        const done = step > s.id;
        const active = step === s.id;
        const isLast = i === STEPS.length - 1;

        return (
          <li
            key={s.id}
            className={cn('flex items-center', !isLast && 'flex-1')}
            aria-current={active ? 'step' : undefined}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: active ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                  done && 'border-caramel bg-caramel text-espresso',
                  active &&
                    'border-caramel bg-caramel/20 text-cream shadow-[0_0_0_4px_rgba(198,134,66,0.18)]',
                  !done && !active && 'border-white/15 bg-white/5 text-cream/50',
                )}
              >
                {done ? <Check size={16} strokeWidth={3} /> : s.id}
              </motion.div>
              <span
                className={cn(
                  'hidden text-sm font-medium transition-colors sm:block',
                  active ? 'text-cream' : 'text-cream/45',
                )}
              >
                {s.title}
              </span>
            </div>

            {!isLast && (
              <div className="relative mx-3 h-0.5 flex-1 overflow-hidden rounded bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-caramel"
                  initial={false}
                  animate={{ width: done ? '100%' : '0%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
