/**
 * Created by daniellydon on 11/23/16.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Team} from "../shared/team";
import {Cookie} from "ng2-cookies/ng2-cookies";

@Injectable()
export class AdminService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private teamsUrl = 'api/teams';  // URL to web api

    constructor(private http: Http) { }
    
    addTeam(team: Team): Promise<any>{
        if(!this.headers.get('token')) {
            this.headers.append('token', Cookie.get('token'));
        }
        return this.http.post(this.teamsUrl, JSON.stringify(team), {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    // TODO Anything?
                }
            })
            .catch(this.handleError);
    }

    getTeams(): Promise<Team[]>{
        if(!this.headers.get('token')) {
            this.headers.append('token', Cookie.get('token'));
        }
        return this.http.get(this.teamsUrl, {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    return response.json() as Team[]
                }
                return [{}];
            })
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}