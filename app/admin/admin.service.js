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
var user_1 = require("./user");
var router_1 = require("@angular/router");
var CookieManager_1 = require("../shared/CookieManager");
var AdminService = (function () {
    function AdminService(http, router, cookieManager) {
        this.http = http;
        this.router = router;
        this.cookieManager = cookieManager;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.teamsUrl = 'api/teams'; // URL to web api
        this.entriesUrl = 'api/entries';
        this.matchUpsUrl = 'api/matchups';
        this.settingsUrl = 'api/settings';
        this.usersUrl = 'api/user';
        this.userChoiceUrl = 'api/userchoice';
        this.audioUrl = 'api/announcement';
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
            this.headers.append('token', this.cookieManager.getCookie('token'));
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
    //<editor-fold desc="MatchUps">
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
    AdminService.prototype.updateMatchUp = function (matchUp) {
        this.addTokenWhenExists();
        return this.http.patch(this.matchUpsUrl, matchUp, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
            }
        })
            .catch(this.handleError);
    };
    AdminService.prototype.getSettings = function () {
        this.addTokenWhenExists();
        return this.http.get(this.settingsUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
                return response.json();
            }
        })
            .catch(this.handleError);
    };
    AdminService.prototype.updateSettings = function (settings) {
        this.addTokenWhenExists();
        return this.http.post(this.settingsUrl, settings, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
            }
        });
    };
    //</editor-fold>
    //<editor-fold desc="Users">
    AdminService.prototype.getUsers = function () {
        this.addTokenWhenExists();
        return this.http.get(this.usersUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response) {
                return response.json();
            }
        })
            .catch(this.handleError);
    };
    AdminService.prototype.updateUser = function (user) {
        this.addTokenWhenExists();
        return this.http.post(this.usersUrl, user, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            //?
        })
            .catch(this.handleError);
    };
    //</editor-fold>
    //<editor-fold desc="Mimic">
    AdminService.prototype.getUserChoices = function (userId) {
        this.addTokenWhenExists();
        return this.http.get(this.userChoiceUrl + "/" + userId, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response) {
                return response.json();
            }
        })
            .catch(this.handleError);
    };
    AdminService.prototype.updateUserChoice = function (userChoice, userId) {
        this.addTokenWhenExists();
        return this.http.post(this.userChoiceUrl + "/" + userId, JSON.stringify(userChoice), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
            }
        })
            .catch(this.handleError);
    };
    //</editor-fold>
    //<editor-fold desc='audio'>
    AdminService.prototype.updateAnnouncement = function (formData) {
        var _this = this;
        this.headers.delete("Content-Type");
        this.addTokenWhenExists();
        return this.http.post(this.audioUrl, formData, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            _this.headers.append("Content-Type", "application/json");
        })
            .catch(this.handleError);
    };
    //</editor-fold>
    AdminService.prototype.verifyAdmin = function () {
        var roleCookie = this.cookieManager.getCookie("role");
        var isNotAuthorized = true;
        if (roleCookie != "") {
            var role = parseInt(this.cookieManager.getCookie("role"));
            if (role >= user_1.Role.Bob) {
                isNotAuthorized = false;
            }
        }
        if (isNotAuthorized) {
            this.router.navigateByUrl("/");
        }
    };
    AdminService.prototype.addTokenWhenExists = function () {
        this.headers.set('token', this.cookieManager.getCookie('token'));
    };
    AdminService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    AdminService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, CookieManager_1.CookieManager])
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map