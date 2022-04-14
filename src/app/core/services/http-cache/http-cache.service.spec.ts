import {HttpRequest, HttpResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {LocalStorageTypes} from '@core/services/local-storage/local-storage.interface';
import {HttpCacheService} from '@core/services/http-cache/http-cache.service';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {MockDataService} from '@testing/mock-data.service';


describe('HttpCacheService', () => {
	let service: HttpCacheService;
	let httpTestingController: HttpTestingController;
	const mockUser = new MockDataService().user;
	const sessionCacheUrl = 'api/user/LeL7PVOhpBbebsNLR5Ov899a0509-de80-4d45-b525-00829095685b';
	const localCacheUrl = 'api/campaign/9945967b-a399-4776-8e46-0d1556152f3f/collaborators';

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [HttpCacheService]
		});
		httpTestingController = TestBed.get(HttpTestingController);
		service = TestBed.inject(HttpCacheService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should figure out if a url should be cached', () => {
		const shouldCache = service.shouldCache(sessionCacheUrl);
		const shouldNotCache = service.shouldCache('api/user');
		expect(shouldCache).toBe(true);
		expect(shouldNotCache).toBe(false);
	});

	it('should figure out if a url should be cached in sessionStorage', () => {
		const shouldCache = service.shouldCacheToSessionStorage(sessionCacheUrl);
		const shouldNotCache = service.shouldCacheToSessionStorage(localCacheUrl);
		expect(shouldCache).toBe(true);
		expect(shouldNotCache).toBe(false);
	});

	it('should cache requests for a user to sessionStorage', () => {
		const httpReq: HttpRequest<any> = new HttpRequest('GET', sessionCacheUrl);
		const httpRes: HttpResponse<any> = new HttpResponse({body: mockUser, url: sessionCacheUrl});
		const cacheToSessSpy = spyOn(service, 'cacheToSessionStorage');
		service.put(httpReq, httpRes);
		expect(cacheToSessSpy).toHaveBeenCalled();
	});

	it('should cache requests for collaborators locally', () => {
		const httpReq: HttpRequest<any> = new HttpRequest('GET', localCacheUrl);
		const httpRes: HttpResponse<any> = new HttpResponse({body: mockUser, url: sessionCacheUrl});
		const cacheLocalSpy = spyOn(service, 'cacheToLocal');
		service.put(httpReq, httpRes);
		expect(cacheLocalSpy).toHaveBeenCalled();
	});

	it('should attempt to put session cache items in localStorage', () => {
		const setItemSpy = spyOn(LocalStorageService, 'setItem');
		const httpRes: HttpResponse<any> = new HttpResponse({body: mockUser, url: sessionCacheUrl});
		service.cacheToSessionStorage(sessionCacheUrl, httpRes);
		expect(setItemSpy).toHaveBeenCalled();
	});

	it('should put a locally cached item in the cache object', () => {
		const httpRes: HttpResponse<any> = new HttpResponse({body: mockUser, url: localCacheUrl});
		service.cacheToLocal(localCacheUrl, httpRes);
		expect(service.cache[localCacheUrl]).toBeTruthy();
	});

	it('should know where to look for a cached item', () => {
		const localHttpReq: HttpRequest<any> = new HttpRequest('GET', localCacheUrl);
		const localHttpRes: HttpResponse<any> = new HttpResponse({body: mockUser, url: localCacheUrl});
		service.put(localHttpReq, localHttpRes);
		const localItem = service.get(localHttpReq);
		expect(localItem).toBeTruthy();

		const sessHttpReq: HttpRequest<any> = new HttpRequest('GET', sessionCacheUrl);
		const sessStorageGetSpy = spyOn(LocalStorageService, 'getItem');
		service.get(sessHttpReq);
		expect(sessStorageGetSpy).toHaveBeenCalledWith(LocalStorageTypes.SESSION, sessHttpReq.urlWithParams);
	});

	it('should delete items from the cache', () => {
		const localHttpReq: HttpRequest<any> = new HttpRequest('GET', localCacheUrl);
		const localHttpRes: HttpResponse<any> = new HttpResponse({body: mockUser, url: localCacheUrl});
		service.put(localHttpReq, localHttpRes);
		const deleted = service.delete(localHttpReq);
		expect(service.cache[localHttpReq.urlWithParams]).toBeFalsy();
		expect(deleted).toBeTrue();

		const sessHttpReq: HttpRequest<any> = new HttpRequest('GET', sessionCacheUrl);
		const sessHttpRes: HttpResponse<any> = new HttpResponse({body: mockUser, url: sessionCacheUrl});
		spyOn(LocalStorageService, 'getItem').and.returnValue(sessHttpRes);
		const sessStorageRemoveSpy = spyOn(LocalStorageService, 'removeItem');
		const deletedSess = service.delete(sessHttpReq);
		expect(sessStorageRemoveSpy).toHaveBeenCalledWith(LocalStorageTypes.SESSION, sessHttpReq.urlWithParams);
		expect(deletedSess).toBeTrue();
	});

});
