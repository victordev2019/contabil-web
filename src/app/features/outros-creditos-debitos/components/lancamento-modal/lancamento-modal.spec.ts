import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LancamentoModal } from './lancamento-modal';

describe('LancamentoModal', () => {
  let component: LancamentoModal;
  let fixture: ComponentFixture<LancamentoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoModal],
    }).compileComponents();

    fixture = TestBed.createComponent(LancamentoModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
