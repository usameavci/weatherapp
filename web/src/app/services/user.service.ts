import { Injectable } from  '@angular/core'
import { Http, Response } from  '@angular/http'
import { APIService } from  './api.service'

export enum Role {
	Standart = 'standart',
	Admin = 'admin'
}

export interface IUser {
	id: number
	name: string
	email: string
	password: string
	api_token: string
	role: Role
	is_root: boolean
	created_at: string
	updated_at: string
}

@Injectable()
export class UserService extends APIService {
	index() {
		return this.get('api/users')
	}

	store(body: IUser) {
		return this.post('api/users', body)
	}

	show(id : number) {
		return this.get('api/users/' + id)
	}

	update(id : number, body: IUser) {
		return this.put('api/users/' + id, body)
	}

	destroy(id : number) {
		return this.delete('api/users/' + id)
	}
}