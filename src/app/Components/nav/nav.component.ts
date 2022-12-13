import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private dialogePopUp:MatDialog) { }

  // login popup
  loginOpen() {
    this.dialogePopUp.open(LoginComponent)}

  ngOnInit(): void {
  }

}
