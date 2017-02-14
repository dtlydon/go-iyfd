/**
 * Created by daniellydon on 11/7/16.
 */
import {Component, OnInit}          from '@angular/core';
import {Cookie} from "ng2-cookies/ng2-cookies";
import {isNullOrUndefined} from "util";
import {AccountService} from "./account/account.service";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'index.html'
})
export class AppComponent implements OnInit {
    title = 'Go! IYFD Number 36';

    constructor(private accountService:AccountService){}

    ngOnInit():void{
    }

    checkIsLoggin():boolean{
        let token  = Cookie.get("token");
        return token !== undefined && token !== null && token !== '';
    }

    getUsername():string{
        return this.accountService.getUsername();
    }

    signOut():void{
        Cookie.delete("token");
    }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */