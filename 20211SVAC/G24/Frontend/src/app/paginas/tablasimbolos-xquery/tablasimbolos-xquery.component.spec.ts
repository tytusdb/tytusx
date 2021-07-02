import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablasimbolosXqueryComponent } from './tablasimbolos-xquery.component';

describe('TablasimbolosXqueryComponent', () => {
  let component: TablasimbolosXqueryComponent;
  let fixture: ComponentFixture<TablasimbolosXqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablasimbolosXqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablasimbolosXqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
