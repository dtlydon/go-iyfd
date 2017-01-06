/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'howto',
    templateUrl: 'howto.html'
})
export class HowToComponent implements OnInit {
    constructor(private router:Router) {
    }

    ngOnInit():void {
    }
}