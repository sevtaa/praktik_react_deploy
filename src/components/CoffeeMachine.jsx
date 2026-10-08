import { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useCountUp } from './AnimatedNumber';

const MONO = '"Space Mono", ui-monospace, monospace';

const LAMPS = [
  { cx: 236, at: 33 },
  { cx: 266, at: 66 },
  { cx: 296, at: 100 },
];

const GAUGE = { cx: 346, cy: 88, r: 21, needle: 15 };
const GAUGE_REST = -55;
const toRad = (deg) => (deg * Math.PI) / 180;

const BEANS = [
  { x: 172, y: 44, r: 10 },
  { x: 190, y: 46, r: -20 },
  { x: 208, y: 45, r: 15 },
  { x: 226, y: 44, r: -8 },
  { x: 180, y: 34, r: 30 },
  { x: 200, y: 35, r: -12 },
  { x: 220, y: 34, r: 22 },
  { x: 190, y: 24, r: 5 },
  { x: 212, y: 24, r: -25 },
];

const TRAY_SLOTS = Array.from({ length: 14 }, (_, i) => 58 + i * 20.6);

function MiniBean({ x, y, r }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <ellipse rx="7" ry="4.6" fill="#6F4E37" />
      <path
        d="M-6 0 Q0 -2 6 0"
        stroke="#2C1810"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

function Gauge({ pouring }) {
  const angle = useMotionValue(GAUGE_REST);

  useEffect(() => {
    const controls = pouring
      ? animate(angle, [GAUGE_REST, 35, 28, 40, 32], {
          duration: 1.6,
          ease: 'easeOut',
        })
      : animate(angle, GAUGE_REST, { duration: 0.9, ease: 'easeInOut' });
    return () => controls.stop();
  }, [pouring, angle]);

  const x2 = useTransform(angle, (a) => GAUGE.cx + GAUGE.needle * Math.sin(toRad(a)));
  const y2 = useTransform(angle, (a) => GAUGE.cy - GAUGE.needle * Math.cos(toRad(a)));

  return (
    <g>
      <circle
        cx={GAUGE.cx}
        cy={GAUGE.cy}
        r={GAUGE.r}
        fill="#150A05"
        stroke="url(#mCopper)"
        strokeWidth="3"
      />
      {[-55, -28, 0, 28, 55].map((a) => (
        <line
          key={a}
          x1={GAUGE.cx + 16 * Math.sin(toRad(a))}
          y1={GAUGE.cy - 16 * Math.cos(toRad(a))}
          x2={GAUGE.cx + 19 * Math.sin(toRad(a))}
          y2={GAUGE.cy - 19 * Math.cos(toRad(a))}
          stroke="rgba(253,251,247,0.5)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      ))}
      <motion.line
        x1={GAUGE.cx}
        y1={GAUGE.cy}
        x2={x2}
        y2={y2}
        stroke="#FFB84D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx={GAUGE.cx} cy={GAUGE.cy} r="2.8" fill="#FDFBF7" />
      <text
        x={GAUGE.cx}
        y={GAUGE.cy + 14}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="6"
        letterSpacing="1"
        fill="rgba(253,251,247,0.5)"
      >
        BAR
      </text>
    </g>
  );
}

export default function CoffeeMachine({ level, pouring, done }) {
  const shown = useCountUp(level);
  const status = pouring ? 'MENYEDUH' : done ? 'SELESAI' : 'SIAP';

  return (
    <g>
      <defs>
        <linearGradient id="mBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A3520" />
          <stop offset="100%" stopColor="#2A150C" />
        </linearGradient>
        <linearGradient id="mCopper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0A25E" />
          <stop offset="55%" stopColor="#B0702F" />
          <stop offset="100%" stopColor="#7A4A1E" />
        </linearGradient>
        <linearGradient id="mSteel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4DDD0" />
          <stop offset="100%" stopColor="#8E877C" />
        </linearGradient>
        <linearGradient id="mCavity" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E0603" />
          <stop offset="100%" stopColor="#25130A" />
        </linearGradient>
        <filter id="mLampBlur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="mGlowBlur" x="-50%" y="-150%" width="200%" height="400%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <rect
        x="24"
        y="50"
        width="352"
        height="420"
        rx="28"
        fill="url(#mBody)"
        stroke="rgba(253,251,247,0.16)"
        strokeWidth="2"
      />
      <path
        d="M46 54 H354"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <rect x="148" y="46" width="104" height="9" rx="3" fill="url(#mCopper)" />
      <path
        d="M140 16 H260 L248 50 H152 Z"
        fill="rgba(253,251,247,0.10)"
        stroke="rgba(253,251,247,0.38)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <motion.g
        animate={
          pouring
            ? { x: [0, 1.2, -1.2, 0.8, 0], y: [0, -0.8, 0.6, -0.4, 0] }
            : { x: 0, y: 0 }
        }
        transition={
          pouring
            ? { duration: 0.35, repeat: Infinity }
            : { duration: 0.2 }
        }
      >
        {BEANS.map((b) => (
          <MiniBean key={`${b.x}-${b.y}`} {...b} />
        ))}
      </motion.g>
      <rect x="132" y="6" width="136" height="12" rx="6" fill="url(#mCopper)" />

      <rect
        x="52"
        y="66"
        width="150"
        height="50"
        rx="10"
        fill="#150A05"
        stroke="rgba(253,251,247,0.12)"
      />
      <text
        x="64"
        y="82"
        fontFamily={MONO}
        fontSize="8"
        letterSpacing="2"
        fill="#C68642"
      >
        LEVEL KOPI
      </text>
      <motion.text
        x="190"
        y="82"
        textAnchor="end"
        fontFamily={MONO}
        fontSize="8"
        letterSpacing="1"
        fill={pouring ? '#FFB84D' : '#A8D5A2'}
        animate={{ opacity: pouring ? [1, 0.25, 1] : 1 }}
        transition={
          pouring
            ? { duration: 0.9, repeat: Infinity }
            : { duration: 0.2 }
        }
      >
        {status}
      </motion.text>
      <text
        x="64"
        y="107"
        fontFamily={MONO}
        fontSize="22"
        fontWeight="700"
        fill="#FFB84D"
      >
        {shown}%
      </text>

      {LAMPS.map((lamp) => {
        const lit = shown >= lamp.at;
        return (
          <g key={lamp.at}>
            <circle
              cx={lamp.cx}
              cy="84"
              r="10"
              fill="#150A05"
              stroke="rgba(253,251,247,0.18)"
            />
            <motion.circle
              cx={lamp.cx}
              cy="84"
              r="12"
              fill="#FFB84D"
              filter="url(#mLampBlur)"
              initial={false}
              animate={{ opacity: lit ? 0.55 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.circle
              cx={lamp.cx}
              cy="84"
              r="7"
              initial={false}
              animate={{ fill: lit ? '#FFB84D' : '#3A2214' }}
              transition={{ duration: 0.3 }}
            />
            <text
              x={lamp.cx}
              y="106"
              textAnchor="middle"
              fontFamily={MONO}
              fontSize="8"
              fill="rgba(253,251,247,0.5)"
            >
              {lamp.at}
            </text>
          </g>
        );
      })}

      <Gauge pouring={pouring} />

      <path d="M40 122 H360" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

      <rect
        x="48"
        y="128"
        width="304"
        height="308"
        rx="20"
        fill="url(#mCavity)"
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="2"
      />

      <rect x="146" y="128" width="108" height="40" rx="12" fill="url(#mCopper)" />
      <rect x="146" y="152" width="108" height="5" fill="rgba(0,0,0,0.25)" />
      <rect x="160" y="168" width="80" height="16" rx="6" fill="url(#mSteel)" />
      <rect x="236" y="172" width="78" height="9" rx="4.5" fill="#5A3A22" />
      <rect x="304" y="170" width="14" height="13" rx="6" fill="#3A2214" />
      <rect x="189" y="184" width="8" height="10" rx="2" fill="url(#mSteel)" />
      <rect x="203" y="184" width="8" height="10" rx="2" fill="url(#mSteel)" />

      <motion.ellipse
        cx="200"
        cy="192"
        rx="70"
        ry="16"
        fill="#FFB84D"
        filter="url(#mGlowBlur)"
        initial={false}
        animate={{ opacity: pouring ? 0.4 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <rect x="40" y="436" width="320" height="18" rx="6" fill="url(#mCopper)" />
      {TRAY_SLOTS.map((x) => (
        <rect
          key={x}
          x={x}
          y="441"
          width="12"
          height="3"
          rx="1.5"
          fill="rgba(0,0,0,0.45)"
        />
      ))}

      <text
        x="200"
        y="467"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="4"
        fill="#C68642"
      >
        KEDAI KOPI SENJA
      </text>
    </g>
  );
}
