import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { authDataModel } from 'src/app/Model/authModel';
import { AuthService } from 'src/app/Services/auth.service';
import { UpdateRoleComponent } from '../update-role/update-role.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userDatas: authDataModel[] = []; // Get for learner model
  constructor(private _auth:AuthService, private dialogePopUp:MatDialog) { }

  
  //  refresh the filter
  refresh(){
    window.location.reload()
  }
  ngOnInit(): void {
     // Read learners Details
     this._auth.getUsersDetails().subscribe((data) => {
      this.userDatas = JSON.parse(JSON.stringify(data));
    });
  }

   // Update a learner Details
   updateUser(userData: any) {
    localStorage.setItem('editUserId', userData._id.toString());
    this.dialogePopUp.open(UpdateRoleComponent);
  }
  
}
