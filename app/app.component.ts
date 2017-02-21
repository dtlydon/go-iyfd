/**
 * Created by daniellydon on 11/7/16.
 */
import {Component, OnInit}          from '@angular/core';
import {Cookie} from "ng2-cookies/ng2-cookies";
import {AccountService} from "./account/account.service";
import {Role} from "./admin/user";
import {Router} from "@angular/router";
import Any = jasmine.Any;

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'index.html',
    styleUrls: ['index.css']
})
export class AppComponent implements OnInit {
    title = 'Go! IYFD Number 36';
    cacheBust:Date = new Date();
    isAudioPlaying:boolean = true;
    audio:any = new Audio();

    constructor(private accountService:AccountService, private router:Router){}

    ngOnInit():void{
        this.audio.src = "/api/announcement";
        this.audio.load();
        this.audio.play();
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
        Cookie.deleteAll();
        this.router.navigateByUrl("/home");
    }

    toggleAudio():void{
        if(this.isAudioPlaying){
            this.audio.pause();
        }
        else {
            this.audio.play();
        }
        this.isAudioPlaying = !this.isAudioPlaying;
    }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */