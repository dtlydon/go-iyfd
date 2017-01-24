/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {AdminService} from "./admin.service";
import {Team} from "../shared/team";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'teams',
    templateUrl: 'teams.html'
})
export class TeamsComponent implements OnInit {
    teams:Team[];
    newTeam: Team;
    teamsForm: FormGroup;
    isLoading: boolean;

    constructor(private router:Router, private adminService:AdminService, private formBuilder:FormBuilder) {
        this.teamsForm = formBuilder.group({
            'name' : [null, Validators.required],
            'acronym': [null, Validators.required]
        });
        this.isLoading = false;
    }

    ngOnInit():void {
        this.adminService.getTeams().then(response =>{
            console.log(response);
            if(response){
                this.teams = response;
                console.log(this.teams);
            }
        })
    }

    addTeam():void{
        this.isLoading = true;
        const tempForm = this.teamsForm;
        this.newTeam = new Team();
        this.newTeam.Name = tempForm.controls['name'].value;
        this.newTeam.Acronym = tempForm.controls['acronym'].value;
        this.adminService.addTeam(this.newTeam).then(response => {
            this.teams.push(this.newTeam);
            this.isLoading = false;
        }).catch(response => {
            this.isLoading = false;
        });
    }
}