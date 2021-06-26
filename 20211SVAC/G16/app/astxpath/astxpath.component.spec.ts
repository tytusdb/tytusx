import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASTXPathComponent } from './astxpath.component';

describe('ASTXPathComponent', () => {
  let component: ASTXPathComponent;
  let fixture: ComponentFixture<ASTXPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ASTXPathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ASTXPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
