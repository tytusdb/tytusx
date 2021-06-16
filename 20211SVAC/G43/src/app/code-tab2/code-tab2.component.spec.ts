import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTab2Component } from './code-tab2.component';

describe('CodeTab2Component', () => {
  let component: CodeTab2Component;
  let fixture: ComponentFixture<CodeTab2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeTab2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeTab2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
