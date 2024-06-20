import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';

const USER_KEY = 'User'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage())
  public userObservable!: Observable<User>

  constructor(private _http: HttpClient) {
    this.userObservable = this.userSubject.asObservable()
  }

  login(userLogin: IUserLogin): Observable<User> {
    console.log(userLogin, "this is user login");

    return this._http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          console.log("User has sucessfully logged in", user)
          this.setUserToLocalStorage(user)
        },
        error: (error) => console.log("An error has occured", error)
      })
    )
  }

  logout() {
    this.userSubject.next(new User()) // ?
    localStorage.removeItem(USER_KEY); // removing item from localstografe
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      return JSON.parse(userJson) as User
    }
    return new User()
  }
}

