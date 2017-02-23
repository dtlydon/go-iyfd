import {Injectable} from "@angular/core";
/**
 * Created by daniellydon on 2/23/17.
 */

@Injectable()
export class CookieManager {

    constructor() {
    }
    
    setCookie(cname: string, cvalue: string, exdays: number):void {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname: string):string {
        var name:string = cname + "=";
        var ca:Array<string> = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    deleteCookie(name):void {
        this.setCookie(name, "", -1);
    }
}