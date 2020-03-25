import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LoginService } from '../login/login.service'
import { UserService } from './user.service'
import { User, Role, Status } from '../user/user.model';


@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	user: User;
	page: string;

	users: User[];

	errors: [];
	success: string;
	@ViewChild('myForm', {static: false}) myForm: NgForm;
	userForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
		first_name: new FormControl(''),
		last_name: new FormControl(''),
		gender: new FormControl(''),
		dob: new FormControl(''),
		status: new FormControl(''),
		role: new FormControl('')
	});
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private loginService: LoginService,
		private userService: UserService 
	) {
		this.loginService.user.subscribe(user => {
			if(user) {
				this.user = new User(user)
			}
		});
		this.page = this.route.snapshot.routeConfig.path;
		this.getUsers();
	}

	ngOnInit() {}

	getUsers() {
		let query:any = {};
		if(this.page=="teachers") {
			query.role = Role.Teacher
		}
		if(this.page=="students") {
			query.role = Role.Student
		}
		this.userService.getUsers(query).subscribe((users: User[] ) => {
			this.users = users;
		}, (error) => {

		})
	}

	onSubmit() {
		if(this.userForm.valid) {
			let body = {};
			
			body = {
				profile: {
					f_name: this.userForm.value.first_name,
					l_name: this.userForm.value.last_name,
					gender: parseInt(this.userForm.value.gender),
					dob: this.userForm.value.dob,
				},
				status: parseInt(this.userForm.value.status),
				role: parseInt(this.userForm.value.role),
				email: this.userForm.value.email,
				password: this.userForm.value.password
			};
			this.userService.saveUser(body).subscribe((res) => {
				this.errors = null;
				this.success = "User added successfully";
				this.myForm.resetForm();
				this.getUsers();
			},
			(error) => {
				console.log(error)
				this.errors = error.error.errors
			})
		}
	}

	updateUser() {

	}

	changeStatus(id, currentStatus) {
		let status: number;

		status = Status.Active;

		if(currentStatus == 'Active') {
			status = Status.InActive
		}

		this.userService.updateUser(id, {status: status}).subscribe((res) => {
			console.log('res')
			console.log(res)
			this.errors = null;
			this.success = "User updated successfully";
			this.getUsers();
		},
		(error) => {
			console.log(error)
			this.errors = error.error.errors
		})
	}

}
