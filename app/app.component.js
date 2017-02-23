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
 * Created by daniellydon on 11/7/16.
 */
var core_1 = require('@angular/core');
var account_service_1 = require("./account/account.service");
var user_1 = require("./admin/user");
var router_1 = require("@angular/router");
var CookieManager_1 = require("./shared/CookieManager");
var AppComponent = (function () {
    //audio:any = new Audio();
    function AppComponent(accountService, router, cookieManager) {
        this.accountService = accountService;
        this.router = router;
        this.cookieManager = cookieManager;
        this.title = 'Go! IYFD Number 36';
        this.cacheBust = new Date();
        this.isAudioPlaying = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        //  this.audio.src = "/api/announcement";
        //this.audio.src = this.audio.src;
    };
    AppComponent.prototype.checkIsLoggin = function () {
        var token = this.cookieManager.getCookie("token");
        return token !== undefined && token !== null && token !== '';
    };
    AppComponent.prototype.getUsername = function () {
        var username = this.cookieManager.getCookie("username");
        if ((username == undefined || username == "") && (this.cookieManager.getCookie("token") !== undefined || this.cookieManager.getCookie("token") != "")) {
            this.accountService.resetCookie();
        }
        return username;
    };
    AppComponent.prototype.verifyAdmin = function () {
        var roleText = this.cookieManager.getCookie("role");
        if (roleText == undefined || roleText == "")
            return false;
        var role = parseInt(roleText);
        return role >= user_1.Role.Bob;
    };
    AppComponent.prototype.signOut = function () {
        this.cookieManager.deleteCookie("username");
        this.cookieManager.deleteCookie("token");
        this.cookieManager.deleteCookie("role");
        this.router.navigateByUrl("/home");
    };
    AppComponent.prototype.toggleAudio = function () {
        if (this.isAudioPlaying) {
        }
        else {
        }
        this.isAudioPlaying = !this.isAudioPlaying;
    };
    AppComponent.prototype.removeIn = function () {
        document.getElementById("navbar").classList.remove('in');
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'index.html',
            styleUrls: ['index.css']
        }), 
        __metadata('design:paramtypes', [account_service_1.AccountService, router_1.Router, CookieManager_1.CookieManager])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */ 
//# sourceMappingURL=app.component.js.map