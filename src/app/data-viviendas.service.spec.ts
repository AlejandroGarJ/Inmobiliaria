import { TestBed } from '@angular/core/testing';

import { DataViviendasService } from './data-viviendas.service';

describe('DataViviendasService', () => {
  let service: DataViviendasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataViviendasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
