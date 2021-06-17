import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroresXMLComponent } from './errores-xml.component';

describe('ErroresXMLComponent', () => {
  let component: ErroresXMLComponent;
  let fixture: ComponentFixture<ErroresXMLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErroresXMLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroresXMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
