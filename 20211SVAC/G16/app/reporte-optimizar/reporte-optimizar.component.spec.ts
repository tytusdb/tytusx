import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteOptimizarComponent } from './reporte-optimizar.component';

describe('ReporteOptimizarComponent', () => {
  let component: ReporteOptimizarComponent;
  let fixture: ComponentFixture<ReporteOptimizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteOptimizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteOptimizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
