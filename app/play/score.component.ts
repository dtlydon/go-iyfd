/**
 * Created by daniellydon on 2/9/17.
 */
import {Component, OnInit} from "@angular/core";
import {Score} from "./score";
import {PlayService} from "./play.service";
@Component({
    moduleId: module.id,
    selector: 'score',
    templateUrl: 'score.html',
    styleUrls: ['score.css']
})

export class ScoreComponent implements OnInit{
    public scores:Score[];

    constructor(private playService:PlayService){

    }

    ngOnInit():void{
        this.playService.getScores().then(response =>{
            this.scores = response.sort((score1, score2) =>{
                if(score1 > score2){
                    return 1;
                }
                else if (score2 < score1){
                    return -1;
                }
                else{
                    return 0;
                }
            });
        });
    }
}