import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(new User())
  public userObservable!: Observable<User>

  constructor(private _http: HttpClient) { 
    this.userObservable = this.userSubject.asObservable()
  }

  login(userLogin: IUserLogin): Observable<User> {
    console.log(userLogin, "this is user logun");
    
    return this._http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => console.log("User has sucessfully logged in", user),
        error:(error) => console.log("An error has occured", error)
      })
    )
  }
}
