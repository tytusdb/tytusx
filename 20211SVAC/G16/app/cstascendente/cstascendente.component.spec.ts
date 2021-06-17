import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CstascendenteComponent } from './cstascendente.component';

describe('CstascendenteComponent', () => {
  let component: CstascendenteComponent;
  let fixture: ComponentFixture<CstascendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CstascendenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CstascendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
