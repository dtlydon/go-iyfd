"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by daniellydon on 11/10/16.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var user_1 = require("./user");
var admin_service_1 = require("./admin.service");
var forms_1 = require("@angular/forms");
var UsersComponent = (function () {
    function UsersComponent(router, adminService, formBuilder) {
        this.router = router;
        this.adminService = adminService;
        this.formBuilder = formBuilder;
        this.isLoading = false;
        this.userForm = formBuilder.group({
            'username': [null, forms_1.Validators.required],
            'email': [null, forms_1.Validators.required],
            'firstName': [null, forms_1.Validators.required],
            'lastName': [null, forms_1.Validators.required],
            'password': [null],
            'role': [null]
        });
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editUser = new user_1.User();
        this.adminService.getUsers().then(function (response) {
            _this.users = response;
        });
    };
    UsersComponent.prototype.selectUserEdit = function (user) {
        this.editUser = user;
    };
    UsersComponent.prototype.updateUser = function () {
        var _this = this;
        var user = new user_1.User();
        user.Id = this.editUser.Id;
        user.Username = this.userForm.controls['username'].value;
        user.Email = this.userForm.controls['email'].value;
        user.FirstName = this.userForm.controls['firstName'].value;
        user.LastName = this.userForm.controls['lastName'].value;
        user.Password = this.userForm.controls['password'].value;
        user.Role = this.userForm.controls['role'].value;
        this.adminService.updateUser(user).then(function (response) {
            _this.editUser = new user_1.User();
        });
    };
    UsersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'users',
            templateUrl: 'users.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, admin_service_1.AdminService, forms_1.FormBuilder])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map