import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function intervaloDataValidator(campoInicial: string, campoFinal: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dataInicial = control.get(campoInicial)?.value as Date | null;
    const dataFinal = control.get(campoFinal)?.value as Date | null;

    if (!dataInicial || !dataFinal) {
      return null;
    }

    return dataInicial > dataFinal
      ? { intervaloDataInvalido: true }
      : null;
  };
}
