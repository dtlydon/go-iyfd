/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {AdminService} from "./admin.service";
import {Role} from "./user";
import {CookieManager} from "../shared/CookieManager";

@Component({
    moduleId: module.id,
    selector: 'admin',
    templateUrl: 'admin.html',
    styleUrls: ['admin.css']
})
export class AdminComponent implements OnInit {
    constructor(private adminService:AdminService, private cookieManager: CookieManager) {
    }

    ngOnInit():void {
        this.adminService.verifyAdmin();
    }

    verifyAdmin():boolean{
        let roleText:string = this.cookieManager.getCookie("role");
        if(roleText == undefined || roleText == "")
            return false;
        let role:Role = parseInt(roleText) as Role;
        return role >= Role.Admin;
    }
}