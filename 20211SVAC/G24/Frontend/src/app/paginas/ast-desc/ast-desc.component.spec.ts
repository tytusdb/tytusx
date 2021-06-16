import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstDescComponent } from './ast-desc.component';

describe('AstDescComponent', () => {
  let component: AstDescComponent;
  let fixture: ComponentFixture<AstDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
