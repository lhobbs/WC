import {Lookup} from './lookup';

export class Request {
	_id: string;
	id: number;
	dpsid: number;
	school: Lookup;
	name: string;
	email: string;
	role: Lookup;
	phone: string;
	service: Lookup;
	otherServiceDescription: string;
	serviceDate: string;
}