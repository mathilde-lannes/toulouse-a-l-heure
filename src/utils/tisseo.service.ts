import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';


@Injectable()
export class TisseoService {

	constructor(private http: Http) { }

	getAddressFromCoords(coordinates: string) {
		let params = new URLSearchParams();
		params.set('latlng', coordinates);

		return this.http.get(`http://maps.googleapis.com/maps/api/geocode/json`, { search: params})
			.map((res:Response) => res.json().results[0].formatted_address)
			.catch((err:any) => Observable.of(undefined));
	}

	/**
	* Prints an error log and returns the specified value
	* @param {any} elementToReturn - the element to return, which can be undefined
	*/
	handleError(elementToReturn = undefined) : Observable<any> {
		console.log("An error occurred..."); // needs to be a slight bit more explicit
		return Observable.of(elementToReturn);
	}

}
