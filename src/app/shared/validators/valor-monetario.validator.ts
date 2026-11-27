import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function valorMonetarioValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value as string;

    if (!valor) return null;

    const formatoValido = /^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(valor);

    if (!formatoValido) {
      return { formatoMonetario: true };
    }

    const valorNumerico = Number(valor.replace(/\./g, '').replace(',', '.'));

    return valorNumerico < 0.01 ? { min: { min: 0.01, actual: valorNumerico } } : null;
  };
}
