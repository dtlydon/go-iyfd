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
var MatchUpsComponent = (function () {
    function MatchUpsComponent(router, adminService) {
        this.router = router;
        this.adminService = adminService;
        this.roundMatchUps = [];
    }
    MatchUpsComponent.prototype.ngOnInit = function () {
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
        this.adminService.getRegionVs().then(function (response) {
            if (response) {
                _this.regionVs = response;
            }
            else {
                _this.regionVs.SouthVs = '';
            }
        });
        this.setMatchUps(1);
    };
    MatchUpsComponent.prototype.generateRoundOne = function () {
        var _this = this;
        this.adminService.generateRoundOneMatchUps().then(function (response) {
            _this.setMatchUps(1);
        });
    };
    MatchUpsComponent.prototype.getEntryData = function (entryId) {
        var filteredEntries = this.entries.filter(function (e) { return e.Id === entryId; });
        var filteredTeams = this.teams.filter(function (team) { return team.Id === filteredEntries[0].TeamId; });
        return filteredEntries[0].Rank + "." + filteredTeams[0].Name;
    };
    MatchUpsComponent.prototype.pickWinner = function (matchUp, winnerId) {
        var _this = this;
        matchUp.Winner = winnerId;
        this.adminService.updateMatchUp(matchUp).then(function (response) {
            _this.setMatchUps(matchUp.Round);
        });
    };
    MatchUpsComponent.prototype.changeRound = function (round) {
        this.selectedRound = round;
        this.roundMatchUps = this.allMatchUps.filter(function (m) { return m.Round === round; });
    };
    MatchUpsComponent.prototype.setSouthVs = function (region) {
        this.regionVs.SouthVs = region;
        this.adminService.createRegionVs(this.regionVs).then(function (response) {
            //
        });
    };
    MatchUpsComponent.prototype.setMatchUps = function (round) {
        var _this = this;
        this.adminService.getMatchUps().then(function (response) {
            _this.allMatchUps = response;
            _this.roundMatchUps = _this.allMatchUps.filter(function (m) { return m.Round === _this.selectedRound; });
        });
    };
    MatchUpsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'matchups',
            templateUrl: 'matchups.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, admin_service_1.AdminService])
    ], MatchUpsComponent);
    return MatchUpsComponent;
}());
exports.MatchUpsComponent = MatchUpsComponent;
//# sourceMappingURL=matchups.component.js.map