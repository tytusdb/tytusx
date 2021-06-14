import { TestBed } from '@angular/core/testing';

import { InicioService } from './inicio.service';

describe('InicioService', () => {
  let service: InicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
