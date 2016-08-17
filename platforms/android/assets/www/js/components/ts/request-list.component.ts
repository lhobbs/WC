import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {RequestListItem} from './../../models/request-list-item'
import {RequestService} from './../../services/request.service';
import {Request} from './../../models/request';

@Component({
  selector: 'request-list',
  templateUrl: 'js/components/templates/request-list.component.html'
})


export class RequestListComponent implements OnInit { 
requests:  Request[];

constructor( private requestService: RequestService, private router: Router) {}

	ngOnInit () {
		this.getRequests();
	}
	getRequests() {
		this.requestService.getRequests().then(requests => this.requests = requests);
	}

	goToRequest(_id: string) {
		let link = ['/request', _id];
		this.router.navigate(link);
	}

}

