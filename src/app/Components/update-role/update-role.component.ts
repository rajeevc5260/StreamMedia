import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {

  userDetails = {
    name:'',
    email:'',
    dob:'',
    role:'',
  };
  constructor(
    private router: Router,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    let user = localStorage.getItem('editUserId');
    this._auth.getUser(user).subscribe((data) => {
      this.userDetails = JSON.parse(JSON.stringify(data));
    });
  }

  updateUser() {
    this._auth.updateUser(this.userDetails);
    alert('updated successfully');
    // window.location.reload();
  }
}
