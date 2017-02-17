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
 * Created by daniellydon on 11/16/16.
 */
var core_1 = require('@angular/core');
var account_1 = require("./account");
var account_service_1 = require("./account.service");
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var EqualValidator_1 = require("../utils/validators/EqualValidator");
var RegisterComponent = (function () {
    function RegisterComponent(accountService, router, formBuilder) {
        this.accountService = accountService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.usernameIsUnique = true;
        this.registrationForm = formBuilder.group({
            'username': [null, forms_1.Validators.required],
            'firstname': [null, forms_1.Validators.required],
            'lastname': [null, forms_1.Validators.required],
            'email': [null, forms_1.Validators.required],
            'password': [null, forms_1.Validators.required],
            'confirm': [null, [forms_1.Validators.required, EqualValidator_1.equalValidator("password")]]
        });
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.userAccount = new account_1.Account;
        this.isLoading = false;
    };
    RegisterComponent.prototype.checkUsername = function () {
        var _this = this;
        this.accountService.checkUsername(this.userAccount.username)
            .then(function (resp) {
            _this.registrationForm.controls['username'].setValidators([forms_1.Validators.required]);
            _this.registrationForm.controls['username'].updateValueAndValidity();
        })
            .catch(function (err) {
            _this.registrationForm.controls['username'].setValidators([_this.invalid(), forms_1.Validators.required]);
            _this.registrationForm.controls['username'].updateValueAndValidity();
        });
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.isLoading = true;
        this.accountService.register(this.userAccount).then(function (response) {
            if (response) {
                ng2_cookies_1.Cookie.set("token", response);
            }
            _this.isLoading = false;
            _this.router.navigateByUrl("/home");
        });
    };
    RegisterComponent.prototype.invalid = function () {
        return function (control) {
            return { "invalid": true };
        };
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register',
            templateUrl: 'register.html'
        }), 
        __metadata('design:paramtypes', [account_service_1.AccountService, router_1.Router, forms_1.FormBuilder])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map