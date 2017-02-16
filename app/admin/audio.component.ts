/**
 * Created by daniellydon on 2/16/17.
 */

import {Component, OnInit} from "@angular/core";
import {AdminService} from "./admin.service";
import {FormBuilder, FormGroup} from "@angular/forms";
@Component({
    moduleId: module.id,
    selector: 'audio1',
    templateUrl: 'audio.html'
})

export class AudioComponent implements OnInit {
    formData:FormData;
    constructor(private adminService:AdminService){};

    ngOnInit():void{
    }

    updateFile(event):void{
        console.log(typeof(event));
        this.formData = new FormData();
        this.formData.append('announcement', event.srcElement.files.item(0));
    }
    
    upload():void{
        this.adminService.updateAnnouncement(this.formData).then(resp =>{});
    }
}