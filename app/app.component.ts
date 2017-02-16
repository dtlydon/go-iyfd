/**
 * Created by daniellydon on 11/7/16.
 */
import {Component, OnInit}          from '@angular/core';
import {Cookie} from "ng2-cookies/ng2-cookies";
import {isNullOrUndefined} from "util";
import {AccountService} from "./account/account.service";
import {Role} from "./admin/user";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'index.html'
})
export class AppComponent implements OnInit {
    title = 'Go! IYFD Number 36';
    cacheBust:Date = new Date();

    constructor(private accountService:AccountService){}

    ngOnInit():void{
    }

    checkIsLoggin():boolean{
        let token  = Cookie.get("token");
        return token !== undefined && token !== null && token !== '';
    }

    getUsername():string{
        let username:string = Cookie.get("username");
        if((username == undefined || username == "") && (Cookie.get("token") !== undefined || Cookie.get("token") != "")){
            this.accountService.resetCookie();
        }
        return username;
    }

    verifyAdmin():boolean{
        let roleText:string = Cookie.get("role");
        if(roleText == undefined || roleText == "")
            return false;
        let role:Role = parseInt(roleText) as Role;
        return role >= Role.Bob;
    }

    signOut():void{
        Cookie.delete("token");
        Cookie.delete("role");
        Cookie.delete("username");
    }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */