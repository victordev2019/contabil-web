import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import contasCorrentesMock from '../mocks/contas-correntes.mock.json';
import { ContaCorrente } from '../models/lancamento.model';

@Injectable({
  providedIn: 'root',
})
export class ContaCorrenteService {
  private readonly contas: ContaCorrente[] = contasCorrentesMock;

  buscar(numero: string): Observable<ContaCorrente | null> {
    const numeroNormalizado = numero.trim();

    const contaEncontrada = this.contas.find(
      (conta) => conta.numero === numeroNormalizado,
    );

    return of(contaEncontrada ?? null).pipe(delay(500));
  }
}
