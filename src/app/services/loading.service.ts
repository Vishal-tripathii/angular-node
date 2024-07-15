import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoadingSubject = new BehaviorSubject<Boolean>(false); 

  constructor() { }

  showLoading() {
    this.isLoadingSubject.next(true);
  }

  hideLoading() {
    this.isLoadingSubject.next(false)
  }

  get isLoading() { // make sure that nobosy can change its value from outside
    return this.isLoadingSubject.asObservable();
  }
  
}
