import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ToastUtilService } from '../Services/toast-util.service';

@Component({
  selector: 'app-newsfeed-page',
  templateUrl: './newsfeed-page.component.html',
  styleUrls: ['./newsfeed-page.component.css']
})
export class NewsfeedPageComponent implements OnInit {

  SlideOptions = { items: 1, dots: true, nav: true };  
  CarouselOptions = { items: 3, dots: true, nav: true }; 
  Images = ['assets/img/sample/photo/d1.jpg','assets/img/sample/photo/d2.jpg','assets/img/sample/photo/d3.jpg']
  constructor(private router:Router, private toastService: ToastUtilService) { }

  ngOnInit(): void {
  }

  goToSearch(){
    this.router.navigate(["search"])
  }

  // ngAfterViewInit(){
    
  //   this.toastService.showToast('here',"#toast-1");
  // }

 
}
