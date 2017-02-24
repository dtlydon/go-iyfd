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
    message:string;
    isLoading:boolean = false;
    constructor(private adminService:AdminService){};

    ngOnInit():void{
    }

    updateFile(event):void{
        this.formData = new FormData();
        this.formData.append('announcement', event.srcElement.files.item(0));
    }
    
    upload():void{
        this.isLoading = true;
        this.adminService.updateAnnouncement(this.formData).then(resp =>{
            this.isLoading = false;
            this.message = "Success";
            let e = this;
            setTimeout(function(){
                e.message = "";
            }, 3000);
        });
    }
}