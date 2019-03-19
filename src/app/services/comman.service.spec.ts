import { TestBed } from '@angular/core/testing';

import { CommanService } from './comman.service';

describe('CommanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommanService = TestBed.get(CommanService);
    expect(service).toBeTruthy();
  });
});
