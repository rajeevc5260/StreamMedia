import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupData ={
    name:'',
    email: '',
    password:'',
    dob:'',
    role:'user'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
