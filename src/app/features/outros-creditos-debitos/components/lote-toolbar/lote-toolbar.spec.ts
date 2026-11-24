import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoteToolbar } from './lote-toolbar';

describe('LoteToolbar', () => {
  let component: LoteToolbar;
  let fixture: ComponentFixture<LoteToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(LoteToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
