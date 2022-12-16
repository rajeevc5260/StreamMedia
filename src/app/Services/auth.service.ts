import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router:Router) {}

  // User Register
  userSignUp(userData: any) {
    return this.http.post<any>(
      'http://localhost:3000/api/users/registerUser',
      userData
    );
  }

  // user logged out and token deleted
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  // auth Get Token from the backend
  getToken() {
    return localStorage.getItem('token');
  }

   // user LoggedIn and token generated
   userLoggedIn() {
    return !!localStorage.getItem('token');
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

  // Get Auth and Role Details
  getUsersDetails() {
    return this.http.get<any>('http://localhost:3000/getUserDetails');
  }
  // get learner details to update by ID
  getUser(id: any) {
    return this.http.get('http://localhost:3000/getUserDetails/' + id);
  }
  // update Role
  updateUser(Id: any) {
    console.log('update');
    return this.http
      .put('http://localhost:3000/roleUpdate/', Id)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
