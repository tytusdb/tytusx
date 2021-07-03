import { TestBed } from '@angular/core/testing';

import { DotService } from './dot.service';

describe('DotService', () => {
  let service: DotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
