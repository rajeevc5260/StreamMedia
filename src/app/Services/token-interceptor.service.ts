import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector  } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor  {

  constructor(private injector: Injector){}
  
  intercept(req: { clone: (arg0: { headers: any; }) => any; headers: { set: (arg0: string, arg1: string) => any; }; }, next: { handle: (arg0: any) => any; }) {
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + authService.getToken())
      }
    )
    return next.handle(tokenizedReq)
  }

}