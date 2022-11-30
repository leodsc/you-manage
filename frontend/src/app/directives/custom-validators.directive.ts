import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Requirement } from '../common/form/app-form';

@Directive({
  selector: '[customValidators]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CustomValidatorsDirective, multi: true }]
})
export class CustomValidatorsDirective implements Validator {

  @Input('customValidators')
  customValidators: Requirement[] | null = []

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (this.customValidators === null) {
      return null;
    }
    for (const validator of this.customValidators) {
      validator.isValid = validator.validation(control.value ?? '');
    }
    return this.customValidators.every(validator => validator.isValid === true) ? null : { invalid: true };
  }
}
