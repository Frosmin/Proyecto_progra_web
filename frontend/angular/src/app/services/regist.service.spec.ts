import { TestBed } from '@angular/core/testing';

import { RegistService } from './regist.service';

describe('RegistService', () => {
  let service: RegistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
