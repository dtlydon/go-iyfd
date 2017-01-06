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
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
function equalValidator(validateEqual) {
    return function (control) {
        // self value
        var v = control.value;
        // control vlaue
        var e = control.root.get(validateEqual);
        // value not equal
        if (e && v !== e.value) {
            return {
                validateEqual: false
            };
        }
        return null;
    };
}
exports.equalValidator = equalValidator;
var EqualValidator = (function () {
    function EqualValidator() {
        this.valFn = forms_1.Validators.nullValidator;
    }
    EqualValidator.prototype.ngOnChanges = function (changes) {
        var change = changes['validateEqual'];
        if (change) {
            var val = change.currentValue;
            this.valFn = equalValidator(val);
        }
        else {
            this.valFn = forms_1.Validators.nullValidator;
        }
    };
    EqualValidator.prototype.validate = function (c) {
        return this.valFn(c);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EqualValidator.prototype, "validateEqual", void 0);
    EqualValidator = __decorate([
        core_1.Directive({
            selector: '[validateEqual]',
            providers: [
                { provide: forms_1.NG_VALIDATORS, useExisting: EqualValidator, multi: true }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], EqualValidator);
    return EqualValidator;
}());
exports.EqualValidator = EqualValidator;
//# sourceMappingURL=EqualValidator.js.map