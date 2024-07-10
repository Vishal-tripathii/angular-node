import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minlength: 'Field is too short',
  notMatch: 'Password and Confirm does not match'
}

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})

export class InputValidationComponent implements OnInit, OnChanges {
  
  @Input() control!: AbstractControl
  @Input() showErrorsWhen: boolean = false
  
  errorMessages: string[] = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation() // need to call everytime when input is changed
  }
  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation(); // need to call everytime when input is changed
    })
    this.control.valueChanges.subscribe(() => {
      this.checkValidation(); // need to call everytime when input is changed
    })
   }

  checkValidation(): void {
    const errors = this.control.errors
    if (!errors) {
      this.errorMessages = [];
      return
    }
    const errorKeys = Object.keys(errors);
    // ['required'], ['email'] //
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }

}
