import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenRefInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //console.log('peticion http');
 
    request = this.addHeaders(request);
    
    return next.handle(request).pipe(
      catchError((error: any) => {

        //console.log("interceptor error", error);
       
        return next.handle(request);
      })
    );
  }

  addHeaders(request: HttpRequest<any>) {
    let token_acces = this.storageService.getStorageItem("user_ref");
    return request.clone({
      setHeaders: {
        Accept: 'application/json',
        Authorization: token_acces ? token_acces : '',
      },
    });
  }
}
