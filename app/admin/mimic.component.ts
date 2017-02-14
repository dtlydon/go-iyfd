import {Component, OnInit} from "@angular/core";
import {AdminService} from "./admin.service";
import {UserChoice} from "../play/userChoice";
import {Route, ActivatedRoute} from "@angular/router";
/**
 * Created by daniellydon on 2/14/17.
 */

@Component({
    moduleId: module.id,
    selector: 'mimic',
    templateUrl: 'mimic.html'
})
export class MimicComponent implements OnInit {
    userChoices: UserChoice[];
    userId:string;
    constructor(private route:ActivatedRoute, private adminService:AdminService) {
    }

    ngOnInit():void {
        this.userId = this.route.snapshot.params["userId"];
        this.adminService.getUserChoices(this.userId).then(response =>{
            this.userChoices = response;
        });
    }

    pickWinner(userChoice:UserChoice, entry:number):void{
        userChoice.ChoiceId = entry === 1 ? userChoice.Entry1Id : userChoice.Entry2Id;
        this.adminService.updateUserChoice(userChoice, this.userId); //TODO: Need to handle errors
    }
}