import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AcaoLote } from '../../models/acao-lote.model';

@Component({
  selector: 'app-lote-acoes',
  imports: [MatButtonModule],
  templateUrl: './lote-acoes.html',
  styleUrl: './lote-acoes.scss',
})
export class LoteAcoes {
  readonly quantidadeSelecionada = input(0);
  readonly incluirSolicitado = output<void>();
  readonly visualizarSolicitado = output<void>();
  protected readonly possuiSelecaoUnica = computed(() => this.quantidadeSelecionada() === 1);

  protected readonly acoes: AcaoLote[] = [
    { label: 'Confirmar', exigeSelecaoUnica: false },
    { label: 'Enviar', exigeSelecaoUnica: false },
    { label: 'Visualizar Justificativa', exigeSelecaoUnica: false },
    { label: 'Incluir', exigeSelecaoUnica: false },
    { label: 'Alterar', exigeSelecaoUnica: true },
    { label: 'Excluir', exigeSelecaoUnica: true },
    { label: 'Visualizar', exigeSelecaoUnica: true },
  ];

  protected executarAcao(acao: AcaoLote): void {
    if (acao.label === 'Incluir') this.incluirSolicitado.emit();
    if (acao.label === 'Visualizar') this.visualizarSolicitado.emit();
  }
}
