import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UserReducer} from '@core/root-store/user/user.reducer';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from 'src/environments/environment';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forRoot({
			user: UserReducer
		}, {}),
		StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
	]
})
export class RootStoreModule {
}
