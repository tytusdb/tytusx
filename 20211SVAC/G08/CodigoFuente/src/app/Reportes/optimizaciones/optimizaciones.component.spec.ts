import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizacionesComponent } from './optimizaciones.component';

describe('OptimizacionesComponent', () => {
  let component: OptimizacionesComponent;
  let fixture: ComponentFixture<OptimizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptimizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
