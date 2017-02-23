/**
 * Created by daniellydon on 11/23/16.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Account} from "./account";
import {Observable} from "rxjs/Rx";
import {User} from "../admin/user";
import {CookieManager} from "../shared/CookieManager";

@Injectable()
export class AccountService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private userUrl = 'api/user';  // URL to web api
    private hasResetCalled:boolean = false;

    constructor(private http: Http, private cookieManager: CookieManager) { }

    register(account: Account): Promise<string> {
        return this.http.post(this.userUrl + "/register", JSON.stringify(account), {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    const token = response.headers.get("token");
                    if(token){
                        let account:User = response.json() as User;
                        this.cookieManager.setCookie("username", account.Username, 30);
                        this.cookieManager.setCookie("role", (account.Role as number).toString(), 30);
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
                        let account:User = response.json() as User;

                        this.cookieManager.setCookie("username", account.Username, 30);
                        this.cookieManager.setCookie("role", (account.Role as number).toString(), 30);
                        return token;
                    }
                }
                return "";
            })
            .catch(this.handleError);
    }

    resetCookie():Promise<any>{
        if(!this.headers.get('token')) {
            this.headers.append('token', this.cookieManager.getCookie('token'));
        }
        if(this.hasResetCalled){
            return null;
        }
        this.hasResetCalled = true;
        return this.http.get(this.userUrl + "/info", {headers: this.headers})
            .toPromise()
            .then(response =>{
                this.hasResetCalled = false;
                if(response){
                    let account:User = response.json() as User;
                    this.cookieManager.setCookie("username", account.Username, 30);
                    this.cookieManager.setCookie("role", (account.Role as number).toString(), 30);
                }
            })
            .catch(this.handleError);
    }

    checkUsername(username:string):Promise<any>{
        return this.http.get(this.userUrl + "/username/" + username, {headers: this.headers})
            .toPromise()
            .then(response =>{

            })
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        this.hasResetCalled = false;
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}