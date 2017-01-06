/**
 * Created by daniellydon on 11/16/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {Cookie} from "ng2-cookies/ng2-cookies";
import {AccountService} from "./account.service";
import {Account} from "./account";
import {FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent implements OnInit {
    isLoading: boolean;
    userAccount: Account;
    loginForm: FormGroup;

    constructor(private router:Router, private accountService: AccountService, formBuilder: FormBuilder) {
        this.loginForm = formBuilder.group({
            'username' : [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    resetIsInvalidUsernameOrPassword():void{
        this.loginForm.controls['username'].setValidators([Validators.required]);
        this.loginForm.controls['username'].updateValueAndValidity();
        this.loginForm.controls['password'].setValidators([Validators.required]);
        this.loginForm.controls['password'].updateValueAndValidity();
    }

    ngOnInit():void {
        this.userAccount = new Account();
        this.isLoading = false;
        
    }

    login():void{
        const myTempForm = this.loginForm;
        this.isLoading = true;
        this.userAccount.username = myTempForm.controls['username'].value;
        this.userAccount.password = myTempForm.controls['password'].value;

        this.accountService.login(this.userAccount).then(response => {
            this.isLoading = false;
            if(response){
                Cookie.set("token", response);
                this.router.navigateByUrl("/home");
            }else{
                myTempForm.controls['username'].setValidators([this.tempfn(), Validators.required]);
                myTempForm.controls['username'].updateValueAndValidity();
                myTempForm.controls['password'].setValidators([this.tempfn(), Validators.required]);
                myTempForm.controls['password'].updateValueAndValidity();
            }
        })
        .catch(response => {
            this.isLoading = false;
            myTempForm.controls['username'].setValidators([this.tempfn(), Validators.required]);
            myTempForm.controls['username'].updateValueAndValidity();
            myTempForm.controls['password'].setValidators([this.tempfn(), Validators.required]);
            myTempForm.controls['password'].updateValueAndValidity();
        });
    }

    tempfn(): ValidatorFn{
        return (control: AbstractControl): {[key: string]: any} =>{
          return {"invalid": true};
        }
    }
}