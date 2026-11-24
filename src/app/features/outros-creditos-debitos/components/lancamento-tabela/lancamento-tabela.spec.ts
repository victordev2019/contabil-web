import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LancamentoTabela } from './lancamento-tabela';

describe('LancamentoTabela', () => {
  let component: LancamentoTabela;
  let fixture: ComponentFixture<LancamentoTabela>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoTabela],
    }).compileComponents();

    fixture = TestBed.createComponent(LancamentoTabela);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
