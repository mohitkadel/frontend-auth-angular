import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { User } from '../user/user.model';

class LoginResponse {
	data: User;
	token: string;
}

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	private userSubject: BehaviorSubject < User > ;
	public user: Observable < User > ;

	public get userValue(): User {
		return this.userSubject.value;
	}

	constructor(private http: HttpClient) {
		this.userSubject = new BehaviorSubject < User > (JSON.parse(localStorage.getItem('user')));
		this.user = this.userSubject.asObservable();
	}

	login(body) {
		return this.http.post("/login", body)
			.pipe(map((res: LoginResponse) => {
				// store user details and basic auth credentials in local storage to keep user logged in between page refreshes
				
				localStorage.setItem('user', JSON.stringify(res.data));
				localStorage.setItem('token', JSON.stringify(res.token));
				this.userSubject.next(res.data);
				return res.data;
			}));
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('user');
		this.userSubject.next(null);
	}

	get token(): string {
		if (this.userValue) {
			return JSON.parse(localStorage.getItem('token'));
		}

		return null
	}
}
