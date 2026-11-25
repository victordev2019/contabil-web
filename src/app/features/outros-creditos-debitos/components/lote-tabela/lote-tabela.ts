import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { Lote } from '../../models/lote.model';

@Component({
  imports: [
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    CurrencyPipe,
    DatePipe,
  ],
  selector: 'app-lote-tabela',
  styleUrl: './lote-tabela.scss',
  templateUrl: './lote-tabela.html',
})
export class LoteTabela {
  readonly lotes = input<Lote[]>([]);
  selecaoAlterada = output<number>();

  protected readonly colunas = [
    'selecao',
    'idLote',
    'dataEntrada',
    'valorLote',
    'quantidadeLancamentos',
    'usuarioRegistro',
    'usuarioAprovacao',
    'situacaoLote',
    'dataHoraSituacaoLote',
  ];

  protected readonly lotesSelecionados = signal<Set<number>>(new Set());

  protected readonly todosSelecionados = computed(() => {
    const lotes = this.lotes();

    return (
      lotes.length > 0 &&
      lotes.every((lote) => this.lotesSelecionados().has(lote.idLote))
    );
  });

  protected readonly algunsSelecionados = computed(() => {
    const quantidade = this.lotesSelecionados().size;

    return quantidade > 0 && !this.todosSelecionados();
  });

  protected estaSelecionado(idLote: number): boolean {
    return this.lotesSelecionados().has(idLote);
  }

  protected alterarSelecao(lote: Lote, selecionado: boolean): void {
    const selecao = new Set(this.lotesSelecionados());

    if (selecionado) selecao.add(lote.idLote);
    else selecao.delete(lote.idLote);
    this.atualizarSelecao(selecao);
  }

  protected alterarSelecaoTodos(selecionado: boolean): void {
    const selecao = new Set(this.lotesSelecionados());

    for (const lote of this.lotes()) {
      if (selecionado) selecao.add(lote.idLote);
      else selecao.delete(lote.idLote);
    }

    this.atualizarSelecao(selecao);
  }

  private atualizarSelecao(selecao: Set<number>): void {
    this.lotesSelecionados.set(selecao);
    this.selecaoAlterada.emit(selecao.size);
  }
}
