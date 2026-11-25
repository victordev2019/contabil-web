import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { LoteFiltros } from '../../components/lote-filtros/lote-filtros';
import { LoteAcoes } from '../../components/lote-acoes/lote-acoes';
import { LoteTabela } from '../../components/lote-tabela/lote-tabela';
import { Lote, LoteFiltros as LoteFiltrosModel } from '../../models/lote.model';
import { LoteService } from '../../services/lote.service';

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

  protected readonly lotes = signal<Lote[]>([]);

  protected pesquisar(filtros: LoteFiltrosModel): void {
    this.loteService.pesquisar(filtros).subscribe({
      next: (lotes) => {
        this.lotes.set(lotes);
      },
      error: (erro: unknown) => {
        console.error('Erro ao pesquisar lotes:', erro);
      },
    });
  }
}
