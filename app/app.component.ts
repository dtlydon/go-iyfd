/**
 * Created by daniellydon on 11/7/16.
 */
import {Component, OnInit}          from '@angular/core';
import {AccountService} from "./account/account.service";
import {Role} from "./admin/user";
import {Router} from "@angular/router";
import Any = jasmine.Any;
import {CookieManager} from "./shared/CookieManager";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'index.html',
    styleUrls: ['index.css']
})
export class AppComponent implements OnInit {
    title = 'Go! IYFD Number 36';
    cacheBust:Date = new Date();
    isAudioPlaying:boolean = false;
    //audio:any = new Audio();

    constructor(private accountService:AccountService, private router:Router, private cookieManager:CookieManager){}

    ngOnInit():void{
      //  this.audio.src = "/api/announcement";
        //this.audio.src = this.audio.src;
    }

    checkIsLoggin():boolean{
        let token  = this.cookieManager.getCookie("token");
        return token !== undefined && token !== null && token !== '';
    }

    getUsername():string{
        let username:string = this.cookieManager.getCookie("username");
        if((username == undefined || username == "") && (this.cookieManager.getCookie("token") !== undefined || this.cookieManager.getCookie("token") != "")){
            this.accountService.resetCookie();
        }
        return username;
    }

    verifyAdmin():boolean{
        let roleText:string = this.cookieManager.getCookie("role");
        if(roleText == undefined || roleText == "")
            return false;
        let role:Role = parseInt(roleText) as Role;
        return role >= Role.Bob;
    }

    signOut():void{
        this.cookieManager.deleteCookie("username");
        this.cookieManager.deleteCookie("token");
        this.cookieManager.deleteCookie("role");
        this.router.navigateByUrl("/home");
    }

    toggleAudio():void{
        if(this.isAudioPlaying){
            //this.audio.pause();
        }
        else {
            //this.audio.play();
        }
        this.isAudioPlaying = !this.isAudioPlaying;
    }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */