import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ErrorService} from '@core/services/error/error.service';
import {AuthService} from '@core/services/auth/auth.service';
import {MockAuthService, MockErrorService} from 'src/app/testing/mock-services';

import {UserComponent} from './user.component';

describe('UserComponent', () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				FormsModule,
				ReactiveFormsModule,
				MatCardModule,
				MatFormFieldModule,
				MatInputModule,
				BrowserAnimationsModule
			],
			declarations: [UserComponent],
			providers: [
				{provide: AuthService, useClass: MockAuthService},
				{provide: ErrorService, useClass: MockErrorService}
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
