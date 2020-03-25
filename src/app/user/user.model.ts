export class Status {
	static Active: number = 1;
	static InActive: number = 0;
}

export class Role {
	static Admin: number = 1;
	static Teacher: number = 2;
	static Student: number = 3;
}

class Gender {
	static Male: number = 1;
	static Female: number = 2;
}

export class User {
    private _id: string;
    private _email: string;
    private _profile: {
     	f_name: string,
    	l_name: string,
    	gender: any,
    	dob: string
    };
    private _status: number;
    private _role: number;
    private _token: string;
    private _created_at: string;
    private _updated_at: string;
    private _created_by: string;
    private _updated_by: string;

    constructor(user) {
    	this._id = user._id
    	this._email = user.email;
    	this._profile = user.profile;
    	this._status = user.status;
    	this._role = user.role;
    	this._token = user.token;
    	this._created_at = user.created_at;
    	this._updated_at = user.updated_at;
    	this._created_by = user.created_by;
    	this._updated_by = user.updated_at;
    }

    get name() {
    	return this._profile.f_name + " " + this._profile.l_name;
    }

    get id() {
    	return this._id;
    }

    get email() {
    	return this._email;
    }

    get profile() {
    	for(let gender in Gender) {
    		if(Gender[gender] == this._profile.gender)
    			this._profile.gender = gender;
    	}
    	return this._profile;
    }

    get status() {
    	for(let status in Status) {
    		if(Status[status] == this._status)
    			return status;
    	}
    }

    get role() {
    	for(let role in Role) {
    		if(Role[role] == this._role)
    			return role;
    	}
    	return this._role;
    }

    get token() {
    	return this._token;
    }

}