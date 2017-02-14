/**
 * Created by daniellydon on 11/23/16.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Account} from "./account";
import {Cookie} from "ng2-cookies/index";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AccountService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private userUrl = 'api/user';  // URL to web api
    private userName:string = '';

    constructor(private http: Http) { }

    register(account: Account): Promise<string> {
        return this.http.post(this.userUrl + "/register", JSON.stringify(account), {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    const token = response.headers.get("token");
                    console.log(token);
                    if(token){
                        this.userName = response.json() as string;
                        return token;
                    }
                }
                return "";
            })
            .catch(this.handleError);
    }

    login(account: Account): Promise<string>{
        return this.http.post(this.userUrl + "/login", JSON.stringify(account), {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    const token = response.headers.get("token");
                    if(token){
                        this.userName = response.json() as string;
                        return token;
                    }
                }
                return "";
            })
            .catch(this.handleError);
    }

    getUsername():string{
        if(this.userName == ""){
             this.getUsernameFromServer()
                 .then(result => {
                     this.userName = result;
                 });
        }
        return this.userName;
    }

    private getUsernameFromServer():Promise<string>{
        this.addTokenWhenExists();
        return this.http.get(this.userUrl + '/username', {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    return response.json() as string;
                }
                return "";
            });
    }

    private addTokenWhenExists(): void{
        if(!this.headers.get('token')) {
            this.headers.append('token', Cookie.get('token'));
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}