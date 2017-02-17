/**
 * Created by daniellydon on 11/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {User} from "./user";
import {AdminService} from "./admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'users',
    templateUrl: 'users.html'
})
export class UsersComponent implements OnInit {
    users: User[];
    editUser: User;
    isLoading: boolean = false;
    userForm: FormGroup;
    constructor(private router:Router, private adminService:AdminService, private formBuilder:FormBuilder) {
        this.userForm = formBuilder.group({
            'username' : [null, Validators.required],
            'email': [null, Validators.required],
            'firstName': [null, Validators.required],
            'lastName': [null, Validators.required],
            'password': [null],
            'role':[null],
            'hasPaid':[null]
        });
    }

    ngOnInit():void {
        this.editUser = new User();
        this.adminService.getUsers().then(response =>{
           this.users = response;
        });
    }

    selectUserEdit(user:User):void{
        this.editUser = user;
    }

    updateUser():void{
        let user = new User();
        user.Id = this.editUser.Id;
        user.Username = this.userForm.controls['username'].value;
        user.Email = this.userForm.controls['email'].value;
        user.FirstName = this.userForm.controls['firstName'].value;
        user.LastName = this.userForm.controls['lastName'].value;
        user.Password = this.userForm.controls['password'].value;
        user.Role = this.userForm.controls['role'].value;
        user.HasPaid = this.userForm.controls['hasPaid'].value;
        this.adminService.updateUser(user).then(response =>{
            this.editUser = new User();
        });
    }
    
}