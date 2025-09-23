import { TestBed } from '@angular/core/testing';

import { PlaceHolderService } from './place-holder-service';

describe('PlaceHolderService', () => {
  let service: PlaceHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
