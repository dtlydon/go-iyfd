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
 * Created by daniellydon on 2/7/17.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var ng2_cookies_1 = require("ng2-cookies/ng2-cookies");
var PlayService = (function () {
    function PlayService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.userChoiceUrl = 'api/userchoice'; // URL to web api
    }
    //<editor-fold desc="Teams">
    PlayService.prototype.updateUserChoice = function (userChoice) {
        this.addTokenWhenExists();
        return this.http.post(this.userChoiceUrl, JSON.stringify(userChoice), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
            }
        })
            .catch(this.handleError);
    };
    PlayService.prototype.getUserChoices = function () {
        this.addTokenWhenExists();
        return this.http.get(this.userChoiceUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
                return response.json();
            }
        })
            .catch(this.handleError);
    };
    PlayService.prototype.addTokenWhenExists = function () {
        if (!this.headers.get('token')) {
            this.headers.append('token', ng2_cookies_1.Cookie.get('token'));
        }
    };
    PlayService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    PlayService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayService);
    return PlayService;
}());
exports.PlayService = PlayService;
//# sourceMappingURL=play.service.js.map