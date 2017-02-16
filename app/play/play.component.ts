/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {PlayService} from "./play.service";
import {UserChoice} from "./userChoice";
import {AdminService} from "../admin/admin.service";
import {Cookie} from "ng2-cookies/index";
import {Role} from "../admin/user";

@Component({
    moduleId: module.id,
    selector: 'play',
    templateUrl: 'play.html'
})
export class PlayComponent implements OnInit {
    public userChoices:UserChoice[];
    public isPlayBlocked:boolean;
    constructor(private router:Router, private playService:PlayService, private adminService:AdminService) {
    }

    ngOnInit():void {

        let tempRole:Role = Role.None;
        let roleText:string = Cookie.get("role");
        if(roleText != ""){
            tempRole = parseInt(roleText) as Role;
        }

        if(tempRole == Role.None){
            this.router.navigateByUrl("/");
        }

        this.isPlayBlocked = false;
        this.adminService.getSettings().then(response =>{
            this.isPlayBlocked = response.IsAdminBlockOn;
        });

        this.playService.getUserChoices().then(response => {
            this.userChoices = response;
        });
    }

    pickWinner(userChoice:UserChoice, entry:number):void{
        userChoice.ChoiceId = entry === 1 ? userChoice.Entry1Id : userChoice.Entry2Id;
        this.playService.updateUserChoice(userChoice); //TODO: Need to handle errors
    }

    highLightChoice(userChoice:UserChoice, entryNo:number, isGreen:boolean):boolean{
        let entry = entryNo == 1 ? userChoice.Entry1Id : userChoice.Entry2Id;
        if(userChoice.Winner === ""){
            if(isGreen){
                return entry == userChoice.ChoiceId;
            }else{
                return false;
            }
        } else if(entry === userChoice.ChoiceId){
            return userChoice.Winner === entry ?  isGreen : !isGreen;
        }
        return false;
    }
}