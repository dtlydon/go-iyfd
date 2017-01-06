/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'matchups',
    templateUrl: 'matchups.html'
})
export class MatchUpsComponent implements OnInit {
    constructor(private router:Router) {
    }

    ngOnInit():void {
    }
}