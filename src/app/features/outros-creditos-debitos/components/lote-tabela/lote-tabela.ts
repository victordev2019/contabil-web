import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input, OnChanges, output, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { Lote } from '../../models/lote.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemPaginacao } from '../../models/item-paginacao.model';
@Component({
  imports: [
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
    DatePipe,
  ],
  selector: 'app-lote-tabela',
  styleUrl: './lote-tabela.scss',
  templateUrl: './lote-tabela.html',
})
export class LoteTabela implements OnChanges {
  readonly carregando = input(false);
  readonly lotes = input<Lote[]>([]);
  readonly pesquisado = input(false);
  readonly selecaoAlterada = output<number>();
  readonly loteSelecionado = output<Lote | null>();

  protected readonly itensPorPagina = 5;

  protected readonly paginaAtual = signal(0);
  protected readonly lotesSelecionados = signal<Set<number>>(new Set());

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

  protected readonly totalPaginas = computed(() =>
    Math.ceil(this.lotes().length / this.itensPorPagina),
  );

  protected readonly paginaExibida = computed(() =>
    this.totalPaginas() === 0 ? 0 : this.paginaAtual() + 1,
  );

  protected readonly lotesDaPagina = computed(() => {
    const inicio = this.paginaAtual() * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;

    return this.lotes().slice(inicio, fim);
  });

  protected readonly todosSelecionados = computed(() => {
    const lotes = this.lotesDaPagina();

    return lotes.length > 0 && lotes.every((lote) => this.lotesSelecionados().has(lote.idLote));
  });

  protected readonly algunsSelecionados = computed(() => {
    const lotes = this.lotesDaPagina();
    const selecionados = this.lotesSelecionados();

    return lotes.some((lote) => selecionados.has(lote.idLote)) && !this.todosSelecionados();
  });

  protected readonly itensPaginacao: ItemPaginacao[] = [
    {
      id: 'primeira',
      tipo: 'botao',
      texto: '«',
      ariaLabel: 'Primeira página',
      desabilitado: () => this.paginaAtual() === 0,
      acao: () => this.primeiraPagina(),
    },
    {
      id: 'anterior',
      tipo: 'botao',
      texto: '‹',
      ariaLabel: 'Página anterior',
      desabilitado: () => this.paginaAtual() === 0,
      acao: () => this.paginaAnterior(),
    },
    {
      id: 'atual',
      tipo: 'pagina',
      texto: '',
    },
    {
      id: 'proxima',
      tipo: 'botao',
      texto: '›',
      ariaLabel: 'Próxima página',
      desabilitado: () => this.paginaAtual() >= this.totalPaginas() - 1,
      acao: () => this.proximaPagina(),
    },
    {
      id: 'ultima',
      tipo: 'botao',
      texto: '»',
      ariaLabel: 'Última página',
      desabilitado: () => this.paginaAtual() >= this.totalPaginas() - 1,
      acao: () => this.ultimaPagina(),
    },
  ];

  ngOnChanges(): void {
    this.paginaAtual.set(0);
    this.lotesSelecionados.set(new Set());
    this.selecaoAlterada.emit(0);
    this.loteSelecionado.emit(null);
  }

  protected estaSelecionado(idLote: number): boolean {
    return this.lotesSelecionados().has(idLote);
  }

  protected alterarSelecao(lote: Lote, selecionado: boolean): void {
    const selecao = new Set(this.lotesSelecionados());

    if (selecionado) {
      selecao.add(lote.idLote);
    } else {
      selecao.delete(lote.idLote);
    }

    this.atualizarSelecao(selecao);
  }

  protected alterarSelecaoTodos(selecionado: boolean): void {
    const selecao = new Set(this.lotesSelecionados());

    for (const lote of this.lotesDaPagina()) {
      if (selecionado) {
        selecao.add(lote.idLote);
      } else {
        selecao.delete(lote.idLote);
      }
    }

    this.atualizarSelecao(selecao);
  }

  protected irParaPagina(pagina: number): void {
    if (pagina >= 0 && pagina < this.totalPaginas()) {
      this.paginaAtual.set(pagina);
    }
  }

  protected primeiraPagina(): void {
    this.irParaPagina(0);
  }

  protected paginaAnterior(): void {
    this.irParaPagina(this.paginaAtual() - 1);
  }

  protected proximaPagina(): void {
    this.irParaPagina(this.paginaAtual() + 1);
  }

  protected ultimaPagina(): void {
    this.irParaPagina(this.totalPaginas() - 1);
  }

  private atualizarSelecao(selecao: Set<number>): void {
    this.lotesSelecionados.set(selecao);
    this.selecaoAlterada.emit(selecao.size);

    const idLote = selecao.size === 1 ? selecao.values().next().value : null;

    const loteSelecionado = idLote
      ? (this.lotes().find((lote) => lote.idLote === idLote) ?? null)
      : null;

    this.loteSelecionado.emit(loteSelecionado);
  }
}
