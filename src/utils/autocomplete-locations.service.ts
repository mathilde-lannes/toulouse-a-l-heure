import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class AutocompleteLocationsService implements AutoCompleteService {
  labelAttribute = "label";

  constructor(private http:Http) { }
  
  getResults(keyword:string) {
    if (keyword.length < 3)
      return [];
    return this.http.get(`https://api.tisseo.fr/v1/places.json?term=${keyword}&number=2&displayBestPlace=1&key=a3732a1074e2403ce364ad6e71eb998cb`)
			.map((res:Response) => res.json().placesList.place)
			.catch((err:any) => Observable.of(undefined));
  }
}
