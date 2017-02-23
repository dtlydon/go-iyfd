import {Component, OnInit} from "@angular/core";
import {AdminService} from "./admin.service";
import {UserChoice} from "../play/userChoice";
import {Route, ActivatedRoute} from "@angular/router";
/**
 * Created by daniellydon on 2/14/17.
 */

@Component({
    moduleId: module.id,
    selector: 'mimic',
    templateUrl: 'mimic.html'
})
export class MimicComponent implements OnInit {
    userChoices: UserChoice[];
    userId:string;
    public userChoicesByRound:UserChoice[] = [];
    private maxRound:number = 1;
    public displayRound:number = 1;
    
    constructor(private route:ActivatedRoute, private adminService:AdminService) {
    }

    ngOnInit():void {
        this.userId = this.route.snapshot.params["userId"];
        this.adminService.getUserChoices(this.userId).then(response =>{
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

    pickWinner(userChoice:UserChoice, entry:number):void{
        userChoice.ChoiceId = entry === 1 ? userChoice.Entry1Id : userChoice.Entry2Id;
        this.adminService.updateUserChoice(userChoice, this.userId); //TODO: Need to handle errors
    }

    private filterRound():void{
        this.userChoicesByRound = this.userChoices.filter(f => f.Round === this.displayRound);
    }
}