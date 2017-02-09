/**
 * Created by daniellydon on 2/9/17.
 */

import {Component, OnInit} from "@angular/core";
import {Settings} from "./settings";
import {AdminService} from "./admin.service";
@Component({
    moduleId: module.id,
    selector: 'settings',
    templateUrl: 'settings.html'
})

export class SettingComponent implements OnInit{
    public settings:Settings;
    constructor(private adminService:AdminService){
    }

    ngOnInit():void{
        this.settings = new Settings();
        this.adminService.getSettings().then(response =>{
            this.settings = response;
        });
    }

    updateSouthVs(southVs:string):void{
        this.settings.SouthVs = southVs;
        this.updateSettings(this.settings);
    }

    updateAdminBlock(isOn):void{
        this.settings.IsAdminBlockOn = isOn;
        this.updateSettings(this.settings);
    }

    updateSettings(settings:Settings):void{
        this.adminService.updateSettings(settings).then(response =>{
            //??
        });
    }
}