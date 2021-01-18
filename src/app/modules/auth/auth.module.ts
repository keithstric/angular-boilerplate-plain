import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SharedModule} from '@shared/shared.module';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {UserComponent} from './pages/user/user.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';

const routes: Routes = [
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'changepw', component: ChangePasswordComponent},
	{path: 'forgot', component: ForgotPasswordComponent},
	{path: 'user', component: UserComponent}
];

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
		RouterModule.forChild(routes),
		SharedModule
	]
})
export class AuthModule {}
