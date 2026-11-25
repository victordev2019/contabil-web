
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { SHARED_IMPORTS } from '../../../../shared/shared-imports';

@Component({
  selector: 'app-lancamento-modal',
  imports: [...SHARED_IMPORTS],
  templateUrl: './lancamento-modal.html',
  styleUrl: './lancamento-modal.scss',
})
export class LancamentoModal {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<LancamentoModal>);

  protected readonly formulario = this.formBuilder.group({
    contaCorrente: ['', Validators.required],
    valor: [null as number | null, [Validators.required, Validators.min(0.01)]],
    historico: ['', Validators.required],
    estorno: [false],
    documento: ['', Validators.required],
    descricao: [''],
    situacao: [{ value: 'Pendente', disabled: true }],
  });
}
