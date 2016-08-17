// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

// import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
// import { InMemoryDataService }               from './services/in-memory-data.service';

// The usual bootstrapping imports
import { bootstrap }    from '@angular/platform-browser-dynamic';
import {provideForms} from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './components/ts/app.component';
import { appRouterProviders } from './app.routes';

bootstrap(AppComponent, [
	appRouterProviders,
	HTTP_PROVIDERS,
	provideForms()
	// { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
 //    { provide: SEED_DATA, useClass: InMemoryDataService }      // in-mem server data
]);
