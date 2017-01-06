/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'entry',
    templateUrl: 'entry.html'
})
export class EntryComponent implements OnInit {
    constructor(private router:Router) {
    }

    ngOnInit():void {
    }
}