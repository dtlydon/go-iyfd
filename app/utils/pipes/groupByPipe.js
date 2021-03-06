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
 * Created by daniellydon on 2/16/17.
 */
var core_1 = require("@angular/core");
var GroupByPipe = (function () {
    function GroupByPipe() {
    }
    GroupByPipe.prototype.transform = function (value, field, shouldSort) {
        var groupedObj = value.reduce(function (prev, cur) {
            if (!prev[cur[field]]) {
                prev[cur[field]] = [cur];
            }
            else {
                prev[cur[field]].push(cur);
            }
            return prev;
        }, {});
        var finalArray = Object.keys(groupedObj).map(function (key) { return ({ key: key, value: groupedObj[key] }); });
        if (shouldSort) {
            return finalArray.sort(function (score1, score2) {
                if (parseInt(score1.key) > parseInt(score2.key)) {
                    return -1;
                }
                else if (parseInt(score2.key) > parseInt(score1.key)) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        return finalArray;
    };
    GroupByPipe = __decorate([
        core_1.Pipe({ name: 'groupBy' }), 
        __metadata('design:paramtypes', [])
    ], GroupByPipe);
    return GroupByPipe;
}());
exports.GroupByPipe = GroupByPipe;
//# sourceMappingURL=groupByPipe.js.map