/**
 * Created by daniellydon on 2/9/17.
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
var settings_1 = require("./settings");
var admin_service_1 = require("./admin.service");
var SettingComponent = (function () {
    function SettingComponent(adminService) {
        this.adminService = adminService;
    }
    SettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settings = new settings_1.Settings();
        this.adminService.getSettings().then(function (response) {
            _this.settings = response;
        });
    };
    SettingComponent.prototype.updateSouthVs = function (southVs) {
        this.settings.SouthVs = southVs;
        this.updateSettings(this.settings);
    };
    SettingComponent.prototype.updateAdminBlock = function (isOn) {
        this.settings.IsAdminBlockOn = isOn;
        this.updateSettings(this.settings);
    };
    SettingComponent.prototype.updateSettings = function (settings) {
        this.adminService.updateSettings(settings).then(function (response) {
            //??
        });
    };
    SettingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'settings',
            templateUrl: 'settings.html'
        }), 
        __metadata('design:paramtypes', [admin_service_1.AdminService])
    ], SettingComponent);
    return SettingComponent;
}());
exports.SettingComponent = SettingComponent;
//# sourceMappingURL=settings.component.js.map