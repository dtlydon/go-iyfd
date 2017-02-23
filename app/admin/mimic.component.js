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
var router_1 = require("@angular/router");
/**
 * Created by daniellydon on 2/14/17.
 */
var MimicComponent = (function () {
    function MimicComponent(route, adminService) {
        this.route = route;
        this.adminService = adminService;
        this.userChoicesByRound = [];
        this.maxRound = 1;
        this.displayRound = 1;
    }
    MimicComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userId = this.route.snapshot.params["userId"];
        this.adminService.getUserChoices(this.userId).then(function (response) {
            _this.userChoices = response;
            var roundHash = {};
            for (var i = 0; i < _this.userChoices.length; i++) {
                if (roundHash[_this.userChoices[i].Round]) {
                    roundHash[_this.userChoices[i].Round] = roundHash[_this.userChoices[i].Round] + 1;
                }
                else {
                    roundHash[_this.userChoices[i].Round] = 1;
                }
                if (_this.userChoices[i].Round > _this.maxRound) {
                    _this.maxRound = _this.userChoices[i].Round;
                }
            }
            if (roundHash[_this.maxRound] == (64 / Math.pow(2, _this.maxRound))) {
                _this.displayRound = _this.maxRound;
            }
            else {
                _this.displayRound = _this.maxRound - 1;
            }
            _this.filterRound();
        });
    };
    MimicComponent.prototype.updateDisplayRound = function (round) {
        this.displayRound = round;
        this.filterRound();
    };
    MimicComponent.prototype.highLightChoice = function (userChoice, entryNo, isGreen) {
        var entry = entryNo == 1 ? userChoice.Entry1Id : userChoice.Entry2Id;
        if (userChoice.Winner === "") {
            if (isGreen) {
                return entry == userChoice.ChoiceId;
            }
            else {
                return false;
            }
        }
        else if (entry === userChoice.ChoiceId) {
            return userChoice.Winner === entry ? isGreen : !isGreen;
        }
        return false;
    };
    MimicComponent.prototype.getRegionName = function (region) {
        if (region == "w") {
            return "West";
        }
        if (region == "e") {
            return "East";
        }
        if (region == "s") {
            return "South";
        }
        if (region == "mw") {
            return "Mid-West";
        }
        if (region == "final") {
            return "Championship";
        }
        return "Final Four";
    };
    MimicComponent.prototype.pickWinner = function (userChoice, entry) {
        userChoice.ChoiceId = entry === 1 ? userChoice.Entry1Id : userChoice.Entry2Id;
        this.adminService.updateUserChoice(userChoice, this.userId); //TODO: Need to handle errors
    };
    MimicComponent.prototype.filterRound = function () {
        var _this = this;
        this.userChoicesByRound = this.userChoices.filter(function (f) { return f.Round === _this.displayRound; });
    };
    MimicComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mimic',
            templateUrl: 'mimic.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, admin_service_1.AdminService])
    ], MimicComponent);
    return MimicComponent;
}());
exports.MimicComponent = MimicComponent;
//# sourceMappingURL=mimic.component.js.map