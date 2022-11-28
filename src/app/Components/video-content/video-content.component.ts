import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RatingComponent } from '../rating/rating.component';


@Component({
  selector: 'app-video-content',
  templateUrl: './video-content.component.html',
  styleUrls: ['./video-content.component.css']
})
export class VideoContentComponent implements OnInit {

  constructor(private dialogePopUp:MatDialog ) { }

  ngOnInit(): void {
  }
  // rating component popup
  rateOpen() {
    this.dialogePopUp.open(RatingComponent);
  }

}
