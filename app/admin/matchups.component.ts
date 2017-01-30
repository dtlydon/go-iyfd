/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {MatchUp} from "../shared/MatchUp";
import {AdminService} from "./admin.service";

@Component({
    moduleId: module.id,
    selector: 'matchups',
    templateUrl: 'matchups.html'
})
export class MatchUpsComponent implements OnInit {
    private allMatchUps: MatchUp[];
    roundOneMatchUps: MatchUp[];
    
    constructor(private router:Router, private adminService:AdminService) {
        this.roundOneMatchUps = [];
    }

    ngOnInit():void {
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
}