import { TestBed } from '@angular/core/testing';

import { ArtificialInteligenceService } from './artificial-inteligence.service';

describe('ArtificialInteligenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtificialInteligenceService = TestBed.get(ArtificialInteligenceService);
    expect(service).toBeTruthy();
  });
});
