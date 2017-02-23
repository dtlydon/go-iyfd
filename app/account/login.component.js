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
var router_1 = require('@angular/router');
var account_service_1 = require("./account.service");
var account_1 = require("./account");
var forms_1 = require("@angular/forms");
var CookieManager_1 = require("../shared/CookieManager");
var LoginComponent = (function () {
    function LoginComponent(router, accountService, formBuilder, cookieManager) {
        this.router = router;
        this.accountService = accountService;
        this.cookieManager = cookieManager;
        this.loginForm = formBuilder.group({
            'username': [null, forms_1.Validators.required],
            'password': [null, forms_1.Validators.required]
        });
    }
    LoginComponent.prototype.resetIsInvalidUsernameOrPassword = function () {
        this.loginForm.controls['username'].setValidators([forms_1.Validators.required]);
        this.loginForm.controls['username'].updateValueAndValidity();
        this.loginForm.controls['password'].setValidators([forms_1.Validators.required]);
        this.loginForm.controls['password'].updateValueAndValidity();
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.userAccount = new account_1.Account();
        this.isLoading = false;
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var myTempForm = this.loginForm;
        this.isLoading = true;
        this.userAccount.username = myTempForm.controls['username'].value;
        this.userAccount.password = myTempForm.controls['password'].value;
        this.accountService.login(this.userAccount).then(function (response) {
            _this.isLoading = false;
            if (response) {
                _this.cookieManager.setCookie("token", response, 30);
                _this.router.navigateByUrl("/home");
            }
            else {
                myTempForm.controls['username'].setValidators([_this.tempfn(), forms_1.Validators.required]);
                myTempForm.controls['username'].updateValueAndValidity();
                myTempForm.controls['password'].setValidators([_this.tempfn(), forms_1.Validators.required]);
                myTempForm.controls['password'].updateValueAndValidity();
            }
        })
            .catch(function (response) {
            _this.isLoading = false;
            myTempForm.controls['username'].setValidators([_this.tempfn(), forms_1.Validators.required]);
            myTempForm.controls['username'].updateValueAndValidity();
            myTempForm.controls['password'].setValidators([_this.tempfn(), forms_1.Validators.required]);
            myTempForm.controls['password'].updateValueAndValidity();
        });
    };
    LoginComponent.prototype.tempfn = function () {
        return function (control) {
            return { "invalid": true };
        };
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, account_service_1.AccountService, forms_1.FormBuilder, CookieManager_1.CookieManager])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map