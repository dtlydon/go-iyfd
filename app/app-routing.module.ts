/**
 * Created by daniellydon on 11/10/16.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home/home.component';
import { PlayComponent } from "./play/play.component";
import { AdminComponent } from "./admin/admin.component";
import { HowToComponent } from "./home/howto.component";
import {AccountComponent} from "./account/account.component";
import {LoginComponent} from "./account/login.component";
import {RegisterComponent} from "./account/register.component";
import {TeamsComponent} from "./admin/teams.component";
import {RegionsComponent} from "./admin/regions.component";
import {EntryComponent} from "./admin/entry.component";
import {MatchUpsComponent} from "./admin/matchups.component";
import {UsersComponent} from "./admin/users.component";
import {ScoreComponent} from "./play/score.component";
import {SettingComponent} from "./admin/settings.component";
import {MimicComponent} from "./admin/mimic.component";

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',  component: HomeComponent },
    { path: 'howto', component: HowToComponent },
    { path: 'play', component: PlayComponent },
    { path: 'scores', component: ScoreComponent },
    { path: 'admin', component: AdminComponent,
        children: [
            {path: 'teams', component: TeamsComponent},
            {path: 'regions', component: RegionsComponent},
            {path: 'entry', component: EntryComponent},
            {path: 'matchups', component: MatchUpsComponent},
            {path: 'users', component: UsersComponent},
            {path: 'settings', component: SettingComponent},
            {path: 'mimic/:userId', component: MimicComponent}
        ]
    },
    { path: 'account', component: AccountComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */