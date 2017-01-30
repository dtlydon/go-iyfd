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
 * Created by daniellydon on 11/23/16.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var ng2_cookies_1 = require("ng2-cookies/ng2-cookies");
var AdminService = (function () {
    function AdminService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.teamsUrl = 'api/teams'; // URL to web api
        this.entriesUrl = 'api/entries';
        this.matchUpsUrl = 'api/matchups';
    }
    //<editor-fold desc="Teams">
    AdminService.prototype.addTeam = function (team) {
        return this.http.post(this.teamsUrl, JSON.stringify(team), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
            }
        })
            .catch(this.handleError);
    };
    AdminService.prototype.getTeams = function () {
        if (!this.headers.get('token')) {
            this.headers.append('token', ng2_cookies_1.Cookie.get('token'));
        }
        return this.http.get(this.teamsUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
                return response.json();
            }
            return [{}];
        })
            .catch(this.handleError);
    };
    //</editor-fold >
    //<editor-fold desc="Entries">
    AdminService.prototype.addEntry = function (entry) {
        this.addTokenWhenExists();
        return this.http.post(this.entriesUrl, JSON.stringify(entry), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
            }
        })
            .catch(this.handleError);
    };
    AdminService.prototype.getEntries = function () {
        this.addTokenWhenExists();
        return this.http.get(this.entriesUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
                return response.json();
            }
            return [{}];
        })
            .catch(this.handleError);
    };
    //</editor-fold>
    //<editor-forld desc="MatchUps">
    AdminService.prototype.generateRoundOneMatchUps = function () {
        this.addTokenWhenExists();
        return this.http.post(this.matchUpsUrl + '/generate', {}, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
            }
        })
            .catch(this.handleError);
    };
    AdminService.prototype.getMatchUps = function () {
        this.addTokenWhenExists();
        return this.http.get(this.matchUpsUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
                return response.json();
            }
            return [{}];
        })
            .catch(this.handleError);
    };
    //</editor-fold>
    AdminService.prototype.addTokenWhenExists = function () {
        if (!this.headers.get('token')) {
            this.headers.append('token', ng2_cookies_1.Cookie.get('token'));
        }
    };
    AdminService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    AdminService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map