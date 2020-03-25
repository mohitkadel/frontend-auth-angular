import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { User } from './user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) {}

	getUsers(query) {
		return this.http.get('/users', {params: query})
		.pipe(map((data: User[]) => {
				let users: User[] = [];
				for(let user of data) {
					users.push(new User(user))
				}
				return users;
			}));
	}

	saveUser(body) {
		return this.http.post('/users', body);
	}

	updateUser(id, body) {
		return this.http.put('/users/' + id, body);
	}
}
