import { Mail, User } from 'lucide-react';
import Field from '../ui/Field';
import { cn } from '../../utils/cn';

export default function StepPersonal({ data, errors, onChange, onBlur }) {
  return (
    <div className="space-y-5">
      <Field id="name" label="Nama lengkap" icon={User} error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Contoh: Rina Kusuma"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          onBlur={() => onBlur('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={cn('input-neu', errors.name && 'input-error')}
        />
      </Field>

      <Field
        id="email"
        label="Alamat email"
        icon={Mail}
        error={errors.email}
        hint="Struk digital akan dikaitkan dengan email ini."
      >
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="nama@email.com"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={() => onBlur('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={cn('input-neu', errors.email && 'input-error')}
        />
      </Field>
    </div>
  );
}
