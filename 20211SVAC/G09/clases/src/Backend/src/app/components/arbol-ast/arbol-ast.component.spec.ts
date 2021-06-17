import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolAstComponent } from './arbol-ast.component';

describe('ArbolAstComponent', () => {
  let component: ArbolAstComponent;
  let fixture: ComponentFixture<ArbolAstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolAstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolAstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
