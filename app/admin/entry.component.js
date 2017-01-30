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
var entry_1 = require("../shared/entry");
var forms_1 = require("@angular/forms");
var EntryComponent = (function () {
    function EntryComponent(router, adminService, formBuilder) {
        this.router = router;
        this.adminService = adminService;
        this.entryForm = formBuilder.group({
            'teamId': [null, forms_1.Validators.required],
            'region': [null, forms_1.Validators.required],
            'rank': [null, forms_1.Validators.required]
        });
        this.isLoading = false;
    }
    EntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getTeams().then(function (response) {
            if (response) {
                _this.teams = response;
            }
        });
        this.adminService.getEntries().then(function (response) {
            if (response) {
                _this.entries = response;
            }
        });
    };
    EntryComponent.prototype.getTeamName = function (teamId) {
        var filteredTeams = this.teams.filter(function (team) { return team.Id === teamId; });
        if (filteredTeams.length > 0)
            return filteredTeams[0].Name;
        return "";
    };
    EntryComponent.prototype.addEntry = function () {
        var _this = this;
        this.isLoading = true;
        this.newEntry = new entry_1.Entry();
        this.newEntry.TeamId = this.entryForm.controls['teamId'].value;
        this.newEntry.Region = this.entryForm.controls['region'].value;
        this.newEntry.Rank = parseInt(this.entryForm.controls['rank'].value);
        this.adminService.addEntry(this.newEntry).then(function (response) {
            _this.entries.push(_this.newEntry);
            _this.isLoading = false;
        }).catch(function (error) { _this.isLoading = false; });
    };
    EntryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'entry',
            templateUrl: 'entry.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, admin_service_1.AdminService, forms_1.FormBuilder])
    ], EntryComponent);
    return EntryComponent;
}());
exports.EntryComponent = EntryComponent;
//# sourceMappingURL=entry.component.js.map