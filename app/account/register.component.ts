/**
 * Created by daniellydon on 11/16/16.
 */
import { Component, OnInit } from '@angular/core';
import {Account} from "./account";
import {AccountService} from "./account.service";
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {equalValidator} from "../utils/validators/EqualValidator";

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.html'
})
export class RegisterComponent implements OnInit {
    userAccount: Account;
    isLoading: boolean;
    registrationForm: FormGroup;
    usernameIsUnique: boolean;

    constructor(private accountService: AccountService, private router: Router, private formBuilder: FormBuilder) {
        this.usernameIsUnique = true;
        this.registrationForm = formBuilder.group({
            'username' : [null, Validators.required],
            'firstname': [null, Validators.required],
            'lastname': [null, Validators.required],
            'email': [null, Validators.required],
            'password': [null, Validators.required],
            'confirm': [null, [Validators.required, equalValidator("password")]]
        });
    }

    ngOnInit():void {
        this.userAccount = new Account;
        this.isLoading = false;
    }

    register():void{
        this.isLoading = true;
        this.accountService.register(this.userAccount).then(response => {
            if(response){
                Cookie.set("token", response);
            }
            this.isLoading = false;
            this.router.navigateByUrl("/home");
        });
    }
}