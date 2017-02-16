/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {AdminService} from "./admin.service";
import {Role} from "./user";
import {Cookie} from "ng2-cookies/index";

@Component({
    moduleId: module.id,
    selector: 'admin',
    templateUrl: 'admin.html'
})
export class AdminComponent implements OnInit {
    constructor(private adminService:AdminService) {
    }

    ngOnInit():void {
        this.adminService.verifyAdmin();
    }

    verifyAdmin():boolean{
        let roleText:string = Cookie.get("role");
        if(roleText == undefined || roleText == "")
            return false;
        let role:Role = parseInt(roleText) as Role;
        return role >= Role.Admin;
    }
}