import { motion } from 'framer-motion';

const BEANS = [
  { top: '8%', left: '5%', size: 30, rotate: 25, delay: 0 },
  { top: '22%', left: '92%', size: 22, rotate: -40, delay: 1.2 },
  { top: '58%', left: '3%', size: 24, rotate: 70, delay: 0.6 },
  { top: '78%', left: '88%', size: 34, rotate: -15, delay: 1.8 },
  { top: '90%', left: '30%', size: 20, rotate: 110, delay: 0.3 },
  { top: '5%', left: '60%', size: 18, rotate: 45, delay: 2.2 },
];

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Bean({ size }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 24 34" fill="none">
      <ellipse cx="12" cy="17" rx="10" ry="15" fill="#6F4E37" />
      <path
        d="M12 3 C6 12, 18 22, 12 31"
        stroke="#2C1810"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function BackgroundDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-espresso via-[#33190F] to-roast"
    >
      <motion.div
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-caramel/20 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/3 top-1/2 h-72 w-72 rounded-full bg-mocha/25 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {BEANS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          style={{ top: b.top, left: b.left }}
          animate={{ y: [0, -18, 0], rotate: [b.rotate, b.rotate + 12, b.rotate] }}
          transition={{
            duration: 7 + i,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Bean size={b.size} />
        </motion.div>
      ))}

      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />
    </div>
  );
}
