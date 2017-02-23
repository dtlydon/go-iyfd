/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {PlayService} from "./play.service";
import {UserChoice} from "./userChoice";
import {AdminService} from "../admin/admin.service";
import {Role} from "../admin/user";
import {GroupByPipe} from "../utils/pipes/groupByPipe";
import {CookieManager} from "../shared/CookieManager";

@Component({
    moduleId: module.id,
    selector: 'play',
    templateUrl: 'play.html',
    styleUrls: ['play.css']
})
export class PlayComponent implements OnInit {
    public userChoices:UserChoice[];
    public userChoicesByRound:UserChoice[] = [];
    private maxRound:number = 1;
    public displayRound:number = 1;
    public isPlayBlocked:boolean;
    constructor(private router:Router, private playService:PlayService, private adminService:AdminService, private cookieManager:CookieManager) {
    }

    ngOnInit():void {
        let tempRole:Role = Role.None;
        let roleText:string = this.cookieManager.getCookie("role");
        if(roleText != ""){
            tempRole = parseInt(roleText) as Role;
        }

        if(tempRole == Role.None){
            this.router.navigateByUrl("/");
            return;
        }

        this.isPlayBlocked = false;
        this.adminService.getSettings().then(response =>{
            this.isPlayBlocked = response.IsAdminBlockOn;
        });

        this.playService.getUserChoices().then(response => {
            this.userChoices = response;
            let roundHash: Object = {};
            for(var i = 0; i < this.userChoices.length; i++){
                if(roundHash[this.userChoices[i].Round]){
                    roundHash[this.userChoices[i].Round] = roundHash[this.userChoices[i].Round] + 1;
                }
                else{
                    roundHash[this.userChoices[i].Round] = 1;
                }

                if(this.userChoices[i].Round > this.maxRound){
                    this.maxRound = this.userChoices[i].Round;
                }
            }
            if(roundHash[this.maxRound] == (64 / Math.pow(2, this.maxRound))){
                this.displayRound = this.maxRound;
            }
            else{
                this.displayRound = this.maxRound - 1;
            }
            this.filterRound();
        });
    }

    updateDisplayRound(round:number):void{
        this.displayRound = round;
        this.filterRound();
    }

    pickWinner(userChoice:UserChoice, entry:number):void{
        userChoice.ChoiceId = entry === 1 ? userChoice.Entry1Id : userChoice.Entry2Id;
        this.playService.updateUserChoice(userChoice); //TODO: Need to handle errors
    }

    getRegionName(region:string):string{
        if(region == "w"){
            return "West";
        }
        if(region == "e"){
            return "East";
        }
        if(region == "s"){
            return "South";
        }
        if(region == "mw"){
            return "Mid-West";
        }
        if(region == "final"){
            return "Championship";
        }

        return "Final Four"
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

    private filterRound():void{
        this.userChoicesByRound = this.userChoices.filter(f => f.Round === this.displayRound);
    }
}