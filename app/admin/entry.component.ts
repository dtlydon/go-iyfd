/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {AdminService} from "./admin.service";
import {Entry} from "../shared/entry";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Team} from "../shared/team";

@Component({
    moduleId: module.id,
    selector: 'entry',
    templateUrl: 'entry.html',
    styleUrls: ['entry.css']
})
export class EntryComponent implements OnInit {
    entries:Entry[];
    teams:Team[];
    newEntry:Entry;
    entryForm:FormGroup;
    isLoading:boolean;

    constructor(private router:Router, private adminService:AdminService, formBuilder: FormBuilder) {
        this.entryForm = formBuilder.group({
            'teamId' : [null, Validators.required],
            'region': [null, Validators.required],
            'rank': [null, Validators.required]
        });
        this.isLoading = false;
    }

    ngOnInit():void {
        this.adminService.getTeams().then(response =>{
           if(response){
               this.teams = response;
           }
        });

        this.adminService.getEntries().then(response => {
            if(response){
                this.entries = response;
            }
        });
    }

    getTeamName(teamId):string{
        let filteredTeams = this.teams.filter(team => team.Id === teamId);
        if(filteredTeams.length > 0)
            return filteredTeams[0].Name;
        return "";
    }

    addEntry():void{
        this.isLoading = true;

        this.newEntry = new Entry();
        this.newEntry.TeamId = this.entryForm.controls['teamId'].value;
        this.newEntry.Region = this.entryForm.controls['region'].value;
        this.newEntry.Rank = parseInt(this.entryForm.controls['rank'].value);

        this.adminService.addEntry(this.newEntry).then(response => {
            this.entries.push(this.newEntry);
            this.isLoading = false;
        }).catch(error => {this.isLoading = false;})

    }
}