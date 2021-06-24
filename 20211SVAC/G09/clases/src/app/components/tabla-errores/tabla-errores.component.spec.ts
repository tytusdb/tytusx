import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaErroresComponent } from './tabla-errores.component';

describe('TablaErroresComponent', () => {
  let component: TablaErroresComponent;
  let fixture: ComponentFixture<TablaErroresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaErroresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
