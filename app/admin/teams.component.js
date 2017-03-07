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
/**
 * Created by daniellydon on 11/10/16.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var admin_service_1 = require("./admin.service");
var team_1 = require("../shared/team");
var forms_1 = require("@angular/forms");
var TeamsComponent = (function () {
    function TeamsComponent(router, adminService, formBuilder) {
        this.router = router;
        this.adminService = adminService;
        this.formBuilder = formBuilder;
        this.teamsForm = formBuilder.group({
            'name': [null, forms_1.Validators.required],
            'acronym': [null, forms_1.Validators.required]
        });
        this.isLoading = false;
    }
    TeamsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getTeams().then(function (response) {
            if (response) {
                _this.teams = response;
                console.log(_this.teams);
            }
        });
    };
    TeamsComponent.prototype.addTeam = function () {
        var _this = this;
        this.isLoading = true;
        var tempForm = this.teamsForm;
        this.newTeam = new team_1.Team();
        this.newTeam.Name = tempForm.controls['name'].value;
        this.newTeam.Acronym = tempForm.controls['acronym'].value;
        this.adminService.addTeam(this.newTeam).then(function (response) {
            _this.teams.push(_this.newTeam);
            _this.isLoading = false;
        }).catch(function (response) {
            _this.isLoading = false;
        });
    };
    TeamsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'teams',
            templateUrl: 'teams.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, admin_service_1.AdminService, forms_1.FormBuilder])
    ], TeamsComponent);
    return TeamsComponent;
}());
exports.TeamsComponent = TeamsComponent;
//# sourceMappingURL=teams.component.js.map