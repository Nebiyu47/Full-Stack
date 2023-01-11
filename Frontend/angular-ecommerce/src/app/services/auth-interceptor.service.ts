import { environment } from './../../environments/environment';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { from, lastValueFrom, Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(@Inject(OKTA_AUTH) private OktaAuth: OktaAuth) { }
  intercept(request: HttpRequest<any> , next : HttpHandler): Observable<HttpEvent<any>>{
    return from(this.handleAcess(request, next));
  } 
  private async handleAcess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const Endpoint= environment.shopurl+ '/orders';

   const securedEndPoints = [Endpoint];
   if(securedEndPoints.some(url=>request.urlWithParams.includes(url))){
        const accessToken = this.OktaAuth.getAccessToken();
        request = request.clone({
          setHeaders : {
            Authorization : 'Bearer' + accessToken
          }
        })
   }
    return await lastValueFrom(next.handle(request));
  }
}
