/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'admin',
    templateUrl: 'admin.html'
})
export class AdminComponent implements OnInit {
    constructor(private router:Router) {
    }

    ngOnInit():void {
        //TODO: Authorize user. Grab userchoices
    }
}