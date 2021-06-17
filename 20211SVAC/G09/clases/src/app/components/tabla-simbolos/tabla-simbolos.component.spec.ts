import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSimbolosComponent } from './tabla-simbolos.component';

describe('TablaSimbolosComponent', () => {
  let component: TablaSimbolosComponent;
  let fixture: ComponentFixture<TablaSimbolosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSimbolosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSimbolosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
