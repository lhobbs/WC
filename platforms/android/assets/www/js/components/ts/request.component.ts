import { Component, OnInit, OnDestroy, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Request } from './../../models/request'
import { RequestService } from './../../services/request.service';
import { NotificationService } from './../../services/notification.service';
import { Lookup } from './../../models/lookup';

@Component({
  selector: 'request',
  templateUrl: 'js/components/templates/request.component.html'
})

export class RequestComponent implements OnInit, OnDestroy { 
@Input() request: Request;
error: any;
sub: any;
services: Lookup[];
schools: Lookup[];
roles: Lookup[];
isEditMode = true;

constructor( private requestService: RequestService, private notificationService: NotificationService,
 private route: ActivatedRoute, private router: Router) {}

ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = params['id'];
        this.isEditMode = false;
        this.requestService.getRequest(id).then(request => this.request = request);
      }
      else {
        this.request = new Request();
        this.request.name = "Lisa Hobbs";
        this.request.email = "lisa_hobbs@dpsk12.org";
        this.request.dpsid = 100266376;
        this.request.school = new Lookup();
        this.request.role = new Lookup();
        this.request.service = new Lookup();
      }
      this.requestService.getServices().then(services => this.services = services);
      this.requestService.getSchools().then(schools => this.schools = schools);
      this.requestService.getRoles().then(roles => this.roles = roles);
    });
  }


save() {
  this.requestService
    .saveRequest(this.request)
    .then(request => {
      this.request = request;
    })
    .catch(error => this.error = error);
  this.sendEmail(this.request.service._id);
  this.goToRequests();
}

sendEmail(service: string) {
  let requestComponent = this;
  this.notificationService.getServiceProvidersByService(service)
  .then(function(data) {
    console.log(data);
    requestComponent.notificationService
      .sendEmail(service, JSON.stringify(data));
  } );
  
}

goToRequests() {
	let link = ['/requests'];
	this.router.navigate(link);
}


// TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.request); }

  ngOnDestroy() {
  	this.sub.unsubscribe();
  }

}