import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolASTComponent } from './arbol-ast.component';

describe('ArbolASTComponent', () => {
  let component: ArbolASTComponent;
  let fixture: ComponentFixture<ArbolASTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolASTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolASTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
