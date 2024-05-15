import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup; // we cannot use this loginForm inside our html without reactivemodels
  isSubmitted: boolean = false;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  get fc() {
    return this.loginForm.controls
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return
    }
    else {
      alert(`email: ${this.fc['email'].value},
      password: ${this.fc['password'].value}`
      )
    }
  }

}
