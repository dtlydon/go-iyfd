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
var play_service_1 = require("./play.service");
var admin_service_1 = require("../admin/admin.service");
var PlayComponent = (function () {
    function PlayComponent(router, playService, adminService) {
        this.router = router;
        this.playService = playService;
        this.adminService = adminService;
    }
    PlayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isPlayBlocked = false;
        this.adminService.getSettings().then(function (response) {
            _this.isPlayBlocked = response.IsAdminBlockOn;
        });
        this.playService.getUserChoices().then(function (response) {
            _this.userChoices = response;
        });
    };
    PlayComponent.prototype.pickWinner = function (userChoice, entry) {
        userChoice.ChoiceId = entry === 1 ? userChoice.Entry1Id : userChoice.Entry2Id;
        this.playService.updateUserChoice(userChoice); //TODO: Need to handle errors
    };
    PlayComponent.prototype.highLightChoice = function (userChoice, entryNo, isGreen) {
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
    PlayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'play',
            templateUrl: 'play.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, play_service_1.PlayService, admin_service_1.AdminService])
    ], PlayComponent);
    return PlayComponent;
}());
exports.PlayComponent = PlayComponent;
//# sourceMappingURL=play.component.js.map