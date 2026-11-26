/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { LoteFiltros } from '../models/lote.model';
import { LoteService } from './lote.service';

describe('LoteService', () => {
  let service: LoteService;

  const filtrosPadrao = (): LoteFiltros => ({
    instituicaoResponsavel: '',
    instituicao: '',
    situacaoLote: 'TODAS',
    idLoteDe: null,
    idLoteAte: null,
    valorLoteDe: null,
    valorLoteAte: null,
    dataEntradaDe: null,
    dataEntradaAte: null,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LoteService] });
    service = TestBed.inject(LoteService);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  async function pesquisar(filtros: LoteFiltros) {
    const resultado = firstValueFrom(service.pesquisar(filtros));
    await jest.advanceTimersByTimeAsync(500);
    return resultado;
  }

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar todos os lotes sem filtros', async () => {
    const lotes = await pesquisar(filtrosPadrao());

    expect(lotes).toHaveLength(5);
  });

  it('deve filtrar por instituição responsável, ignorando espaços e maiúsculas', async () => {
    const lotes = await pesquisar({
      ...filtrosPadrao(),
      instituicaoResponsavel: ' 0002 ',
    });

    expect(lotes.map((lote) => lote.idLote)).toEqual([1002, 1005]);
  });

  it('deve filtrar por situação', async () => {
    const lotes = await pesquisar({
      ...filtrosPadrao(),
      situacaoLote: 'ABERTO',
    });

    expect(lotes.map((lote) => lote.idLote)).toEqual([1002, 1004]);
  });

  it('deve filtrar por faixa de ID', async () => {
    const lotes = await pesquisar({
      ...filtrosPadrao(),
      idLoteDe: 1003,
      idLoteAte: 1004,
    });

    expect(lotes.map((lote) => lote.idLote)).toEqual([1003, 1004]);
  });

  it('deve filtrar por faixa de valor', async () => {
    const lotes = await pesquisar({
      ...filtrosPadrao(),
      valorLoteDe: 10000,
      valorLoteAte: 20000,
    });

    expect(lotes.map((lote) => lote.idLote)).toEqual([1001, 1005]);
  });

  it('deve incluir os lotes no último dia da faixa de datas', async () => {
    const lotes = await pesquisar({
      ...filtrosPadrao(),
      dataEntradaDe: new Date(2026, 10, 23),
      dataEntradaAte: new Date(2026, 10, 24),
    });

    expect(lotes.map((lote) => lote.idLote)).toEqual([1004, 1005]);
  });

  it('deve combinar instituição, situação e limites', async () => {
    const lotes = await pesquisar({
      ...filtrosPadrao(),
      instituicao: '0002',
      situacaoLote: 'CONFIRMADO',
      valorLoteDe: 15000,
    });

    expect(lotes.map((lote) => lote.idLote)).toEqual([1005]);
  });

  it('deve retornar vazio quando nenhum lote corresponder', async () => {
    const lotes = await pesquisar({
      ...filtrosPadrao(),
      idLoteDe: 9999,
    });

    expect(lotes).toEqual([]);
  });
});
