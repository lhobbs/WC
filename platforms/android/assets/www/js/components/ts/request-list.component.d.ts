import { OnInit } from '@angular/core';
import { RequestListItem } from './request-list-item';
import { RequestService } from './request.service';
export declare class RequestListComponent implements OnInit {
    private requestService;
    requests: RequestListItem[];
    constructor(requestService: RequestService);
    ngOnInit(): void;
    getRequests(): void;
}
