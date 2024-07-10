import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerPage!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(private _fb: FormBuilder, private _userService: UserService, private _activatedRoutes: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.registerPage = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10)]]
    }, {
      Validators: PasswordsMatchValidator('password', 'confirmPassword') // this is my custom validation method
    });
    this.returnUrl = this._activatedRoutes.snapshot.queryParams.returnUrl;
    console.log(this.returnUrl, "register-page");



  }

  get fc() {
    return this.registerPage.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerPage.invalid) return;

    const fv = this.registerPage.value;
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    }
    this._userService.register(user).subscribe(_ => {
      this._router.navigateByUrl(this.returnUrl);
    })

  }
}
