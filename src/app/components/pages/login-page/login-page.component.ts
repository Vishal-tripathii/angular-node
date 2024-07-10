import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup; // we cannot use this loginForm inside our html without reactivemodels
  isSubmitted: boolean = false;
  returnUrl: string = ''

  constructor(private _fb: FormBuilder, private _userService: UserService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this._activatedRoute.snapshot.queryParams.returnUrl // here returnUrl contains the latest router
    console.log(this.returnUrl, "login-page");
    
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
     this._userService.login({email: this.fc.email.value, password: this.fc.password.value}).subscribe(() => {
       this._router.navigateByUrl(this.returnUrl)
     })
    }
  }

}
