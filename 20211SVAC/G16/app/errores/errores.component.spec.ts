import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroresComponent } from './errores.component';

describe('ErroresComponent', () => {
  let component: ErroresComponent;
  let fixture: ComponentFixture<ErroresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
