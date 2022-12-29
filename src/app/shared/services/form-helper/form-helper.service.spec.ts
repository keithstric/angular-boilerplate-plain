import { TestBed } from '@angular/core/testing';

import { FormHelperService } from '@shared/services/form-helper/form-helper.service';

describe('FormHelperService', () => {
  let service: FormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
