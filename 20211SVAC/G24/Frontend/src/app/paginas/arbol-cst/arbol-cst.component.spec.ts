import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolCstComponent } from './arbol-cst.component';

describe('ArbolCstComponent', () => {
  let component: ArbolCstComponent;
  let fixture: ComponentFixture<ArbolCstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolCstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolCstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
