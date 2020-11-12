import { TestBed } from '@angular/core/testing';

import { LoadingService } from '@layout/services/loading/loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the loading map', () => {
    service.setLoading(true, '/foo/bar');
    expect(service.loadingMap.get('/foo/bar')).toBe(true);
    expect(service.loadingSub.value).toBe(true);
    service.setLoading(false, '/foo/bar');
    expect(service.loadingMap.size).toBe(0);
    expect(service.loadingSub.value).toBe(false);
  });
});
