import { TestBed } from '@angular/core/testing';

import { CompiladorService } from './compilador.service';

describe('CompiladorService', () => {
  let service: CompiladorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompiladorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
