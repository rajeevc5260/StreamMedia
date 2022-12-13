import { Component, OnInit,  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupData = {
    name: '',
    email: '',
    password: '',
    dob: '',
    // role:'user'
  };

  constructor(private _auth: AuthService, private router: Router, private dialogePopUp:MatDialog) {}

  ngOnInit(): void {}

  // login popup
  loginOpen() {
    this.dialogePopUp.open(LoginComponent);
  }
  //signup function
  signUp() {
    console.log(this.signupData);
    this._auth.userSignUp(this.signupData).subscribe((res) => {
      console.log(res);
      alert('Account Registered Successfully');
      this.router.navigate(['login']);
    }, err=>{
      alert("Email already registered")
      console.log(err);
    });
  }
}
