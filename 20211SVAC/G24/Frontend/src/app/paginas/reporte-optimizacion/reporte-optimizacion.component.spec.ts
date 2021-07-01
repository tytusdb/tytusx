import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteOptimizacionComponent } from './reporte-optimizacion.component';

describe('ReporteOptimizacionComponent', () => {
  let component: ReporteOptimizacionComponent;
  let fixture: ComponentFixture<ReporteOptimizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteOptimizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteOptimizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
