import { TestBed } from '@angular/core/testing';

import { PassResetService } from './pass-reset.service';

describe('PassResetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassResetService = TestBed.get(PassResetService);
    expect(service).toBeTruthy();
  });
});
