import {Location} from '@angular/common';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from 'src/app/app-routing.module';
import {AppComponent} from 'src/app/app.component';
import {
	MockPageNotFoundComponent
} from 'src/app/testing/mock-components';


describe('Routing', () => {
	let router: Router;
	let location: Location;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule.withRoutes(appRoutes)
			],
			declarations: [
				AppComponent,
				MockPageNotFoundComponent
			],
			providers: [
				Location
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		router = TestBed.inject(Router);
		location = TestBed.inject(Location);
	});

	it('should show the PageNotFoundComponent when unknown route', waitForAsync(() => {
		const fixture = TestBed.createComponent(MockPageNotFoundComponent);
		fixture.ngZone.run(() => {
			router.navigateByUrl('/foo');
			fixture.detectChanges();
			fixture.whenStable().then(() => {
				expect(location.path()).toBe('/foo');
				const compiled = fixture.debugElement.nativeElement;
				expect(compiled.querySelector('p').textContent).toContain('Mock page not found');
			});
		});
	}));

});
