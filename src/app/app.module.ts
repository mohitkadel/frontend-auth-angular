import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AuthInterceptor } from './auth.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { LoginService } from './login/login.service';
import { SignupService } from './signup/signup.service';

import { AuthGuard } from './auth.guard';

import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

import { Role } from './user/user.model';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'students', component: UserComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin, Role.Teacher] } },
	{ path: 'teachers', component: UserComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin, Role.Student] } },
	{ path: 'admin', component: UserComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }  },
	// { path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		SignupComponent,
		UserComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule.forRoot(routes)
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		LoginService,
		SignupService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
