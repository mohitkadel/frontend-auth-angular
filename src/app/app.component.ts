import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LoginService } from './login/login.service'
import { User } from './user/user.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'frontend';
	user: User;

	constructor(private router: Router, private loginService: LoginService) {
		this.loginService.user.subscribe(user => {
			if(user) {
				this.user = new User(user)
			}
		});
	}

	logout() {
		this.loginService.logout();
		this.router.navigate(['/login']);
	}
}
