import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import {RequestListItem} from './../models/request-list-item';
import {REQUESTLIST} from './../data/mock-request-list-items';

import { Request } from './../models/request';
import { Lookup } from './../models/lookup';

@Injectable() 
export class RequestService {

  private apiUrl = 'api/requests';

	constructor(private http: Http) {}

	// getRequestList() {
	// 	return Promise.resolve(REQUESTLIST);
		
	// }
	getRequests() {
		return this.http.get(this.apiUrl)
               .toPromise()
               .then(response => response.json() as Request[])
               .catch(this.handleError);
	}
   getRequest(id: string) {
    let url = `${this.apiUrl}/${id}`;
    return this.http
          .get(url)
          .toPromise()
          .then(response => response.json() as Request)
          .catch(this.handleError);      
   }
  	getServices() {
  		return this.http
                  .get('api/services')
                  .toPromise()
                  .then(response => response.json() as Lookup[])
                  .catch(this.handleError);
  	}
  	getSchools() {
  		return this.http
                  .get('api/schools')
                  .toPromise()
                  .then(response => response.json() as Lookup[])
                  .catch(this.handleError);
  	}
	  getRoles() {
  		return this.http
                  .get('api/roles')
                  .toPromise()
                  .then(response => response.json() as Lookup[])
                  .catch(this.handleError);
  	}

  saveRequest(request: Request) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (request.id !== undefined) {
      return this.http.put(this.apiUrl, JSON.stringify(request), {headers: headers})
          .toPromise()
          .then(response => response.json() as Request);
    }
    else {
      return this.http.post(this.apiUrl, JSON.stringify(request), {headers: headers})
          .toPromise()
          .then(response => response.json() as Request);
    }

  }
  	
	private handleError(error: any) {
	  console.error('An error occurred', error);
	  //return Promise.reject(error.message || error);
	}
}
