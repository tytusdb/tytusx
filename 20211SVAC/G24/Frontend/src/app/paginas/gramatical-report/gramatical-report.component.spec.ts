import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GramaticalReportComponent } from './gramatical-report.component';

describe('GramaticalReportComponent', () => {
  let component: GramaticalReportComponent;
  let fixture: ComponentFixture<GramaticalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GramaticalReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GramaticalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
