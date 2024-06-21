import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  ngOnInit(): void { }

  @Input() control!: AbstractControl;
  @Input() label!: string;
  @Input() showErrorsWhen: boolean = true
  @Input() type:  'text' | 'password' | 'email' = 'text'

  get formControl() {
    return this.control as FormControl
  }

}
