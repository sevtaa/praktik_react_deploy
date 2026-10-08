const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateStep(step, data) {
  const errors = {};

  if (step === 1) {
    const name = data.name.trim();
    if (!name) errors.name = 'Nama wajib diisi';
    else if (name.length < 2) errors.name = 'Nama minimal 2 karakter';

    const email = data.email.trim();
    if (!email) errors.email = 'Email wajib diisi';
    else if (!EMAIL_RE.test(email)) errors.email = 'Format email belum valid';
  }

  if (step === 2) {
    if (!data.coffee) errors.coffee = 'Pilih salah satu varian kopi';
    if (data.sugar === null) errors.sugar = 'Pilih level gula';
  }

  if (step === 3) {
    if (!data.confirmed) errors.confirmed = 'Centang konfirmasi dulu ya';
  }

  return errors;
}
