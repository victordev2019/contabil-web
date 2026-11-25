import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import lotesMock from '../mocks/lotes.mock.json';
import { Lote, LoteFiltros } from '../models/lote.model';

@Injectable({
  providedIn: 'root',
})
export class LoteService {
  private readonly lotes: Lote[] = lotesMock as Lote[];

  pesquisar(filtros: LoteFiltros): Observable<Lote[]> {
    const lotesFiltrados = this.lotes.filter((lote) =>
      this.correspondeInstituicoes(lote, filtros) &&
      this.correspondeSituacao(lote, filtros) &&
      this.correspondeFaixaNumerica(lote, filtros) &&
      this.estaNaFaixaDeData(lote.dataEntrada, filtros),
    );

    return of(lotesFiltrados).pipe(delay(5000));
  }

  private correspondeInstituicoes(lote: Lote, filtros: LoteFiltros): boolean {
    return (
      this.contem(lote.instituicaoResponsavel, filtros.instituicaoResponsavel) &&
      this.contem(lote.instituicao, filtros.instituicao)
    );
  }

  private contem(valor: string, filtro: string): boolean {
    const filtroNormalizado = this.normalizar(filtro);

    return !filtroNormalizado ||
      this.normalizar(valor).includes(filtroNormalizado);
  }

  private correspondeSituacao(lote: Lote, filtros: LoteFiltros): boolean {
    return filtros.situacaoLote === 'TODAS' ||
      lote.situacaoLote === filtros.situacaoLote;
  }

  private correspondeFaixaNumerica(lote: Lote, filtros: LoteFiltros): boolean {
    return (
      this.estaEntre(lote.idLote, filtros.idLoteDe, filtros.idLoteAte) &&
      this.estaEntre(lote.valorLote, filtros.valorLoteDe, filtros.valorLoteAte)
    );
  }

  private estaEntre(
    valor: number,
    minimo: number | null,
    maximo: number | null,
  ): boolean {
    return (
      (minimo === null || valor >= minimo) &&
      (maximo === null || valor <= maximo)
    );
  }

  private normalizar(valor: string): string {
    return valor?.trim().toLowerCase() ?? '';
  }

  private estaNaFaixaDeData(dataEntrada: string, filtros: LoteFiltros): boolean {
    const data = new Date(dataEntrada).getTime();

    const entradaDe =
      filtros.dataEntradaDe === null
        ? null
        : this.inicioDoDia(filtros.dataEntradaDe).getTime();

    const entradaAte =
      filtros.dataEntradaAte === null
        ? null
        : this.fimDoDia(filtros.dataEntradaAte).getTime();

    return (
      (entradaDe === null || data >= entradaDe) &&
      (entradaAte === null || data <= entradaAte)
    );
  }

  private inicioDoDia(data: Date): Date {
    const inicio = new Date(data);
    inicio.setHours(0, 0, 0, 0);

    return inicio;
  }

  private fimDoDia(data: Date): Date {
    const fim = new Date(data);
    fim.setHours(23, 59, 59, 999);

    return fim;
  }
}
