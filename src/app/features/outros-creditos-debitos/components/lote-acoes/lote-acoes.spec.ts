
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteAcoes } from './lote-acoes';

describe('LoteAcoes', () => {
  let component: LoteAcoes;
  let fixture: ComponentFixture<LoteAcoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteAcoes],
    }).compileComponents();

    fixture = TestBed.createComponent(LoteAcoes);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('deve desabilitar ações exclusivas sem seleção única', () => {
    fixture.componentRef.setInput('quantidadeSelecionada', 0);
    fixture.detectChanges();

    const botoes = fixture.nativeElement.querySelectorAll('button');

    expect(botoes[4].disabled).toBe(true);
    expect(botoes[5].disabled).toBe(true);
    expect(botoes[6].disabled).toBe(true);
  });

  it('deve habilitar ações exclusivas com uma seleção', () => {
    fixture.componentRef.setInput('quantidadeSelecionada', 1);
    fixture.detectChanges();

    const botoes = fixture.nativeElement.querySelectorAll('button');

    expect(botoes[4].disabled).toBe(false);
    expect(botoes[5].disabled).toBe(false);
    expect(botoes[6].disabled).toBe(false);
  });

  it('deve desabilitar ações exclusivas com mais de uma seleção', () => {
    fixture.componentRef.setInput('quantidadeSelecionada', 2);
    fixture.detectChanges();

    const botoes = fixture.nativeElement.querySelectorAll('button');

    expect(botoes[4].disabled).toBe(true);
    expect(botoes[5].disabled).toBe(true);
    expect(botoes[6].disabled).toBe(true);
  });
});
