/**
 * Created by daniellydon on 2/23/17.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'halloffame',
    templateUrl: 'halloffame.html'
})
export class HallOfFameComponent implements OnInit {
    constructor(private router:Router) {
    }

    ngOnInit():void {
    }
}