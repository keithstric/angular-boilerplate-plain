import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomSerializer, reducers} from '@core/root-store/index';
import {UserEffects, UserFromStorageMetaReducer} from '@core/root-store/user';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment, PROJECT_NAME} from 'src/environments/environment';

export const metaReducers: MetaReducer[] = [UserFromStorageMetaReducer];

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forRoot(reducers, {runtimeChecks: {strictStateImmutability: false, strictActionImmutability: false},	metaReducers}),
		StoreRouterConnectingModule.forRoot({serializer: CustomSerializer}),
		EffectsModule.forRoot([UserEffects]),
		StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production, name: PROJECT_NAME})
	],
	declarations: []
})
export class RootStoreModule {
}
