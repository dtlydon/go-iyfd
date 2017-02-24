/**
 * Created by daniellydon on 2/16/17.
 */
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
var core_1 = require("@angular/core");
var admin_service_1 = require("./admin.service");
var AudioComponent = (function () {
    function AudioComponent(adminService) {
        this.adminService = adminService;
        this.isLoading = false;
    }
    ;
    AudioComponent.prototype.ngOnInit = function () {
    };
    AudioComponent.prototype.updateFile = function (event) {
        this.formData = new FormData();
        this.formData.append('announcement', event.srcElement.files.item(0));
    };
    AudioComponent.prototype.upload = function () {
        var _this = this;
        this.isLoading = true;
        this.adminService.updateAnnouncement(this.formData).then(function (resp) {
            _this.isLoading = false;
            _this.message = "Success";
            var e = _this;
            setTimeout(function () {
                e.message = "";
            }, 3000);
        });
    };
    AudioComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'audio1',
            templateUrl: 'audio.html'
        }), 
        __metadata('design:paramtypes', [admin_service_1.AdminService])
    ], AudioComponent);
    return AudioComponent;
}());
exports.AudioComponent = AudioComponent;
//# sourceMappingURL=audio.component.js.map