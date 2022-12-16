import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { videoModel } from 'src/app/Model/videoModel';
import { VideoService } from 'src/app/Services/video.service';
import { VideoContentComponent } from '../video-content/video-content.component';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  videoData: videoModel[]=[]

  constructor(private router:Router, private videoService: VideoService, private dialoge:MatDialog) { }

  ngOnInit(): void {
      // get Trainer head Auth Details
      this.videoService.getVideosDetials().subscribe((data) => {
        this.videoData = JSON.parse(JSON.stringify(data));
      });
  }


    // get video Details
    VideoDetails(videoDatas: any) {
      localStorage.setItem('editVideoId', videoDatas._id.toString());
      this.router.navigate(['dashboard/videoContent']);
      // this.dialoge.open(VideoContentComponent)
    }

 
}
