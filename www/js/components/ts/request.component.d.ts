import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Request } from './request';
import { RequestService } from './request.service';
export declare class RequestComponent implements OnInit, OnDestroy {
    private requestService;
    private route;
    constructor(requestService: RequestService, route: ActivatedRoute);
    model: Request;
    isEditMode: boolean;
    roles: {
        id: number;
        description: string;
    }[];
    schools: {
        id: number;
        name: string;
    }[];
    services: {
        id: number;
        description: string;
    }[];
    diagnostic: string;
    request: Request;
}
