import { Injectable } from '@angular/core'

@Injectable()
export class AuthHelper {

	setUser(user: Object) {
		localStorage.setItem('auth_user', JSON.stringify(user))
	}

	getUser() {
		return JSON.parse(localStorage.getItem('auth_user'))
	}

	removeUser() {
		localStorage.removeItem('auth_user')
	}
}