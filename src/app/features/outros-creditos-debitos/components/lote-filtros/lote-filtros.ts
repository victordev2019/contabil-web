
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';

import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
import { LoteFiltros as LoteFiltrosModel } from '../../models/lote.model';

@Component({
  selector: 'app-lote-filtros',
  imports: [...SHARED_IMPORTS, MatExpansionModule],
  templateUrl: './lote-filtros.html',
  styleUrl: './lote-filtros.scss',
})
export class LoteFiltros {
  @Output() pesquisar = new EventEmitter<LoteFiltrosModel>();

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

  protected onPesquisar(): void {
    const valores = this.filtrosForm.getRawValue();

    this.pesquisar.emit({
      instituicaoResponsavel: valores.instituicaoResponsavel ?? '',
      instituicao: valores.instituicao ?? '',
      situacaoLote: (valores.situacaoLote ?? 'TODAS') as LoteFiltrosModel['situacaoLote'],
      idLoteDe: valores.idLoteDe,
      idLoteAte: valores.idLoteAte,
      valorLoteDe: valores.valorLoteDe,
      valorLoteAte: valores.valorLoteAte,
      dataEntradaDe: valores.dataEntradaDe,
      dataEntradaAte: valores.dataEntradaAte,
    });
  }
}
