/**
 * Created by daniellydon on 2/9/17.
 */
import {Component, OnInit} from "@angular/core";
import {Score} from "./score";
import {PlayService} from "./play.service";
@Component({
    moduleId: module.id,
    selector: 'score',
    templateUrl: 'score.html'
})

export class ScoreComponent implements OnInit{
    public scores:Score[];

    constructor(private playService:PlayService){

    }

    ngOnInit():void{
        this.playService.getScores().then(response =>{
            this.scores = response;
        });
    }
}