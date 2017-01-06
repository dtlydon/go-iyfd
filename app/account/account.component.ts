/**
 * Created by daniellydon on 11/16/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {Account} from "./account";

@Component({
    moduleId: module.id,
    selector: 'account',
    templateUrl: 'account.html'
})
export class AccountComponent implements OnInit {
    userAccount: Account;

    constructor(private router:Router) {
    }

    ngOnInit():void {
        
    }
}