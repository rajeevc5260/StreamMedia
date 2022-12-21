import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VideoService } from 'src/app/Services/video.service';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css'],
})
export class VideoUploadComponent implements OnInit {
  // uploadData = {
  //   title: '',
  //   tumbnail: '',
  //   desc: '',
  //   video: '',
  //   category: '',
  //   subtitle: '',
  //   author: '',
  // };

  displayVideo!: boolean;
  displayVideoArray!: Array<any>;
  @ViewChild('singleInput', { static: false })
  singleInput!: ElementRef;
  thumbnailInput!: ElementRef;
  subtitleInput!: ElementRef;

  videos: any;
  title:string = ""
  desc:string = ""
  category:string = ""
  author:string = ""
  rating:string = "0"
  subtitle: any;
  thumbnail:any

  p: any;
  constructor(private Videoupload: VideoService, private http: HttpClient) {
    this.displayVideo = false;
    this.displayVideoArray = [];
  }

  onSelectedTitle(title:any){
    this.title = title
  }
  onSelectedDesc(desc:any){
    this.desc = desc
  }
  onSelectedCatagory(category:any){
    this.category = category
  }
  onSelectedAuthor(author:any){
    this.author = author
  }
  onSelectedRating(rating: any) {
    this.rating = rating;
  }
  onSelectThumbnail(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('files:', file);
      this.thumbnail = file;
    }}
    onSelectSubtitle(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        console.log('files:', file);
        this.subtitle = file;
      }}

  onSelectVideo(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('files:', file);
      this.videos = file;
    }}
    

  uploadVideo() {
    // construct fomdata
    const formdata = new FormData();
   { formdata.set("title", this.title),
    formdata.set("desc", this.desc),
    formdata.set("category", this.category),
    formdata.set("author", this.author),
    formdata.set("rating", this.rating),
    formdata.append('video', this.thumbnail),
    formdata.append('video', this.videos),
    formdata.append('video', this.subtitle)}
    console.log('formdata in uploadVideo', this.videos);
    this.Videoupload.uploadVideo(formdata).subscribe((res) => {
      alert("Video uploaded successfully")
      console.log('res in uploadVideo',res.filename);
      this.singleInput.nativeElement.value = '';
      this.displayVideo = true;
      this.displayVideoArray.push(res.filename);
    });
  }

  ngOnInit(): void {}
}
