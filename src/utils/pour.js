export const POUR_EASE = 'easeInOut';

export const pourTiming = (rising) =>
  rising
    ? { duration: 2.2, delay: 0.35, ease: POUR_EASE }
    : { duration: 1.1, delay: 0, ease: POUR_EASE };
