import { Component, Input, Injectable } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { RequestComponent } from './request.component';
import { RequestListComponent } from './request-list.component';
import {RequestService} from './../../services/request.service';
import { NotificationService } from './../../services/notification.service';

@Component({
  selector: 'app',
  template: `
  <div class="primaryNavigation">
            <ul class="menu">
                <li class="menuItem"><a [routerLink]="['/request']" routerLinkActive="active">NEW REQUEST</a></li>
                <li class="menuItem" ><a [routerLink]="['/requests']" routerLinkActive="active">MY REQUESTS</a></li>
                <li class="menuItem"><a>ADMIN</a></li>
            </ul>
        </div>
        <div class="main">
			<router-outlet></router-outlet>
    </div>
  `,
  directives : [ROUTER_DIRECTIVES],
  providers: [RequestService, NotificationService]
})

@Injectable()
export class AppComponent {
title = 'Title';
}