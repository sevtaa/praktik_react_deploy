import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { ArrowLeft, ArrowRight, Coffee, Loader2, Send } from 'lucide-react';

import CupPanel from './CupPanel';
import StepProgress from './StepProgress';
import SuccessScreen from './SuccessScreen';
import StepPersonal from './steps/StepPersonal';
import StepOrder from './steps/StepOrder';
import StepConfirm from './steps/StepConfirm';

import { COFFEE_OPTIONS, SHOP, STEPS, TAX_RATE } from '../data/menu';
import { generateOrderId } from '../utils/format';
import { validateStep } from '../utils/validators';

const INITIAL_DATA = {
  name: '',
  email: '',
  coffee: null,
  sugar: null,
  quantity: 1,
  notes: '',
  confirmed: false,
};

const slide = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export default function CoffeeForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [order, setOrder] = useState(null);

  const shake = useAnimation();
  const submitTimer = useRef(null);

  useEffect(() => () => clearTimeout(submitTimer.current), []);

  const errors = useMemo(() => validateStep(step, data), [step, data]);
  const isStepValid = Object.keys(errors).length === 0;

  const visibleErrors = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(errors).filter(([key]) => attempted || touched[key]),
      ),
    [errors, attempted, touched],
  );

  const handleChange = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const goTo = (next) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    setAttempted(false);
    setTouched({});
  };

  const rejectStep = () => {
    setAttempted(true);
    shake.start({
      x: [0, -10, 10, -8, 8, -4, 0],
      transition: { duration: 0.45 },
    });
  };

  const handleBack = () => {
    if (step > 1) goTo(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!isStepValid) return rejectStep();
    if (step < STEPS.length) return goTo(step + 1);

    setIsSubmitting(true);
    submitTimer.current = setTimeout(() => {
      const coffee = COFFEE_OPTIONS.find((c) => c.id === data.coffee);
      const subtotal = coffee.price * data.quantity;
      const tax = Math.round(subtotal * TAX_RATE);

      setOrder({
        id: generateOrderId(),
        createdAt: new Date(),
        name: data.name.trim(),
        email: data.email.trim(),
        coffee,
        sugar: data.sugar,
        quantity: data.quantity,
        notes: data.notes.trim(),
        subtotal,
        tax,
        total: subtotal + tax,
      });
      setIsSubmitting(false);
    }, 1400);
  };

  const handleReset = () => {
    setData(INITIAL_DATA);
    setTouched({});
    setAttempted(false);
    setDirection(1);
    setStep(1);
    setOrder(null);
  };

  const current = STEPS.find((s) => s.id === step);
  const isLastStep = step === STEPS.length;

  const stepProps = {
    data,
    errors: visibleErrors,
    onChange: handleChange,
    onBlur: handleBlur,
  };

  return (
    <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-8 sm:px-6 lg:py-12">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-center justify-center gap-3 lg:mb-12 lg:justify-start"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-caramel to-amber-600 text-espresso shadow-neu-out">
          <Coffee size={22} aria-hidden />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold leading-tight">
            {SHOP.name}
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-latte/70">
            {SHOP.tagline}
          </p>
        </div>
      </motion.header>

      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
        <CupPanel
          step={step}
          steaming={!order && isStepValid}
          isSuccess={Boolean(order)}
        />

        <div>
          {order ? (
            <SuccessScreen order={order} onReset={handleReset} />
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="glass-card p-5 sm:p-8"
            >
              <StepProgress step={step} />

              <motion.div animate={shake}>
                <div className="mb-6 mt-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
                    Langkah {step} dari {STEPS.length}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                    {current.title}
                  </h2>
                  <p className="mt-1 text-sm text-cream/60">{current.subtitle}</p>
                </div>

                <div className="min-h-[20rem] overflow-hidden px-0.5 pb-1">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                    >
                      {step === 1 && <StepPersonal {...stepProps} />}
                      {step === 2 && <StepOrder {...stepProps} />}
                      {step === 3 && <StepConfirm {...stepProps} />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              <div className="mt-6 flex gap-3">
                {step > 1 && (
                  <motion.button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    whileTap={{ scale: 0.97 }}
                    className="btn-ghost"
                  >
                    <ArrowLeft size={18} aria-hidden />
                    <span className="hidden sm:inline">Kembali</span>
                  </motion.button>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden />
                      Menyeduh pesanan…
                    </>
                  ) : isLastStep ? (
                    <>
                      <Send size={18} aria-hidden />
                      Kirim Presensi / Pesan
                    </>
                  ) : (
                    <>
                      Lanjut
                      <ArrowRight size={18} aria-hidden />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </div>
      </div>

      <footer className="mt-10 text-center text-xs text-cream/35">
        Berbelanja di Kopi Senja, Senang Jadinya
      </footer>
    </main>
  );
}
