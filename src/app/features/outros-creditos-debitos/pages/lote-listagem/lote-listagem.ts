import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { LancamentoModal } from '../../components/lancamento-modal/lancamento-modal';
import { LoteAcoes } from '../../components/lote-acoes/lote-acoes';
import { LoteFiltros } from '../../components/lote-filtros/lote-filtros';
import { LoteTabela } from '../../components/lote-tabela/lote-tabela';
import { Lancamento } from '../../models/lancamento.model';
import { Lote, LoteFiltros as LoteFiltrosModel } from '../../models/lote.model';
import { LoteService } from '../../services/lote.service';

@Component({
  selector: 'app-lote-listagem',
  imports: [MatCardModule, LoteFiltros, LoteAcoes, LoteTabela],
  templateUrl: './lote-listagem.html',
  styleUrl: './lote-listagem.scss',
})
export class LoteListagem {
  private readonly loteService = inject(LoteService);
  private readonly dialog = inject(MatDialog);

  protected readonly carregando = signal(false);
  protected readonly lotes = signal<Lote[]>([]);
  protected readonly pesquisado = signal(false);
  protected readonly quantidadeSelecionada = signal(0);
  protected readonly loteSelecionado = signal<Lote | null>(null);

  protected atualizarQuantidadeSelecionada(quantidade: number): void {
    this.quantidadeSelecionada.set(quantidade);
  }

  protected abrirModalLancamento(modo: 'inclusao' | 'visualizacao'): void {
    const lote = modo === 'visualizacao' ? this.loteSelecionado() : null;

    if (modo === 'visualizacao' && !lote)  return;

    const dialogRef = this.dialog.open(LancamentoModal, {
      width: '1000px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: {
        modo,
        lote,
      },
    });

    if (modo === 'inclusao') {
      dialogRef.afterClosed().subscribe((lancamento: Lancamento | undefined) => {
        if (!lancamento) return;
        this.adicionarLote(lancamento);
      });
    }
  }

  private adicionarLote(lancamento: Lancamento): void {
    const agora = new Date().toISOString();
    const lotesAtuais = this.lotes();

    const novoLote: Lote = {
      idLote: Math.max(0, ...lotesAtuais.map((lote) => lote.idLote)) + 1,
      dataEntrada: agora,
      valorLote: lancamento.valor,
      quantidadeLancamentos: 1,
      usuarioRegistro: 'Usuário do Sistema',
      usuarioAprovacao: null,
      situacaoLote: 'ABERTO',
      dataHoraSituacaoLote: agora,
      instituicaoResponsavel: '',
      instituicao: '',
      lancamentos: [lancamento],
    };

    this.lotes.update((lotes) => [...lotes, novoLote]);
    this.pesquisado.set(true);
    this.quantidadeSelecionada.set(0);
  }

  protected pesquisar(filtros: LoteFiltrosModel): void {
    this.pesquisado.set(true);
    this.carregando.set(true);
    this.lotes.set([]);

    this.loteService
      .pesquisar(filtros)
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe({
        next: (lotes) => {
          this.lotes.set(lotes);
          this.quantidadeSelecionada.set(0);
        },
        error: (erro: unknown) => {
          console.error('Erro ao pesquisar lotes:', erro);
        },
      });
  }

  protected atualizarLoteSelecionado(lote: Lote | null): void {
    this.loteSelecionado.set(lote);
  }
}
