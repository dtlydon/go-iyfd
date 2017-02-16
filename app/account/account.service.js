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
var index_1 = require("ng2-cookies/index");
var AccountService = (function () {
    function AccountService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.userUrl = 'api/user'; // URL to web api
        this.hasResetCalled = false;
    }
    AccountService.prototype.register = function (account) {
        return this.http.post(this.userUrl + "/register", JSON.stringify(account), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
                var token = response.headers.get("token");
                if (token) {
                    var account_1 = response.json();
                    index_1.Cookie.set("username", account_1.Username);
                    index_1.Cookie.set("role", account_1.Role.toString());
                    return token;
                }
            }
            return "";
        })
            .catch(this.handleError);
    };
    AccountService.prototype.login = function (account) {
        return this.http.post(this.userUrl + "/login", JSON.stringify(account), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response && response.headers) {
                var token = response.headers.get("token");
                if (token) {
                    var account_2 = response.json();
                    index_1.Cookie.set("username", account_2.Username);
                    index_1.Cookie.set("role", account_2.Role.toString());
                    return token;
                }
            }
            return "";
        })
            .catch(this.handleError);
    };
    AccountService.prototype.resetCookie = function () {
        var _this = this;
        if (!this.headers.get('token')) {
            this.headers.append('token', index_1.Cookie.get('token'));
        }
        if (this.hasResetCalled) {
            return null;
        }
        this.hasResetCalled = true;
        return this.http.get(this.userUrl + "/info", { headers: this.headers })
            .toPromise()
            .then(function (response) {
            _this.hasResetCalled = false;
            if (response) {
                var account = response.json();
                index_1.Cookie.set("username", account.Username);
                index_1.Cookie.set("role", account.Role.toString());
            }
        })
            .catch(this.handleError);
    };
    AccountService.prototype.handleError = function (error) {
        this.hasResetCalled = false;
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    AccountService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map