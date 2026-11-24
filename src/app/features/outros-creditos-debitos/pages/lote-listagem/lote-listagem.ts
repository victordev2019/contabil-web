
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoteFiltros } from '../../components/lote-filtros/lote-filtros';

@Component({
  selector: 'app-lote-listagem',
  imports: [
    MatCardModule,
    LoteFiltros,
  ],
  templateUrl: './lote-listagem.html',
  styleUrl: './lote-listagem.scss',
})
export class LoteListagem {}
