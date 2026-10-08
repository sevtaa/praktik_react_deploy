import { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

export const TIP_Y = 44;
export const FLOOR_Y = 254;
const CENTER_X = 130;
const STRAND_X = [123, 137];

const landingY = (surface) => Math.min(surface + 2, FLOOR_Y);

function strandPath(x, surface, reach, cut) {
  const bottom = TIP_Y + reach * (landingY(surface) - TIP_Y);
  const top = TIP_Y + cut * (bottom - TIP_Y);
  return `M${x} ${top.toFixed(2)} V${bottom.toFixed(2)}`;
}

function Strand({ x, surface, reach, cut }) {
  const base = useTransform([surface, reach, cut], ([s, r, c]) =>
    strandPath(x, s, r, c),
  );
  const shine = useTransform([surface, reach, cut], ([s, r, c]) =>
    strandPath(x - 0.9, s, r, c),
  );

  return (
    <>
      <motion.path
        d={base}
        fill="none"
        stroke="#6B3A1B"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <motion.path
        d={shine}
        fill="none"
        stroke="#E2A867"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="4 8"
        animate={{ strokeDashoffset: [0, -12] }}
        transition={{ duration: 0.45, repeat: Infinity, ease: 'linear' }}
      />
    </>
  );
}

export default function PourStream({ surface, pouring }) {
  const reach = useMotionValue(0);
  const cut = useMotionValue(1);

  useEffect(() => {
    if (pouring) {
      cut.set(0);
      reach.set(0);
      const controls = animate(reach, 1, { duration: 0.35, ease: 'easeIn' });
      return () => controls.stop();
    }
    const controls = animate(cut, 1, { duration: 0.4, ease: 'easeIn' });
    return () => controls.stop();
  }, [pouring, reach, cut]);

  const opacity = useTransform(cut, (c) => (c >= 0.995 ? 0 : 1));

  return (
    <motion.g style={{ opacity }}>
      {STRAND_X.map((x) => (
        <Strand key={x} x={x} surface={surface} reach={reach} cut={cut} />
      ))}
    </motion.g>
  );
}

export function Ripple({ surface, active }) {
  const cy = useTransform(surface, landingY);

  if (!active) return null;

  return (
    <>
      {[0, 0.5].map((delay) => (
        <motion.ellipse
          key={delay}
          cx={CENTER_X}
          cy={cy}
          rx={6}
          ry={1}
          fill="none"
          stroke="#FDFBF7"
          strokeWidth="1.2"
          animate={{ rx: [6, 34], ry: [1, 6], opacity: [0.6, 0] }}
          transition={{ duration: 1, delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}
