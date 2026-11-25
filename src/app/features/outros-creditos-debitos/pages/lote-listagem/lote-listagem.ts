import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoteFiltros } from '../../components/lote-filtros/lote-filtros';
import { LoteAcoes } from '../../components/lote-acoes/lote-acoes';
import { LoteTabela } from '../../components/lote-tabela/lote-tabela';
import { Lote, LoteFiltros as LoteFiltrosModel } from '../../models/lote.model';
import { LoteService } from '../../services/lote.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lote-listagem',
  imports: [
    MatCardModule,
    LoteFiltros,
    LoteAcoes,
    LoteTabela,
  ],
  templateUrl: './lote-listagem.html',
  styleUrl: './lote-listagem.scss',
})
export class LoteListagem {
  private readonly loteService = inject(LoteService);

  protected readonly carregando = signal(false);

  protected readonly lotes = signal<Lote[]>([]);

  protected readonly pesquisado = signal(false);

  protected readonly quantidadeSelecionada = signal(0);

  protected atualizarQuantidadeSelecionada(quantidade: number): void {
    this.quantidadeSelecionada.set(quantidade);
  }

  protected pesquisar(filtros: LoteFiltrosModel): void {
    this.pesquisado.set(true);
    this.carregando.set(true);
    this.lotes.set([]);

    this.loteService.pesquisar(filtros)
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
}
