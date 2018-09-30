import { Injectable } from  '@angular/core';
import { Http, Response } from  '@angular/http';
import { APIService } from  './api.service';

export interface ILogin {
	email: string;
	password: string;
}

@Injectable()
export class AuthService extends APIService {
	login(body: ILogin) {
		return this.post('auth/login', body)
	}

	logout() {
		return this.post('auth/logout', {})
	}
}
