import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

var pendingRequests = 0;
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {


  constructor(private _loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._loadingService.showLoading();
    pendingRequests = pendingRequests + 1;

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if(event.type === HttpEventType.Response) { // it means that the request is served
            this.handleLoading();
          }
        },
        error: (_) => {
          this.handleLoading();
        }
      })
    )
  }

  handleLoading() {
    pendingRequests = pendingRequests - 1;
    if(pendingRequests === 0) {
      this._loadingService.hideLoading()
    }
  }
  
}
