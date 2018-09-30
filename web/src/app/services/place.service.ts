import { Injectable } from  '@angular/core';
import { Http, Response } from  '@angular/http';
import { APIService } from  './api.service';

export interface IPlace {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

@Injectable()
export class PlaceService extends APIService {
	index() {
		return this.get('api/places')
	}

	store(body: IPlace) {
		return this.post('api/places', body)
	}

	show(id : number) {
		return this.get('api/places/' + id)
	}

	update(id : number, body: IPlace) {
		return this.put('api/places/' + id, body)
	}

	destroy(id : number) {
		return this.delete('api/places/' + id)
	}

	forecast(id : number) {
		return this.get('api/places/' + id + '/forecast')
	}
}