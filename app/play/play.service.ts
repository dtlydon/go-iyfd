/**
 * Created by daniellydon on 2/7/17.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {UserChoice} from "./userChoice";
import {Score} from "./score";
import {CookieManager} from "../shared/CookieManager";

@Injectable()
export class PlayService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private userChoiceUrl = 'api/userchoice';  // URL to web api
    private scoresUrl = 'api/scores';

    constructor(private http: Http, private cookieManager:CookieManager) { }
    //<editor-fold desc="User Choice">
    updateUserChoice(userChoice: UserChoice): Promise<any>{
        this.addTokenWhenExists();
        return this.http.post(this.userChoiceUrl, JSON.stringify(userChoice), {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    // TODO Anything?
                }
            })
            .catch(this.handleError);
    }

    getUserChoices(): Promise<UserChoice[]>{
        this.addTokenWhenExists();
        return this.http.get(this.userChoiceUrl, {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    return response.json() as UserChoice[];
                }
            })
            .catch(this.handleError);
    }
    //</editor-fold>
    //<editor-fold desc="Scores">
    getScores(): Promise<Score[]>{
        return this.http.get(this.scoresUrl, {headers: this.headers})
            .toPromise()
            .then(response =>{
                if(response && response.headers){
                    return response.json() as Score[];
                }
            })
            .catch(this.handleError)
    }
    //</editor-fold>


    private addTokenWhenExists(): void{
        if(!this.headers.get('token')) {
            this.headers.append('token', this.cookieManager.getCookie('token'));
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}