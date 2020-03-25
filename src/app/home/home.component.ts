import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LoginService } from '../login/login.service'
import { User } from '../user/user.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) {
		// redirect to home if already logged in
		if (this.loginService.userValue) {
			this.router.navigate(['/']);
		} else {
			this.router.navigate(['/login']);
		}
	}

	ngOnInit() {}

}
