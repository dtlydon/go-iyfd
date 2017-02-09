/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {MatchUp} from "../shared/MatchUp";
import {AdminService} from "./admin.service";
import {Team} from "../shared/team";
import {Entry} from "../shared/entry";
import {setupMaster} from "cluster";
import {RegionVs} from "../shared/regionVs";

@Component({
    moduleId: module.id,
    selector: 'matchups',
    templateUrl: 'matchups.html'
})
export class MatchUpsComponent implements OnInit {
    private allMatchUps: MatchUp[];
    roundMatchUps: MatchUp[];
    entries:Entry[];
    teams:Team[];
    selectedRound:number;
    regionVs:RegionVs;
    
    constructor(private router:Router, private adminService:AdminService) {
        this.roundMatchUps = [];
    }

    ngOnInit():void {
        this.adminService.getTeams().then(response =>{
            if(response){
                this.teams = response;
            }
        });

        this.adminService.getEntries().then(response => {
            if(response){
                this.entries = response;
            }
        });

        this.setMatchUps(1);
    }

    generateRoundOne():void{
        this.adminService.generateRoundOneMatchUps().then(response =>{
            this.setMatchUps(1);
        });
    }

    getEntryData(entryId):string {
        let filteredEntries = this.entries.filter(e => e.Id === entryId);
        let filteredTeams = this.teams.filter(team => team.Id === filteredEntries[0].TeamId);
        return filteredEntries[0].Rank + "." + filteredTeams[0].Name;
    }

    pickWinner(matchUp:MatchUp, winnerId:string):void{
        matchUp.Winner = winnerId;
        this.adminService.updateMatchUp(matchUp).then(response =>{
            this.setMatchUps(matchUp.Round);
        })
    }

    changeRound(round:number):void{
        this.selectedRound = round;
        this.roundMatchUps = this.allMatchUps.filter(m => m.Round === round);
    }

    private setMatchUps(round:number):void{
        this.adminService.getMatchUps().then(response => {
            this.allMatchUps = response;
            this.roundMatchUps = this.allMatchUps.filter(m => m.Round === this.selectedRound);
        })
    }
}