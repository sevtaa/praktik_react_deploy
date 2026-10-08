import { AnimatePresence, motion } from 'framer-motion';

const WISP = 'M0 0 C 14 -14, -14 -28, 0 -42 S 14 -70, 0 -84';

const BASE_WISPS = [
  { x: 98, delay: 0, dur: 2.8 },
  { x: 130, delay: 0.7, dur: 3.2 },
  { x: 162, delay: 1.4, dur: 2.9 },
];

const EXTRA_WISPS = [
  { x: 114, delay: 0.35, dur: 3 },
  { x: 146, delay: 1.05, dur: 3.3 },
];

export default function Steam({ active, intense = false, baseY = 88 }) {
  const wisps = intense ? [...BASE_WISPS, ...EXTRA_WISPS] : BASE_WISPS;

  return (
    <g filter="url(#steamBlur)">
      <AnimatePresence>
        {active && (
          <motion.g
            key="steam"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {wisps.map((w) => (
              <g key={w.x} transform={`translate(${w.x} ${baseY})`}>
                <motion.path
                  d={WISP}
                  fill="none"
                  stroke="#FDFBF7"
                  strokeWidth={5}
                  strokeLinecap="round"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: [0, 0.75, 0],
                    y: [0, -30],
                    scaleY: [0.85, 1.2],
                  }}
                  transition={{
                    duration: w.dur,
                    delay: w.delay,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              </g>
            ))}
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  );
}
