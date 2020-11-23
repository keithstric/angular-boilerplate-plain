import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UserEffects} from '@core/root-store/user/user.effects';
import {UserReducer} from '@core/root-store/user/user.reducer';
import {EffectsModule} from '@ngrx/effects';
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
		StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
		EffectsModule.forRoot([UserEffects])
	]
})
export class RootStoreModule {
}
