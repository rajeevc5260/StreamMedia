import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { videoModel } from 'src/app/Model/videoModel';
import { VideoService } from 'src/app/Services/video.service';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-video-content',
  templateUrl: './video-content.component.html',
  styleUrls: ['./video-content.component.css'],
})
export class VideoContentComponent implements OnInit {
  displayVideoArray!:Array<any>

  videoDetails: videoModel[] = [];
  videoDetail = {
    title: '',
    desc: '',
    video:'' ,
    category:'' ,
    author: '',
    rating: '',

  };
 

  constructor(
    private dialogePopUp: MatDialog,
    private videoServices: VideoService,
    private http: HttpClient,
    private router:Router
  ) { this.displayVideoArray=[];}

  ngOnInit(): void {
    let videoId = localStorage.getItem('editVideoId');
    this.videoServices.getVideo(videoId).subscribe((data) => {
      this.videoDetail = JSON.parse(JSON.stringify(data));
    });

   
  }
  // rating component popup
  rateOpen() {
    this.dialogePopUp.open(RatingComponent);
  }

    // delete a video
    deleteVideo(videoData: any) {
      this.videoServices.deleteVideo(videoData._id).subscribe((data) => {
        this.videoDetails = this.videoDetails.filter(
          (video) => video !== videoData
        );
        alert("video deleted")
        this.router.navigate(['dashboard'])
      });
    }
}
