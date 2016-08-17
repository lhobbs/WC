"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var request_1 = require('./../../models/request');
var request_service_1 = require('./../../services/request.service');
var notification_service_1 = require('./../../services/notification.service');
var lookup_1 = require('./../../models/lookup');
var RequestComponent = (function () {
    function RequestComponent(requestService, notificationService, route, router) {
        this.requestService = requestService;
        this.notificationService = notificationService;
        this.route = route;
        this.router = router;
        this.isEditMode = true;
    }
    RequestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = params['id'];
                _this.isEditMode = false;
                _this.requestService.getRequest(id).then(function (request) { return _this.request = request; });
            }
            else {
                _this.request = new request_1.Request();
                _this.request.name = "Lisa Hobbs";
                _this.request.email = "lisa_hobbs@dpsk12.org";
                _this.request.dpsid = 100266376;
                _this.request.school = new lookup_1.Lookup();
                _this.request.role = new lookup_1.Lookup();
                _this.request.service = new lookup_1.Lookup();
            }
            _this.requestService.getServices().then(function (services) { return _this.services = services; });
            _this.requestService.getSchools().then(function (schools) { return _this.schools = schools; });
            _this.requestService.getRoles().then(function (roles) { return _this.roles = roles; });
        });
    };
    RequestComponent.prototype.save = function () {
        var _this = this;
        this.requestService
            .saveRequest(this.request)
            .then(function (request) {
            _this.request = request;
        })
            .catch(function (error) { return _this.error = error; });
        this.sendEmail(this.request.service._id);
        this.goToRequests();
    };
    RequestComponent.prototype.sendEmail = function (service) {
        var requestComponent = this;
        this.notificationService.getServiceProvidersByService(service)
            .then(function (data) {
            console.log(data);
            requestComponent.notificationService
                .sendEmail(service, JSON.stringify(data));
        });
    };
    RequestComponent.prototype.goToRequests = function () {
        var link = ['/requests'];
        this.router.navigate(link);
    };
    Object.defineProperty(RequestComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.request); },
        enumerable: true,
        configurable: true
    });
    RequestComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', request_1.Request)
    ], RequestComponent.prototype, "request", void 0);
    RequestComponent = __decorate([
        core_1.Component({
            selector: 'request',
            templateUrl: 'js/components/templates/request.component.html'
        }), 
        __metadata('design:paramtypes', [request_service_1.RequestService, notification_service_1.NotificationService, router_1.ActivatedRoute, router_1.Router])
    ], RequestComponent);
    return RequestComponent;
}());
exports.RequestComponent = RequestComponent;
//# sourceMappingURL=request.component.js.map