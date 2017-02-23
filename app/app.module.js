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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var home_component_1 = require("./home/home.component");
var howto_component_1 = require("./home/howto.component");
var play_component_1 = require("./play/play.component");
var admin_component_1 = require("./admin/admin.component");
var app_routing_module_1 = require("./app-routing.module");
var account_component_1 = require("./account/account.component");
var register_component_1 = require("./account/register.component");
var login_component_1 = require("./account/login.component");
var forms_1 = require("@angular/forms");
var account_service_1 = require("./account/account.service");
var http_1 = require("@angular/http");
var teams_component_1 = require("./admin/teams.component");
var regions_component_1 = require("./admin/regions.component");
var entry_component_1 = require("./admin/entry.component");
var matchups_component_1 = require("./admin/matchups.component");
var users_component_1 = require("./admin/users.component");
var admin_service_1 = require("./admin/admin.service");
var play_service_1 = require("./play/play.service");
var score_component_1 = require("./play/score.component");
var settings_component_1 = require("./admin/settings.component");
var mimic_component_1 = require("./admin/mimic.component");
var audio_component_1 = require("./admin/audio.component");
var groupByPipe_1 = require("./utils/pipes/groupByPipe");
var CookieManager_1 = require("./shared/CookieManager");
//import { InMemoryDataService }  from './in-memory-data.service';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                howto_component_1.HowToComponent,
                play_component_1.PlayComponent,
                admin_component_1.AdminComponent,
                account_component_1.AccountComponent,
                register_component_1.RegisterComponent,
                login_component_1.LoginComponent,
                teams_component_1.TeamsComponent,
                regions_component_1.RegionsComponent,
                entry_component_1.EntryComponent,
                matchups_component_1.MatchUpsComponent,
                users_component_1.UsersComponent,
                score_component_1.ScoreComponent,
                settings_component_1.SettingComponent,
                mimic_component_1.MimicComponent,
                audio_component_1.AudioComponent,
                groupByPipe_1.GroupByPipe
            ],
            providers: [
                account_service_1.AccountService,
                admin_service_1.AdminService,
                CookieManager_1.CookieManager,
                play_service_1.PlayService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map