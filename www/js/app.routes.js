"use strict";
var router_1 = require('@angular/router');
var request_list_component_1 = require('./components/ts/request-list.component');
var request_component_1 = require('./components/ts/request.component');
var routes = [
    {
        path: '',
        redirectTo: '/requests',
        pathMatch: 'full'
    },
    {
        path: 'requests',
        component: request_list_component_1.RequestListComponent
    },
    {
        path: 'request/:id',
        component: request_component_1.RequestComponent
    },
    {
        path: 'request',
        component: request_component_1.RequestComponent
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map