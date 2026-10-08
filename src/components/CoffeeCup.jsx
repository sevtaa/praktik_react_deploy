import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
import CoffeeMachine from './CoffeeMachine';
import PourStream, { Ripple } from './PourStream';
import Steam from './Steam';
import { pourTiming } from '../utils/pour';

const CUP_PATH = 'M40 100 H220 L208 225 Q205 262 170 262 H90 Q55 262 52 225 Z';

const WAVE_PATH =
  'M0 0 Q30 -9 60 0 T120 0 T180 0 T240 0 T300 0 T360 0 T420 0 V30 H0 Z';

const EMPTY_Y = 280;
const FULL_Y = 116;

const CUP_TX = 70;
const CUP_TY = 150;

const BUBBLES = [
  { cx: 92, delay: 0, dur: 3.4 },
  { cx: 128, delay: 1.1, dur: 4 },
  { cx: 166, delay: 0.5, dur: 3.7 },
  { cx: 148, delay: 2, dur: 3.2 },
];

const surfaceFor = (level) =>
  EMPTY_Y - (EMPTY_Y - FULL_Y) * (Math.min(Math.max(level, 0), 100) / 100);

export default function CoffeeCup({
  level = 0,
  steaming = false,
  intense = false,
  onPouringChange,
  className = '',
}) {
  const surface = useMotionValue(EMPTY_Y);
  const [pouring, setPouring] = useState(false);

  useEffect(() => {
    const to = surfaceFor(level);
    const rising = to < surface.get() - 0.5;
    setPouring(rising);

    const controls = animate(surface, to, {
      ...pourTiming(rising),
      onComplete: () => setPouring(false),
    });
    return () => controls.stop();
  }, [level, surface]);

  useEffect(() => {
    onPouringChange?.(pouring);
  }, [pouring, onPouringChange]);

  return (
    <div className="relative">
      <motion.div
        aria-hidden
        className="absolute inset-x-10 bottom-[6%] h-[38%] rounded-full bg-amber-400/30 blur-3xl"
        animate={{
          opacity: steaming || pouring ? 0.9 : 0.25,
          scale: steaming || pouring ? 1.1 : 1,
        }}
        transition={{ duration: 1 }}
      />

      <svg
        viewBox="0 0 400 480"
        className={className}
        role="img"
        aria-label={`Mesin kopi mengisi cangkir, terisi ${Math.round(level)} persen`}
      >
        <defs>
          <linearGradient id="coffeeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C68642" />
            <stop offset="25%" stopColor="#9A6030" />
            <stop offset="100%" stopColor="#3A1D0E" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDFBF7" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FDFBF7" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="saucerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDFBF7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FDFBF7" stopOpacity="0.08" />
          </linearGradient>
          <clipPath id="cupClip">
            <path d={CUP_PATH} />
          </clipPath>
          <filter id="steamBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
        </defs>

        <CoffeeMachine level={level} pouring={pouring} done={intense} />

        <g transform={`translate(${CUP_TX} ${CUP_TY})`}>
          <ellipse cx="130" cy="278" rx="112" ry="17" fill="rgba(0,0,0,0.35)" />
          <ellipse
            cx="130"
            cy="270"
            rx="108"
            ry="15"
            fill="url(#saucerGrad)"
            stroke="rgba(253,251,247,0.45)"
            strokeWidth="2"
          />

          <path
            d="M217 122 H240 Q268 122 268 152 Q268 184 238 184 H211"
            fill="none"
            stroke="rgba(253,251,247,0.5)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          <ellipse
            cx="130"
            cy="100"
            rx="90"
            ry="8"
            fill="rgba(44,24,16,0.4)"
            stroke="rgba(253,251,247,0.55)"
            strokeWidth="2"
          />

          <g clipPath="url(#cupClip)">
            <motion.g style={{ y: surface }}>
              <motion.path
                d={WAVE_PATH}
                fill="#C68642"
                animate={{ x: [0, -120] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
              />
              <rect x="0" y="0" width="280" height="170" fill="url(#coffeeGrad)" />

              {BUBBLES.map((b) => (
                <motion.circle
                  key={b.cx}
                  cx={b.cx}
                  r="2.5"
                  fill="#FDFBF7"
                  initial={{ cy: 44, opacity: 0 }}
                  animate={{ cy: [44, 8], opacity: [0, 0.45, 0] }}
                  transition={{
                    duration: b.dur,
                    delay: b.delay,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </motion.g>

            <Ripple surface={surface} active={pouring} />
          </g>

          <PourStream surface={surface} pouring={pouring} />

          <path d={CUP_PATH} fill="url(#glassGrad)" />
          <path
            d="M64 118 L71 214"
            stroke="rgba(253,251,247,0.4)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M80 118 L83 150"
            stroke="rgba(253,251,247,0.22)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d={CUP_PATH}
            fill="none"
            stroke="rgba(253,251,247,0.55)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          <Steam active={steaming && !pouring} intense={intense} />
        </g>
      </svg>
    </div>
  );
}
