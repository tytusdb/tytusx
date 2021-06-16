import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGramaticalComponent } from './reporte-gramatical.component';

describe('ReporteGramaticalComponent', () => {
  let component: ReporteGramaticalComponent;
  let fixture: ComponentFixture<ReporteGramaticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteGramaticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteGramaticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
