import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChangePasswordComponent} from '@modules/auth/pages/change-password/change-password.component';
import {ForgotPasswordComponent} from '@modules/auth/pages/forgot-password/forgot-password.component';
import {LoginComponent} from '@modules/auth/pages/login/login.component';
import {RegisterComponent} from '@modules/auth/pages/register/register.component';
import {UserComponent} from '@modules/auth/pages/user/user.component';

const routes: Routes = [
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'changepw', component: ChangePasswordComponent},
	{path: 'forgot', component: ForgotPasswordComponent},
	{path: 'user', component: UserComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {
}
