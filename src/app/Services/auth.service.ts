import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // User Register
  userSignUp(userData: any) {
    return this.http.post<any>(
      'http://localhost:3000/api/users/registerUser',
      userData
    );
  }

  // User Login
  loginUser(user: any) {
    return this.http.post<any>(
      'http://localhost:3000/api/users/loginUser',
      user
    );
  }

  // Admin Login
  loginAdmin(admin: any) {
    return this.http.post<any>(
      'http://localhost:3000/api/users/loginAdmin',
      admin
    );
  }

  // Super Admin Login
  loginSuperAdmin(superAdmin: any) {
    return this.http.post<any>(
      'http://localhost:3000/api/users/loginSuperAdmin',
      superAdmin
    );
  }
}
