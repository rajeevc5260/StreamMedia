import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/Services/video.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  stars = [1, 2, 3, 4, 5];
  rating = 0;

  videoDetail = {
    title: '',
    desc: '',
    video:'' ,
    category:'' ,
    author: '',
    rating: '',

  };
  
  selectRating(rate: any) {
    this.rating = rate;
  }
  
  constructor(private videoServices:VideoService) {}

  ngOnInit(): void {
    let videoId = localStorage.getItem('editVideoId');
    this.videoServices.getVideo(videoId).subscribe((data) => {
      this.videoDetail = JSON.parse(JSON.stringify(data));
    });
  }
}
