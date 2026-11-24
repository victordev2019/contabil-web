import { MatExpansionModule } from '@angular/material/expansion';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';

@Component({
  selector: 'app-lote-filtros',
  imports: [...SHARED_IMPORTS, MatExpansionModule],
  templateUrl: './lote-filtros.html',
  styleUrl: './lote-filtros.scss',
})
export class LoteFiltros {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly filtrosForm = this.formBuilder.group({
    instituicaoResponsavel: [''],
    instituicao: [''],
    situacaoLote: ['TODAS'],

    idLoteDe: [null as number | null],
    idLoteAte: [null as number | null],

    valorLoteDe: [null as number | null],
    valorLoteAte: [null as number | null],

    dataEntradaDe: [null as Date | null],
    dataEntradaAte: [null as Date | null],
  });
}
