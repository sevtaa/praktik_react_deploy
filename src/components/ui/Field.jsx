import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export function FieldError({ id, message }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-1.5 overflow-hidden text-xs text-red-300"
        >
          <AlertCircle size={14} aria-hidden />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function Field({
  id,
  label,
  icon: Icon,
  error,
  hint,
  optional = false,
  children,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-medium text-latte"
      >
        {Icon && <Icon size={16} className="text-caramel" aria-hidden />}
        {label}
        {optional && (
          <span className="text-xs font-normal text-cream/40">(opsional)</span>
        )}
      </label>
      {children}
      <FieldError id={`${id}-error`} message={error} />
      {hint && !error && <p className="text-xs text-cream/45">{hint}</p>}
    </div>
  );
}
