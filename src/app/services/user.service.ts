import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

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

  public get currentUser(): User {
    return this.userSubject.value // gets the latest value of user
  }

  login(userLogin: IUserLogin): Observable<User> {
    console.log(userLogin, "this is user login");

    return this._http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          console.log("User has sucessfully logged in", user)
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)
        },
        error: (error) => console.log("An error has occured", error)
      })
    )
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this._http.post(USER_REGISTER_URL, userRegister).pipe(
     tap({
      next: (user: any) => {
        this.setUserToLocalStorage(user);
        this.userSubject.next(user)
      },
      error: (error) => console.log("error in regitering user", error)
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

