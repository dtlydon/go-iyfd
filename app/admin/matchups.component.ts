/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {MatchUp} from "../shared/MatchUp";
import {AdminService} from "./admin.service";
import {Team} from "../shared/team";
import {Entry} from "../shared/entry";

@Component({
    moduleId: module.id,
    selector: 'matchups',
    templateUrl: 'matchups.html'
})
export class MatchUpsComponent implements OnInit {
    private allMatchUps: MatchUp[];
    roundOneMatchUps: MatchUp[];
    entries:Entry[];
    teams:Team[];
    
    constructor(private router:Router, private adminService:AdminService) {
        this.roundOneMatchUps = [];
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

        this.adminService.getMatchUps().then(response => {
            this.allMatchUps = response;

            for(var i = 0; i < this.allMatchUps.length; i++){
                if(this.allMatchUps[i].Round === 1){
                    this.roundOneMatchUps.push(this.allMatchUps[i]);
                }
            }
        })
    }

    generateRoundOne():void{
        this.adminService.generateRoundOneMatchUps().then(response =>{
            this.router.navigateByUrl('/admin/matchups');
        });
    }

    getEntryData(entryId):string{
        let filteredEntries = this.entries.filter(e => e.Id === entryId);
        let filteredTeams = this.teams.filter(team => team.Id === filteredEntries[0].TeamId);
        return filteredEntries[0].Rank + "." + filteredTeams[0].Name;
    }

    pickWinner(matchUp:MatchUp, winnerId:string):void{
        matchUp.WinnerId = winnerId;
        //TODO: Call admin service
    }
}