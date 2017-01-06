import {Directive, OnChanges, Input, SimpleChanges} from '@angular/core';
import {Validator, AbstractControl, NG_VALIDATORS, Validators, ValidatorFn} from '@angular/forms';

export function equalValidator(validateEqual: string): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} =>{
        // self value
        let v = control.value;
        // control vlaue
        let e = control.root.get(validateEqual);

        // value not equal
        if (e && v !== e.value) {
            return {
                validateEqual: false
            }
        }
        return null;
    }
}
@Directive({
    selector: '[validateEqual]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: EqualValidator, multi: true }
    ]
})
export class EqualValidator implements Validator, OnChanges {
    @Input() validateEqual: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void{
        const change = changes['validateEqual'];
        if(change){
            const val: string = change.currentValue;
            this.valFn = equalValidator(val);
        }
        else{
            this.valFn = Validators.nullValidator;
        }
    }

    validate(c: AbstractControl): { [key: string]: any } {
        return this.valFn(c);
    }
}