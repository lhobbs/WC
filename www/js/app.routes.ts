import { provideRouter, RouterConfig } from '@angular/router';
import { RequestListComponent } from './components/ts/request-list.component';
import { RequestComponent } from './components/ts/request.component';

const routes: RouterConfig = [
	{
		path: '',
		redirectTo: '/requests',
		pathMatch: 'full'
	},
	{
		path: 'requests',
		component: RequestListComponent
	},
	{
		path: 'request/:id',
		component: RequestComponent
	},
	{
		path: 'request',
		component: RequestComponent
	}
];

export const appRouterProviders = [
	provideRouter(routes)
];