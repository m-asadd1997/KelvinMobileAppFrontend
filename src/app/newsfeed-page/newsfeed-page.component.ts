import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ToastUtilService } from '../Services/toast-util.service';
import { PostService } from '../Services/post.service';
import {HostListener} from '@angular/core'
@Component({
  selector: 'app-newsfeed-page',
  templateUrl: './newsfeed-page.component.html',
  styleUrls: ['./newsfeed-page.component.css']
})
export class NewsfeedPageComponent implements OnInit {

  SlideOptions = { items: 1, dots: true, nav: true };
  CarouselOptions = { items: 3, dots: true, nav: true };
  innerHeight: number = window.innerHeight - 100;
  Images = ['assets/img/sample/photo/d1.jpg', 'assets/img/sample/photo/d2.jpg', 'assets/img/sample/photo/d3.jpg']
  id = sessionStorage.getItem("userId");
  userAds: Array<any> = [];
  businessAds:Array<any>=[];
  @HostListener('window:resize', ['$event'])
  screenHeight=null;
  screenWidth;
  token;
  constructor(private router: Router, private toastService: ToastUtilService, private postService: PostService) {
    // this.onResize();
   }

  ngOnInit(): void {
    this.getUserPosts();
    this.getBusinessPosts();
    // this.token = sessionStorage.getItem("firebaseToken")
    
  }
  // onResize(event?) {
  //   this.screenHeight = window.innerHeight - 102;
  //   this.screenWidth = window.innerWidth;

  //   console.log(this.screenHeight)
  // }

   


goToSearch() {
  this.router.navigate(["search"])
}


getUserPosts() {
  console.log(this.id)
  this.postService.getUserPosts(this.id)
    .subscribe((response) => {
      console.log(response)
      this.userAds = response;
    })
}
getBusinessPosts(){
  this.postService.getAllBusinessPosts()
  .subscribe((response)=>{
    this.businessAds=response;
    console.log(response,"=======business")
  })
}
gotoAddPreview(id) {
  this.router.navigate(['blogpost/' + id])
}

gotoUserProfile(id) {
  this.router.navigate(['profiles/' + id])
}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerHeight = window.innerHeight - 102;
  console.log("height",this.innerHeight);
  
}

}
