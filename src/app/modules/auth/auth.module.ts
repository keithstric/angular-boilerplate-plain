import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from '@modules/auth/auth-routing.module';
import {SharedModule} from '@shared/shared.module';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {UserComponent} from './pages/user/user.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';



/**
 * The AuthModule
 */
@NgModule({
	declarations: [
		ChangePasswordComponent,
		ForgotPasswordComponent,
		LoginComponent,
		RegisterComponent,
		UserComponent
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		SharedModule
	]
})
export class AuthModule {}
