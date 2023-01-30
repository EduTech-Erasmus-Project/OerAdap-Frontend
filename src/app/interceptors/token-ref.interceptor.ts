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
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class TokenRefInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService, private activatedRoute:ActivatedRoute) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let ref = this.activatedRoute?.snapshot?.queryParams?.ref;
    //console.log("params", this.activatedRoute?.snapshot?.queryParams);
    let id = this.activatedRoute?.snapshot?.queryParams?.id;
    if(ref && id){
      let decode = decodeURIComponent(atob(ref))
      request = this.addHeaders(request, decode);
    }else{
      request = this.addHeaders(request, this.storageService.getStorageItem("user_ref"));
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        return next.handle(request);
      })
    );
  }

  addHeaders(request: HttpRequest<any>, token: string) {
    let token_acces = token;
    return request.clone({
      setHeaders: {
        Accept: 'application/json',
        Authorization: token_acces ? token_acces : '',
      },
    });
  }
}
