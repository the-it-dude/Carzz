import { TestBed } from '@angular/core/testing';

import { CrzzService } from './crzz.service';

describe('CrzzService', () => {
  let service: CrzzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrzzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
