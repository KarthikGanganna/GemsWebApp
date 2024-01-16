import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token: string = "";

  constructor(private userService: UserService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.token = this.userService.getToken();
    if (request.url.includes("User/GetDashboard")) {
      request.headers.set("Authorization", "Bearer " + this.token);
      const authReq = request.clone({
        headers: request.headers.set('Authorization', "Bearer " + this.token)
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
