import { Component, OnInit } from '@angular/core';
import { authDataModel } from 'src/app/Model/authModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData ={
    email: '',
    password:'',
    role:''
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
