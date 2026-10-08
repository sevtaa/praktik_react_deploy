import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { pourTiming } from '../utils/pour';

export function useCountUp(value) {
  const motionValue = useMotionValue(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (v) => setShown(Math.round(v)));
    const controls = animate(
      motionValue,
      value,
      pourTiming(value > motionValue.get()),
    );
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, motionValue]);

  return shown;
}

export default function AnimatedNumber({ value, className = '' }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(
      motionValue,
      value,
      pourTiming(value > motionValue.get()),
    );
    return () => controls.stop();
  }, [value, motionValue]);

  return <motion.span className={className}>{rounded}</motion.span>;
}
