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
 * Created by daniellydon on 2/9/17.
 */
var core_1 = require("@angular/core");
var play_service_1 = require("./play.service");
var ScoreComponent = (function () {
    function ScoreComponent(playService) {
        this.playService = playService;
    }
    ScoreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.playService.getScores().then(function (response) {
            _this.scores = response.sort(function (score1, score2) {
                if (score1 > score2) {
                    return 1;
                }
                else if (score2 < score1) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
        });
    };
    ScoreComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'score',
            templateUrl: 'score.html',
            styleUrls: ['score.css']
        }), 
        __metadata('design:paramtypes', [play_service_1.PlayService])
    ], ScoreComponent);
    return ScoreComponent;
}());
exports.ScoreComponent = ScoreComponent;
//# sourceMappingURL=score.component.js.map