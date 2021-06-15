import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoInicioComponent } from './contenido-inicio.component';

describe('ContenidoInicioComponent', () => {
  let component: ContenidoInicioComponent;
  let fixture: ComponentFixture<ContenidoInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
