"use strict";
var RequestListItem = (function () {
    function RequestListItem(id, requestDate, name, school, service, status, action) {
        this.id = id;
        this.requestDate = requestDate;
        this.name = name;
        this.school = school;
        this.service = service;
        this.status = status;
        this.action = action;
    }
    return RequestListItem;
}());
exports.RequestListItem = RequestListItem;
//# sourceMappingURL=request-list-item.js.map