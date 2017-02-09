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
var home_component_1 = require('./home/home.component');
var play_component_1 = require("./play/play.component");
var admin_component_1 = require("./admin/admin.component");
var howto_component_1 = require("./home/howto.component");
var account_component_1 = require("./account/account.component");
var login_component_1 = require("./account/login.component");
var register_component_1 = require("./account/register.component");
var teams_component_1 = require("./admin/teams.component");
var regions_component_1 = require("./admin/regions.component");
var entry_component_1 = require("./admin/entry.component");
var matchups_component_1 = require("./admin/matchups.component");
var users_component_1 = require("./admin/users.component");
var score_component_1 = require("./play/score.component");
var settings_component_1 = require("./admin/settings.component");
var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'howto', component: howto_component_1.HowToComponent },
    { path: 'play', component: play_component_1.PlayComponent },
    { path: 'scores', component: score_component_1.ScoreComponent },
    { path: 'admin', component: admin_component_1.AdminComponent,
        children: [
            { path: 'teams', component: teams_component_1.TeamsComponent },
            { path: 'regions', component: regions_component_1.RegionsComponent },
            { path: 'entry', component: entry_component_1.EntryComponent },
            { path: 'matchups', component: matchups_component_1.MatchUpsComponent },
            { path: 'users', component: users_component_1.UsersComponent },
            { path: 'settings', component: settings_component_1.SettingComponent }
        ]
    },
    { path: 'account', component: account_component_1.AccountComponent,
        children: [
            { path: 'login', component: login_component_1.LoginComponent },
            { path: 'register', component: register_component_1.RegisterComponent }
        ]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */ 
//# sourceMappingURL=app-routing.module.js.map