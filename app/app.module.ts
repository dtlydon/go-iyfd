import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {HomeComponent} from "./home/home.component";
import {HowToComponent} from "./home/howto.component";
import {PlayComponent} from "./play/play.component";
import {AdminComponent} from "./admin/admin.component";
import {AppRoutingModule} from "./app-routing.module";
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import {AccountComponent} from "./account/account.component";
import {RegisterComponent} from "./account/register.component";
import {LoginComponent} from "./account/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "./account/account.service";
import {HttpModule} from "@angular/http";
import {Cookie} from "ng2-cookies/index";
import {TeamsComponent} from "./admin/teams.component";
import {RegionsComponent} from "./admin/regions.component";
import {EntryComponent} from "./admin/entry.component";
import {MatchUpsComponent} from "./admin/matchups.component";
import {UsersComponent} from "./admin/users.component";
import {AdminService} from "./admin/admin.service";
import {PlayService} from "./play/play.service";
//import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
    imports:      [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        HowToComponent,
        PlayComponent,
        AdminComponent,
        AccountComponent,
        RegisterComponent,
        LoginComponent,
        TeamsComponent,
        RegionsComponent,
        EntryComponent,
        MatchUpsComponent,
        UsersComponent
    ],
    providers: [
        AccountService,
        AdminService,
        Cookie,
        PlayService
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
