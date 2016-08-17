import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { ServiceProvider } from './../models/service-provider';
import { Lookup } from './../models/lookup';

@Injectable() 
export class NotificationService {
ssps : ServiceProvider[];

	constructor(private http: Http) {}

	getServiceProvidersByService(service: string) {
		return this.http.get('api/serviceproviders/' + service)
               .toPromise()
               .then(response => response.json() as ServiceProvider[])
               .catch(this.handleError);
	}
  
  sendEmail(service: string, ssps: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.getServiceProvidersByService(service);
    console.log('ssps: ' + this.ssps);
    return this.http.post('api/notification', {'message': ssps}, {headers: headers})
          .toPromise()
          .then()
          .catch(this.handleError);
  }

	private handleError(error: any) {
	  console.error('An error occurred', error);
	  return Promise.reject(error.message || error);
	}
}
