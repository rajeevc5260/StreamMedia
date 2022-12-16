import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from './Components/login/login.component';
import { AuthService } from './Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,  private dialogePopUp:MatDialog ) {}

  canActivate(): boolean {
    if (this._authService.userLoggedIn()) {
      return true;
    } else {
      this.dialogePopUp.open(LoginComponent);
      return false;
    }
  }


 
}
