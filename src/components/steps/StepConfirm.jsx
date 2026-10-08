import { motion } from 'framer-motion';
import { Check, NotebookPen } from 'lucide-react';
import Field, { FieldError } from '../ui/Field';
import { COFFEE_OPTIONS, MAX_NOTES, SUGAR_LEVELS } from '../../data/menu';
import { cn } from '../../utils/cn';
import { formatRupiah } from '../../utils/format';

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 text-sm">
      <dt className="shrink-0 text-cream/55">{label}</dt>
      <dd
        className={cn(
          'min-w-0 break-words text-right',
          strong ? 'font-semibold text-amber-300' : 'text-cream',
        )}
      >
        {value}
      </dd>
    </div>
  );
}

export default function StepConfirm({ data, errors, onChange }) {
  const coffee = COFFEE_OPTIONS.find((c) => c.id === data.coffee);
  const sugar = SUGAR_LEVELS.find((s) => s.value === data.sugar);
  const subtotal = coffee ? coffee.price * data.quantity : 0;

  return (
    <div className="space-y-5">
      <dl className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
        <SummaryRow label="Nama" value={data.name.trim()} />
        <SummaryRow label="Email" value={data.email.trim()} />
        <SummaryRow
          label="Pesanan"
          value={`${data.quantity}× ${coffee?.name ?? '-'}`}
        />
        <SummaryRow
          label="Level gula"
          value={sugar ? `${sugar.label} (${sugar.value}%)` : '-'}
        />
        <SummaryRow label="Subtotal" value={formatRupiah(subtotal)} strong />
      </dl>

      <Field
        id="notes"
        label="Catatan khusus"
        icon={NotebookPen}
        optional
        error={errors.notes}
      >
        <textarea
          id="notes"
          name="notes"
          rows={3}
          maxLength={MAX_NOTES}
          placeholder="Misal: less ice, susu oat, atau duduk dekat jendela…"
          value={data.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          className="input-neu resize-none"
        />
        <p className="text-right text-xs text-cream/40">
          {data.notes.length}/{MAX_NOTES}
        </p>
      </Field>

      <div>
        <button
          type="button"
          role="checkbox"
          aria-checked={data.confirmed}
          onClick={() => onChange('confirmed', !data.confirmed)}
          className={cn(
            'flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel/60',
            data.confirmed
              ? 'border-caramel/70 bg-caramel/10'
              : errors.confirmed
                ? 'border-red-400/60 bg-red-400/5'
                : 'border-white/10 bg-white/5 hover:border-white/25',
          )}
        >
          <span
            className={cn(
              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors',
              data.confirmed
                ? 'border-caramel bg-caramel text-espresso'
                : 'border-white/30',
            )}
          >
            <motion.span
              initial={false}
              animate={{ scale: data.confirmed ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <Check size={14} strokeWidth={3} />
            </motion.span>
          </span>
          <span className="text-sm leading-relaxed text-cream/85">
            Saya menyatakan data di atas sudah benar dan siap hadir / memesan.
          </span>
        </button>
        <div className="mt-2">
          <FieldError id="confirmed-error" message={errors.confirmed} />
        </div>
      </div>
    </div>
  );
}
