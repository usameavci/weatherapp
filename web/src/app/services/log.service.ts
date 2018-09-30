import { Injectable } from  '@angular/core'
import { Http, Response } from  '@angular/http'
import { APIService } from  './api.service'
import { IUser } from  './user.service'
import { IPlace } from  './place.service'

export enum IStatus {
	Success = 'success',
	Failed = 'failed'
}

export interface ILog {
	executed_at: string
	execution_time: number
	ip_address: string
	status: IStatus
	place: IPlace
	user: IUser
}

@Injectable()
export class LogService extends APIService {
	index(params) {
		return this.get('api/logs', params)
	}
}