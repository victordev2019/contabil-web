import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
import { ContaCorrente, Lancamento } from '../../models/lancamento.model';
import { Lote } from '../../models/lote.model';
import { ContaCorrenteService } from '../../services/conta-corrente.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LancamentoModalData } from '../../models/lancamento-modal-data.model';

@Component({
  selector: 'app-lancamento-modal',
  imports: [...SHARED_IMPORTS],
  templateUrl: './lancamento-modal.html',
  styleUrl: './lancamento-modal.scss',
})
export class LancamentoModal {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<LancamentoModal>);
  private readonly contaCorrenteService = inject(ContaCorrenteService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly dados = inject<Readonly<LancamentoModalData>>(MAT_DIALOG_DATA);
  protected readonly modoVisualizacao = this.dados.modo === 'visualizacao';
  protected readonly lote = this.dados.lote;

  protected readonly buscandoConta = signal(false);
  protected readonly contaEncontrada = signal<ContaCorrente | null>(null);
  protected readonly mensagemConta = signal('');

  protected readonly formulario = this.formBuilder.group({
    contaCorrente: ['', [Validators.required, Validators.pattern(/^\d{5}-\d$/)]],
    valor: [null as number | null, [Validators.required, Validators.min(0.01)]],
    historico: ['', Validators.required],
    estorno: [false],
    documento: ['', Validators.required],
    descricao: [''],
    situacao: [{ value: 'Pendente', disabled: true }],
    pa: ['', Validators.required],
  });

  protected readonly opcoesPa = [
    { valor: '0001', descricao: '0001' },
    { valor: '0002', descricao: '0002' },
    { valor: '0003', descricao: '0003' },
  ];

  constructor() {
    this.formulario.controls.contaCorrente.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.contaEncontrada.set(null);
        this.mensagemConta.set('');
      });
  }

  protected buscarConta(): void {
    const controleConta = this.formulario.controls.contaCorrente;
    const numeroConta = controleConta.value?.trim() ?? '';

    controleConta.markAsTouched();

    if (!numeroConta) {
      this.mensagemConta.set('Informe o número da conta corrente.');
      return;
    }

    this.buscandoConta.set(true);
    this.contaEncontrada.set(null);
    this.mensagemConta.set('');

    this.contaCorrenteService
      .buscar(numeroConta)
      .pipe(
        finalize(() => this.buscandoConta.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (conta) => {
          const numeroAtual = controleConta.value?.trim() ?? '';

          if (numeroAtual !== numeroConta) {
            return;
          }

          this.contaEncontrada.set(conta);
          this.mensagemConta.set(conta ? '' : 'Conta corrente não encontrada.');
        },
        error: () => {
          const numeroAtual = controleConta.value?.trim() ?? '';

          if (numeroAtual === numeroConta) {
            this.mensagemConta.set('Não foi possível consultar a conta corrente.');
          }
        },
      });
  }

  protected incluir(): void {
    if (this.modoVisualizacao) return;
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) return;
    const conta = this.contaEncontrada();
    if (!conta) {
      this.mensagemConta.set('Localize uma conta corrente antes de incluir o lançamento.');
      return;
    }

    const dadosFormulario = this.formulario.getRawValue();

    const lancamento: Lancamento = {
      contaCorrente: dadosFormulario.contaCorrente?.trim() ?? '',
      titular: conta.titular,
      valor: dadosFormulario.valor ?? 0,
      historico: dadosFormulario.historico ?? '',
      estorno: dadosFormulario.estorno ?? false,
      documento: dadosFormulario.documento ?? '',
      descricao: dadosFormulario.descricao ?? '',
      situacao: dadosFormulario.situacao ?? 'Pendente',
      pa: dadosFormulario.pa ?? '',
    };

    this.dialogRef.close(lancamento);
  }

  protected obterDadosLote(lote: Lote): { titulo: string; valor: string | number | null }[] {
    const moeda = new CurrencyPipe('pt-BR');
    const data = new DatePipe('pt-BR');
    return [
      { titulo: 'ID Lote', valor: lote.idLote },
      { titulo: 'Data Entrada', valor: data.transform(lote.dataEntrada, 'dd/MM/yyyy HH:mm') },
      { titulo: 'Valor Lote', valor: moeda.transform(lote.valorLote, 'BRL', 'symbol', '1.2-2') },
      { titulo: 'Quantidade de Lançamentos', valor: lote.quantidadeLancamentos },
      { titulo: 'Usuário Registro', valor: lote.usuarioRegistro },
      { titulo: 'Usuário Aprovação', valor: lote.usuarioAprovacao ?? '-' },
      { titulo: 'Situação', valor: lote.situacaoLote },
      { titulo: 'Data/Hora Situação', valor: data.transform(lote.dataHoraSituacaoLote, 'dd/MM/yyyy HH:mm') },
    ];
  }

  protected obterDadosLancamento(lancamento: Lancamento): { titulo: string; valor: string | number }[] {
    return [
      { titulo: 'Conta Corrente', valor: lancamento.contaCorrente },
      { titulo: 'Titular', valor: lancamento.titular },
      { titulo: 'Valor', valor: lancamento.valor },
      { titulo: 'Histórico', valor: lancamento.historico },
      { titulo: 'Estorno', valor: lancamento.estorno ? 'Sim' : 'Não' },
      { titulo: 'Documento', valor: lancamento.documento },
      { titulo: 'Descrição', valor: lancamento.descricao || '-' },
      { titulo: 'Situação', valor: lancamento.situacao },
      { titulo: 'PA', valor: lancamento.pa },
    ];
  }
}
