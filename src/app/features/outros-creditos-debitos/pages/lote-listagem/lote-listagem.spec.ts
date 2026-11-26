import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { LancamentoModal } from '../../components/lancamento-modal/lancamento-modal';
import { Lote, LoteFiltros } from '../../models/lote.model';
import { LoteService } from '../../services/lote.service';
import { LoteListagem } from './lote-listagem';

interface LoteListagemTeste {
  readonly carregando: WritableSignal<boolean>;
  readonly lotes: WritableSignal<Lote[]>;
  readonly pesquisado: WritableSignal<boolean>;
  readonly quantidadeSelecionada: WritableSignal<number>;
  atualizarQuantidadeSelecionada(quantidade: number): void;
  abrirModalLancamento(): void;
  pesquisar(filtros: LoteFiltros): void;
}

describe('LoteListagem', () => {
  let fixture: ComponentFixture<LoteListagem>;
  let component: LoteListagem;
  let componenteTeste: LoteListagemTeste;
  let resultadoPesquisa: Subject<Lote[]>;
  let loteServiceMock: { pesquisar: jest.Mock };
  let dialogMock: { open: jest.Mock };

  const filtros: LoteFiltros = {
    instituicaoResponsavel: '',
    instituicao: '',
    situacaoLote: 'TODAS',
    idLoteDe: null,
    idLoteAte: null,
    valorLoteDe: null,
    valorLoteAte: null,
    dataEntradaDe: null,
    dataEntradaAte: null,
  };

  const lote: Lote = {
    idLote: 1001,
    dataEntrada: '2026-11-24T09:30:00',
    valorLote: 12500.5,
    quantidadeLancamentos: 15,
    usuarioRegistro: 'joao.silva',
    usuarioAprovacao: 'maria.santos',
    situacaoLote: 'CONFIRMADO',
    dataHoraSituacaoLote: '2026-11-24T14:45:00',
    instituicaoResponsavel: '0001',
    instituicao: '0001',
    lancamentos: []
  };

  beforeEach(async () => {
    resultadoPesquisa = new Subject<Lote[]>();
    loteServiceMock = {
      pesquisar: jest.fn(() => resultadoPesquisa.asObservable()),
    };
    dialogMock = {
      open: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [LoteListagem],
      providers: [
        { provide: LoteService, useValue: loteServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoteListagem);
    component = fixture.componentInstance;
    componenteTeste = component as unknown as LoteListagemTeste;
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar os estados com os valores padrão', () => {
    expect(componenteTeste.carregando()).toBe(false);
    expect(componenteTeste.lotes()).toEqual([]);
    expect(componenteTeste.pesquisado()).toBe(false);
    expect(componenteTeste.quantidadeSelecionada()).toBe(0);
  });

  it('deve atualizar a quantidade selecionada', () => {
    componenteTeste.atualizarQuantidadeSelecionada(3);

    expect(componenteTeste.quantidadeSelecionada()).toBe(3);
  });

  it('deve iniciar a pesquisa e manter o estado de carregamento', () => {
    componenteTeste.pesquisar(filtros);

    expect(loteServiceMock.pesquisar).toHaveBeenCalledWith(filtros);
    expect(componenteTeste.pesquisado()).toBe(true);
    expect(componenteTeste.carregando()).toBe(true);
    expect(componenteTeste.lotes()).toEqual([]);
  });

  it('deve preencher os lotes e finalizar o carregamento', () => {
    componenteTeste.atualizarQuantidadeSelecionada(2);
    componenteTeste.pesquisar(filtros);

    resultadoPesquisa.next([lote]);
    resultadoPesquisa.complete();

    expect(componenteTeste.lotes()).toEqual([lote]);
    expect(componenteTeste.quantidadeSelecionada()).toBe(0);
    expect(componenteTeste.carregando()).toBe(false);
  });

  it('deve finalizar o carregamento quando a pesquisa emitir erro', () => {
    const erro = new Error('Erro na pesquisa');
    const consoleErro = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    componenteTeste.pesquisar(filtros);
    resultadoPesquisa.error(erro);

    expect(componenteTeste.carregando()).toBe(false);
    expect(consoleErro).toHaveBeenCalledWith('Erro ao pesquisar lotes:', erro);

    consoleErro.mockRestore();
  });

  it('deve abrir o modal de lançamento', () => {
    (component as unknown as { dialog: { open: jest.Mock } }).dialog = dialogMock;

    (component as unknown as { abrirModalLancamento(): void })
      .abrirModalLancamento();

    expect(dialogMock.open).toHaveBeenCalledWith(LancamentoModal, {
      width: '800px',
      maxWidth: '95vw',
      maxHeight: '90vh',
    });
  });
});
