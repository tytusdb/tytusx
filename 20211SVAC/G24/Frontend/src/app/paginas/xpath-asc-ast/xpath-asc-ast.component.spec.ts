import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XpathAscAstComponent } from './xpath-asc-ast.component';

describe('XpathAscAstComponent', () => {
  let component: XpathAscAstComponent;
  let fixture: ComponentFixture<XpathAscAstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XpathAscAstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XpathAscAstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
