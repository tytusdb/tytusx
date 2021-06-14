import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsinicioComponent } from './tabsinicio.component';

describe('TabsinicioComponent', () => {
  let component: TabsinicioComponent;
  let fixture: ComponentFixture<TabsinicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsinicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
