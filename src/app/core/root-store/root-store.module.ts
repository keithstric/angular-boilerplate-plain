import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoadingReducer} from '@core/root-store/loading/loading.reducer';
import {UserEffects} from '@core/root-store/user/user.effects';
import {UserFromStorageMetaReducer, UserReducer} from '@core/root-store/user/user.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from 'src/environments/environment';


export const metaReducers: MetaReducer[] = [UserFromStorageMetaReducer];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forRoot({
			user: UserReducer,
			loading: LoadingReducer
		}, {
			metaReducers
		}),
		EffectsModule.forRoot([UserEffects]),
		StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
	]
})
export class RootStoreModule {
}
