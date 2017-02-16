/**
 * Created by daniellydon on 11/23/16.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Team} from "../shared/team";
import {Cookie} from "ng2-cookies/ng2-cookies";
import {Entry} from "../shared/entry";
import {MatchUp} from "../shared/MatchUp";
import {RegionVs} from "../shared/regionVs";
import {Settings} from "./settings";
import {User} from "./user";
import {UserChoice} from "../play/userChoice";

@Injectable()
export class AdminService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private teamsUrl = 'api/teams';  // URL to web api
    private entriesUrl = 'api/entries';
    private matchUpsUrl = 'api/matchups';
    private settingsUrl = 'api/settings';
    private usersUrl = 'api/user';
    private userChoiceUrl = 'api/userchoice';
    private audioUrl = 'api/announcement';

    constructor(private http: Http) { }
    //<editor-fold desc="Teams">
    addTeam(team: Team): Promise<any>{
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
    //</editor-fold >

    //<editor-fold desc="Entries">
    addEntry(entry: Entry): Promise<any>{
        this.addTokenWhenExists();
        return this.http.post(this.entriesUrl, JSON.stringify(entry), {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    // TODO Anything?
                }
            })
            .catch(this.handleError);
    }

    getEntries(): Promise<Entry[]>{
        this.addTokenWhenExists();
        return this.http.get(this.entriesUrl, {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    return response.json() as Entry[];
                }
                return [{}];
            })
            .catch(this.handleError);
    }
    //</editor-fold>

    //<editor-fold desc="MatchUps">
    generateRoundOneMatchUps():Promise<any>{
        this.addTokenWhenExists();
        return this.http.post(this.matchUpsUrl + '/generate',{}, {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    //?
                }
            })
            .catch(this.handleError);
    }

    getMatchUps():Promise<MatchUp[]>{
        this.addTokenWhenExists();
        return this.http.get(this.matchUpsUrl, {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    return response.json() as MatchUp[];
                }
                return [{}];
            })
            .catch(this.handleError);
    }

    updateMatchUp(matchUp:MatchUp):Promise<any>{
        this.addTokenWhenExists();
        return this.http.patch(this.matchUpsUrl, matchUp, {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    //?
                }
            })
            .catch(this.handleError);
    }
    
    getSettings():Promise<Settings>{
        this.addTokenWhenExists();
        return this.http.get(this.settingsUrl, {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers) {
                    return response.json() as RegionVs;
                }
            })
            .catch(this.handleError);
    }

    updateSettings(settings:Settings):Promise<any>{
        this.addTokenWhenExists();
        return this.http.post(this.settingsUrl, settings, {headers: this.headers})
            .toPromise()
            .then(response =>{
                if(response && response.headers){
                    //
                }
            })
    }
    //</editor-fold>

    //<editor-fold desc="Users">
    getUsers():Promise<User[]>{
        this.addTokenWhenExists();
        return this.http.get(this.usersUrl, {headers: this.headers})
            .toPromise()
            .then(response =>{
                if(response) {
                    return response.json() as User[];
                }
            })
            .catch(this.handleError)
    }

    updateUser(user:User):Promise<any>{
        this.addTokenWhenExists();
        return this.http.post(this.usersUrl, user, {headers: this.headers})
            .toPromise()
            .then(response => {
            //?
            })
            .catch(this.handleError);
    }
    //</editor-fold>

    //<editor-fold desc="Mimic">
    getUserChoices(userId:string):Promise<UserChoice[]>{
        this.addTokenWhenExists();
        return this.http.get(this.userChoiceUrl + "/" + userId, {headers: this.headers})
            .toPromise()
            .then(response =>{
                if(response){
                    return response.json() as UserChoice[];
                }
            })
            .catch(this.handleError);

    }


    updateUserChoice(userChoice: UserChoice, userId:string): Promise<any>{
        this.addTokenWhenExists();
        return this.http.post(this.userChoiceUrl + "/" + userId, JSON.stringify(userChoice), {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response && response.headers){
                    // TODO Anything?
                }
            })
            .catch(this.handleError);
    }
    //</editor-fold>

    //<editor-fold desc='audio'>
    updateAnnouncement(formData:FormData):Promise<any>{
        this.headers.delete("Content-Type");
        this.addTokenWhenExists();
        return this.http.post(this.audioUrl, formData, {headers: this.headers})
            .toPromise()
            .then(response =>{
                this.headers.append("Content-Type", "application/json");
            })
            .catch(this.handleError);
    }
    //</editor-fold>

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